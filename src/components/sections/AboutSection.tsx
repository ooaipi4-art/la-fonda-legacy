import { Utensils, Leaf, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "Cocina Tradicional",
    description: "Recetas transmitidas de generación en generación",
  },
  {
    icon: Leaf,
    title: "Ingredientes Selectos",
    description: "Productos frescos y locales en cada preparación",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Servicio cálido que te hace sentir como en casa",
  },
  {
    icon: Sparkles,
    title: "Ambiente Moderno",
    description: "Espacio renovado que combina comodidad y estilo",
  },
];

export const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            La Experiencia La Fonda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Donde la tradición culinaria argentina se encuentra con la innovación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-fonda p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
