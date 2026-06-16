import {
  RiArchiveStackLine,
  RiArticleLine,
  RiBookOpenLine,
  RiSettings3Line,
  RiTestTubeLine,
  RiUserLine,
  type RemixiconComponentType,
} from "@remixicon/react";

interface DrawerLink {
  key: string;
  href: string;
  icon: RemixiconComponentType;
}

export const DRAWER_ACCOUNT_LINKS: DrawerLink[] = [
  {
    key: "header.account_nav.links.profile",
    href: "/profile",
    icon: RiUserLine,
  },

  {
    key: "header.account_nav.links.settings",
    href: "/settings",
    icon: RiSettings3Line,
  },
];

export const HEADER_NAV_LINKS = [
  {
    key: "header.nav.links.library",
    href: "/library",
    icon: RiArchiveStackLine,
  },
  {
    key: "header.nav.links.learn",
    href: "/learn",
    icon: RiBookOpenLine,
  },
  {
    key: "header.nav.links.quiz",
    href: "/quiz",
    icon: RiTestTubeLine,
  },
  {
    key: "header.nav.links.blog",
    href: "/blog",
    icon: RiArticleLine,
  },
];
