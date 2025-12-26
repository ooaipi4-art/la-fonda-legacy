import { Link } from "react-router-dom";
import logoLaFonda from "@/assets/logo-lafonda.png";
import { Instagram, Facebook, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img
                src={logoLaFonda}
                alt="La Fonda"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-display text-2xl font-semibold text-foreground">
                La Fonda
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Donde la tradición se renueva cada día
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <nav className="space-y-2">
              <a
                href="#inicio"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Inicio
              </a>
              <a
                href="#menu"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Menú
              </a>
              <a
                href="#nosotros"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contacto
              </a>
            </nav>
          </div>

          {/* Redes */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-4">Seguinos</h4>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="tel:+5491112345678"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 La Fonda Restaurant. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
