"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star } from "lucide-react";
import Image from "next/image";
import { CourseDetailModal, type Course } from "./course-detail-modal";

// Sample courses data - in a real app, this would come from an API
const coursesData = {
  "Web Development": [
    {
      id: 1,
      title: "Modern React with NextJS",
      instructor: "Priya Sharma",
      rating: 4.8,
      students: 12453,
      image: "https://placehold.co/400x250.png?text=React+Course",
      price: "Free",
      level: "Intermediate",
      tags: ["React", "NextJS", "Frontend"]
    },
    {
      id: 2,
      title: "Full Stack JavaScript Bootcamp",
      instructor: "Vikram Patel",
      rating: 4.9,
      students: 8765,
      image: "https://placehold.co/400x250.png?text=JS+Bootcamp",
      price: "₹4,249",
      level: "Advanced",
      tags: ["JavaScript", "Node.js", "MongoDB"]
    },
    {
      id: 3,
      title: "CSS Animations Masterclass",
      instructor: "Ananya Gupta",
      rating: 4.7,
      students: 5432,
      image: "https://placehold.co/400x250.png?text=CSS+Animations",
      price: "₹2,549",
      level: "Beginner",
      tags: ["CSS", "Animations", "UI/UX"]
    },
    {
      id: 4,
      title: "TypeScript for Professionals",
      instructor: "Arjun Malhotra",
      rating: 4.9,
      students: 6789,
      image: "https://placehold.co/400x250.png?text=TypeScript",
      price: "₹3,399",
      level: "Advanced",
      tags: ["TypeScript", "JavaScript", "Frontend"]
    }
  ],
  "Design": [
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      instructor: "Meera Reddy",
      rating: 4.8,
      students: 9876,
      image: "https://placehold.co/400x250.png?text=UI/UX+Design",
      price: "₹5,099",
      level: "Beginner",
      tags: ["UI", "UX", "Design Thinking"]
    },
    {
      id: 6,
      title: "Adobe Photoshop Masterclass",
      instructor: "Rajesh Kapoor",
      rating: 4.7,
      students: 12345,
      image: "https://placehold.co/400x250.png?text=Photoshop",
      price: "₹4,249",
      level: "Intermediate",
      tags: ["Photoshop", "Graphic Design"]
    },
    {
      id: 7,
      title: "Figma for Teams",
      instructor: "Nisha Verma",
      rating: 4.9,
      students: 7654,
      image: "https://placehold.co/400x250.png?text=Figma",
      price: "Free",
      level: "All Levels",
      tags: ["Figma", "Collaboration", "Prototyping"]
    }
  ],
  "Marketing": [
    {
      id: 8,
      title: "Digital Marketing Strategy",
      instructor: "Aditya Singh",
      rating: 4.8,
      students: 8765,
      image: "https://placehold.co/400x250.png?text=Digital+Marketing",
      price: "₹5,949",
      level: "Intermediate",
      tags: ["Digital Marketing", "Strategy", "SEO"]
    },
    {
      id: 9,
      title: "Social Media Marketing",
      instructor: "Divya Joshi",
      rating: 4.7,
      students: 6543,
      image: "https://placehold.co/400x250.png?text=Social+Media",
      price: "₹3,399",
      level: "Beginner",
      tags: ["Social Media", "Content Strategy"]
    }
  ],
  "Data Science": [
    {
      id: 10,
      title: "Python for Data Analysis",
      instructor: "Dr. Ajay Mehta",
      rating: 4.9,
      students: 10987,
      image: "https://placehold.co/400x250.png?text=Python+Data",
      price: "₹4,249",
      level: "Intermediate",
      tags: ["Python", "Data Analysis", "Pandas"]
    },
    {
      id: 11,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Lakshmi Iyer",
      rating: 4.8,
      students: 8765,
      image: "https://placehold.co/400x250.png?text=ML+Fundamentals",
      price: "₹6,799",
      level: "Advanced",
      tags: ["Machine Learning", "AI", "Python"]
    },
    {
      id: 12,
      title: "Data Visualization with D3.js",
      instructor: "Rohit Agarwal",
      rating: 4.7,
      students: 5432,
      image: "https://placehold.co/400x250.png?text=D3.js",
      price: "₹5,099",
      level: "Intermediate",
      tags: ["D3.js", "Visualization", "JavaScript"]
    }
  ]
};

const skills = Object.keys(coursesData);

export function CourseRecommendations() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
  };
  
  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  
  const courses = coursesData[selectedSkill as keyof typeof coursesData] || [];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Button
            key={skill}
            variant={selectedSkill === skill ? "default" : "outline"}
            size="sm"
            onClick={() => handleSkillChange(skill)}
            className={selectedSkill === skill ? "bg-accent text-accent-foreground" : ""}
          >
            {skill}
          </Button>
        ))}
      </div>
      
      <div className="overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '500px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden group">
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {course.price}
                </div>
              </div>
              
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-varela-round line-clamp-1">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </CardHeader>
              
              <CardContent className="p-4 pt-0 pb-2">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">({course.students.toLocaleString()} students)</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="outline" className="bg-accent/10 text-accent">{course.level}</Badge>
                  {course.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleViewCourse(course as Course)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
