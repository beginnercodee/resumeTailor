'use client'

import { useEffect, useState } from 'react'

interface Resume {
  _id: string
  createdAt: string
  tailoredResume: string
  skillsMatchScore: number
}

export default function HistoryPage() {
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    // TODO: fetch actual user resumes
    setResumes([
      {
        _id: 'mock-1',
        createdAt: new Date().toISOString(),
        tailoredResume: 'Full-stack engineer with 3 years…',
        skillsMatchScore: 92,
      },
    ])
  }, [])

  return (
    <main className="glass min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((r) => (
          <div key={r._id} className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
            <p className="truncate">{r.tailoredResume.substring(0, 120)}…</p>
            <p className="text-primary font-bold">Score: {r.skillsMatchScore}%</p>
            <a
              href={`/resumes/${r._id}`}
              className="mt-2 inline-block underline text-sm"
            >
              View →
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}