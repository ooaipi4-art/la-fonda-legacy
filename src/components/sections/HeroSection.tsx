export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dpqgbgilw&public_id=Create_a_cinematic_1080p_202512260945_mnilud&profile=as&autoplay=true&loop=true&muted=true&controls=false"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          style={{ 
            transform: 'scale(1.5)',
            transformOrigin: 'center center'
          }}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Overlay oscuro para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]" />

      {/* Contenido */}
      <div className="relative z-10 container-custom text-center text-charret-white px-4">
        {/* Logo + Título */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img 
            src="/logo-charret.png" 
            alt="El Charret Logo" 
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-accent/30"
          />
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-lg">
            El Charret
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-charret-white/90 max-w-2xl mx-auto mb-8 font-light">
          Donde el fuego encuentra la tradición. Carnes al asador, empanadas criollas y el sabor auténtico del campo argentino.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="btn-charret-gold text-lg"
          >
            Ver Menú
          </a>
          <a
            href="#reservas"
            className="btn-charret-outline border-charret-white text-charret-white hover:bg-charret-white hover:text-primary text-lg"
          >
            Reservar Mesa
          </a>
        </div>
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};
