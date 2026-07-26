'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  Calculator, 
  Binary, 
  Code, 
  Database, 
  Brain, 
  Cpu, 
  Sparkles, 
  Plus, 
  Trash2, 
  Search, 
  RotateCcw, 
  FileText, 
  RefreshCw,
  Cloud,
  AlertCircle,
  Award,
  TrendingUp,
  Mail
} from 'lucide-react';
import { Cormorant_Garamond, Crimson_Pro } from 'next/font/google';
import { 
  DEFAULT_INITIAL_STATE, 
  GateTrackerState, 
  SubtopicStatus, 
  MockTest 
} from '@/lib/gate-data';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
});

const PIN_STORAGE_KEY = 'gate_2027_tracker_pin';
const TARGET_DATE = new Date('2027-02-06T09:30:00+05:30').getTime();

export default function Gate2027Page() {
  const [pin, setPin] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const [state, setState] = useState<GateTrackerState>(DEFAULT_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [activeSectionId, setActiveSectionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Countdown State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock Test Modal / Input state
  const [newMockTest, setNewMockTest] = useState<{ title: string; date: string; score: string; targetScore: string; notes: string }>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    score: '',
    targetScore: '75',
    notes: ''
  });
  const [showMockForm, setShowMockForm] = useState<boolean>(false);

  // Active expanded notes map
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  // 1. Initial PIN check from sessionStorage (Session Only) or localStorage (Remember Me)
  useEffect(() => {
    const sessionPin = sessionStorage.getItem(PIN_STORAGE_KEY);
    const localPin = localStorage.getItem(PIN_STORAGE_KEY);
    const savedPin = sessionPin || localPin;

    if (savedPin) {
      setPin(savedPin);
      verifyAndLoadData(savedPin, false);
    } else {
      setIsLoading(false);
    }
  }, []);

  // 2. Countdown Timer Loop
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // API Call: Verify PIN & Fetch Data
  const verifyAndLoadData = async (pinToTest: string, shouldSave: boolean = true) => {
    setIsVerifying(true);
    setAuthError('');
    try {
      const verifyRes = await fetch('/api/gate-tracker?action=verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToTest })
      });

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        setAuthError(errorData.error || 'Invalid passcode');
        setIsAuthenticated(false);
        setIsVerifying(false);
        setIsLoading(false);
        return;
      }

      if (shouldSave) {
        if (rememberMe) {
          localStorage.setItem(PIN_STORAGE_KEY, pinToTest);
          sessionStorage.removeItem(PIN_STORAGE_KEY);
        } else {
          sessionStorage.setItem(PIN_STORAGE_KEY, pinToTest);
          localStorage.removeItem(PIN_STORAGE_KEY);
        }
      }

      setIsAuthenticated(true);

      const dataRes = await fetch('/api/gate-tracker', {
        headers: { 'x-gate-pin': pinToTest }
      });

      if (dataRes.ok) {
        const result = await dataRes.json();
        if (result.data) {
          setState(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching tracker data:', error);
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  // API Call: Sync state to backend
  const syncStateToBackend = async (newState: GateTrackerState) => {
    if (!isAuthenticated || !pin) return;
    setSyncStatus('syncing');

    try {
      const res = await fetch('/api/gate-tracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gate-pin': pin
        },
        body: JSON.stringify({ state: newState })
      });

      if (res.ok) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    }
  };

  // State Updates Helpers
  const updateSubtopicStatus = (sectionId: string, subtopicId: string, status: SubtopicStatus) => {
    const updatedSections = state.sections.map(section => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        subtopics: section.subtopics.map(st => {
          if (st.id !== subtopicId) return st;
          return { ...st, status };
        })
      };
    });

    const newState = { ...state, sections: updatedSections };
    setState(newState);
    syncStateToBackend(newState);
  };

  const updateSubtopicRevisions = (sectionId: string, subtopicId: string, delta: number) => {
    const updatedSections = state.sections.map(section => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        subtopics: section.subtopics.map(st => {
          if (st.id !== subtopicId) return st;
          const newRev = Math.max(0, st.revisions + delta);
          return { ...st, revisions: newRev };
        })
      };
    });

    const newState = { ...state, sections: updatedSections };
    setState(newState);
    syncStateToBackend(newState);
  };

  const updateSubtopicNotes = (sectionId: string, subtopicId: string, notes: string) => {
    const updatedSections = state.sections.map(section => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        subtopics: section.subtopics.map(st => {
          if (st.id !== subtopicId) return st;
          return { ...st, notes };
        })
      };
    });

    const newState = { ...state, sections: updatedSections };
    setState(newState);
    syncStateToBackend(newState);
  };

  const handleAddMockTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMockTest.title || !newMockTest.score) return;

    const testItem: MockTest = {
      id: `mock-${Date.now()}`,
      title: newMockTest.title,
      date: newMockTest.date || new Date().toISOString().split('T')[0],
      score: parseFloat(newMockTest.score),
      maxScore: 100,
      targetScore: parseFloat(newMockTest.targetScore || '75'),
      notes: newMockTest.notes
    };

    const newState = {
      ...state,
      mockTests: [testItem, ...state.mockTests]
    };

    setState(newState);
    syncStateToBackend(newState);

    setNewMockTest({ title: '', date: new Date().toISOString().split('T')[0], score: '', targetScore: '75', notes: '' });
    setShowMockForm(false);
  };

  const handleDeleteMockTest = (id: string) => {
    const newState = {
      ...state,
      mockTests: state.mockTests.filter(m => m.id !== id)
    };
    setState(newState);
    syncStateToBackend(newState);
  };

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = (state.messages || []).filter(m => m.id !== id);
    const newState = {
      ...state,
      messages: updatedMessages
    };
    setState(newState);
    syncStateToBackend(newState);
  };

  // Helper Icon Resolver
  const renderSectionIcon = (iconName: string, active: boolean = false) => {
    const colorClass = active ? 'text-white' : 'text-[#8b7355]';
    switch (iconName) {
      case 'Calculator': return <Calculator className={`w-4 h-4 ${colorClass}`} />;
      case 'Binary': return <Binary className={`w-4 h-4 ${colorClass}`} />;
      case 'TrendingUp': return <TrendingUp className={`w-4 h-4 ${colorClass}`} />;
      case 'Code': return <Code className={`w-4 h-4 ${colorClass}`} />;
      case 'Database': return <Database className={`w-4 h-4 ${colorClass}`} />;
      case 'Brain': return <Brain className={`w-4 h-4 ${colorClass}`} />;
      case 'Cpu': return <Cpu className={`w-4 h-4 ${colorClass}`} />;
      default: return <Sparkles className={`w-4 h-4 ${colorClass}`} />;
    }
  };

  // Overall Statistics Calculations
  const stats = useMemo(() => {
    let totalSubtopics = 0;
    let masteredCount = 0;
    let inProgressCount = 0;
    let totalRevisions = 0;

    state.sections.forEach(sec => {
      sec.subtopics.forEach(st => {
        totalSubtopics++;
        totalRevisions += st.revisions;
        if (st.status === 'mastered') masteredCount++;
        if (st.status === 'in-progress') inProgressCount++;
      });
    });

    const completionPercent = totalSubtopics > 0 
      ? Math.round(((masteredCount + inProgressCount * 0.5) / totalSubtopics) * 100) 
      : 0;

    const avgMockScore = state.mockTests.length > 0
      ? (state.mockTests.reduce((acc, curr) => acc + curr.score, 0) / state.mockTests.length).toFixed(1)
      : 'N/A';

    return {
      totalSubtopics,
      masteredCount,
      inProgressCount,
      notStartedCount: totalSubtopics - masteredCount - inProgressCount,
      completionPercent,
      totalRevisions,
      avgMockScore
    };
  }, [state]);

  // Filtered Sections by Search & Active Tab
  const filteredSections = useMemo(() => {
    return state.sections.filter(sec => {
      if (activeSectionId !== 'all' && sec.id !== activeSectionId) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchSection = sec.title.toLowerCase().includes(q);
      const matchSubtopics = sec.subtopics.some(st => st.name.toLowerCase().includes(q));

      return matchSection || matchSubtopics;
    });
  }, [state, activeSectionId, searchQuery]);

  // -------------------------------------------------------------
  // Render: Passcode Lock Screen (Notes vintage theme)
  // -------------------------------------------------------------
  if (!isAuthenticated && !isLoading) {
    return (
      <div className={`min-h-screen bg-[#faf9f5] text-[#333] flex items-center justify-center p-4 ${cormorant.variable} ${crimsonPro.variable}`}>
        <div className="max-w-[290px] w-full bg-[#ffffff] border border-[#e6e2d3] rounded-2xl p-6 shadow-sm space-y-5 text-center">
          <div className="space-y-2">
            <div className="flex justify-center mb-2">
              <img 
                src="/images/daa.png" 
                alt="GATE 2027 DA Logo" 
                className="w-24 h-auto mx-auto block"
              />
            </div>
            <h1 className={`text-xl font-light text-[#333] ${crimsonPro.className}`}>Personal Space GATE 2027</h1>
            <p className="text-[#888] text-[11px] font-mono leading-relaxed">
              Private Data Science & AI Roadmap. Enter passcode to unlock.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); verifyAndLoadData(pin); }} className="space-y-3.5">
            <div>
              <label className="block text-[9px] uppercase font-mono text-[#a09682] mb-1 text-left">Passcode PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full bg-[#faf9f5] border border-[#e6e2d3] rounded-xl px-3 py-2.5 text-center text-lg font-mono tracking-widest text-[#333] focus:outline-none focus:border-[#8b7355]"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-start text-[11px] font-mono text-[#666] px-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#8b7355] rounded cursor-pointer"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-[#c75050] text-[11px] bg-[#fdf2f2] border border-[#f8d7da] rounded-lg p-2.5 text-left">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying || !pin}
              className="w-full bg-[#8b7355] hover:bg-[#7a6448] text-white font-medium py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 text-xs font-mono"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Tracker</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <span className="text-[10px] font-mono text-[#a09682]">Protected • Unindexed Route</span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-[#faf9f5] text-[#333] flex items-center justify-center ${crimsonPro.variable}`}>
        <div className="flex items-center gap-3 text-[#666] font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-[#8b7355]" />
          <span>Loading Personal Space...</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Main Tracker Dashboard (Focused Column Layout - max-w-2xl)
  // -------------------------------------------------------------
  return (
    <div className={`min-h-screen bg-[#faf9f5] text-[#333] font-sans pb-24 ${cormorant.variable} ${crimsonPro.variable}`}>
      
      {/* Centered Column Wrapper matching /notes page (max-w-2xl ~ 672px) */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        
        {/* Navigation & Header Section */}
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-mono text-[#a09682]">
              <Link href="/" className="hover:text-[#333] transition flex items-center gap-1">
                ← home
              </Link>
              <span>/</span>
              <Link href="/notes" className="hover:text-[#333] transition">
                notes
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Sync Badge */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                {syncStatus === 'synced' && (
                  <span className="flex items-center gap-1 text-[#276749] bg-[#f0fff4] border border-[#c6f6d5] px-2.5 py-0.5 rounded-full">
                    <Cloud className="w-3 h-3" /> Synced
                  </span>
                )}
                {syncStatus === 'syncing' && (
                  <span className="flex items-center gap-1 text-[#c05621] bg-[#fffaf0] border border-[#feebc8] px-2.5 py-0.5 rounded-full animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Saving...
                  </span>
                )}
                {syncStatus === 'error' && (
                  <span className="flex items-center gap-1 text-[#c53030] bg-[#fff5f5] border border-[#fed7d7] px-2.5 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" /> Offline
                  </span>
                )}
              </div>

              {/* Lock Button */}
              <button
                onClick={() => {
                  localStorage.removeItem(PIN_STORAGE_KEY);
                  sessionStorage.removeItem(PIN_STORAGE_KEY);
                  setIsAuthenticated(false);
                }}
                className="p-1.5 text-[#888] hover:text-[#333] bg-[#ffffff] border border-[#e6e2d3] hover:border-[#a09682] rounded-lg transition"
                title="Lock Tracker"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-center pt-2 space-y-3">
            <div className="flex justify-center mb-2">
              <img 
                src="/images/daa.png" 
                alt="GATE 2027 DA Emblem" 
                className="w-28 h-auto mx-auto block" 
              />
            </div>
            <h1 className={`text-2xl font-light text-[#333] tracking-wide ${crimsonPro.className}`}>
              divyanshu saini | gate 2027 da
            </h1>
            <p className="text-xs text-[#888] font-mono">
              Personal syllabus roadmap & progress tracker for Data Science & AI.
            </p>
          </div>
        </header>

        {/* Section Divider */}
        <div className="flex items-center justify-center font-mono text-[11px] tracking-widest text-[#a09682] border-b border-[#e6e2d3] pb-2">
          OVERVIEW & COUNTDOWN
        </div>

        {/* Countdown & Key Stats Card */}
        <div className="bg-[#ffffff] border border-[#e6e2d3] rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* Countdown Header */}
          <div className="flex items-center justify-between text-xs font-mono text-[#888]">
            <span className="text-[#a09682] uppercase tracking-wider">Countdown to GATE 2027</span>
            <span>Target: Feb 6, 2027</span>
          </div>

          {/* Countdown 4-box grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3">
              <div className="text-2xl font-semibold font-mono text-[#333]">{timeLeft.days}</div>
              <div className="text-[10px] uppercase font-mono text-[#888] mt-0.5">Days</div>
            </div>
            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3">
              <div className="text-2xl font-semibold font-mono text-[#333]">{timeLeft.hours}</div>
              <div className="text-[10px] uppercase font-mono text-[#888] mt-0.5">Hours</div>
            </div>
            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3">
              <div className="text-2xl font-semibold font-mono text-[#333]">{timeLeft.minutes}</div>
              <div className="text-[10px] uppercase font-mono text-[#888] mt-0.5">Mins</div>
            </div>
            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3">
              <div className="text-2xl font-semibold font-mono text-[#8b7355]">{timeLeft.seconds}</div>
              <div className="text-[10px] uppercase font-mono text-[#888] mt-0.5">Secs</div>
            </div>
          </div>

          {/* Syllabus Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-[#f0eee5]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#888] uppercase">Syllabus Completion</span>
              <span className="font-semibold text-[#8b7355] text-sm">{stats.completionPercent}%</span>
            </div>

            <div className="w-full bg-[#f0eee5] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#e6e2d3]">
              <div 
                className="bg-[#8b7355] h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.completionPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-[#888] pt-1">
              <span>{stats.masteredCount} Mastered</span>
              <span>{stats.inProgressCount} Learning</span>
              <span>{stats.notStartedCount} Pending</span>
            </div>
          </div>

          {/* Quick Metrics Footer */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f0eee5]">
            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
                <RotateCcw className="w-3.5 h-3.5 text-[#8b7355]" />
                <span>Revisions:</span>
              </div>
              <span className="font-bold font-mono text-[#333] text-sm">{stats.totalRevisions}</span>
            </div>

            <div className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
                <Award className="w-3.5 h-3.5 text-[#8b7355]" />
                <span>Avg Mock:</span>
              </div>
              <span className="font-bold font-mono text-[#333] text-sm">{stats.avgMockScore}</span>
            </div>
          </div>

        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center font-mono text-[11px] tracking-widest text-[#a09682] border-b border-[#e6e2d3] pb-2 pt-4">
          SYLLABUS TRACKER
        </div>

        {/* Filter Tabs & Search Container */}
        <div className="space-y-3">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 no-scrollbar border-b border-[#e6e2d3] pb-2">
            <button
              onClick={() => setActiveSectionId('all')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                activeSectionId === 'all'
                  ? 'bg-[#8b7355] text-white shadow-sm'
                  : 'text-[#666] hover:text-[#333] hover:bg-[#ffffff]'
              }`}
            >
              All
            </button>

            {state.sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeSectionId === sec.id
                    ? 'bg-[#8b7355] text-white shadow-sm'
                    : 'text-[#666] hover:text-[#333] hover:bg-[#ffffff]'
                }`}
              >
                {renderSectionIcon(sec.iconName, activeSectionId === sec.id)}
                <span>{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#a09682] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subtopic or formula..."
              className="w-full bg-[#ffffff] border border-[#e6e2d3] rounded-xl pl-9 pr-3 py-2 text-xs text-[#333] focus:outline-none focus:border-[#8b7355]"
            />
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-6">
          {filteredSections.map(section => {
            const sectionMastered = section.subtopics.filter(st => st.status === 'mastered').length;
            const sectionPercent = section.subtopics.length > 0 
              ? Math.round((sectionMastered / section.subtopics.length) * 100) 
              : 0;

            return (
              <div key={section.id} className="bg-[#ffffff] border border-[#e6e2d3] rounded-2xl overflow-hidden shadow-sm">
                
                {/* Section Header */}
                <div className="px-5 py-4 bg-[#fdfbf7] border-b border-[#e6e2d3] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#ffffff] border border-[#e6e2d3] rounded-lg">
                      {renderSectionIcon(section.iconName)}
                    </div>
                    <div>
                      <h2 className={`font-semibold text-base text-[#333] ${cormorant.className}`}>{section.title}</h2>
                      <p className="text-[11px] text-[#888] font-mono">
                        {sectionMastered} of {section.subtopics.length} topics ({sectionPercent}%)
                      </p>
                    </div>
                  </div>

                  <div className="w-24 bg-[#e6e2d3] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#8b7355] h-full rounded-full transition-all"
                      style={{ width: `${sectionPercent}%` }}
                    />
                  </div>
                </div>

                {/* Subtopics List */}
                <div className="divide-y divide-[#f0eee5]">
                  {section.subtopics.map(subtopic => {
                    const isNotesExpanded = expandedNotes[subtopic.id] || false;

                    return (
                      <div key={subtopic.id} className="px-5 py-3 hover:bg-[#fdfbf7] transition">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left: Name & Notes Tag */}
                          <div className="space-y-1">
                            <span className="text-xs font-normal text-[#333] block leading-relaxed">
                              {subtopic.name}
                            </span>

                            {subtopic.notes && (
                              <span className="inline-block px-1.5 py-0.5 text-[9px] font-mono bg-[#f0eee5] text-[#8b7355] border border-[#e6e2d3] rounded">
                                Has Notes
                              </span>
                            )}
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                            
                            {/* Status Buttons */}
                            <div className="flex items-center bg-[#faf9f5] border border-[#e6e2d3] rounded-lg p-0.5 text-[11px] font-mono">
                              <button
                                onClick={() => updateSubtopicStatus(section.id, subtopic.id, 'not-started')}
                                className={`px-2 py-0.5 rounded transition ${
                                  subtopic.status === 'not-started'
                                    ? 'bg-[#fff5f5] text-[#c53030] border border-[#fed7d7] font-semibold'
                                    : 'text-[#888] hover:text-[#333]'
                                }`}
                              >
                                Pending
                              </button>

                              <button
                                onClick={() => updateSubtopicStatus(section.id, subtopic.id, 'in-progress')}
                                className={`px-2 py-0.5 rounded transition ${
                                  subtopic.status === 'in-progress'
                                    ? 'bg-[#fffaf0] text-[#c05621] border border-[#feebc8] font-semibold'
                                    : 'text-[#888] hover:text-[#333]'
                                }`}
                              >
                                Learning
                              </button>

                              <button
                                onClick={() => updateSubtopicStatus(section.id, subtopic.id, 'mastered')}
                                className={`px-2 py-0.5 rounded transition ${
                                  subtopic.status === 'mastered'
                                    ? 'bg-[#f0fff4] text-[#276749] border border-[#c6f6d5] font-semibold'
                                    : 'text-[#888] hover:text-[#333]'
                                }`}
                              >
                                Mastered
                              </button>
                            </div>

                            {/* Revision Counter */}
                            <div className="flex items-center bg-[#faf9f5] border border-[#e6e2d3] rounded-lg px-1.5 py-0.5 text-[11px] font-mono gap-1 text-[#333]">
                              <span className="text-[#888] text-[9px] uppercase">R:</span>
                              <button 
                                onClick={() => updateSubtopicRevisions(section.id, subtopic.id, -1)}
                                className="w-4 h-4 flex items-center justify-center hover:bg-[#e6e2d3] rounded text-[#666]"
                              >
                                -
                              </button>
                              <span className="font-bold text-[#333] min-w-[10px] text-center">{subtopic.revisions}</span>
                              <button 
                                onClick={() => updateSubtopicRevisions(section.id, subtopic.id, 1)}
                                className="w-4 h-4 flex items-center justify-center hover:bg-[#e6e2d3] rounded text-[#666]"
                              >
                                +
                              </button>
                            </div>

                            {/* Notes Trigger */}
                            <button
                              onClick={() => setExpandedNotes(prev => ({ ...prev, [subtopic.id]: !isNotesExpanded }))}
                              className="p-1 text-[#888] hover:text-[#333] bg-[#faf9f5] border border-[#e6e2d3] hover:border-[#a09682] rounded-lg transition"
                              title="Notes"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Expandable Notes Area */}
                        {isNotesExpanded && (
                          <div className="mt-2.5 pt-2.5 border-t border-[#f0eee5]">
                            <textarea
                              value={subtopic.notes || ''}
                              onChange={(e) => updateSubtopicNotes(section.id, subtopic.id, e.target.value)}
                              placeholder="Write key formulas, important theorems, or tricks..."
                              className="w-full bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-2.5 text-xs text-[#333] focus:outline-none focus:border-[#8b7355] font-mono resize-y min-h-[60px]"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center font-mono text-[11px] tracking-widest text-[#a09682] border-b border-[#e6e2d3] pb-2 pt-6">
          MOCK TEST JOURNAL
        </div>

        {/* Mock Test Journal Section */}
        <div className="bg-[#ffffff] border border-[#e6e2d3] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#e6e2d3] pb-3">
            <div>
              <h2 className={`text-base font-semibold text-[#333] flex items-center gap-2 ${cormorant.className}`}>
                <Award className="w-4 h-4 text-[#8b7355]" />
                Mock Test Journal
              </h2>
              <p className="text-[11px] text-[#888] font-mono">Track test scores & weak area analysis</p>
            </div>

            <button
              onClick={() => setShowMockForm(!showMockForm)}
              className="bg-[#8b7355] hover:bg-[#7a6448] text-white font-medium text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Mock Test</span>
            </button>
          </div>

          {/* Add Mock Test Form */}
          {showMockForm && (
            <form onSubmit={handleAddMockTest} className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-4 space-y-3">
              <h3 className="text-[11px] font-mono uppercase text-[#8b7355]">Log New Mock Test</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-mono uppercase text-[#888] mb-1">Test Title</label>
                  <input
                    type="text"
                    required
                    value={newMockTest.title}
                    onChange={(e) => setNewMockTest({ ...newMockTest, title: e.target.value })}
                    placeholder="e.g. Full Length Mock 1"
                    className="w-full bg-[#ffffff] border border-[#e6e2d3] rounded-lg px-3 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#8b7355]"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase text-[#888] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newMockTest.date}
                    onChange={(e) => setNewMockTest({ ...newMockTest, date: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#e6e2d3] rounded-lg px-2.5 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#8b7355]"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase text-[#888] mb-1">Score (/100)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newMockTest.score}
                    onChange={(e) => setNewMockTest({ ...newMockTest, score: e.target.value })}
                    placeholder="e.g. 68.5"
                    className="w-full bg-[#ffffff] border border-[#e6e2d3] rounded-lg px-3 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#8b7355]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono uppercase text-[#888] mb-1">Weak Topics & Analysis</label>
                <input
                  type="text"
                  value={newMockTest.notes}
                  onChange={(e) => setNewMockTest({ ...newMockTest, notes: e.target.value })}
                  placeholder="e.g. Silly mistakes in Linear Algebra Eigenvalues"
                  className="w-full bg-[#ffffff] border border-[#e6e2d3] rounded-lg px-3 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#8b7355] font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowMockForm(false)}
                  className="px-3 py-1 text-xs text-[#888] hover:text-[#333]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8b7355] hover:bg-[#7a6448] text-white text-xs px-3.5 py-1 rounded-lg transition"
                >
                  Save Entry
                </button>
              </div>
            </form>
          )}

          {/* Mock Test Entries List */}
          {state.mockTests.length === 0 ? (
            <div className="text-center py-6 text-[#888] text-xs font-mono">
              No mock tests logged yet. Click "Log Mock Test" to start tracking.
            </div>
          ) : (
            <div className="space-y-2">
              {state.mockTests.map(mock => (
                <div key={mock.id} className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-3 flex items-center justify-between flex-wrap gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-[#333]">{mock.title}</h4>
                      <span className="text-[9px] font-mono text-[#888] bg-[#ffffff] px-1.5 py-0.5 rounded border border-[#e6e2d3]">
                        {mock.date}
                      </span>
                    </div>
                    {mock.notes && (
                      <p className="text-[11px] text-[#666] font-mono">{mock.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold font-mono text-[#8b7355]">
                        {mock.score} <span className="text-[10px] text-[#888]">/ 100</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteMockTest(mock.id)}
                      className="p-1 text-[#a09682] hover:text-[#c53030] transition"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center font-mono text-[11px] tracking-widest text-[#a09682] border-b border-[#e6e2d3] pb-2 pt-6">
          VISITOR INBOX ({state.messages?.length || 0})
        </div>

        {/* Visitor Messages Section */}
        <div className="bg-[#ffffff] border border-[#e6e2d3] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e6e2d3] pb-3">
            <div>
              <h2 className={`text-base font-semibold text-[#333] flex items-center gap-2 ${cormorant.className}`}>
                <Mail className="w-4 h-4 text-[#8b7355]" />
                Visitor Messages
              </h2>
              <p className="text-[11px] text-[#888] font-mono">Messages left by portfolio visitors</p>
            </div>
            <span className="text-xs font-mono text-[#8b7355] bg-[#faf9f5] px-2.5 py-1 rounded-full border border-[#e6e2d3]">
              {state.messages?.length || 0} received
            </span>
          </div>

          {(!state.messages || state.messages.length === 0) ? (
            <div className="text-center py-6 text-[#888] text-xs font-mono">
              No visitor messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {state.messages.map(msg => (
                <div key={msg.id} className="bg-[#faf9f5] border border-[#e6e2d3] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#333] font-mono">{msg.senderName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#888] font-mono">
                        {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1 text-[#a09682] hover:text-[#c53030] transition"
                        title="Delete Message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#444] font-mono leading-relaxed bg-[#ffffff] border border-[#e6e2d3] p-2.5 rounded-lg whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
