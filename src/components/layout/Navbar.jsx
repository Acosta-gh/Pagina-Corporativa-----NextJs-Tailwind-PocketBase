"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/about', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15,31,61,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: '#c9a84c' }}>
            <span className="font-bold text-sm" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>N</span>
          </div>
          <span className="font-semibold tracking-wide text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Nexo <span style={{ color: '#c9a84c' }}>Contadores</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: pathname === href ? '#c9a84c' : 'rgba(255,255,255,0.8)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-semibold px-5 py-2 rounded-sm transition-all duration-200 hover:opacity-90"
            style={{ background: '#c9a84c', color: '#0f1f3d' }}
          >
            Consulta gratis
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6" style={{ background: '#0f1f3d' }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm border-b"
              style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}