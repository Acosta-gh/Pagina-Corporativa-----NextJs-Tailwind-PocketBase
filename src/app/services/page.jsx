import { getServices } from '@/lib/pocketbase';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FALLBACK = [
    { id: 1, name: 'Asesoramiento Impositivo', description: 'Liquidación mensual de IVA, Ganancias, Ingresos Brutos y otros tributos nacionales y provinciales. Planificación fiscal preventiva.', features: ['IVA mensual', 'Declaración jurada anual', 'Bienes Personales', 'Ingresos Brutos'] },
    { id: 2, name: 'Liquidación de Sueldos', description: 'Gestión integral de nómina: liquidación de haberes, cargas sociales, presentaciones ante AFIP y obras sociales.', features: ['Recibos de sueldo', 'F.931 AFIP', 'Altas y bajas ANSES', 'Vacaciones y aguinaldo'] },
    { id: 3, name: 'Auditoría Contable', description: 'Revisión, certificación y presentación de estados contables ante organismos públicos, bancos y entidades financieras.', features: ['Estados contables', 'Informes especiales', 'Due diligence', 'Certificaciones bancarias'] },
    { id: 4, name: 'Constitución de Sociedades', description: 'Armado y registro de SRL, SA, SAS y otras estructuras societarias ante IGJ, DPPJ y AFIP.', features: ['SRL / SA / SAS', 'Inscripción IGJ', 'Alta en AFIP', 'Contratos sociales'] },
    { id: 5, name: 'Trámites AFIP', description: 'Gestión de altas, bajas y modificaciones ante AFIP. Habilitación como Monotributista, Responsable Inscripto o Exento.', features: ['Alta Monotributo', 'Cambio de categoría', 'IVA Responsable', 'Certificados'] },
    { id: 6, name: 'Asesoramiento Laboral', description: 'Consultoría en derecho laboral: modalidades de contratación, desvinculaciones, conflictos sindicales y preventivos.', features: ['Contratos de trabajo', 'Desvinculaciones', 'Convenios colectivos', 'Accidentes de trabajo'] },
];

export const metadata = {
    title: 'Servicios | Nexo Contadores',
};

export default async function ServicesPage() {
    let services = FALLBACK;
    try {
        console.log('se intento buscar services')
        const res = await getServices();
        console.log(res)

        if (res.length > 0) {
            const formattedServices = res.map(s => ({
                id: s.id,
                name: s.name,
                description: s.description,
                features: s.features
                    ? s.features.split(',').map(f => f.trim()) 
                    : [],
            }));
            services = formattedServices;
        }
    } catch { }

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-16" style={{ background: '#0f1f3d' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
                        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Lo que hacemos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Nuestros Servicios
                    </h1>
                </div>
            </section>

            {/* Services grid */}
            <section className="py-20" style={{ background: '#f8f4ec' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <div key={s.id || i} className="bg-white rounded-sm p-8 group hover:shadow-lg transition-shadow duration-300" style={{ border: '1px solid #ede8dc' }}>
                                <div className="w-8 h-1 mb-5 rounded-full" style={{ background: '#c9a84c' }} />
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>{s.name}</h3>
                                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>{s.description}</p>
                                {s.features && (
                                    <ul className="space-y-2">
                                        {(Array.isArray(s.features) ? s.features : []).map((f, fi) => (
                                            <li key={fi} className="flex items-center gap-2 text-xs" style={{ color: '#2d2d2d' }}>
                                                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c9a84c' }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center p-12 rounded-sm" style={{ background: '#0f1f3d' }}>
                        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>¿No encontró lo que busca?</h3>
                        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>Contáctenos y analizamos su situación sin compromiso.</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-sm" style={{ background: '#c9a84c', color: '#0f1f3d' }}>
                            Consultar <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}