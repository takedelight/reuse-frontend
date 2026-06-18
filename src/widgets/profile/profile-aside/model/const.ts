import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import {
  RiSettings4Line,
  RiShieldKeyholeLine,
  RiUserLine,
} from "@remixicon/react";

export const ASIDE_LINKS = [
  {
    key: "profile.aside.links.profile",
    href: PAGES_CONFIG.PROFILE.HOME,
    icon: RiUserLine,
  },

  {
    key: "profile.aside.links.settings",
    href: PAGES_CONFIG.PROFILE.SETTINGS,
    icon: RiSettings4Line,
  },
  {
    key: "profile.aside.links.security",
    href: PAGES_CONFIG.PROFILE.SECURITY,
    icon: RiShieldKeyholeLine,
  },
];
