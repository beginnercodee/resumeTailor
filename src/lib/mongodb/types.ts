// src/lib/mongodb/types.ts  (create this file if it doesn’t exist)
export interface Resume {
  _id: string;
  createdAt: string;          // ISO string
  tailoredResume: string;
  skillsMatchScore: number;
}