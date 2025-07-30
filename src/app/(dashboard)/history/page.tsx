// history/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getResumes } from '@/lib/mongodb/client';

type Resume = {
  _id: string
  createdAt: string
  tailoredResume: string
  skillsMatchScore: number
}

export default async function HistoryPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
const resumes: Resume[] = user
  ? (await getResumes(user.id)).map((r) => ({
      _id: r._id.toString(),
      createdAt: r.createdAt as string,
      tailoredResume: r.tailoredResume as string,
      skillsMatchScore: r.skillsMatchScore as number,
    }))
  : []
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
              className="mt-2 underline text-sm"
            >
              View →
            </a>
          </div>
        ))}
        {resumes.length === 0 && <p>No resumes yet.</p>}
      </div>
    </main>
  );
}