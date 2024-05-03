"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック

// roleプロパティをオプショナルで受け取る
const NavLinks = ({
  role,
  className,
  session,
}: {
  role?: string;
  className?: string;
  session?: boolean;
}) => {
  const links = [
    { label: "Home", href: "/", session: false, loggedIn: true },
    { label: "About", href: "/about", session: false, loggedIn: true  },
    { label: "Songs", href: "/songs", session: true, loggedIn: true  }, 
    { label: "Contact", href: "/contact", session: true, loggedIn: true  },
    { label: "Profile", href: "/profile", session: false, loggedIn: false },
    { label: "Login", href: "/login", session: false, loggedIn: false },
    { label: "Tickets", href: "/tickets", session: false, loggedIn: false },

  ];

  const currentPath = usePathname();

  return (
    <div className="flex gap-4">
      {links
        // .filter((link) => !link.adminOnly || role === "ADMIN") // adminOnlyがtrueのリンクはADMINロールのみ表示
        .filter((link) => !link.session || link.session === session) // ログインしている場合のみ表示
        .map((link) => (
          <Link
            href={link.href}
            className={`${className} ${
              currentPath == link.href
                ? "cursor-default shadow-1 text-primary/70 hover:text-primary/60"
                : ""
            }`}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
};

export default NavLinks;
