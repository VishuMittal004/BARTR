"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Clock, 
  Users, 
  BarChart, 
  CheckCircle2, 
  Star, 
  Calendar,
  GraduationCap,
  Share2
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  price: string;
  level: string;
  tags: string[];
  description?: string;
  duration?: string;
  chapters?: number;
  prerequisites?: string[];
  learningOutcomes?: string[];
  lastUpdated?: string;
}

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  const [enrolling, setEnrolling] = useState(false);

  if (!course) {
    return null;
  }
  
  // Default values for missing course information
  const description = course.description || 
    "This comprehensive course will take you through all the essential concepts and practical applications. Perfect for anyone looking to enhance their skills in this area.";
  
  const duration = course.duration || `${Math.floor(Math.random() * 10) + 5} hours`;
  const chapters = course.chapters || Math.floor(Math.random() * 15) + 8;
  const prerequisites = course.prerequisites || ["Basic understanding of the field", "Familiarity with core concepts"];
  const learningOutcomes = course.learningOutcomes || [
    "Master foundational principles and advanced techniques",
    "Build real-world projects for your portfolio",
    "Solve complex problems with industry-standard approaches",
    "Apply your knowledge in practical business scenarios"
  ];
  const lastUpdated = course.lastUpdated || new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toLocaleDateString(); // Last 90 days

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      setEnrolling(false);
      onClose();
      // Show success notification
      alert("Successfully enrolled in the course!");
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] p-0 overflow-hidden">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <Badge className="mb-2 bg-accent text-accent-foreground">{course.price}</Badge>
            <h2 className="text-2xl font-bold text-white drop-shadow-md">{course.title}</h2>
          </div>
        </div>
        
        <ScrollArea className="max-h-[calc(85vh-13rem)] px-6 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground text-sm ml-1">({course.students.toLocaleString()} students)</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{duration}</span>
            </div>
            
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{course.level}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">Updated {lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-secondary/50">{tag}</Badge>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About This Course</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Course Structure</h3>
                <div className="bg-card p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Chapters</span>
                    <span className="text-sm font-medium">{chapters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                <ul className="space-y-1">
                  {prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-0.5" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
              <ul className="space-y-2">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="p-6 pt-4 border-t">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleEnroll}
              disabled={enrolling}
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
