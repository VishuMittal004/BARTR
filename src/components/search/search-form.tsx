"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SearchIcon, Briefcase, Target } from "lucide-react";

const searchSchema = z.object({
  skillsOffered: z.string().optional(),
  skillsWanted: z.string().optional(),
  location: z.string().optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSearch: (data: SearchFormValues) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      skillsOffered: "",
      skillsWanted: "",
      location: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    onSearch(data);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <SearchIcon className="h-6 w-6 text-primary" />
          Find Your Barter Partner
        </CardTitle>
        <CardDescription>
          Search for users based on the skills they offer, skills they want, or their location. Enter skills separated by commas.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="skillsOffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Skills Offered
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Graphic Design, Copywriting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skillsWanted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    Skills Wanted
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Web Development, SEO" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mumbai, India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
