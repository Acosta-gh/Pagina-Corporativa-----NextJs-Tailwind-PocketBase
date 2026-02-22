import ContactForm from '@/components/sections/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = { title: 'Contacto | Nexo Contadores' };

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: '#0f1f3d' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Hablemos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contacto
          </h1>
        </div>
      </section>

      <section className="py-20" style={{ background: '#f8f4ec' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
                La primera consulta es sin cargo
              </h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: '#6b7280' }}>
                Cuéntenos su situación y le responderemos dentro de las 24 horas hábiles con una propuesta adaptada a sus necesidades.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Dirección', value: 'Av. Corrientes 1234, Piso 5\nBuenos Aires, Argentina' },
                  { icon: Phone, label: 'Teléfono', value: '+54 11 4321-0000' },
                  { icon: Mail, label: 'Email', value: 'info@nexocontadores.com.ar' },
                  { icon: Clock, label: 'Horario', value: 'Lunes a viernes de 9 a 18 hs.' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: '#0f1f3d' }}>
                      <Icon className="w-4 h-4" style={{ color: '#c9a84c' }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#c9a84c' }}>{label}</div>
                      <div className="text-sm whitespace-pre-line" style={{ color: '#2d2d2d' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}