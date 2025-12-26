import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Necesito hacer reserva?',
    answer:
      'Recomendamos hacer reserva especialmente para fines de semana y grupos grandes. Sin embargo, también aceptamos clientes sin reserva según disponibilidad.',
  },
  {
    question: '¿Cuáles son los medios de pago?',
    answer:
      'Aceptamos efectivo, todas las tarjetas de crédito y débito, Mercado Pago y transferencia bancaria.',
  },
  {
    question: '¿Tienen opciones vegetarianas?',
    answer:
      'Sí, ofrecemos ensaladas, pastas y guarniciones para quienes prefieren opciones sin carne. Consultá con nuestro mozo las opciones del día.',
  },
  {
    question: '¿Hacen eventos privados?',
    answer:
      'Contamos con un salón privado para eventos de hasta 30 personas. Ideal para cumpleaños, reuniones empresariales o celebraciones especiales.',
  },
  {
    question: '¿Tienen estacionamiento?',
    answer:
      'Sí, contamos con estacionamiento propio gratuito para nuestros clientes con capacidad para 20 vehículos.',
  },
  {
    question: '¿Hacen delivery?',
    answer:
      'Sí, hacemos delivery en nuestra zona de cobertura. También podés pasar a retirar tu pedido por el local.',
  },
  {
    question: '¿Los niños son bienvenidos?',
    answer:
      'Absolutamente. Somos un restaurante familiar. Contamos con menú infantil, tronas y un espacio seguro para los más pequeños.',
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            ¿Tenés Dudas?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Respondemos las consultas más comunes de nuestros clientes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};