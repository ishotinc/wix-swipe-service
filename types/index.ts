// ==================== Core Data Types ====================

// Image metadata type
export interface ImageMetadata {
  description: string;
  tags: string[];
}

// Landing page image data type
export interface LPImage {
  id: number;
  name: string;
  url: string;
  company: string;
  style: "minimal" | "corporate" | "creative" | "developer" | "ecommerce";
  colors: string[];
  layout: string;
  elements: string[];
  industry: "tech" | "creative" | "ecommerce" | "corporate" | "startup";
  templateInfluence: "creative" | "vibrant" | "minimal" | "professional";
  tags: string[];
  metadata: ImageMetadata;
}

// Wix site data structure
export interface WixSite {
  id: number;
  name: string;
  imageUrl: string;
  templateInfluence: "creative" | "vibrant" | "minimal" | "professional";
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  layout: 
    | "gallery-grid" 
    | "full-screen-hero" 
    | "article-stack" 
    | "one-page" 
    | "vertical-scroll" 
    | "split-screen" 
    | "product-grid" 
    | "service-showcase" 
    | "content-focused" 
    | "project-showcase";
  industry: 
    | "creative" 
    | "tech" 
    | "blog" 
    | "pre-launch" 
    | "portfolio" 
    | "corporate" 
    | "retail" 
    | "construction" 
    | "consulting" 
    | "engineering";
  elements: string[];
  metadata: {
    description: string;
    tags: string[];
  };
}

// Swipe action type
export interface SwipeAction {
  imageId: number;
  action: "like" | "dislike";
  timestamp: number;
  style: string;
  colors: string[];
  layout: string;
  elements: string[];
}

// User preferences type
export interface UserPreferences {
  styles: string[];
  colors: string[];
  layouts: string[];
  elements: string[];
  likedImages: LPImage[];
  dislikedImages: LPImage[];
  templateInfluence: "creative" | "vibrant" | "minimal" | "professional";
}

// Generated result type
export interface GeneratedResult {
  status: "pending" | "generating" | "completed" | "error";
  progress?: number;
  code?: string;
  templateName?: string;
  variables?: Record<string, string>;
  error?: string;
}

// Job status type
export interface JobStatus {
  jobId: string;
  status: GeneratedResult["status"];
  createdAt: Date;
  completedAt?: Date;
  progress: number;
  metadata?: {
    swipeResults: SwipeAction[];
    preferences: UserPreferences;
  };
}

// ==================== Store Types ====================

// Swipe store interface
export interface SwipeStore {
  imageUrls: WixSite[];
  currentIndex: number;
  history: SwipeAction[];
  preferences: UserPreferences | null;
  swipeRight: () => void;
  swipeLeft: () => void;
  resetSwipe: () => void;
  isComplete: () => boolean;
  updatePreferences: () => void;
  finalizePreferences?: () => void;
}

// Result store interface
export interface ResultStore {
  generatedCode: string | null;
  status: "idle" | "generating" | "completed" | "error";
  error: string | null;
  jobId: string | null;
  progress: number;
  templateName: string | null;
  setJobId: (jobId: string) => void;
  setStatus: (status: ResultStore["status"]) => void;
  setProgress: (progress: number) => void;
  setResult: (code: string, templateName: string) => void;
  setError: (error: string) => void;
  reset: () => void;
}

// Preference store interface
export interface PreferenceStore {
  settings: {
    animationSpeed: number;
    soundEnabled: boolean;
    autoGenerate: boolean;
  };
  theme: "light" | "dark";
  language: "en" | "ja";
  updateSettings: (settings: Partial<PreferenceStore["settings"]>) => void;
  setTheme: (theme: PreferenceStore["theme"]) => void;
  setLanguage: (language: PreferenceStore["language"]) => void;
}

// ==================== API Types ====================

// Generate LP request body
export interface GenerateLPRequest {
  swipeResults: SwipeAction[];
  preferences: UserPreferences;
}

// Generate LP response
export interface GenerateLPResponse {
  jobId: string;
  status: "accepted";
}

// Generation status response
export interface GenerationStatusResponse {
  status: GeneratedResult["status"];
  progress: number;
  error?: string;
}

// Get result response
export interface GetResultResponse {
  code: string;
  templateName: string;
  variables: Record<string, string>;
}

// ==================== Template Types ====================

// Template definition
export interface Template {
  id: string;
  name: string;
  style: "minimal" | "corporate" | "creative" | "developer" | "ecommerce";
  variables: string[];
  html: string;
  css: string;
  js?: string;
}

// Template variable
export interface TemplateVariable {
  key: string;
  value: string;
  type: "text" | "color" | "image" | "url";
}

// ==================== Utility Types ====================

// API error response
export interface APIError {
  error: string;
  code: string;
  message: string;
}

// Pagination parameters
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

// Sort parameters
export interface SortParams {
  field: string;
  order: "asc" | "desc";
}