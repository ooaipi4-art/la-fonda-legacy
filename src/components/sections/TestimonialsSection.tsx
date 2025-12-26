import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    rating: 5,
    text: "La mejor comida casera de Mercedes. El locro es espectacular y la atención impecable. Volveré sin dudas.",
  },
  {
    name: "Carlos Ruiz",
    rating: 5,
    text: "Excelente relación calidad-precio. Las milanesas son enormes y deliciosas. Un clásico que nunca falla.",
  },
  {
    name: "Laura Fernández",
    rating: 5,
    text: "Ambiente familiar y moderno a la vez. Ideal para ir con familia o amigos. Los platos son abundantes y sabrosos.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-fonda p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
