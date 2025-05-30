export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  location?: string;
}

export interface BarterRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string; // Denormalized for easy display
  toUserName: string; // Denormalized for easy display
  offeredSkill: string;
  wantedSkill: string;
  message?: string;
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string; // ISO date string
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: Pick<UserProfile, "id" | "name" | "avatarUrl">[]; // Simplified participant info
  lastMessage?: Message;
  updatedAt: string; // ISO date string
}
