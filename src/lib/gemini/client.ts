import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function tailorResume(resumeText: string, jobDescription: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite-preview-06-17' });

  const prompt = `
You are an expert resume writer.  
Resume:
${resumeText}

Job Description:
${jobDescription}

Return **valid JSON** with:
{
  "tailoredResume": "...",
  "improvements": { "summary": "...", "experience": "...", "skills": "...", "education": "..." },
  "skillsMatchScore": 85,
  "missingKeywords": ["kw1", "kw2"],
  "atsTips": ["tip1", "tip2"]
}`;

  const result = await model.generateContent(prompt);
    const raw = await result.response.text();
  const cleaned = raw.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned);
}