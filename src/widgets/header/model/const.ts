import { PAGES_CONFIG } from "@/src/shared/configs/pages";
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
    href: PAGES_CONFIG.PROFILE.HOME,
    icon: RiUserLine,
  },

  {
    key: "header.account_nav.links.settings",
    href: PAGES_CONFIG.PROFILE.SETTINGS,
    icon: RiSettings3Line,
  },
];

export const HEADER_NAV_LINKS = [
  {
    key: "header.nav.links.library",
    href: PAGES_CONFIG.LIBRARY,
    icon: RiArchiveStackLine,
  },
  {
    key: "header.nav.links.learn",
    href: PAGES_CONFIG.LEARN,
    icon: RiBookOpenLine,
  },
  {
    key: "header.nav.links.quiz",
    href: PAGES_CONFIG.QUIZ,
    icon: RiTestTubeLine,
  },
  {
    key: "header.nav.links.blog",
    href: PAGES_CONFIG.BLOG,
    icon: RiArticleLine,
  },
];
