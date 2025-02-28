"use client"

import ArticleForm from "@/components/article-form"
import { useAuth } from "@/components/auth/AuthContext"

// Mock data for demonstration - in a real app, you would fetch these from your API
const MOCK_CATEGORIES = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Programming" },
  { id: 3, name: "Web Development" },
  { id: 4, name: "Data Science" },
  { id: 5, name: "Design" },
]

const MOCK_TAGS = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "React" },
  { id: 3, name: "Next.js" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "TypeScript" },
  { id: 6, name: "CSS" },
  { id: 7, name: "HTML" },
  { id: 8, name: "API" },
]
type AuthTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export default function WritePage() {
  const { tokens } = useAuth() as { tokens?: AuthTokens }
  console.log("token test", tokens?.access_token)

  return <ArticleForm categories={MOCK_CATEGORIES} tags={MOCK_TAGS} token={tokens?.access_token || ""} />
}
