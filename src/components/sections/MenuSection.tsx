const dishes = [
  {
    name: "Locro de La Fonda",
    description: "Guiso tradicional con maíz, porotos y carne, cocido a fuego lento",
    price: "$10.500",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600",
  },
  {
    name: "Milanesa Napolitana",
    description: "Suprema de ternera, jamón, salsa y mozzarella gratinada",
    price: "$21.000",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=600",
  },
  {
    name: "Empanadas Artesanales",
    description: "Selección de sabores: carne, pollo, humita y jamón y queso",
    price: "$3.500 c/u",
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?q=80&w=600",
  },
  {
    name: "Asado Criollo",
    description: "Cortes selectos a la parrilla con chimichurri casero",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600",
  },
  {
    name: "Pastas Caseras",
    description: "Ñoquis, ravioles y tallarines con salsas de autor",
    price: "Desde $9.000",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=600",
  },
  {
    name: "Postres del Día",
    description: "Flan casero, tiramisú o especialidades de temporada",
    price: "Desde $7.000",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600",
  },
];

export const MenuSection = () => {
  return (
    <section id="menu" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Platos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubrí nuestra selección de platos tradicionales argentinos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="card-fonda overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {dish.name}
                  </h3>
                  <span className="text-primary font-medium text-sm">
                    {dish.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contacto" className="btn-fonda-outline">
            Ver Menú Completo
          </a>
        </div>
      </div>
    </section>
  );
};
