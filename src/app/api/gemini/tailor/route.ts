import { tailorResume } from '@/lib/gemini/client';
import { saveResume } from '@/lib/mongodb/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();
    const payload = await tailorResume(resumeText, jobDescription);

    // Persist to MongoDB (remove 'anonymous-user' once auth is wired)
    await saveResume('anonymous-user', payload);

    return NextResponse.json(payload);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}