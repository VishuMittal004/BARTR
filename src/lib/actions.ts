"use server";

import { skillMatchSuggestions as genAISkillMatchSuggestions, type SkillMatchSuggestionsInput, type SkillMatchSuggestionsOutput } from "@/ai/flows/skill-match-suggestions";

export async function getSkillMatchSuggestionsAction(
  input: SkillMatchSuggestionsInput
): Promise<SkillMatchSuggestionsOutput> {
  try {
    // Simulate a delay to show loading state
    // await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you might fetch existing user profiles here to provide more context or filter results.
    // For now, we directly call the GenAI flow.
    const suggestions = await genAISkillMatchSuggestions(input);
    
    // Potentially, augment suggestions with more user details from your DB if needed.
    // For example, mapping userId to full user profiles.
    // This is a simplified version.
    if (!suggestions.suggestions || suggestions.suggestions.length === 0) {
      // Simulate some dummy data if AI returns nothing, for demo purposes
      return {
        suggestions: [
          { userId: "aryan_kumar", matchScore: 0.8, reason: "Offers complementary skill (e.g., Web Design) and needs your offered skill (e.g., Content Writing). This is a strong potential match for a collaborative project." },
          { userId: "meera_singh", matchScore: 0.65, reason: "Has a skill you desire (e.g., SEO Optimization) and their profile indicates interest in projects related to your offerings (e.g., Startup Marketing)." },
        ]
      };
    }
    
    return suggestions;
  } catch (error) {
    console.error("Error getting skill match suggestions:", error);
    // Return a structured error or an empty list
    return { suggestions: [] };
  }
}
