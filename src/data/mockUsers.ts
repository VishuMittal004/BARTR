import { UserProfile } from '@/types';

// Array of common skills across various domains
const skillsPool = {
  design: [
    "UI/UX Design", "Graphic Design", "Logo Design", "Illustration", "Brand Identity", 
    "Animation", "3D Modeling", "Product Design", "Motion Graphics", "Typography",
    "Wireframing", "Prototyping", "User Research", "Visual Design", "Icon Design"
  ],
  development: [
    "React Development", "Node.js", "JavaScript", "TypeScript", "Python", 
    "Java", "C#", "PHP", "Ruby on Rails", "Angular", "Vue.js", "Flutter", 
    "Swift", "Kotlin", "AWS", "Docker", "DevOps", "Full Stack Development",
    "Frontend Development", "Backend Development", "Mobile App Development",
    "Database Design", "REST API Design", "GraphQL", "Django", "Laravel"
  ],
  marketing: [
    "Digital Marketing", "Content Marketing", "SEO", "SEM", "Social Media Marketing",
    "Email Marketing", "Growth Hacking", "Analytics", "PPC Advertising", 
    "Conversion Optimization", "Copywriting", "Market Research", "Brand Strategy",
    "Public Relations", "Influencer Marketing"
  ],
  business: [
    "Business Strategy", "Project Management", "Product Management", "Agile Methodology", 
    "Scrum", "Business Analysis", "Financial Planning", "Consulting", "Sales", 
    "Customer Service", "Leadership", "Entrepreneurship", "Operations Management",
    "Supply Chain Management", "Risk Management"
  ],
  content: [
    "Content Writing", "Copywriting", "Technical Writing", "Editing", "Proofreading",
    "Blog Writing", "Scriptwriting", "UX Writing", "Translation", "Creative Writing",
    "Video Production", "Podcast Production", "Photography", "Video Editing", "Storytelling"
  ],
  other: [
    "Data Analysis", "Machine Learning", "AI Development", "Blockchain", "IoT",
    "AR/VR Development", "Voice UI Design", "Game Development", "Music Production",
    "Interior Design", "Fashion Design", "Architecture", "Teaching", "Mentoring",
    "Legal Advice", "Financial Advice", "Fitness Training", "Cooking", "Tutoring"
  ]
};

// Cities in India with states
const indianLocations = [
  "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", "Hyderabad, Telangana", 
  "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Pune, Maharashtra", "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Chandigarh, Punjab", "Bhopal, Madhya Pradesh",
  "Coimbatore, Tamil Nadu", "Indore, Madhya Pradesh", "Kochi, Kerala", "Guwahati, Assam",
  "Bhubaneswar, Odisha", "Visakhapatnam, Andhra Pradesh", "Nagpur, Maharashtra", "Surat, Gujarat"
];

// First batch of 25 users with hand-crafted details
const usersPartOne: UserProfile[] = [
  {
    id: "user1",
    name: "Aditya Mehta",
    avatarUrl: "https://placehold.co/96x96.png?text=AM",
    bio: "Creative designer with 7 years of experience in UI/UX and branding. Looking for development help with my startup idea.",
    skillsOffered: ["UI/UX Design", "Brand Identity", "Illustration", "Wireframing"],
    skillsWanted: ["React Development", "Node.js", "Mobile App Development"],
    location: "Mumbai, Maharashtra"
  },
  {
    id: "user2",
    name: "Priya Sharma",
    avatarUrl: "https://placehold.co/96x96.png?text=PS",
    bio: "Digital marketing specialist with expertise in growth strategies for startups. Seeking design collaboration for my personal projects.",
    skillsOffered: ["Digital Marketing", "SEO", "Content Marketing", "Social Media Marketing"],
    skillsWanted: ["UI/UX Design", "Logo Design", "Graphic Design"],
    location: "Delhi, NCR"
  },
  {
    id: "user3",
    name: "Rajesh Kumar",
    avatarUrl: "https://placehold.co/96x96.png?text=RK",
    bio: "Full-stack developer with 5 years of experience building web applications. Looking for assistance with marketing my SaaS product.",
    skillsOffered: ["JavaScript", "React Development", "Node.js", "MongoDB"],
    skillsWanted: ["Digital Marketing", "SEO", "Content Writing"],
    location: "Bangalore, Karnataka"
  },
  {
    id: "user4",
    name: "Ananya Patel",
    avatarUrl: "https://placehold.co/96x96.png?text=AP",
    bio: "Content writer specializing in technical documentation and blog posts. Need help with website development for my portfolio.",
    skillsOffered: ["Content Writing", "Technical Writing", "Editing", "SEO Writing"],
    skillsWanted: ["Web Development", "UI/UX Design", "WordPress"],
    location: "Ahmedabad, Gujarat"
  },
  {
    id: "user5",
    name: "Vikram Singh",
    avatarUrl: "https://placehold.co/96x96.png?text=VS",
    bio: "Product manager with experience in e-commerce and fintech. Looking for design and development help for my side project.",
    skillsOffered: ["Product Management", "Business Strategy", "Agile Methodology", "Market Research"],
    skillsWanted: ["UI/UX Design", "Frontend Development", "Mobile App Development"],
    location: "Hyderabad, Telangana"
  },
  {
    id: "user6",
    name: "Neha Gupta",
    avatarUrl: "https://placehold.co/96x96.png?text=NG",
    bio: "Graphic designer specializing in brand identity and packaging design. Looking to collaborate with marketing professionals.",
    skillsOffered: ["Graphic Design", "Logo Design", "Packaging Design", "Brand Identity"],
    skillsWanted: ["Digital Marketing", "Social Media Strategy", "SEO"],
    location: "Pune, Maharashtra"
  },
  {
    id: "user7",
    name: "Karthik Rajan",
    avatarUrl: "https://placehold.co/96x96.png?text=KR",
    bio: "Mobile app developer with experience in React Native and Flutter. Looking for UI/UX design collaboration.",
    skillsOffered: ["Mobile App Development", "React Native", "Flutter", "Firebase"],
    skillsWanted: ["UI/UX Design", "Wireframing", "User Research"],
    location: "Chennai, Tamil Nadu"
  },
  {
    id: "user8",
    name: "Meera Iyer",
    avatarUrl: "https://placehold.co/96x96.png?text=MI",
    bio: "UX researcher with expertise in user testing and design thinking. Seeking help with frontend development for my UX portfolio.",
    skillsOffered: ["User Research", "UX Design", "Usability Testing", "Design Thinking"],
    skillsWanted: ["Frontend Development", "React Development", "Portfolio Website"],
    location: "Bangalore, Karnataka"
  },
  {
    id: "user9",
    name: "Arjun Nair",
    avatarUrl: "https://placehold.co/96x96.png?text=AN",
    bio: "Data scientist with focus on machine learning and AI. Looking for web development help for my data visualization project.",
    skillsOffered: ["Data Analysis", "Machine Learning", "Python", "Statistical Modeling"],
    skillsWanted: ["Web Development", "Data Visualization", "Frontend Development"],
    location: "Kochi, Kerala"
  },
  {
    id: "user10",
    name: "Shweta Desai",
    avatarUrl: "https://placehold.co/96x96.png?text=SD",
    bio: "Social media manager with experience in content creation and community building. Seeking design skills exchange.",
    skillsOffered: ["Social Media Marketing", "Content Creation", "Community Management", "Influencer Outreach"],
    skillsWanted: ["Graphic Design", "Video Editing", "Animation"],
    location: "Mumbai, Maharashtra"
  },
  {
    id: "user11",
    name: "Rahul Verma",
    avatarUrl: "https://placehold.co/96x96.png?text=RV",
    bio: "Backend developer with expertise in microservices and cloud infrastructure. Looking for UI/UX collaboration.",
    skillsOffered: ["Backend Development", "Java", "Spring Boot", "AWS", "Microservices"],
    skillsWanted: ["UI/UX Design", "Frontend Development", "React Development"],
    location: "Gurgaon, Haryana"
  },
  {
    id: "user12",
    name: "Pooja Reddy",
    avatarUrl: "https://placehold.co/96x96.png?text=PR",
    bio: "UI designer with focus on accessible and inclusive design. Seeking collaboration with frontend developers.",
    skillsOffered: ["UI Design", "Accessibility Design", "Design Systems", "Prototyping"],
    skillsWanted: ["Frontend Development", "React", "CSS Animation"],
    location: "Hyderabad, Telangana"
  },
  {
    id: "user13",
    name: "Kunal Joshi",
    avatarUrl: "https://placehold.co/96x96.png?text=KJ",
    bio: "DevOps engineer with experience in CI/CD and infrastructure automation. Looking for web design help.",
    skillsOffered: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
    skillsWanted: ["Web Design", "UI/UX Design", "Logo Design"],
    location: "Pune, Maharashtra"
  },
  {
    id: "user14",
    name: "Divya Menon",
    avatarUrl: "https://placehold.co/96x96.png?text=DM",
    bio: "Content strategist with experience in SEO and copywriting. Seeking technical guidance for my blog platform.",
    skillsOffered: ["Content Strategy", "SEO", "Copywriting", "Editorial Planning"],
    skillsWanted: ["Web Development", "WordPress", "Technical SEO"],
    location: "Delhi, NCR"
  },
  {
    id: "user15",
    name: "Amit Malhotra",
    avatarUrl: "https://placehold.co/96x96.png?text=AM",
    bio: "Startup founder with business development expertise. Looking for technical co-founder or development help.",
    skillsOffered: ["Business Development", "Fundraising", "Pitch Deck Creation", "Market Strategy"],
    skillsWanted: ["Full Stack Development", "MVP Development", "Product Design"],
    location: "Bangalore, Karnataka"
  },
  {
    id: "user16",
    name: "Tanvi Shah",
    avatarUrl: "https://placehold.co/96x96.png?text=TS",
    bio: "Video editor and motion graphics designer. Seeking website development help for my portfolio.",
    skillsOffered: ["Video Editing", "Motion Graphics", "After Effects", "Premier Pro"],
    skillsWanted: ["Web Development", "Portfolio Website", "SEO"],
    location: "Mumbai, Maharashtra"
  },
  {
    id: "user17",
    name: "Vishnu Prasad",
    avatarUrl: "https://placehold.co/96x96.png?text=VP",
    bio: "Mobile game developer with Unity experience. Looking for design and art collaboration.",
    skillsOffered: ["Game Development", "Unity", "C#", "Mobile Game Development"],
    skillsWanted: ["Game Art", "Character Design", "UI Design for Games"],
    location: "Chennai, Tamil Nadu"
  },
  {
    id: "user18",
    name: "Kavita Agarwal",
    avatarUrl: "https://placehold.co/96x96.png?text=KA",
    bio: "Digital marketing consultant specializing in e-commerce. Seeking web development expertise.",
    skillsOffered: ["E-commerce Marketing", "PPC Advertising", "Conversion Optimization", "Analytics"],
    skillsWanted: ["E-commerce Development", "Shopify", "WooCommerce"],
    location: "Jaipur, Rajasthan"
  },
  {
    id: "user19",
    name: "Siddharth Roy",
    avatarUrl: "https://placehold.co/96x96.png?text=SR",
    bio: "Frontend developer with expertise in modern JavaScript frameworks. Looking for design collaboration.",
    skillsOffered: ["Frontend Development", "React", "Vue.js", "CSS/SASS", "Responsive Design"],
    skillsWanted: ["UI/UX Design", "Visual Design", "Branding"],
    location: "Kolkata, West Bengal"
  },
  {
    id: "user20",
    name: "Nandini Kapoor",
    avatarUrl: "https://placehold.co/96x96.png?text=NK",
    bio: "UX designer focusing on financial and healthcare products. Seeking development help for my design system.",
    skillsOffered: ["UX Design", "Information Architecture", "User Testing", "Design Systems"],
    skillsWanted: ["Frontend Development", "React Component Library", "Design System Implementation"],
    location: "Bangalore, Karnataka"
  },
  {
    id: "user21",
    name: "Rohan Chatterjee",
    avatarUrl: "https://placehold.co/96x96.png?text=RC",
    bio: "Blockchain developer with expertise in smart contracts. Looking for UI/UX help for my DeFi project.",
    skillsOffered: ["Blockchain Development", "Solidity", "Smart Contracts", "Web3"],
    skillsWanted: ["UI/UX Design", "Frontend Development", "Brand Identity"],
    location: "Pune, Maharashtra"
  },
  {
    id: "user22",
    name: "Anita Deshmukh",
    avatarUrl: "https://placehold.co/96x96.png?text=AD",
    bio: "Content creator and YouTuber focused on tech reviews. Need help with video editing and thumbnail design.",
    skillsOffered: ["Content Creation", "YouTube Strategy", "Tech Reviews", "Audience Building"],
    skillsWanted: ["Video Editing", "Thumbnail Design", "Motion Graphics"],
    location: "Mumbai, Maharashtra"
  },
  {
    id: "user23",
    name: "Ravi Prakash",
    avatarUrl: "https://placehold.co/96x96.png?text=RP",
    bio: "Backend developer specializing in Python and Django. Looking for frontend collaboration for my SaaS project.",
    skillsOffered: ["Python", "Django", "API Development", "Database Design"],
    skillsWanted: ["Frontend Development", "React", "UI Design"],
    location: "Hyderabad, Telangana"
  },
  {
    id: "user24",
    name: "Sonal Mehta",
    avatarUrl: "https://placehold.co/96x96.png?text=SM",
    bio: "Illustrator and character designer. Seeking web development help for my online portfolio and store.",
    skillsOffered: ["Illustration", "Character Design", "Digital Art", "Concept Art"],
    skillsWanted: ["Web Development", "E-commerce", "Online Portfolio"],
    location: "Ahmedabad, Gujarat"
  },
  {
    id: "user25",
    name: "Ajay Mishra",
    avatarUrl: "https://placehold.co/96x96.png?text=AM",
    bio: "Product manager with experience in fintech. Looking for mobile app development expertise.",
    skillsOffered: ["Product Management", "User Stories", "Product Roadmap", "Market Research"],
    skillsWanted: ["Mobile App Development", "iOS Development", "Android Development"],
    location: "Gurgaon, Haryana"
  }
];

// Function to generate random user profiles for the rest of the users
function generateRandomUsers(startId: number, count: number): UserProfile[] {
  const users: UserProfile[] = [];
  
  // Indian first names
  const firstNames = [
    "Aarav", "Vivaan", "Advik", "Kabir", "Ananya", "Diya", "Saanvi", "Anika",
    "Ishaan", "Vihaan", "Reyansh", "Arjun", "Sai", "Aryan", "Krishna", "Ayaan",
    "Veer", "Advait", "Rudra", "Aditya", "Rohan", "Nikhil", "Sahil", "Varun",
    "Pari", "Myra", "Sara", "Kiara", "Zara", "Riya", "Aadhya", "Anya", "Ira",
    "Ahana", "Ishanvi", "Nisha", "Saisha", "Trisha", "Navya", "Neha", "Meera",
    "Tanvi", "Sanvi", "Ritika", "Pihu", "Kriti", "Ishita", "Aarna", "Isha"
  ];
  
  // Indian last names
  const lastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Gupta", "Joshi", "Reddy", "Nair",
    "Pillai", "Das", "Kaur", "Mukherjee", "Chatterjee", "Roy", "Banerjee", "Shah",
    "Mehra", "Kapoor", "Verma", "Saxena", "Agarwal", "Rao", "Mehta", "Chauhan",
    "Jain", "Iyer", "Menon", "Desai", "Malhotra", "Chopra", "Bose", "Sengupta",
    "Khanna", "Gandhi", "Mishra", "Bhatia", "Lal", "Yadav", "Sinha", "Pandey"
  ];
  
  // Generate users
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    // Generate random skills
    const allSkillTypes = Object.keys(skillsPool);
    const offeredSkillType = allSkillTypes[Math.floor(Math.random() * allSkillTypes.length)];
    const wantedSkillType = allSkillTypes[Math.floor(Math.random() * allSkillTypes.length)];
    
    const offeredSkillsCount = Math.floor(Math.random() * 3) + 2; // 2-4 skills
    const wantedSkillsCount = Math.floor(Math.random() * 3) + 1; // 1-3 skills
    
    const offeredSkills = getRandomItems(skillsPool[offeredSkillType as keyof typeof skillsPool], offeredSkillsCount);
    const wantedSkills = getRandomItems(skillsPool[wantedSkillType as keyof typeof skillsPool], wantedSkillsCount);
    
    // Location
    const location = indianLocations[Math.floor(Math.random() * indianLocations.length)];
    
    // Bio
    const bio = generateBio(offeredSkills, wantedSkills);
    
    // Avatar (using initials)
    const initials = firstName.charAt(0) + lastName.charAt(0);
    const avatarUrl = `https://placehold.co/96x96.png?text=${initials}`;
    
    users.push({
      id: `user${startId + i}`,
      name: fullName,
      avatarUrl,
      bio,
      skillsOffered: offeredSkills,
      skillsWanted: wantedSkills,
      location
    });
  }
  
  return users;
}

// Function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate bio based on skills
function generateBio(offeredSkills: string[], wantedSkills: string[]): string {
  const bios = [
    `Experienced professional specializing in ${offeredSkills[0]} and ${offeredSkills.length > 1 ? offeredSkills[1] : 'related fields'}. Looking to collaborate on projects involving ${wantedSkills[0]}.`,
    `Passionate about ${offeredSkills[0]} with ${Math.floor(Math.random() * 10) + 3} years of experience. Seeking to expand my knowledge in ${wantedSkills[0]} and ${wantedSkills.length > 1 ? wantedSkills[1] : 'related areas'}.`,
    `Creative professional with expertise in ${offeredSkills.join(' and ')}. Interested in bartering my skills for help with ${wantedSkills.join(' or ')}.`,
    `Freelancer specializing in ${offeredSkills[0]}. Open to collaboration opportunities where I can learn more about ${wantedSkills[0]}.`,
    `Self-taught ${offeredSkills[0]} enthusiast looking to exchange skills with someone who can help with ${wantedSkills[0]}.`
  ];
  
  return bios[Math.floor(Math.random() * bios.length)];
}

// Generate the remaining 50 users
const usersPartTwo = generateRandomUsers(26, 50);

// Combine all users to make 75 total
export const mockUsers: UserProfile[] = [...usersPartOne, ...usersPartTwo];

export default mockUsers;
