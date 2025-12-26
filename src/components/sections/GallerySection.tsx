import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031',
    alt: 'Asado tradicional',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?q=80&w=2070',
    alt: 'Interior del restaurante',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070',
    alt: 'Plato de carne',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974',
    alt: 'Empanadas caseras',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
    alt: 'Ambiente nocturno',
    span: 'col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070',
    alt: 'Vino tinto',
    span: '',
  },
];

export const GallerySection = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section id="galeria" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Nuestro Espacio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Galería
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conocé nuestro ambiente cálido y acogedor, donde cada rincón cuenta una historia de tradición y pasión por la gastronomía.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative overflow-hidden rounded-lg cursor-pointer group',
                image.span
              )}
              onClick={() => setLightboxImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charret-black/0 group-hover:bg-charret-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-charret-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-charret-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-charret-white hover:text-accent transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Galería"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
};