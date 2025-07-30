'use client';
import { use, useEffect, useState } from 'react';
import { exportToPDF } from '@/lib/utils/pdf-export';

export default function ResumePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);          // React 19 `use` hook
  const [resume, setResume] = useState('');

  useEffect(() => {
    fetch(`/api/resumes/${id}`)
      .then(r => r.text())
      .then(setResume);
  }, [id]);

  return (
    <main className="glass min-h-screen p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume #{id}</h1>
        <button
          onClick={() => exportToPDF(resume)}
          className="btn gradient-border px-4 py-2"
        >
          📥 Download PDF
        </button>
      </div>
      <pre className="bg-white text-black p-6 rounded-lg whitespace-pre-wrap">
        {resume}
      </pre>
    </main>
  );
}