import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '542324683636';
const RATE_LIMIT_KEY = 'reservation_last_submit';
const RATE_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

export const ReservationsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkRateLimit = () => {
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit) {
      const timePassed = Date.now() - parseInt(lastSubmit);
      if (timePassed < RATE_LIMIT_MS) {
        setCanSubmit(false);
        setRemainingTime(Math.ceil((RATE_LIMIT_MS - timePassed) / 1000));
      } else {
        setCanSubmit(true);
        setRemainingTime(0);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: 'Aceptá el compromiso',
        description: 'Debés aceptar el compromiso de puntualidad para continuar.',
        variant: 'destructive',
      });
      return;
    }

    if (!canSubmit) {
      toast({
        title: 'Esperá un momento',
        description: `Podés enviar otra reserva en ${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')} minutos.`,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Save rate limit timestamp
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Quiero hacer una reserva:\n\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📱 Teléfono: ${formData.phone}\n` +
      `📧 Email: ${formData.email}\n` +
      `📅 Fecha: ${formData.date}\n` +
      `🕐 Hora: ${formData.time}\n` +
      `👥 Personas: ${formData.guests}\n` +
      `${formData.message ? `📝 Notas: ${formData.message}\n` : ''}` +
      `\n✅ Acepto el compromiso de puntualidad.\n` +
      `\nDeclaro que los datos ingresados son reales y entiendo que las reservas falsas o el uso indebido del sistema pueden resultar en la cancelación de futuras reservas.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');

    toast({
      title: '¡Reserva enviada!',
      description: 'Te contactaremos para confirmar tu reserva.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      message: '',
    });
    setAcceptedTerms(false);
    setIsSubmitting(false);
    checkRateLimit();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.date && formData.time && acceptedTerms && canSubmit;

  return (
    <section id="reservas" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div>
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">
              Reservas
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Reservá tu Mesa
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Asegurá tu lugar en El Charret. Completá el formulario y nos comunicaremos para confirmar tu reserva por WhatsApp.
            </p>

            <div className="space-y-4">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Teléfono / WhatsApp</p>
                  <p className="text-muted-foreground">2324 683636</p>
                </div>
              </a>
              <a 
                href="https://www.instagram.com/elcharret/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Instagram className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-muted-foreground">@elcharret</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-8 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="2324..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Hora *
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 21:30"
                    pattern="[0-2]?[0-9]:[0-5][0-9]"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    <Users className="w-4 h-4 inline mr-1" />
                    Personas *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'persona' : 'personas'}
                      </option>
                    ))}
                    <option value="10+">Más de 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                  placeholder="Alergias, ocasión especial, preferencias..."
                />
              </div>

              {/* Commitment Section */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Compromiso de Puntualidad</h4>
                <p className="text-muted-foreground text-sm">
                  Al enviar esta reserva, confirmo que asistiré en el horario indicado.
                  En caso de demora mayor a 15 minutos, la mesa podrá ser liberada.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-input text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">
                    Me comprometo a asistir en el horario seleccionado y declaro que los datos ingresados son reales.
                  </span>
                </label>
              </div>

              <p className="text-xs text-muted-foreground">
                Por favor verificá que la información ingresada sea correcta.
                Las solicitudes de reserva están sujetas a validación y el sistema permite solo una solicitud cada 10 minutos.
              </p>

              {!canSubmit && (
                <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  ⏳ Podés enviar otra reserva en {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')} minutos.
                </p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full btn-charret-gold justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Reserva por WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
