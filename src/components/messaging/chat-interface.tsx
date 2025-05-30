"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Conversation, Message, UserProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, UserCircle, Maximize, Minimize, HandshakeIcon, ArrowRight, Handshake, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockUsers } from "@/data/mockUsers";
import { mockConversations, getOrCreateConversation, currentUserId } from "@/data/mockMessages";
import { createBarterRequest } from "@/data/mockRequests";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Helper function to convert our mockMessage format to the chat interface format
const convertMockConversations = () => {
  return mockConversations.map(conversation => {
    // Find the other participant (not current user)
    const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
    const otherUser = mockUsers.find(user => user.id === otherParticipantId);
    
    // Get the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    
    return {
      id: conversation.id,
      participantIds: conversation.participants,
      participants: [
        { 
          id: otherParticipantId || '', 
          name: otherUser?.name || 'Unknown User', 
          avatarUrl: otherUser?.avatarUrl || '' 
        },
        { id: currentUserId, name: "You" },
      ],
      lastMessage: {
        id: lastMessage.id,
        conversationId: conversation.id,
        senderId: lastMessage.senderId,
        senderName: lastMessage.senderId === currentUserId ? "You" : otherUser?.name || "Unknown",
        receiverId: lastMessage.receiverId,
        content: lastMessage.content,
        timestamp: lastMessage.timestamp.toISOString(),
      },
      updatedAt: conversation.lastMessageTimestamp.toISOString(),
    };
  });
};

// Convert mock messages to the chat interface format
const convertMockMessages = (conversationId: string) => {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  // Find the other participant
  const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
  const otherUser = mockUsers.find(user => user.id === otherParticipantId);
  
  return conversation.messages.map(message => ({
    id: message.id,
    conversationId,
    senderId: message.senderId,
    senderName: message.senderId === currentUserId ? "You" : otherUser?.name || "Unknown",
    receiverId: message.receiverId,
    content: message.content,
    timestamp: message.timestamp.toISOString(),
  }));
};


export function ChatInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const userId = searchParams.get('userId');
  
  // Convert mock data to the format expected by the component
  const formattedConversations = convertMockConversations();
  
  // Find the conversation with the specified user or use the first conversation
  const initialConversation = userId 
    ? formattedConversations.find(conv => conv.participantIds.includes(userId)) || null
    : formattedConversations[0] || null;
  
  // If a userId was specified but no conversation exists, create one
  const [directConversation, setDirectConversation] = useState<any>(null);
  
  // Barter request states
  const [isBarterModalOpen, setIsBarterModalOpen] = useState(false);
  const [barterMessage, setBarterMessage] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  // Money transfer modal state
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const [moneyAmount, setMoneyAmount] = useState("");
  const [moneyMessage, setMoneyMessage] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  
  // Report and block system state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(initialConversation);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const [isChatVisible, setIsChatVisible] = useState(!isMobile || !!userId); // Chat is visible by default on desktop or if userId is specified

  // Create or load a direct conversation if userId is specified
  useEffect(() => {
    if (userId && !initialConversation) {
      // Create a new conversation with this user
      const conversation = getOrCreateConversation(userId);
      const formattedConv = {
        id: conversation.id,
        participantIds: conversation.participants,
        participants: [
          { 
            id: userId, 
            name: mockUsers.find(u => u.id === userId)?.name || 'Unknown User', 
            avatarUrl: mockUsers.find(u => u.id === userId)?.avatarUrl || '' 
          },
          { id: currentUserId, name: "You" },
        ],
        lastMessage: conversation.messages.length > 0 ? {
          id: conversation.messages[0].id,
          conversationId: conversation.id,
          senderId: conversation.messages[0].senderId,
          senderName: conversation.messages[0].senderId === currentUserId ? "You" : mockUsers.find(u => u.id === userId)?.name || "Unknown",
          receiverId: conversation.messages[0].receiverId,
          content: conversation.messages[0].content,
          timestamp: conversation.messages[0].timestamp.toISOString(),
        } : undefined,
        updatedAt: conversation.lastMessageTimestamp.toISOString(),
      };
      setDirectConversation(formattedConv);
      setSelectedConversation(formattedConv);
    }
  }, [userId, initialConversation]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // Get messages for this conversation
      const conversationMessages = convertMockMessages(selectedConversation.id);
      setMessages(conversationMessages);
      if(isMobile) setIsChatVisible(true); // Show chat when a conversation is selected on mobile
    } else {
      setMessages([]);
      if(isMobile) setIsChatVisible(false);
    }
  }, [selectedConversation, isMobile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // Get the conversation from our mock data
      const targetConversation = mockConversations.find(c => c.id === selectedConversation.id);
      const otherParticipantId = selectedConversation.participantIds.find(id => id !== currentUserId)!;
      
      // Create new message in the format our chat component expects
      const message: Message = {
        id: `msg${Date.now()}`,
        conversationId: selectedConversation.id,
        senderId: currentUserId,
        senderName: "You",
        receiverId: otherParticipantId,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      
      // Add to UI state
      setMessages(prev => [...prev, message]);
      
      // Add to mock data (in a real app, this would be a database write)
      if (targetConversation) {
        targetConversation.messages.push({
          id: message.id,
          senderId: currentUserId,
          receiverId: otherParticipantId,
          content: message.content,
          timestamp: new Date(),
          read: true,
        });
        targetConversation.lastMessageTimestamp = new Date();
      }
      
      setNewMessage("");
    }
  };
  
  const getOtherParticipant = (convo: Conversation | null) => {
    if (!convo) return null;
    return convo.participants.find(p => p.id !== currentUserId);
  };

  const conversationListClass = cn(
    "w-80 border-r flex-shrink-0",
    isMobile && isChatVisible ? "hidden" : "flex flex-col",
    isMobile && !isChatVisible ? "flex" : "md:flex"
  );

  const chatViewClass = cn(
    "flex-1 flex-col min-w-0", // min-w-0 allows flex items to shrink below content size
    isMobile && !isChatVisible ? "hidden" : "flex",
    isMobile && isChatVisible ? "flex w-full h-full absolute inset-0 bg-background z-10" : "md:flex"
  );


  return (
    <div className="flex h-[calc(100vh-10rem)] border rounded-lg shadow-lg overflow-hidden w-full">
      {/* Conversations List */}
      <div className={conversationListClass}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <ScrollArea className="flex-1">
          {/* Display all conversations */}
          {(directConversation ? [...formattedConversations, directConversation] : formattedConversations).map((convo) => {
            const otherParticipant = getOtherParticipant(convo);
            return (
            <div
              key={convo.id}
              className={cn(
                "p-3 hover:bg-muted cursor-pointer border-b",
                selectedConversation?.id === convo.id && "bg-muted"
              )}
              onClick={() => setSelectedConversation(convo)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={otherParticipant?.avatarUrl} alt={otherParticipant?.name} data-ai-hint="person avatar"/>
                  <AvatarFallback>{otherParticipant?.name?.substring(0, 2).toUpperCase() || <UserCircle />}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold truncate">{otherParticipant?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage?.content}</p>
                </div>
              </div>
            </div>
          )}
          )}
        </ScrollArea>
      </div>

      {/* Chat View */}
      <div className={chatViewClass}>
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={getOtherParticipant(selectedConversation)?.avatarUrl} alt={getOtherParticipant(selectedConversation)?.name} data-ai-hint="person avatar"/>
                  <AvatarFallback>{getOtherParticipant(selectedConversation)?.name?.substring(0,2).toUpperCase() || <UserCircle />}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{getOtherParticipant(selectedConversation)?.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">Barter Partner</p>
                    {blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') && (
                      <Badge variant="destructive" className="text-xs py-0 px-1.5">Blocked</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex items-center gap-1 text-xs border-dashed border-accent-foreground/30 hover:border-accent hover:bg-accent/10 group"
                  onClick={() => setIsMoneyModalOpen(true)}
                >
                  <IndianRupee className="h-3.5 w-3.5 text-accent" />
                  <span className="group-hover:text-red-500">Send Money</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex items-center gap-1 text-xs border-dashed border-accent-foreground/30 hover:border-accent hover:bg-accent/10 group"
                  onClick={() => setIsBarterModalOpen(true)}
                >
                  <Handshake className="h-3.5 w-3.5 text-accent" />
                  <span className="group-hover:text-red-500">Create Barter Request</span>
                </Button>
                
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="19" cy="12" r="1"/>
                      <circle cx="5" cy="12" r="1"/>
                    </svg>
                  </Button>
                  
                  <div className="absolute right-0 top-full mt-1 w-40 bg-card border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="py-1 text-sm">
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center gap-2 text-yellow-600 dark:text-yellow-500"
                        onClick={() => setIsReportModalOpen(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3v18h18"/>
                          <path d="m19 9-5 5-4-4-3 3"/>
                        </svg>
                        Report User
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center gap-2 text-red-600 dark:text-red-500"
                        onClick={() => setIsBlockModalOpen(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18.36 6.64A9 9 0 0 1 20.77 15M5.64 17.36a9 9 0 0 1 0-10.72M2 12c0-4.76 3.24-8.65 7.54-9.77a9.01 9.01 0 0 1 6.91 1.14M22 12c0 4.76-3.24 8.65-7.54 9.77a8.986 8.986 0 0 1-5.48-.68"/>
                          <line x1="2" x2="22" y1="2" y2="22"/>
                        </svg>
                        {blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') ? 'Unblock User' : 'Block User'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {isMobile && (
                  <Button variant="ghost" size="icon" onClick={() => setIsChatVisible(false)}>
                    <Minimize className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="flex-1 p-4 space-y-4 bg-muted/30 overflow-x-hidden min-w-0 w-full">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex max-w-[80%] w-fit",
                    msg.senderId === currentUserId
                      ? "ml-auto justify-end"
                      : "mr-auto"
                  )}
                >
                  {/* Left side avatar for messages from others */}
                  {msg.senderId !== currentUserId && (
                    <div className="mr-2 flex-shrink-0 self-end">
                      <Avatar className="h-8 w-8 hidden sm:flex">
                        <AvatarImage src={getOtherParticipant(selectedConversation)?.avatarUrl} alt={getOtherParticipant(selectedConversation)?.name} data-ai-hint="person avatar"/>
                        <AvatarFallback>{getOtherParticipant(selectedConversation)?.name?.substring(0,2).toUpperCase() || <UserCircle />}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "rounded-lg p-3 shadow-sm max-w-full",
                      msg.senderId === currentUserId
                        ? "bg-teal-600 text-white rounded-tr-none" // Teal bubble for current user's messages
                        : "bg-card text-card-foreground rounded-tl-none" // Regular bubble for other's messages
                    )}
                  >
                    <p className="text-sm break-words">{msg.content}</p>
                    <p className={cn(
                        "text-xs mt-1",
                        msg.senderId === currentUserId ? "text-white/80 text-right" : "text-muted-foreground"
                      )}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="sm:hidden h-10 w-10 border-dashed border-accent/50"
                  onClick={() => setIsMoneyModalOpen(true)}
                >
                  <IndianRupee className="h-4 w-4 text-accent" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="sm:hidden h-10 w-10 border-dashed border-accent/50"
                  onClick={() => setIsBarterModalOpen(true)}
                >
                  <Handshake className="h-4 w-4 text-accent" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="h-10 w-10">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-4">
             <Maximize className="h-16 w-16 mb-4" />
            <p className="text-lg">Select a conversation to start chatting.</p>
            <p className="text-sm">Or find new users via the Search page to initiate a conversation.</p>
          </div>
        )}
      </div>
      
      {/* Barter Request Modal */}
      <Dialog open={isBarterModalOpen} onOpenChange={setIsBarterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-accent" />
              Create Barter Request
            </DialogTitle>
            <DialogDescription>
              Send a barter request to {selectedConversation ? getOtherParticipant(selectedConversation)?.name : ""} to exchange skills
            </DialogDescription>
          </DialogHeader>
          
          {selectedConversation && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Your Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {mockUsers.find(u => u.id === currentUserId)?.skillsOffered.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-background text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="barter-message">Your Request</Label>
                  <Textarea 
                    id="barter-message"
                    placeholder="Describe what you're offering and what you want in return..."
                    className="min-h-[120px]"
                    value={barterMessage}
                    onChange={(e) => setBarterMessage(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsBarterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button" 
              className="bg-accent hover:bg-accent/90"
              disabled={isSubmittingRequest || !barterMessage.trim()}
              onClick={() => {
                if (selectedConversation && barterMessage.trim()) {
                  setIsSubmittingRequest(true);
                  
                  // Get the other participant ID
                  const receiverId = getOtherParticipant(selectedConversation)?.id || '';
                  
                  try {
                    // Create the barter request
                    const request = createBarterRequest(receiverId, barterMessage.trim());
                    
                    // Send a message in the chat about the request
                    const message = {
                      id: `msg${Date.now()}`,
                      conversationId: selectedConversation.id,
                      senderId: currentUserId,
                      senderName: "You",
                      receiverId,
                      content: `📝 I've sent you a barter request: ${barterMessage}`,
                      timestamp: new Date().toISOString(),
                    };
                    
                    // Add to UI messages
                    setMessages(prev => [...prev, message]);
                    
                    // Add to mock conversation data
                    const targetConversation = mockConversations.find(c => c.id === selectedConversation.id);
                    if (targetConversation) {
                      targetConversation.messages.push({
                        id: message.id,
                        senderId: currentUserId,
                        receiverId,
                        content: message.content,
                        timestamp: new Date(),
                        read: true,
                      });
                      targetConversation.lastMessageTimestamp = new Date();
                    }
                    
                    // Success toast
                    toast({
                      title: "Barter Request Sent",
                      description: "Your request has been sent successfully.",
                    });
                    
                    // Reset and close modal
                    setBarterMessage("");
                    setIsBarterModalOpen(false);
                    
                    // Navigate to requests page with minimal delay
                    setTimeout(() => {
                      router.push('/requests');
                    }, 200);
                    
                  } catch (error) {
                    console.error(error);
                    toast({
                      title: "Error",
                      description: "Failed to send barter request.",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSubmittingRequest(false);
                  }
                }
              }}
            >
              {isSubmittingRequest ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Request <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Money Transfer Modal */}
      <Dialog open={isMoneyModalOpen} onOpenChange={setIsMoneyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-accent" />
              Send Money
            </DialogTitle>
            <DialogDescription>
              Send money directly to your barter partner.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="money-amount">Amount (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="money-amount"
                  type="number"
                  placeholder="1000"
                  className="pl-9"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Enter the amount in Indian Rupees</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="money-message">Message (Optional)</Label>
              <Textarea 
                id="money-message"
                placeholder="Add a note about this payment..."
                className="min-h-[80px]"
                value={moneyMessage}
                onChange={(e) => setMoneyMessage(e.target.value)}
              />
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium">{getOtherParticipant(selectedConversation)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Fee</span>
                <span className="font-medium">₹0</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-accent">₹{moneyAmount || '0'}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsMoneyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button" 
              className="bg-accent hover:bg-accent/90"
              disabled={isSubmittingPayment || !moneyAmount || Number(moneyAmount) <= 0}
              onClick={() => {
                if (selectedConversation && moneyAmount && Number(moneyAmount) > 0) {
                  setIsSubmittingPayment(true);
                  
                  // Get the other participant ID
                  const receiverId = getOtherParticipant(selectedConversation)?.id || '';
                  const receiverName = getOtherParticipant(selectedConversation)?.name || 'the recipient';
                  
                  // Simulate payment processing delay
                  setTimeout(() => {
                    try {
                      // Send a message in the chat about the payment
                      const message = {
                        id: `msg${Date.now()}`,
                        conversationId: selectedConversation.id,
                        senderId: currentUserId,
                        senderName: "You",
                        receiverId,
                        content: `💰 I've sent ₹${moneyAmount} to ${receiverName}${moneyMessage ? `: "${moneyMessage}"` : ''}.`,
                        timestamp: new Date().toISOString(),
                      };
                      
                      // Add to UI messages
                      setMessages(prev => [...prev, message]);
                      
                      // Add to mock conversation data
                      const targetConversation = mockConversations.find(c => c.id === selectedConversation.id);
                      if (targetConversation) {
                        targetConversation.messages.push({
                          id: message.id,
                          senderId: currentUserId,
                          receiverId,
                          content: message.content,
                          timestamp: new Date(),
                          read: true,
                        });
                        targetConversation.lastMessageTimestamp = new Date();
                      }
                      
                      // Success toast
                      toast({
                        title: "Payment Sent",
                        description: `₹${moneyAmount} has been sent successfully.`,
                      });
                      
                      // Reset and close modal
                      setMoneyAmount("");
                      setMoneyMessage("");
                      setIsMoneyModalOpen(false);
                      
                    } catch (error) {
                      console.error(error);
                      toast({
                        title: "Error",
                        description: "Failed to send payment.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsSubmittingPayment(false);
                    }
                  }, 800); // Simulate payment processing
                }
              }}
            >
              {isSubmittingPayment ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"></span>
                  Processing...
                </>
              ) : (
                <>
                  Send ₹{moneyAmount || '0'} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report User Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Report User</DialogTitle>
            <DialogDescription>
              {getOtherParticipant(selectedConversation)?.name ? (
                <>Report {getOtherParticipant(selectedConversation)?.name} for inappropriate behavior.</>  
              ) : (
                <>Report this user for inappropriate behavior.</>  
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason for reporting</Label>
              <select 
                id="report-reason"
                className="w-full p-2 border rounded-md bg-background"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                <option value="harassment">Harassment or Bullying</option>
                <option value="spam">Spam or Scam</option>
                <option value="inappropriate">Inappropriate Content</option>
                <option value="fake">Fake Account</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-description">Description</Label>
              <Textarea
                id="report-description"
                placeholder="Please provide details about the issue"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setReportReason("");
                setReportDescription("");
                setIsReportModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              disabled={isSubmittingReport || !reportReason || !reportDescription}
              onClick={() => {
                if (selectedConversation && reportReason && reportDescription) {
                  setIsSubmittingReport(true);
                  
                  // Simulate report submission delay
                  setTimeout(() => {
                    try {
                      // Success toast
                      toast({
                        title: "Report Submitted",
                        description: "Thank you for your report. We will review it shortly.",
                      });
                      
                      // Reset and close modal
                      setReportReason("");
                      setReportDescription("");
                      setIsReportModalOpen(false);
                      
                    } catch (error) {
                      console.error(error);
                      toast({
                        title: "Error",
                        description: "Failed to submit report.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsSubmittingReport(false);
                    }
                  }, 800); // Simulate processing
                }
              }}
            >
              {isSubmittingReport ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"></span>
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block User Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') ? 'Unblock User' : 'Block User'}
            </DialogTitle>
            <DialogDescription>
              {blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') ? (
                <>Are you sure you want to unblock {getOtherParticipant(selectedConversation)?.name}? You will start receiving their messages again.</>  
              ) : (
                <>Are you sure you want to block {getOtherParticipant(selectedConversation)?.name}? You won't receive messages from them anymore.</> 
              )}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsBlockModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button" 
              className={blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') ? 
                "bg-green-600 hover:bg-green-700 text-white" : 
                "bg-red-600 hover:bg-red-700 text-white"}
              onClick={() => {
                if (selectedConversation) {
                  const otherUserId = getOtherParticipant(selectedConversation)?.id || '';
                  
                  if (blockedUsers.includes(otherUserId)) {
                    // Unblock user
                    setBlockedUsers(prev => prev.filter(id => id !== otherUserId));
                    toast({
                      title: "User Unblocked",
                      description: `${getOtherParticipant(selectedConversation)?.name} has been unblocked.`,
                    });
                  } else {
                    // Block user
                    setBlockedUsers(prev => [...prev, otherUserId]);
                    toast({
                      title: "User Blocked",
                      description: `${getOtherParticipant(selectedConversation)?.name} has been blocked.`,
                    });
                  }
                  
                  setIsBlockModalOpen(false);
                }
              }}
            >
              {blockedUsers.includes(getOtherParticipant(selectedConversation)?.id || '') ? 'Unblock User' : 'Block User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
