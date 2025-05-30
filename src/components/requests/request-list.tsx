"use client";

import type { BarterRequest } from "@/types";
import { RequestCard } from "./request-card";
import { PackageOpen } from "lucide-react";

interface RequestListProps {
  requests: BarterRequest[];
  listType: "incoming" | "outgoing";
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
  onComplete?: (requestId: string) => void;
}

export function RequestList({ requests, listType, ...actions }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-center text-muted-foreground border-2 border-dashed rounded-lg">
        <PackageOpen className="h-12 w-12 mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold">No {listType} requests yet.</h3>
        <p className="text-sm">
          {listType === "incoming" 
            ? "When someone sends you a barter proposal, it will appear here."
            : "Propose a barter from a user's profile or the search page."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          currentUserPerspective={listType === "incoming" ? "to" : "from"}
          {...actions}
        />
      ))}
    </div>
  );
}
