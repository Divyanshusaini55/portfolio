import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';
import { DEFAULT_INITIAL_STATE, GateTrackerState, VisitorMessage } from '@/lib/gate-data';

const GET_TARGET_PIN = () => process.env.GATE_TRACKER_PIN;

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'gate-tracker-data.json');

// In-memory fallback
let inMemoryState: GateTrackerState | null = null;

async function getStoredState(): Promise<GateTrackerState> {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await sql`
        CREATE TABLE IF NOT EXISTS gate_tracker_state (
          id VARCHAR PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      const rows = await sql`SELECT data FROM gate_tracker_state WHERE id = 'master_state' LIMIT 1;`;
      if (rows.length > 0 && rows[0].data) {
        return rows[0].data as GateTrackerState;
      }
    } catch (err) {
      console.warn('Neon DB read error, falling back to file system:', err);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent) as GateTrackerState;
  } catch {
    return inMemoryState || DEFAULT_INITIAL_STATE;
  }
}

async function saveStoredState(state: GateTrackerState): Promise<boolean> {
  inMemoryState = state;

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await sql`
        CREATE TABLE IF NOT EXISTS gate_tracker_state (
          id VARCHAR PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      await sql`
        INSERT INTO gate_tracker_state (id, data, updated_at)
        VALUES ('master_state', ${JSON.stringify(state)}, NOW())
        ON CONFLICT (id) 
        DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at;
      `;
      return true;
    } catch (err) {
      console.warn('Neon DB write error, falling back to file system:', err);
    }
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.warn('Could not write to local file system:', error);
    return true;
  }
}

function verifyPin(req: NextRequest): boolean {
  const pinHeader = req.headers.get('x-gate-pin');
  const targetPin = GET_TARGET_PIN();
  if (!targetPin) return false;
  return pinHeader === targetPin;
}

export async function GET(req: NextRequest) {
  if (!verifyPin(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid PIN' }, { status: 401 });
  }

  const state = await getStoredState();
  return NextResponse.json({ success: true, data: state });
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    const body = await req.json();

    // Verify PIN Action
    if (action === 'verify-pin') {
      const { pin } = body;
      const targetPin = GET_TARGET_PIN();
      if (targetPin && pin === targetPin) {
        return NextResponse.json({ success: true, message: 'PIN Verified' });
      }
      return NextResponse.json({ success: false, error: 'Incorrect PIN' }, { status: 401 });
    }

    // Send Public Message Action (Unauthenticated visitors)
    if (action === 'send-public-message') {
      const { senderName, content } = body;
      if (!content || typeof content !== 'string' || !content.trim()) {
        return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
      }

      const currentState = await getStoredState();
      const newMessage: VisitorMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        senderName: senderName?.trim() || 'Anonymous Visitor',
        content: content.trim(),
        createdAt: new Date().toISOString(),
        isRead: false
      };

      const updatedState: GateTrackerState = {
        ...currentState,
        messages: [newMessage, ...(currentState.messages || [])],
        lastUpdated: new Date().toISOString()
      };

      await saveStoredState(updatedState);
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    // Save Data Action
    if (!verifyPin(req)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid PIN' }, { status: 401 });
    }

    const { state } = body;
    if (!state || !Array.isArray(state.sections)) {
      return NextResponse.json({ error: 'Invalid state payload' }, { status: 400 });
    }

    const updatedState: GateTrackerState = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };

    await saveStoredState(updatedState);
    return NextResponse.json({ success: true, data: updatedState });
  } catch (error) {
    return NextResponse.json({ error: 'Server error processing request' }, { status: 500 });
  }
}
