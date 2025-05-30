import { mockUsers } from "./mockUsers";

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  messages: Message[];
  lastMessageTimestamp: Date;
}

// Generate random message content based on skills
function generateMessageContent(senderId: string, receiverId: string, messageType: 'initial' | 'followup' | 'agreement'): string {
  const sender = mockUsers.find(user => user.id === senderId);
  const receiver = mockUsers.find(user => user.id === receiverId);
  
  if (!sender || !receiver) return "Hello there!";
  
  const senderOfferedSkill = sender.skillsOffered[0];
  const senderWantedSkill = sender.skillsWanted[0];
  const receiverOfferedSkill = receiver.skillsOffered[0];
  
  const initialMessages = [
    `Hi ${receiver.name.split(' ')[0]}, I noticed you're skilled in ${receiverOfferedSkill}. I'm looking for help with that and could offer my expertise in ${senderOfferedSkill} in exchange.`,
    `Hello! I saw your profile and I think we might be a good match for skill exchange. I can help with ${senderOfferedSkill} while learning ${senderWantedSkill} from you.`,
    `Hey there! I'm interested in your ${receiverOfferedSkill} skills. Would you be open to a skill exchange? I can offer ${senderOfferedSkill} in return.`,
    `Hi, I'm reaching out because your skills in ${receiverOfferedSkill} caught my attention. I've been looking to improve in that area and could offer my ${senderOfferedSkill} skills in exchange.`
  ];
  
  const followupMessages = [
    `That sounds great! I'm working on a project that could really benefit from your expertise. When would you be available to discuss the details?`,
    `Perfect! I have some specific questions about ${receiverOfferedSkill}. Would you be available for a quick call sometime this week?`,
    `Excellent! Should we set up a time to discuss how we can collaborate? I'm flexible on timing.`,
    `Awesome! I'm thinking we could start with a small project to see how the collaboration works. What do you think?`
  ];
  
  const agreementMessages = [
    `I think this could be a great partnership! Let's schedule our first session for next week.`,
    `Looking forward to working with you! I've sent you my availability for the next few days.`,
    `Perfect! I'll prepare some materials to share with you before our first meeting.`,
    `Great! I've just outlined a small project we can start with. Let me know your thoughts.`
  ];
  
  if (messageType === 'initial') {
    return initialMessages[Math.floor(Math.random() * initialMessages.length)];
  } else if (messageType === 'followup') {
    return followupMessages[Math.floor(Math.random() * followupMessages.length)];
  } else {
    return agreementMessages[Math.floor(Math.random() * agreementMessages.length)];
  }
}

// Generate random timestamp within the last 30 days
function generateRandomTimestamp(): Date {
  const now = new Date();
  const randomMinutesAgo = Math.floor(Math.random() * 30 * 24 * 60); // Random minutes in the last 30 days
  return new Date(now.getTime() - randomMinutesAgo * 60 * 1000);
}

// Generate conversations with random users from our mock database
export function generateMockConversations(currentUserId: string = "user0"): Conversation[] {
  // Select random users to have conversations with (between 5-10 users)
  const conversationCount = Math.floor(Math.random() * 6) + 5;
  
  // Filter out the current user and select random users
  const otherUsers = mockUsers.filter(user => user.id !== currentUserId);
  const selectedUsers = [...otherUsers].sort(() => 0.5 - Math.random()).slice(0, conversationCount);
  
  const conversations: Conversation[] = selectedUsers.map((user, index) => {
    // Generate between 1-8 messages per conversation
    const messageCount = Math.floor(Math.random() * 8) + 1;
    const messages: Message[] = [];
    
    // Determine who sent the first message
    const firstMessageByCurrent = Math.random() > 0.5;
    
    for (let i = 0; i < messageCount; i++) {
      // Determine sender and receiver for this message
      const isEvenMessage = i % 2 === 0;
      const senderId = (firstMessageByCurrent && isEvenMessage) || (!firstMessageByCurrent && !isEvenMessage) 
        ? currentUserId 
        : user.id;
      const receiverId = senderId === currentUserId ? user.id : currentUserId;
      
      // Determine message type based on position in conversation
      let messageType: 'initial' | 'followup' | 'agreement';
      if (i === 0) {
        messageType = 'initial';
      } else if (i < messageCount - 1) {
        messageType = 'followup';
      } else {
        messageType = 'agreement';
      }
      
      // Generate timestamp, newer messages have newer timestamps
      const timestamp = new Date(Date.now() - (messageCount - i) * 1000 * 60 * 60 * Math.random() * 24);
      
      messages.push({
        id: `msg_${index}_${i}`,
        senderId,
        receiverId,
        content: generateMessageContent(senderId, receiverId, messageType),
        timestamp,
        read: senderId !== currentUserId || Math.random() > 0.3 // 30% chance that messages from other users are unread
      });
    }
    
    // Sort messages by timestamp
    messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    return {
      id: `conv_${index}`,
      participants: [currentUserId, user.id],
      messages,
      lastMessageTimestamp: messages[messages.length - 1].timestamp
    };
  });
  
  // Sort conversations by last message timestamp (newest first)
  return conversations.sort((a, b) => b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime());
}

// Generate a mock conversation with a specific user
export function generateMockConversationWithUser(currentUserId: string = "user0", otherUserId: string): Conversation {
  const otherUser = mockUsers.find(user => user.id === otherUserId);
  
  if (!otherUser) {
    throw new Error(`User with ID ${otherUserId} not found`);
  }
  
  // Generate 3-6 messages for this conversation
  const messageCount = Math.floor(Math.random() * 4) + 3;
  const messages: Message[] = [];
  
  // Current user initiates the conversation
  for (let i = 0; i < messageCount; i++) {
    // Alternate between current user and other user
    const senderId = i % 2 === 0 ? currentUserId : otherUser.id;
    const receiverId = senderId === currentUserId ? otherUser.id : currentUserId;
    
    // Determine message type
    let messageType: 'initial' | 'followup' | 'agreement';
    if (i === 0) {
      messageType = 'initial';
    } else if (i < messageCount - 1) {
      messageType = 'followup';
    } else {
      messageType = 'agreement';
    }
    
    // Generate timestamp, each message is 1-3 hours after the previous
    const baseTime = i === 0 ? Date.now() - messageCount * 3600 * 1000 : messages[i-1].timestamp.getTime();
    const timestamp = new Date(baseTime + (Math.random() * 2 + 1) * 3600 * 1000);
    
    messages.push({
      id: `direct_msg_${i}`,
      senderId,
      receiverId,
      content: generateMessageContent(senderId, receiverId, messageType),
      timestamp,
      read: true
    });
  }
  
  return {
    id: `conv_direct_${otherUserId}`,
    participants: [currentUserId, otherUser.id],
    messages,
    lastMessageTimestamp: messages[messages.length - 1].timestamp
  };
}

// Mock current user (for demo purposes)
export const currentUserId = "user1"; // Using an existing user ID from mockUsers

// Generate mock conversations
export const mockConversations = generateMockConversations(currentUserId);

// Function to get or generate a conversation with a specific user
export function getOrCreateConversation(userId: string): Conversation {
  // Check if conversation already exists
  const existingConversation = mockConversations.find(conv => 
    conv.participants.includes(currentUserId) && conv.participants.includes(userId)
  );
  
  if (existingConversation) {
    return existingConversation;
  }
  
  // Create a new conversation
  const newConversation = generateMockConversationWithUser(currentUserId, userId);
  
  // Add to mock conversations (in a real app, this would be saved to a database)
  mockConversations.push(newConversation);
  
  return newConversation;
}
