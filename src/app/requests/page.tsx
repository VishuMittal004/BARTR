"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestList } from "@/components/requests/request-list";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";
import { mockBarterRequests, BarterRequestStatus, BarterRequest, currentUserId } from "@/data/mockRequests";
import { mockUsers } from "@/data/mockUsers";

// Adapter function to transform our mock requests to the format expected by the RequestList component
const transformRequestForUI = (request: BarterRequest) => {
  // Get user names
  const sender = mockUsers.find(user => user.id === request.senderId);
  const receiver = mockUsers.find(user => user.id === request.receiverId);
  
  // For display in the UI
  const fromUserName = request.senderId === currentUserId ? "You" : sender?.name || "Unknown User";
  const toUserName = request.receiverId === currentUserId ? "You" : receiver?.name || "Unknown User";
  
  // Convert the offered skills and requested skills to strings for display
  const offeredSkill = request.offeredSkills.join(", ");
  const wantedSkill = request.requestedSkills.join(", ");
  
  return {
    id: request.id,
    fromUserId: request.senderId,
    toUserId: request.receiverId,
    fromUserName,
    toUserName,
    offeredSkill,
    wantedSkill,
    message: request.message,
    status: request.status,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
    fromUserAvatar: sender?.avatarUrl,
    toUserAvatar: receiver?.avatarUrl
  };
};


export default function BarterRequestsPage() {
  // Initialize with empty arrays, will populate after transforming mock data
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<any[]>([]);
  const { toast } = useToast();
  
  // On component mount, transform and set the requests
  useEffect(() => {
    // Filter and transform incoming requests (where currentUser is the receiver)
    const incoming = mockBarterRequests
      .filter(request => request.receiverId === currentUserId)
      .map(transformRequestForUI);
    
    // Filter and transform outgoing requests (where currentUser is the sender)
    const outgoing = mockBarterRequests
      .filter(request => request.senderId === currentUserId)
      .map(transformRequestForUI);
      
    setIncomingRequests(incoming);
    setOutgoingRequests(outgoing);
  }, []);

  const updateRequestStatus = (requestId: string, status: string, listSetter: React.Dispatch<React.SetStateAction<any[]>>) => {
    // Update the UI state
    listSetter(prev => prev.map(req => req.id === requestId ? { ...req, status, updatedAt: new Date().toISOString() } : req));
    
    // Also update the original mock data
    const requestIndex = mockBarterRequests.findIndex(req => req.id === requestId);
    if (requestIndex !== -1) {
      mockBarterRequests[requestIndex].status = status as BarterRequestStatus;
      mockBarterRequests[requestIndex].updatedAt = new Date();
    }
  };

  const handleAccept = (requestId: string) => {
    updateRequestStatus(requestId, BarterRequestStatus.ACCEPTED, setIncomingRequests);
    toast({ title: "Request Accepted!", description: "You can now coordinate with the user." });
  };

  const handleDecline = (requestId: string) => {
    updateRequestStatus(requestId, BarterRequestStatus.DECLINED, setIncomingRequests);
    toast({ title: "Request Declined", variant: "destructive" });
  };

  const handleCancel = (requestId: string) => {
    updateRequestStatus(requestId, BarterRequestStatus.CANCELLED, setOutgoingRequests);
    toast({ title: "Request Cancelled", variant: "destructive" });
  };
  
  const handleComplete = (requestId: string) => {
    // Find where the request exists (incoming or outgoing) and update it
    if (incomingRequests.find(req => req.id === requestId)) {
      updateRequestStatus(requestId, BarterRequestStatus.COMPLETED, setIncomingRequests);
    } else if (outgoingRequests.find(req => req.id === requestId)) {
      updateRequestStatus(requestId, BarterRequestStatus.COMPLETED, setOutgoingRequests);
    }
    
    toast({ title: "Barter Completed!", description: "Congratulations on your successful exchange." });
  };


  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Barter Requests</h1>
        <p className="text-muted-foreground">Manage your proposed and received barter deals.</p>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-6">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <ArrowDownToLine className="h-4 w-4" /> Incoming ({incomingRequests.filter(r => r.status === 'pending').length} pending)
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
             <ArrowUpFromLine className="h-4 w-4" /> Outgoing ({outgoingRequests.filter(r => r.status === 'pending').length} pending)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <RequestList 
            requests={incomingRequests} 
            listType="incoming"
            onAccept={handleAccept}
            onDecline={handleDecline}
            onComplete={handleComplete}
          />
        </TabsContent>
        <TabsContent value="outgoing">
          <RequestList 
            requests={outgoingRequests} 
            listType="outgoing"
            onCancel={handleCancel}
            onComplete={handleComplete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
