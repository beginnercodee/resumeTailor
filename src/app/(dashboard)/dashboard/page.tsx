import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="glass min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to ResumeTailor
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Craft the perfect resume in minutes with AI-powered tailoring.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/resumes/new" className="btn gradient-border px-6 py-3">
            Tailor a Resume
          </Link>
          <Link href="/history" className="btn glass-hover px-6 py-3">
            View History
          </Link>
        </div>
    </main>
  )
}