import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import gsap from "gsap"; // Importar GSAP

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate logo when intro finishes
  useEffect(() => {
    const animateLogo = () => {
      if (!logoRef.current) return;
      
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out"
      });
    };

    window.addEventListener('intro-finished', animateLogo);
    return () => window.removeEventListener('intro-finished', animateLogo);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage
          ? 'bg-primary/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span
              ref={logoRef}
              className="font-display text-2xl md:text-3xl font-bold text-charret-white"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                filter: 'blur(8px)',
                display: 'inline-block',
                willChange: 'opacity, transform, filter'
              }}
            >
              El Charret
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {isHomePage && (
              <>
                <a href="#inicio" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Inicio</a>
                <a href="#nosotros" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Nosotros</a>
                <a href="#menu" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Menú</a>
                <a href="#galeria" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Galería</a>
                <a href="#reservas" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Reservas</a>
                <a href="#contacto" className="text-charret-white/90 hover:text-accent transition-colors font-medium">Contacto</a>
              </>
            )}
            {!isHomePage && (
              <Link
                to="/"
                className="text-charret-white/90 hover:text-accent transition-colors font-medium"
              >
                Volver al Inicio
              </Link>
            )}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-charret-white hover:text-accent transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-charret-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-primary/95 backdrop-blur-md border-t border-charret-brown-light">
            <div className="flex flex-col p-4 space-y-4">
              {isHomePage && (
                <>
                  <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Inicio</a>
                  <a href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Nosotros</a>
                  <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Menú</a>
                  <a href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Galería</a>
                  <a href="#reservas" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Reservas</a>
                  <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2">Contacto</a>
                </>
              )}
              {!isHomePage && (
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charret-white/90 hover:text-accent transition-colors font-medium py-2"
                >
                  Volver al Inicio
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};