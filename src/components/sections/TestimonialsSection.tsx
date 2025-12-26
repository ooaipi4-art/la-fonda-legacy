import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Cliente frecuente',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974',
    rating: 5,
    text: 'El mejor asado de Buenos Aires, sin dudas. El ambiente es increíble, te transporta al campo. Venimos en familia cada vez que podemos.',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Empresario',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974',
    rating: 5,
    text: 'Llevé a clientes extranjeros y quedaron fascinados. Las empanadas son espectaculares y el servicio impecable. Muy recomendable.',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Food blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070',
    rating: 5,
    text: 'Como especialista en gastronomía, puedo decir que El Charret representa lo mejor de nuestra cocina criolla. Calidad, tradición y sabor auténtico.',
  },
  {
    id: 4,
    name: 'Roberto Fernández',
    role: 'Chef',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070',
    rating: 5,
    text: 'Como colega, admiro su respeto por las técnicas tradicionales. El manejo del fuego y los cortes es de los mejores que he probado.',
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-accent/20" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-accent">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground text-lg md:text-xl italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-display font-bold text-xl text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? 'bg-accent' : 'bg-border'
                  }`}
                  aria-label={`Ir a testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};