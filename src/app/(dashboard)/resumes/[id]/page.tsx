'use client';

import { exportToPDF } from '@/lib/utils/pdf-export';

export default function ResumePreview({ params }: { params: { id: string } }) {
  const resume = /* fetch from Mongo or props */ "Tailored resume text...";

  return (
    <main className="glass min-h-screen p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume #{params.id}</h1>
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