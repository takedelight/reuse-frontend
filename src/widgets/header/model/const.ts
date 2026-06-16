import {
  RiArchiveStackLine,
  RiBookOpenLine,
  RiTestTubeLine,
  RiUserLine,
  RiHeartLine,
  RiChat3Line,
  RiSettings3Line,
  RiArticleLine,
  type RemixiconComponentType,
} from "@remixicon/react";

interface DrawerLink {
  alias: string;
  href: string;
  icon: RemixiconComponentType;
}

export const DRAWER_ACCOUNT_LINKS: DrawerLink[] = [
  {
    alias: "Profile",
    href: "/profile",
    icon: RiUserLine,
  },
  {
    alias: "Favorites",
    href: "/favorites",
    icon: RiHeartLine,
  },
  {
    alias: "Messages",
    href: "/messages",
    icon: RiChat3Line,
  },
  {
    alias: "Settings",
    href: "/settings",
    icon: RiSettings3Line,
  },
];

export const HEADER_NAV_LINKS = [
  {
    alias: "Resources",
    href: "/resources",
    icon: RiArchiveStackLine,
  },
  {
    alias: "Learn",
    href: "/learn",
    icon: RiBookOpenLine,
  },
  {
    alias: "Practice",
    href: "/practice",
    icon: RiTestTubeLine,
  },
  {
    alias: "Blog",
    href: "/blog",
    icon: RiArticleLine,
  },
];
