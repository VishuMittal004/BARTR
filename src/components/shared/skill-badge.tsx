import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps extends BadgeProps {
  skill: string;
}

export function SkillBadge({ skill, className, ...props }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("font-normal", className)} {...props}>
      {skill}
    </Badge>
  );
}
