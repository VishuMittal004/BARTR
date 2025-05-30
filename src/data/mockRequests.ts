import { mockUsers } from './mockUsers';
import { currentUserId } from './mockMessages';

// Re-export the currentUserId so it can be imported from this file
export { currentUserId };

export enum BarterRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface BarterRequest {
  id: string;
  senderId: string;
  receiverId: string;
  offeredSkills: string[];
  requestedSkills: string[];
  message: string;
  status: BarterRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Generate a few random barter requests
const generateMockBarterRequests = (count: number): BarterRequest[] => {
  const requests: BarterRequest[] = [];
  
  // Get random users excluding the current user
  const otherUsers = mockUsers.filter(user => user.id !== currentUserId);
  
  // Generate some outgoing requests (from current user to others)
  for (let i = 0; i < Math.floor(count / 2); i++) {
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const currentUser = mockUsers.find(user => user.id === currentUserId);
    
    if (!currentUser) continue;
    
    // Pick random skills to offer and request
    const offeredSkills = currentUser.skillsOffered.slice(0, Math.floor(Math.random() * currentUser.skillsOffered.length) + 1);
    const requestedSkills = randomUser.skillsOffered.slice(0, Math.floor(Math.random() * randomUser.skillsOffered.length) + 1);
    
    // Create a request
    requests.push({
      id: `req_out_${i}`,
      senderId: currentUserId,
      receiverId: randomUser.id,
      offeredSkills,
      requestedSkills,
      message: `Hi ${randomUser.name.split(' ')[0]}, I'd like to barter my ${offeredSkills.join(', ')} skills for your ${requestedSkills.join(', ')} expertise. Would you be interested?`,
      status: getRandomStatus(),
      createdAt: getRandomDate(60), // Within the last 60 days
      updatedAt: getRandomDate(30), // Within the last 30 days
    });
  }
  
  // Generate some incoming requests (from others to current user)
  for (let i = 0; i < Math.ceil(count / 2); i++) {
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const currentUser = mockUsers.find(user => user.id === currentUserId);
    
    if (!currentUser) continue;
    
    // Pick random skills to offer and request
    const offeredSkills = randomUser.skillsOffered.slice(0, Math.floor(Math.random() * randomUser.skillsOffered.length) + 1);
    const requestedSkills = currentUser.skillsOffered.slice(0, Math.floor(Math.random() * currentUser.skillsOffered.length) + 1);
    
    // Create a request
    requests.push({
      id: `req_in_${i}`,
      senderId: randomUser.id,
      receiverId: currentUserId,
      offeredSkills,
      requestedSkills,
      message: `Hello, I'm interested in your ${requestedSkills.join(', ')} skills. I can offer my expertise in ${offeredSkills.join(', ')}. Let me know if you'd like to collaborate.`,
      status: getRandomStatus(),
      createdAt: getRandomDate(60), // Within the last 60 days
      updatedAt: getRandomDate(30), // Within the last 30 days
    });
  }
  
  return requests;
};

// Helper function to get a random status (with higher probability for pending)
function getRandomStatus(): BarterRequestStatus {
  const random = Math.random();
  if (random < 0.6) return BarterRequestStatus.PENDING;
  if (random < 0.75) return BarterRequestStatus.ACCEPTED;
  if (random < 0.9) return BarterRequestStatus.DECLINED;
  if (random < 0.95) return BarterRequestStatus.COMPLETED;
  return BarterRequestStatus.CANCELLED;
}

// Helper function to generate a random date within the last X days
function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * daysAgo);
  return new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
}

// Generate 10 mock barter requests
export const mockBarterRequests: BarterRequest[] = generateMockBarterRequests(10);

// Function to add a new barter request
export function createBarterRequest(receiverId: string, message: string): BarterRequest {
  try {
    console.log('Creating barter request:', { receiverId, currentUserId });
    
    const sender = mockUsers.find(user => user.id === currentUserId);
    if (!sender) {
      console.error('Sender not found:', { currentUserId, availableUsers: mockUsers.map(u => u.id) });
      throw new Error(`Sender not found with ID: ${currentUserId}`);
    }
    
    const receiver = mockUsers.find(user => user.id === receiverId);
    if (!receiver) {
      console.error('Receiver not found:', { receiverId, availableUsers: mockUsers.map(u => u.id) });
      throw new Error(`Receiver not found with ID: ${receiverId}`);
    }
    
    console.log('Found users:', { 
      sender: { id: sender.id, name: sender.name, skills: sender.skillsOffered }, 
      receiver: { id: receiver.id, name: receiver.name, skills: receiver.skillsOffered }
    });
    
    // Create a new request
    const newRequest: BarterRequest = {
      id: `req_new_${Date.now()}`,
      senderId: currentUserId,
      receiverId,
      offeredSkills: sender.skillsOffered.length > 0 ? sender.skillsOffered.slice(0, 2) : ['No skills specified'], // Take first 2 skills with fallback
      requestedSkills: receiver.skillsOffered.length > 0 ? receiver.skillsOffered.slice(0, 2) : ['No skills specified'], // Take first 2 skills with fallback
      message,
      status: BarterRequestStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log('Created new barter request:', newRequest);
    
    // Add to mock requests
    mockBarterRequests.push(newRequest);
    
    return newRequest;
  } catch (error) {
    console.error('Error creating barter request:', error);
    throw error; // Re-throw to let the UI handle it
  }
}
