import type { BarterRequest, UserProfile } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRightLeft, CheckCircle, XCircle, Clock, UserCircle } from "lucide-react";
import { SkillBadge } from "../shared/skill-badge";
import { cn } from "@/lib/utils";

interface RequestCardProps {
  request: BarterRequest;
  currentUserPerspective: "from" | "to"; // Is the current user the sender or receiver of this request
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
  onComplete?: (requestId: string) => void;
}

// Mock function to get user details, in real app this would be from context or props
const getMockUser = (userId: string, userName: string): Partial<UserProfile> => ({
  id: userId,
  name: userName,
  avatarUrl: `https://placehold.co/40x40.png?text=${userName.substring(0,1)}`,
});


export function RequestCard({ request, currentUserPerspective, onAccept, onDecline, onCancel, onComplete }: RequestCardProps) {
  const otherUser = currentUserPerspective === "from" 
    ? getMockUser(request.toUserId, request.toUserName) 
    : getMockUser(request.fromUserId, request.fromUserName);

  const statusColors = {
    pending: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
    accepted: "text-green-500 border-green-500/50 bg-green-500/10",
    declined: "text-red-500 border-red-500/50 bg-red-500/10",
    completed: "text-blue-500 border-blue-500/50 bg-blue-500/10",
    cancelled: "text-gray-500 border-gray-500/50 bg-gray-500/10",
  };

  const StatusIcon = ({ status }: { status: BarterRequest["status"] }) => {
    switch (status) {
      case "accepted": return <CheckCircle className="h-4 w-4" />;
      case "declined": return <XCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />; // Or a different icon for completed
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />; // pending
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint="person avatar"/>
              <AvatarFallback>{otherUser.name?.substring(0, 2).toUpperCase() || <UserCircle />}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{otherUser.name}</CardTitle>
              <CardDescription>
                {currentUserPerspective === "from" ? "Sent to" : "Received from"} {otherUser.name}
              </CardDescription>
            </div>
          </div>
          <div className={cn("text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1", statusColors[request.status])}>
            <StatusIcon status={request.status} />
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 border rounded-md bg-muted/20">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">You Offer:</p>
            <SkillBadge skill={currentUserPerspective === "from" ? request.offeredSkill : request.wantedSkill} />
          </div>
          <ArrowRightLeft className="h-5 w-5 text-primary mx-0 my-2 sm:mx-4 sm:my-0 transform sm:rotate-0 rotate-90" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">You Want:</p>
            <SkillBadge skill={currentUserPerspective === "from" ? request.wantedSkill : request.offeredSkill} variant="outline"/>
          </div>
        </div>
        {request.message && (
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Message:</p>
            <p className="text-sm p-2 border rounded-md bg-background">{request.message}</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Requested on: {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-4 border-t">
        {request.status === "pending" && currentUserPerspective === "to" && onAccept && onDecline && (
          <>
            <Button size="sm" onClick={() => onAccept(request.id)} className="bg-green-600 hover:bg-green-700 text-white">Accept</Button>
            <Button size="sm" variant="destructive" onClick={() => onDecline(request.id)}>Decline</Button>
          </>
        )}
        {request.status === "pending" && currentUserPerspective === "from" && onCancel && (
          <Button size="sm" variant="outline" onClick={() => onCancel(request.id)}>Cancel Request</Button>
        )}
        {request.status === "accepted" && onComplete && (
          <Button size="sm" onClick={() => onComplete(request.id)} className="bg-blue-600 hover:bg-blue-700 text-white">Mark as Completed</Button>
        )}
         {/* Add more buttons for other statuses if needed, e.g., "View Chat" */}
      </CardFooter>
    </Card>
  );
}
