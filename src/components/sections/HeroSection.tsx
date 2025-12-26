import logoLaFonda from "@/assets/logo-lafonda.png";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920')` 
        }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background z-[1]" />

      {/* Contenido */}
      <div className="relative z-10 container text-center text-foreground px-4 animate-fade-in">
        {/* Logo + Título */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <img 
            src={logoLaFonda} 
            alt="La Fonda Logo" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-2 border-primary/30"
          />
          <div>
            <p className="text-muted-foreground text-lg mb-2 tracking-widest uppercase">Bienvenidos a</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-lg">
              La Fonda
            </h1>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
          Cocina tradicional argentina con alma moderna
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="btn-fonda text-lg"
          >
            Explorar Menú
          </a>
          <a
            href="https://wa.me/5491112345678?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fonda-outline text-lg"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};
