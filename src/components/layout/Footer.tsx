import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-charret.png" 
                alt="El Charret" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="font-display text-2xl font-bold">El Charret</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Tradición y sabor criollo. Carnes al asador, empanadas y el mejor ambiente campero.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/elcharret/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charret-brown-light flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-accent">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#menu" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Nuestro Menú
                </a>
              </li>
              <li>
                <a href="#reservas" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Reservas
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-accent">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a 
                  href="https://wa.me/542324683636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  2324 683636
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/place/El+Charret/@-34.6392294,-59.4301051,20.5z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Calle 50 y Héroes de Malvinas, Mercedes, Buenos Aires
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-accent">Horarios</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Viernes</p>
                  <p className="text-sm">Noche</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent opacity-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Sábado</p>
                  <p className="text-sm">Mediodía y Noche</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent opacity-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Domingo</p>
                  <p className="text-sm">Mediodía</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent opacity-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Lun - Jue</p>
                  <p className="text-sm">Cerrado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-charret-brown-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} El Charret. Todos los derechos reservados.
            </p>
            
            {/* WorkEngine Branding */}
            <a 
              href="https://workengine-launchpad-main.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary-foreground/50 hover:text-primary-foreground/80 transition-all duration-300 group"
            >
              <img 
                src="/workengine-logo.png" 
                alt="WorkEngine" 
                className="w-8 h-8 object-contain opacity-60 group-hover:opacity-90 transition-opacity"
              />
              <span className="text-xs">Desarrollado por WorkEngine.Corp</span>
            </a>
          </div>
          
          {/* CTA */}
          <div className="mt-4 flex justify-center md:justify-end">
            <a 
              href="https://workengine-launchpad-main.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/40 hover:text-accent border border-primary-foreground/20 hover:border-accent/50 px-4 py-2 rounded-full transition-all duration-300"
            >
              Profesionalice su marca
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
