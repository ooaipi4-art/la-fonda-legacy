import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    text: 'La mejor comida casera de Mercedes. El locro es espectacular y la atención impecable. Volveré sin dudas.',
    rating: 5,
  },
  {
    name: 'Carlos Ruiz',
    text: 'Excelente relación calidad-precio. Las milanesas son enormes y deliciosas. Un clásico que nunca falla.',
    rating: 5,
  },
  {
    name: 'Laura Fernández',
    text: 'Ambiente familiar y moderno a la vez. Ideal para ir con familia o amigos. Los platos son abundantes y sabrosos.',
    rating: 5,
  },
];

const TestimonialCard = ({ name, text, rating, delay }: { name: string; text: string; rating: number; delay: number }) => {
  return (
    <div
      className="relative p-8 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground/90 mb-6 font-sans leading-relaxed">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <span className="font-medium text-foreground">{name}</span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Lo que dicen de nosotros
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Testimonios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              text={testimonial.text}
              rating={testimonial.rating}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
