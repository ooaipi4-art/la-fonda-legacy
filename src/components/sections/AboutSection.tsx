import { Flame, UtensilsCrossed, Award, Users } from 'lucide-react';

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Cocina Criolla',
    description: 'Sabores clásicos, recetas de siempre y el espíritu del asado argentino.',
  },
  {
    icon: Flame,
    title: 'Fuego y Tradición',
    description: 'La parrilla como protagonista, cuidando cada punto y cada detalle.',
  },
  {
    icon: Award,
    title: 'Calidad en Cada Plato',
    description: 'Ingredientes frescos y atención puesta en lo que realmente importa: el sabor.',
  },
  {
    icon: Users,
    title: 'Un Lugar para Compartir',
    description: 'Familias, amigos, celebraciones y encuentros que se disfrutan alrededor de la mesa.',
  },
];

export const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974"
                alt="Asado tradicional en El Charret"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">
              Nuestra Esencia
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              El Sabor del Encuentro
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              En El Charret creemos que comer bien es mucho más que sentarse a la mesa. Es compartir, disfrutar y sentirse como en casa. Nuestra parrilla nace del amor por la cocina criolla, el respeto por los sabores simples y el ritual del fuego que une a la gente.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Cada plato está pensado para homenajear la tradición argentina: carnes seleccionadas, recetas caseras y ese toque de parrilla que convierte cada comida en un momento especial. Acá no se viene solo a comer, se viene a vivir una experiencia auténtica.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
