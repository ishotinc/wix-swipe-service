import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/kv';
import { GetResultResponse } from '@/types';

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

    // Check if job is completed
    if (jobData.status !== 'completed') {
      return NextResponse.json(
        { 
          error: 'Job is not completed yet',
          status: jobData.status,
          progress: jobData.progress 
        },
        { status: 202 } // 202 Accepted - processing not complete
      );
    }

    // Check if result exists
    if (!jobData.result) {
      return NextResponse.json(
        { error: 'No result available for this job' },
        { status: 500 }
      );
    }

    // Return the result
    const response: GetResultResponse = {
      code: jobData.result.html,
      templateName: jobData.result.templateName,
      variables: jobData.result.variables,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error getting job result:', error);
    return NextResponse.json(
      { error: 'Failed to get job result' },
      { status: 500 }
    );
  }
}