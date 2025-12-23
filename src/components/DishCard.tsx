interface DishCardProps {
  image: string;
  name: string;
  description: string;
  delay?: number;
}

const DishCard = ({ image, name, description, delay = 0 }: DishCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover-lift animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DishCard;
