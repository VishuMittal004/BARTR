"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, User, MessageSquare, Handshake } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockUsers";
import { mockConversations } from "@/data/mockMessages";
import { mockBarterRequests } from "@/data/mockRequests";
import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  type: 'user' | 'message' | 'request';
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  avatarUrl?: string;
  tags?: string[];
  link: string;
};

interface GlobalSearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

export function GlobalSearch({ isOpen, onOpenChange, initialQuery = "" }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const searchTerm = searchQuery.toLowerCase().trim();
      
      // Search users by name and skills
      const userResults = mockUsers
        .filter(user => 
          user.name.toLowerCase().includes(searchTerm) || 
          user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm)) ||
          user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm)) ||
          (user.bio && user.bio.toLowerCase().includes(searchTerm))
        )
        .map(user => ({
          id: user.id,
          type: 'user' as const,
          title: user.name,
          subtitle: user.bio || `Offers ${user.skillsOffered.join(", ")}`,
          avatarUrl: user.avatarUrl,
          tags: [...user.skillsOffered.slice(0, 3)],
          icon: <User className="h-4 w-4" />,
          link: `/profile/${user.id}`
        }));
      
      // Search conversations by content
      const messageResults = mockConversations
        .flatMap(conv => 
          conv.messages
            .filter(msg => msg.content.toLowerCase().includes(searchTerm))
            .map(msg => {
              const otherUserId = conv.participants.find(id => id !== "user1"); // Assuming current user is user1
              const otherUser = mockUsers.find(u => u.id === otherUserId);
              return {
                id: msg.id,
                type: 'message' as const,
                title: otherUser?.name || "Unknown User",
                subtitle: msg.content.length > 60 ? `${msg.content.substring(0, 60)}...` : msg.content,
                avatarUrl: otherUser?.avatarUrl,
                icon: <MessageSquare className="h-4 w-4" />,
                link: `/messaging?userId=${otherUserId}`
              };
            })
        );
      
      // Search barter requests
      const requestResults = mockBarterRequests
        .filter(req => 
          req.message.toLowerCase().includes(searchTerm) ||
          req.offeredSkills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
          req.requestedSkills.some(skill => skill.toLowerCase().includes(searchTerm))
        )
        .map(req => {
          const sender = mockUsers.find(u => u.id === req.senderId);
          const receiver = mockUsers.find(u => u.id === req.receiverId);
          return {
            id: req.id,
            type: 'request' as const,
            title: `Barter: ${sender?.name || 'Unknown'} → ${receiver?.name || 'Unknown'}`,
            subtitle: req.message.length > 60 ? `${req.message.substring(0, 60)}...` : req.message,
            tags: [...req.offeredSkills.slice(0, 2), ...req.requestedSkills.slice(0, 2)],
            icon: <Handshake className="h-4 w-4" />,
            link: `/requests`
          };
        });
      
      // Combine results based on active tab
      let filteredResults: SearchResult[] = [];
      
      if (activeTab === "all") {
        filteredResults = [...userResults, ...messageResults, ...requestResults];
      } else if (activeTab === "users") {
        filteredResults = userResults;
      } else if (activeTab === "messages") {
        filteredResults = messageResults;
      } else if (activeTab === "requests") {
        filteredResults = requestResults;
      }
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  // Search on query change
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, activeTab]);

  // Navigate to a result
  const handleResultClick = (result: SearchResult) => {
    router.push(result.link);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Global Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, skills, messages, requests..."
            className="pl-10"
            autoFocus
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 max-h-[60vh]">
            {isSearching ? (
              <div className="py-8 text-center text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <div 
                    key={`${result.type}-${result.id}`}
                    className="p-3 rounded-md hover:bg-accent/10 cursor-pointer flex items-start gap-3"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.avatarUrl ? (
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={result.avatarUrl} alt={result.title} />
                        <AvatarFallback>{result.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        {result.icon}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{result.title}</p>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          result.type === 'user' && "bg-blue-500/10 text-blue-500",
                          result.type === 'message' && "bg-green-500/10 text-green-500",
                          result.type === 'request' && "bg-amber-500/10 text-amber-500"
                        )}>
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                      
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : query.trim() !== "" ? (
              <div className="py-8 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Start typing to search across the platform
              </div>
            )}
          </ScrollArea>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
