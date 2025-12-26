import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contacto" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visitanos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Te esperamos para una experiencia gastronómica inolvidable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground">
                  Calle 25, Mercedes, Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                <a
                  href="tel:+5491112345678"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +54 9 11 1234-5678
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Horarios</h3>
                <p className="text-muted-foreground">
                  Lunes a Viernes: 12:00 - 15:00 | 20:00 - 23:30
                  <br />
                  Sábados y Domingos: 12:00 - 16:00 | 20:00 - 00:00
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/5491112345678?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido%20/%20reservar%20una%20mesa%20en%20La%20Fonda"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fonda inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className="card-fonda overflow-hidden h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3294.5!2d-59.43!3d-34.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM5JzAwLjAiUyA1OcKwMjUnNDguMCJX!5e0!3m2!1ses!2sar!4v1234567890"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de La Fonda"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
