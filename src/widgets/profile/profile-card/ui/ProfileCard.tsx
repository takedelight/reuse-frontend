import { getCurrentUser, UserSummary } from "@/src/entity/user";
import { Card, CardContent, CardHeader } from "@/src/shared/ui";

export const ProfileCard = async () => {
  const user = await getCurrentUser();
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <UserSummary
          classNames={{
            avatar: "size-22",
            fallback: "text-3xl",
            username: "text-lg",
            email: "text-sm",
          }}
          user={user}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Subscription & Limits
          </h3>
          <div className="w-full h-24 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
            [Subscription Level & Code Review Limits]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Gamification & Progress
            </h3>
            <div className="w-full h-32 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              [Streak 🔥, XP Progress, Current Level]
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Skill Matrix
            </h3>
            <div className="w-full h-32 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              [Tech Stack Levels - HTML/CSS/JS/TS/React]
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Mentor Dashboard (Conditional)
          </h3>
          <div className="w-full h-28 rounded-lg border border-dashed border-destructive/30 bg-destructive/5 flex items-center justify-center text-xs text-muted-foreground">
            [Mentor Stats: Earnings, Reviews Queue, Payout Button]
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Active Tasks & Code Reviews
          </h3>
          <div className="w-full h-24 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
            [Active Code Review Status & Mentor Feedback Link]
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
