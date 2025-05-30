"use client";

import { SkillMatcher } from "@/components/ai/skill-matcher";

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Find Your Barter Partner</h1>
      <p className="text-muted-foreground">Discover users who offer skills you need and want skills you offer.</p>
      
      <div className="space-y-6">
        {/* Using the SkillMatcher component from the dashboard */}
        <SkillMatcher />
      </div>
    </div>
  );
}
