import { getSessionsAction, SessionItem } from "@/src/entity/session";
import { DeleteSession } from "@/src/features/delete-session";
import { LogoutOtherSessions } from "@/src/features/log-out-other-sessions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import { getTranslations } from "next-intl/server";

export const SessionsList = async () => {
  const sessions = await getSessionsAction();
  const t = await getTranslations("profile.sessions");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4 rounded-lg border p-4">
          {sessions
            .sort((a, b) => Number(b.isCurrent) - Number(a.isCurrent))
            .map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                deleteSlot={<DeleteSession sessionId={session.id} />}
              />
            ))}
        </ul>

        <div className="flex justify-end">
          <LogoutOtherSessions />
        </div>
      </CardContent>
    </Card>
  );
};
