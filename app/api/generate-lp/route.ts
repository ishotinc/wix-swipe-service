import { NextRequest, NextResponse } from 'next/server';
import { createJob } from '@/lib/kv';
import { GenerateLPRequest } from '@/types';

// Enable Edge Runtime for global performance
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body: GenerateLPRequest = await req.json();
    const { swipeResults, preferences } = body;

    // Validate input
    if (!swipeResults || !preferences) {
      return NextResponse.json(
        { error: 'Missing required data: swipeResults and preferences' },
        { status: 400 }
      );
    }

    // Generate unique job ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create job in KV store with initial status
    await createJob(jobId, {
      swipeResults,
      preferences,
    });

    // Trigger background processing
    // Note: In Edge Functions, we can't use traditional background processing
    // Instead, we'll process immediately in a non-blocking way
    processInBackground(jobId, swipeResults, preferences);

    // Return job ID immediately
    return NextResponse.json({
      jobId,
      status: 'accepted',
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create generation job' },
      { status: 500 }
    );
  }
}

// Background processing function
async function processInBackground(
  jobId: string,
  swipeResults: any[],
  preferences: any
) {
  try {
    // Import dynamically to avoid loading heavy dependencies at startup
    const { updateJobStatus } = await import('@/lib/kv');
    const { selectTemplate, generateTemplateVariables, assembleTemplate } = await import('@/lib/openai');

    // Update status to processing
    await updateJobStatus(jobId, 'processing', 25);

    // Select template based on preferences
    const { template, confidence } = selectTemplate(preferences);
    await updateJobStatus(jobId, 'processing', 50);

    // Generate template variables using OpenAI
    const variables = await generateTemplateVariables(template, preferences);
    await updateJobStatus(jobId, 'processing', 75);

    // Assemble final HTML
    const html = assembleTemplate(template, variables);

    // Update job with completed result
    await updateJobStatus(jobId, 'completed', 100, {
      html,
      templateName: template.name,
      variables,
    });
  } catch (error) {
    console.error('Background processing error:', error);
    
    // Update job with error status
    const { updateJobStatus } = await import('@/lib/kv');
    await updateJobStatus(
      jobId,
      'error',
      0,
      undefined,
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}