import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/5491234567890?text=Hola! Me gustaría hacer un pedido / reservar una mesa en La Fonda Restaurant', '_blank');
  };

  const openMaps = () => {
    window.open('https://maps.google.com/?q=Mercedes,Buenos+Aires,Argentina', '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Encontranos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contacto
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground">Calle Principal 123, Mercedes</p>
                <p className="text-muted-foreground">Buenos Aires, Argentina</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Teléfono</h3>
                <a
                  href="tel:+5491234567890"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +54 9 1234 567890
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Horarios</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p><span className="text-foreground/80">Lunes a Viernes:</span> 12:00 - 15:00 | 20:00 - 23:30</p>
                  <p><span className="text-foreground/80">Sábados y Domingos:</span> 12:00 - 16:00 | 20:00 - 00:00</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="whatsapp"
                size="xl"
                className="flex-1 gap-3"
                onClick={openWhatsApp}
              >
                <MessageCircle className="w-5 h-5" />
                Pedir por WhatsApp
              </Button>
              <Button
                variant="elegant"
                size="xl"
                className="flex-1 gap-3"
                onClick={openMaps}
              >
                <Navigation className="w-5 h-5" />
                Cómo Llegar
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-xl overflow-hidden bg-card border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26344.05982774392!2d-59.45!3d-34.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9e0c8c60c53d%3A0x8f1e3c7c7c7c7c7c!2sMercedes%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1703000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de La Fonda Restaurant"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
