import {
  RiChromeLine,
  RiCompassLine,
  RiEdgeLine,
  RiFirefoxLine,
  RiGlobalLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { type Session } from "../model/schemas/session.schema";

interface SessionItemProps {
  session: Session;
  deleteSlot: ReactNode;
}

const renderBrowserIcon = (browserName: string | null | undefined) => {
  const className = "text-2xl text-muted-foreground  shrink-0";

  if (!browserName) return <RiGlobalLine className={className} />;

  switch (browserName.toLowerCase()) {
    case "chrome":
    case "chromium":
      return <RiChromeLine className={className} />;
    case "firefox":
      return <RiFirefoxLine className={className} />;
    case "safari":
      return <RiCompassLine className={className} />;
    case "edge":
      return <RiEdgeLine className={className} />;
    default:
      return <RiGlobalLine className={className} />;
  }
};

export const SessionItem = ({ session, deleteSlot }: SessionItemProps) => {
  const t = useTranslations("profile.sessions");

  return (
    <li className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {renderBrowserIcon(session.userAgent)}

        <div className="flex flex-col">
          <span className="text-sm font-semibold flex items-center flex-wrap gap-2">
            {session.userAgent || "Unknown Browser"} on {session.device}
            {session.isCurrent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                {t("current_session")}
              </span>
            )}
          </span>
          <span className="text-xs text-muted-foreground">
            {session.ip_address} • {t("expires_on")}{" "}
            {Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(session.expires))}
          </span>
        </div>
      </div>

      {!session.isCurrent && deleteSlot}
    </li>
  );
};
