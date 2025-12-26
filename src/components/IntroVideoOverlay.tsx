import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export default function IntroVideoOverlay() {
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const overlay = document.createElement("div");
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      backgroundColor: "#000",
      zIndex: "9999",
      overflow: "hidden",
      pointerEvents: "none",
    });

    setMounted(true);

    // Mover la inicialización de GSAP aquí, después de que el componente se ha montado
    // y el logoRef.current debería estar disponible.
    if (logoRef.current) {
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.9,
        filter: "blur(10px)",
        clipPath: "circle(0% at 50% 50%)",
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new Event("intro-finished")); // Disparar evento al finalizar
        overlay.remove(); // CLAVE: se va sí o sí
      },
    });

    /* =========================
       VIDEO – NO SE TOCA
       ========================= */
    tl.to(
      iframeRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      6.3 // ⏱ apenas antes de que termine
    );

    /* =========================
       LOGO ENTRADA (overlay)
       ========================= */
    tl.to(
      logoRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      },
      6.3
    );

    tl.to(
      logoRef.current,
      {
        clipPath: "circle(100% at 50% 50%)",
        duration: 0.6,
        ease: "power2.out",
      },
      7.0
    );

    /* =========================
       OVERLAY OUT
       ========================= */
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      7.4
    );

    return () => {
      tl.kill();
      overlay.remove();
    };
  }, []);

  if (!mounted || !overlayRef.current) return null;

  return createPortal(
    <>
      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/grain.png')",
          opacity: 0.04,
          zIndex: 1,
        }}
      />

      {/* Video */}
      <iframe
        ref={iframeRef}
        src="https://player.cloudinary.com/embed/?cloud_name=dpqgbgilw&public_id=INTRO-Lacarreta_ygd59b&autoplay=true&muted=true&controls=false&loop=false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "120vw",
          height: "120vh",
          transform: "translate(-50%, -50%)",
          border: "none",
          zIndex: 2,
        }}
        allow="autoplay"
      />

      {/* Logo (overlay) */}
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Logo"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 220,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </>,
    overlayRef.current
  );
}