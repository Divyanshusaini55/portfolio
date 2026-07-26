export type SubtopicStatus = 'not-started' | 'in-progress' | 'mastered';

export interface Subtopic {
  id: string;
  name: string;
  status: SubtopicStatus;
  revisions: number;
  notes?: string;
}

export interface Section {
  id: string;
  title: string;
  iconName: string;
  subtopics: Subtopic[];
}

export interface MockTest {
  id: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  targetScore: number;
  notes?: string;
}

export interface VisitorMessage {
  id: string;
  senderName: string;
  content: string;
  createdAt: string;
  isRead?: boolean;
}

export interface GateTrackerState {
  sections: Section[];
  mockTests: MockTest[];
  messages: VisitorMessage[];
  targetYear: number;
  lastUpdated: string;
}

export const INITIAL_GATE_DA_SYLLABUS: Section[] = [
  {
    id: 'probability-stats',
    title: 'Probability and Statistics',
    iconName: 'Calculator',
    subtopics: [
      { id: 'ps-1', name: 'Counting (Permutation and Combinations)', status: 'not-started', revisions: 0 },
      { id: 'ps-2', name: 'Probability Axioms, Sample Space, & Events (Independent & Mutually Exclusive)', status: 'not-started', revisions: 0 },
      { id: 'ps-3', name: 'Marginal, Conditional, & Joint Probability', status: 'not-started', revisions: 0 },
      { id: 'ps-4', name: 'Bayes Theorem', status: 'not-started', revisions: 0 },
      { id: 'ps-5', name: 'Conditional Expectation & Variance', status: 'not-started', revisions: 0 },
      { id: 'ps-6', name: 'Mean, Median, Mode, Standard Deviation, Correlation, & Covariance', status: 'not-started', revisions: 0 },
      { id: 'ps-7', name: 'Random Variables: Discrete & PMF', status: 'not-started', revisions: 0 },
      { id: 'ps-8', name: 'Discrete Distributions: Uniform, Bernoulli, Binomial', status: 'not-started', revisions: 0 },
      { id: 'ps-9', name: 'Random Variables: Continuous & PDF', status: 'not-started', revisions: 0 },
      { id: 'ps-10', name: 'Continuous Distributions: Uniform, Exponential, Poisson, Normal, Standard Normal, t-distribution, Chi-squared', status: 'not-started', revisions: 0 },
      { id: 'ps-11', name: 'Cumulative Distribution Function (CDF) & Conditional PDF', status: 'not-started', revisions: 0 },
      { id: 'ps-12', name: 'Central Limit Theorem', status: 'not-started', revisions: 0 },
      { id: 'ps-13', name: 'Confidence Intervals & Hypothesis Testing (z-test, t-test, Chi-squared test)', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    iconName: 'Binary',
    subtopics: [
      { id: 'la-1', name: 'Vector Space, Subspaces, & Linear Dependence/Independence of Vectors', status: 'not-started', revisions: 0 },
      { id: 'la-2', name: 'Matrices, Projection Matrix, Orthogonal Matrix, Idempotent Matrix, & Partition Matrix', status: 'not-started', revisions: 0 },
      { id: 'la-3', name: 'Quadratic Forms & Properties', status: 'not-started', revisions: 0 },
      { id: 'la-4', name: 'Systems of Linear Equations & Solutions (Gaussian Elimination)', status: 'not-started', revisions: 0 },
      { id: 'la-5', name: 'Eigenvalues & Eigenvectors', status: 'not-started', revisions: 0 },
      { id: 'la-6', name: 'Determinant, Rank, Nullity, & Projections', status: 'not-started', revisions: 0 },
      { id: 'la-7', name: 'LU Decomposition', status: 'not-started', revisions: 0 },
      { id: 'la-8', name: 'Singular Value Decomposition (SVD)', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'calculus-optimization',
    title: 'Calculus and Optimization',
    iconName: 'TrendingUp',
    subtopics: [
      { id: 'co-1', name: 'Functions of a Single Variable: Limit, Continuity, & Differentiability', status: 'not-started', revisions: 0 },
      { id: 'co-2', name: 'Taylor Series Expansion', status: 'not-started', revisions: 0 },
      { id: 'co-3', name: 'Maxima and Minima', status: 'not-started', revisions: 0 },
      { id: 'co-4', name: 'Optimization Involving a Single Variable', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'programming-dsa',
    title: 'Programming, Data Structures & Algorithms',
    iconName: 'Code',
    subtopics: [
      { id: 'pdsa-1', name: 'Programming in Python', status: 'not-started', revisions: 0 },
      { id: 'pdsa-2', name: 'Basic Data Structures: Stacks, Queues, Linked Lists, Trees', status: 'not-started', revisions: 0 },
      { id: 'pdsa-3', name: 'Hash Tables & Hashing Concepts', status: 'not-started', revisions: 0 },
      { id: 'pdsa-4', name: 'Search Algorithms: Linear Search & Binary Search', status: 'not-started', revisions: 0 },
      { id: 'pdsa-5', name: 'Basic Sorting Algorithms: Selection Sort, Bubble Sort, Insertion Sort', status: 'not-started', revisions: 0 },
      { id: 'pdsa-6', name: 'Divide & Conquer: Mergesort & Quicksort', status: 'not-started', revisions: 0 },
      { id: 'pdsa-7', name: 'Introduction to Graph Theory & Graph Algorithms (Traversals & Shortest Path)', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management & Warehousing',
    iconName: 'Database',
    subtopics: [
      { id: 'dbms-1', name: 'ER-Model & Relational Model (Relational Algebra, Tuple Calculus)', status: 'not-started', revisions: 0 },
      { id: 'dbms-2', name: 'SQL Queries & Integrity Constraints', status: 'not-started', revisions: 0 },
      { id: 'dbms-3', name: 'Normal Forms (Normalization)', status: 'not-started', revisions: 0 },
      { id: 'dbms-4', name: 'File Organization, Indexing, & Data Types', status: 'not-started', revisions: 0 },
      { id: 'dbms-5', name: 'Data Transformation: Normalization, Discretization, Sampling, Compression', status: 'not-started', revisions: 0 },
      { id: 'dbms-6', name: 'Data Warehouse Modelling: Schema for Multidimensional Data Models', status: 'not-started', revisions: 0 },
      { id: 'dbms-7', name: 'Concept Hierarchies & Measures (Categorization and Computations)', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    iconName: 'Brain',
    subtopics: [
      { id: 'ml-1', name: 'Supervised Learning: Regression & Classification Problems', status: 'not-started', revisions: 0 },
      { id: 'ml-2', name: 'Simple Linear Regression & Multiple Linear Regression', status: 'not-started', revisions: 0 },
      { id: 'ml-3', name: 'Ridge Regression & Logistic Regression', status: 'not-started', revisions: 0 },
      { id: 'ml-4', name: 'k-Nearest Neighbour (k-NN) & Naive Bayes Classifier', status: 'not-started', revisions: 0 },
      { id: 'ml-5', name: 'Linear Discriminant Analysis (LDA)', status: 'not-started', revisions: 0 },
      { id: 'ml-6', name: 'Support Vector Machine (SVM) & Decision Trees', status: 'not-started', revisions: 0 },
      { id: 'ml-7', name: 'Bias-Variance Trade-off', status: 'not-started', revisions: 0 },
      { id: 'ml-8', name: 'Cross-Validation Methods: Leave-One-Out (LOO) & k-Folds Cross-Validation', status: 'not-started', revisions: 0 },
      { id: 'ml-9', name: 'Multi-Layer Perceptron & Feed-Forward Neural Networks', status: 'not-started', revisions: 0 },
      { id: 'ml-10', name: 'Unsupervised Learning: Clustering Algorithms (k-Means & k-Medoid)', status: 'not-started', revisions: 0 },
      { id: 'ml-11', name: 'Hierarchical Clustering (Top-down, Bottom-up: Single-linkage, Multiple-linkage)', status: 'not-started', revisions: 0 },
      { id: 'ml-12', name: 'Dimensionality Reduction & Principal Component Analysis (PCA)', status: 'not-started', revisions: 0 }
    ]
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    iconName: 'Cpu',
    subtopics: [
      { id: 'ai-1', name: 'Search: Uninformed, Informed, & Adversarial Search', status: 'not-started', revisions: 0 },
      { id: 'ai-2', name: 'Logic: Propositional & Predicate (First-Order Logic)', status: 'not-started', revisions: 0 },
      { id: 'ai-3', name: 'Reasoning Under Uncertainty: Conditional Independence Representation', status: 'not-started', revisions: 0 },
      { id: 'ai-4', name: 'Exact Inference through Variable Elimination', status: 'not-started', revisions: 0 },
      { id: 'ai-5', name: 'Approximate Inference through Sampling', status: 'not-started', revisions: 0 }
    ]
  }
];

export const DEFAULT_INITIAL_STATE: GateTrackerState = {
  sections: INITIAL_GATE_DA_SYLLABUS,
  mockTests: [],
  messages: [],
  targetYear: 2027,
  lastUpdated: new Date().toISOString()
};
