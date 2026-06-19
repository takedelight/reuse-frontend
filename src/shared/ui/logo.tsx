import { PAGES_CONFIG } from "../configs/pages";
import { Link } from "../i18n";

export const Logo = () => {
  return (
    <Link
      href={PAGES_CONFIG.HOME}
      className="font-bold text-xl tracking-wide group"
    >
      <span className="text-primary transition-colors">re</span>
      <span className="text-muted-foreground mx-0.5 transition-colors">:</span>
      <span className="text-foreground transition-colors">use</span>
    </Link>
  );
};
