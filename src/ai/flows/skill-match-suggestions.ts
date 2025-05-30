'use server';

/**
 * @fileOverview AI-powered skill match suggestions flow.
 *
 * - skillMatchSuggestions - A function that provides barter match suggestions based on user skills.
 * - SkillMatchSuggestionsInput - The input type for the skillMatchSuggestions function.
 * - SkillMatchSuggestionsOutput - The return type for the skillMatchSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchSuggestionsInputSchema = z.object({
  offeredSkills: z.array(z.string()).describe('List of skills the user offers.'),
  desiredSkills: z.array(z.string()).describe('List of skills the user wants.'),
  userProfileDescription: z
    .string()
    .optional()
    .describe('Optional user profile description for context.'),
});
export type SkillMatchSuggestionsInput = z.infer<
  typeof SkillMatchSuggestionsInputSchema
>;

const SkillMatchSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        userId: z.string().describe('The ID of the suggested user.'),
        matchScore: z.number().describe('A score indicating the strength of the match.'),
        reason: z.string().describe('Reasoning behind the skill match suggestion.'),
      })
    )
    .describe('List of suggested user matches.'),
});
export type SkillMatchSuggestionsOutput = z.infer<
  typeof SkillMatchSuggestionsOutputSchema
>;

export async function skillMatchSuggestions(
  input: SkillMatchSuggestionsInput
): Promise<SkillMatchSuggestionsOutput> {
  return skillMatchSuggestionsFlow(input);
}

const skillMatchSuggestionsPrompt = ai.definePrompt({
  name: 'skillMatchSuggestionsPrompt',
  input: {schema: SkillMatchSuggestionsInputSchema},
  output: {schema: SkillMatchSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide barter match suggestions based on user skills.

  Given a user's offered skills, desired skills, and profile description, suggest potential barter matches with other users.

  Consider the relevance and complementarity of skills when making suggestions.  Provide a match score (0-1) indicating the strength of the match and reasoning behind each suggestion.

  Offered Skills: {{offeredSkills}}
  Desired Skills: {{desiredSkills}}
  Profile Description: {{userProfileDescription}}

  Format your output as a JSON object matching the following schema:
  ${JSON.stringify(SkillMatchSuggestionsOutputSchema.shape, null, 2)}`,
});

const skillMatchSuggestionsFlow = ai.defineFlow(
  {
    name: 'skillMatchSuggestionsFlow',
    inputSchema: SkillMatchSuggestionsInputSchema,
    outputSchema: SkillMatchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await skillMatchSuggestionsPrompt(input);
    return output!;
  }
);
