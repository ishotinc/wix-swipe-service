import { createClient } from '@vercel/kv';

// Vercel KV client initialization with Upstash Redis
export const kv = createClient({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Job status type definition
export interface JobData {
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: {
    html: string;
    templateName: string;
    variables: Record<string, string>;
  };
  error?: string;
  createdAt: number;
  updatedAt: number;
  metadata?: {
    swipeResults: any[];
    preferences: any;
  };
}

// TTL configuration (24 hours in seconds)
export const JOB_TTL = 24 * 60 * 60;

// Helper functions for job management
export async function createJob(jobId: string, metadata: any): Promise<void> {
  const jobData: JobData = {
    status: 'pending',
    progress: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    metadata,
  };
  
  await kv.set(jobId, jobData, { ex: JOB_TTL });
}

export async function updateJobStatus(
  jobId: string,
  status: JobData['status'],
  progress: number,
  result?: JobData['result'],
  error?: string
): Promise<void> {
  const job = await kv.get<JobData>(jobId);
  if (!job) return;

  const updatedJob: JobData = {
    ...job,
    status,
    progress,
    updatedAt: Date.now(),
  };

  if (result) updatedJob.result = result;
  if (error) updatedJob.error = error;

  await kv.set(jobId, updatedJob, { ex: JOB_TTL });
}

export async function getJob(jobId: string): Promise<JobData | null> {
  return await kv.get<JobData>(jobId);
}