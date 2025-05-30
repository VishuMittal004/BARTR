"use client";

import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/types";
import Image from "next/image";
import { PlusCircle, Trash2, UserCircle, Edit3 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().max(500, "Bio must be 500 characters or less.").optional(),
  location: z.string().optional(),
  avatarUrl: z.string().url("Invalid URL for avatar.").optional().or(z.literal("")),
  skillsOffered: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty.") })).min(1, "At least one offered skill is required."),
  skillsWanted: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty.") })).min(1, "At least one wanted skill is required."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: UserProfile; // For editing existing profile
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          skillsOffered: initialData.skillsOffered.map(s => ({ value: s })),
          skillsWanted: initialData.skillsWanted.map(s => ({ value: s })),
        }
      : {
          name: "",
          bio: "",
          location: "",
          avatarUrl: "",
          skillsOffered: [{ value: "" }],
          skillsWanted: [{ value: "" }],
        },
  });

  const { fields: offeredFields, append: appendOffered, remove: removeOffered } = useFieldArray({
    control: form.control,
    name: "skillsOffered",
  });

  const { fields: wantedFields, append: appendWanted, remove: removeWanted } = useFieldArray({
    control: form.control,
    name: "skillsWanted",
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Profile data submitted:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Edit3 className="h-7 w-7 text-primary" />
          {initialData ? "Edit Your Profile" : "Create Your Profile"}
        </CardTitle>
        <CardDescription>
          Let others know what you can do and what you're looking for.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {form.watch("avatarUrl") ? (
                <Image
                  src={form.watch("avatarUrl")!}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full object-cover h-24 w-24 border-2 border-primary shadow-md"
                  data-ai-hint="profile picture"
                />
              ) : (
                <UserCircle className="h-24 w-24 text-muted-foreground" />
              )}
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Priya Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio / About You</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a bit about yourself and your interests..." {...field} rows={4} />
                  </FormControl>
                  <FormDescription>Max 500 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bangalore, India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Skills You Offer</FormLabel>
              {offeredFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`skillsOffered.${index}.value`}
                  render={({ field: itemField }) => (
                    <FormItem className="flex items-center gap-2 mt-2">
                      <FormControl>
                        <Input placeholder="e.g., Web Development" {...itemField} />
                      </FormControl>
                      {offeredFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeOffered(index)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendOffered({ value: "" })} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Offered Skill
              </Button>
            </div>

            <div>
              <FormLabel>Skills You Want</FormLabel>
              {wantedFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`skillsWanted.${index}.value`}
                  render={({ field: itemField }) => (
                    <FormItem className="flex items-center gap-2 mt-2">
                      <FormControl>
                        <Input placeholder="e.g., Marketing Strategy" {...itemField} />
                      </FormControl>
                      {wantedFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeWanted(index)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendWanted({ value: "" })} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Wanted Skill
              </Button>
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              {form.formState.isSubmitting ? "Saving..." : (initialData ? "Save Changes" : "Create Profile")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
