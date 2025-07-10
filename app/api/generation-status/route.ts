import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/kv';
import { GenerationStatusResponse } from '@/types';

// Enable Edge Runtime
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    // Get job ID from query parameters
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    // Validate job ID
    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Validate job ID format
    if (!jobId.startsWith('job_')) {
      return NextResponse.json(
        { error: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    // Get job data from KV store
    const jobData = await getJob(jobId);

    // Check if job exists
    if (!jobData) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Return status response
    const response: GenerationStatusResponse = {
      status: jobData.status,
      progress: jobData.progress,
    };

    // Include error message if job failed
    if (jobData.status === 'error' && jobData.error) {
      response.error = jobData.error;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error checking job status:', error);
    return NextResponse.json(
      { error: 'Failed to check job status' },
      { status: 500 }
    );
  }
}