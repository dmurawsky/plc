"use client";

import Link from "next/link";
import { useState } from "react";

interface MenuLink {
  href: string;
  label: string;
  links?: Omit<MenuLink, "links">[];
}

const links: MenuLink[] = [
  {
    href: "/about-us",
    label: "About Us",
    links: [
      { href: "/officers", label: "Officers" },
      { href: "/committees", label: "Committees" },
      { href: "/staff", label: "Staff" },
      { href: "/history", label: "History" },
    ],
  },
  { href: "/protect", label: "Protect" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/support", label: "Support" },
  {
    href: "/news",
    label: "News",
    links: [
      { href: "/upcoming-events", label: "Upcoming Events!" },
      { href: "/newsletters", label: "Newsletters" },
    ],
  },
  { href: "/contact-us", label: "Contact Us" },
  {
    href: "/special-donations",
    label: "Special Donations",
    links: [
      { href: "/in-memory-of", label: "In Memory of" },
      { href: "/in-honor-of", label: "In Honor of" },
    ],
  },
  { href: "/donate", label: "Donate" },
];

function DropdownMenu({ subLinks }: { subLinks: Omit<MenuLink, "links">[] }) {
  return (
    <div className="absolute w-fit hidden group-hover:flex flex-col bg-white bg-opacity-95 text-green-800 shadow-lg z-50 rounded">
      {subLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-2 hover:bg-green-200 bg-opacity-95 whitespace-nowrap"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

interface MobileMenuProps {
  onClose: () => void;
}

function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="absolute inset-0 bg-green-800 text-white z-50 flex flex-col">
      <div className="flex justify-between p-4">
        <Link href="/" className="text-xl">
          Putnam Land Conservancy
        </Link>
        <button onClick={onClose}>Close</button>
      </div>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-4 border-b border-green-600"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      data-soil-id="Header"
      className="w-full bg-green-800 text-white p-4 flex justify-between items-center"
    >
      <div className="flex space-x-4">
        <Link href="/" className="text-xl">
          Putnam Land Conservancy
        </Link>

        {links.map((link) =>
          link.links ? (
            <div key={link.href} className="relative group hidden md:block">
              <Link href="/about-us">About Us</Link>
              <DropdownMenu subLinks={link.links} />
            </div>
          ) : (
            <Link key={link.href} href={link.href} className="hidden md:block">
              {link.label}
            </Link>
          )
        )}
      </div>
      <Link
        href="/donate"
        className="bg-white text-green-800 p-2 rounded hover:bg-zinc-200 hidden md:block"
      >
        Donate
      </Link>
      <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}
