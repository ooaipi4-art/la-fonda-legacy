import { UtensilsCrossed, Leaf, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Cocina Tradicional',
    description: 'Recetas transmitidas de generación en generación, preparadas con la técnica de siempre.',
  },
  {
    icon: Leaf,
    title: 'Ingredientes Selectos',
    description: 'Productos frescos y locales, cuidadosamente seleccionados para cada preparación.',
  },
  {
    icon: Heart,
    title: 'Atención Personalizada',
    description: 'Servicio cálido y familiar que te hace sentir como en casa desde el primer momento.',
  },
  {
    icon: Sparkles,
    title: 'Ambiente Moderno',
    description: 'Espacio renovado que combina comodidad y estilo para una experiencia única.',
  },
];

const WhySection = () => {
  return (
    <section id="especialidades" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              ¿Por qué elegirnos?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
              La Experiencia
              <span className="block italic text-primary/90">La Fonda</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-charcoal animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                    alt="Interior del restaurante"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-charcoal animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
                    alt="Chef preparando"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-xl overflow-hidden bg-charcoal animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400"
                    alt="Plato gourmet"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-charcoal animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
                    alt="Ambiente acogedor"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
