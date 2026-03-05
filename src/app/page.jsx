import Link from 'next/link';
import { ArrowRight, Shield, Clock, Award, Users } from 'lucide-react';
import { getServices } from '@/lib/pocketbase';
import HomeAnimations from '@/components/animations/HomeAnimations';

const FALLBACK_SERVICES = [
  { id: 1, name: 'Asesoramiento Impositivo', description: 'Liquidación de impuestos nacionales y provinciales. Planificación fiscal para minimizar su carga tributaria.' },
  { id: 2, name: 'Liquidación de Sueldos', description: 'Gestión completa de nómina, AFIP, ANSES y sindicatos. Altas y bajas de personal.' },
  { id: 3, name: 'Auditoría Contable', description: 'Revisión y certificación de estados contables. Informes para bancos y organismos oficiales.' },
  { id: 4, name: 'Constitución de Sociedades', description: 'Armado y registro de SRL, SA y otras estructuras societarias. IGJ y DPPJ.' },
];

const STATS = [
  { value: '+20', label: 'Años de experiencia' },
  { value: '+300', label: 'Clientes activos' },
  { value: '5', label: 'Contadores matriculados' },
  { value: '100%', label: 'Satisfacción garantizada' },
];

async function ServicesFromPB() {
  let services = FALLBACK_SERVICES;
  try {
    const res = await getServices();
    if (res.length > 0) services = res.slice(0, 4);
  } catch { }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((s, i) => (
        <div key={s.id || i} className="p-6 rounded-sm group hover:-translate-y-1 transition-transform duration-300" style={{ background: '#fff', border: '1px solid #ede8dc' }}>
          <div className="w-8 h-1 mb-4 rounded-full" style={{ background: '#c9a84c' }} />
          <h3 className="font-semibold text-base mb-2" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>{s.name}</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <>
      {/* HERO */}
      <HomeAnimations stats={STATS}>
        <section
          className="relative min-h-screen"
          style={{ background: 'linear-gradient(135deg, #0f1f3d 0%, #1a3260 60%, #0f1f3d 100%)' }}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute right-0 top-[-200px] w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />

          <div className="px-5 pt-24 md:mx-[7%] md:pt-42">
            <div data-hero-eyebrow className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#c9a84c' }}>
                Estudio Contable — Desde 2003
              </span>
            </div>
            <h1 data-hero-title className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6" style={{ color: '#fff', fontFamily: 'Playfair Display, serif' }}>
              Su patrimonio,<br />
              <em className="not-italic" style={{ color: '#c9a84c' }}>nuestra responsabilidad.</em>
            </h1>
            <p data-hero-subtitle className="text-base md:text-xl leading-relaxed mb-8 md:mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Asesoramiento contable, impositivo y laboral para empresas y profesionales que buscan claridad y tranquilidad financiera.
            </p>
            <div data-hero-cta className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-sm transition-opacity hover:opacity-90" style={{ background: '#c9a84c', color: '#0f1f3d' }}>
                Consulta gratuita <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-medium text-sm rounded-sm transition-colors" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </HomeAnimations>

      {/* SERVICES PREVIEW */}
      <section className="py-24" style={{ background: '#f8f4ec' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Nuestros servicios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
              Soluciones integrales<br />para su empresa
            </h2>
          </div>
          <ServicesFromPB />
          <div className="mt-10 text-center">
            <Link href="/services" scroll={true} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#c9a84c' }}>
              Ver todos los servicios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24" style={{ background: '#fff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
                <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Por qué elegirnos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
                Experiencia que se traduce en resultados
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                Somos un equipo de contadores matriculados con especialización en PyMEs, profesionales independientes y emprendedores. Conocemos la realidad impositiva argentina y trabajamos para que usted pague lo justo.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Confidencialidad absoluta en toda la información' },
                  { icon: Clock, text: 'Respuesta en menos de 24 horas hábiles' },
                  { icon: Award, text: 'Profesionales matriculados FACPCE' },
                  { icon: Users, text: 'Atención personalizada, no somos una fábrica' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: '#f8f4ec' }}>
                      <Icon className="w-4 h-4" style={{ color: '#c9a84c' }} />
                    </div>
                    <span className="text-sm" style={{ color: '#2d2d2d' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-sm p-10 text-white" style={{ background: '#0f1f3d' }}>
                <div className="text-6xl font-bold mb-2" style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}>20+</div>
                <div className="text-lg font-semibold mb-4">años de trayectoria</div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Desde 2003 acompañamos el crecimiento de cientos de empresas y profesionales en Argentina.
                </p>
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#c9a84c' }}>
                    Conocer el equipo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-sm -z-10" style={{ border: '1px solid #c9a84c', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#c9a84c' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
            ¿Necesita asesoramiento contable?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(15,31,61,0.75)' }}>
            La primera consulta es sin cargo. Hablemos de su situación y encontremos la mejor solución.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm rounded-sm transition-opacity hover:opacity-90" style={{ background: '#0f1f3d', color: '#fff' }}>
            Contactar ahora <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}