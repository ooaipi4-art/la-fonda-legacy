import { Button } from '@/components/ui/button';
import DishCard from '@/components/DishCard';
import dishLocro from '@/assets/dish-locro.jpg';
import dishMilanesa from '@/assets/dish-milanesa.jpg';
import dishEmpanadas from '@/assets/dish-empanadas.jpg';
import dishAsado from '@/assets/dish-asado.jpg';
import dishPasta from '@/assets/dish-pasta.jpg';
import dishPostre from '@/assets/dish-postre.jpg';

const featuredDishes = [
  {
    image: dishLocro,
    name: 'Locro de La Fonda',
    description: 'Guiso tradicional con maíz, porotos y carne, cocido a fuego lento durante horas.',
  },
  {
    image: dishMilanesa,
    name: 'Milanesa Napolitana',
    description: 'Suprema de ternera, jamón, salsa de tomate y mozzarella gratinada.',
  },
  {
    image: dishEmpanadas,
    name: 'Empanadas Artesanales',
    description: 'Selección de sabores: carne, pollo, humita y jamón y queso.',
  },
  {
    image: dishAsado,
    name: 'Asado Criollo',
    description: 'Cortes selectos a la parrilla con chimichurri casero.',
  },
  {
    image: dishPasta,
    name: 'Pastas Caseras',
    description: 'Ñoquis, ravioles y tallarines con salsas de autor.',
  },
  {
    image: dishPostre,
    name: 'Postres de la Casa',
    description: 'Flan casero, tiramisú o especialidades de temporada.',
  },
];

const MenuSection = () => {
  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="menu" className="py-24 bg-background relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Nuestras Especialidades
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Platos Destacados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
            Descubrí los sabores que nos distinguen. Cada plato es una celebración 
            de la tradición culinaria argentina con un toque contemporáneo.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredDishes.map((dish, index) => (
            <DishCard
              key={dish.name}
              image={dish.image}
              name={dish.name}
              description={dish.description}
              delay={index * 100}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="elegant"
            size="xl"
            onClick={scrollToContact}
          >
            Ver Menú Completo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
