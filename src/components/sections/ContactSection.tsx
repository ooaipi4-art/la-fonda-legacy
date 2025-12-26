import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '¡Gracias por suscribirte!',
      description: 'Te enviaremos nuestras novedades y promociones.',
    });
    setEmail('');
  };

  return (
    <section id="contacto" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map & Info */}
          <div>
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">
              Encontranos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Visitanos
            </h2>

            {/* Map Embed */}
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d410.4741!2d-59.4301051!3d-34.6392294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc7357e1c12c21%3A0x8209cfca2d828e3d!2sEl%20Charret!5e0!3m2!1ses!2sar!4v1703000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de El Charret"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                  <a 
                    href="https://www.google.com/maps/place/El+Charret/@-34.6392294,-59.4301051,20.5z/data=!4m6!3m5!1s0x95bc7357e1c12c21:0x8209cfca2d828e3d!8m2!3d-34.6393114!4d-59.4300737!16s%2Fg%2F11xz5kfhr4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    Calle 50 y Héroes de Malvinas, Mercedes, Buenos Aires
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Teléfono / WhatsApp</h3>
                  <a 
                    href="https://wa.me/542324683636"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    2324 683636
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Horarios</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p><span className="font-medium text-foreground">Viernes:</span> Noche</p>
                    <p><span className="font-medium text-foreground">Sábado:</span> Mediodía y Noche</p>
                    <p><span className="font-medium text-foreground">Domingo:</span> Mediodía</p>
                    <p><span className="font-medium text-foreground">Lunes a Jueves:</span> Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
              <h3 className="font-display text-3xl font-bold mb-4">
                Suscribite a Nuestras Novedades
              </h3>
              <p className="text-primary-foreground/80 mb-8">
                Recibí promociones exclusivas, novedades del menú y enteráte primero de nuestros eventos especiales.
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-charret-brown-light/50 border border-charret-brown-light text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="btn-charret-gold px-6"
                  aria-label="Suscribirse"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>

              <p className="text-primary-foreground/60 text-sm mt-4">
                Al suscribirte aceptás recibir emails promocionales. Podés darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
