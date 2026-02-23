import { getTeam } from '@/lib/pocketbase';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

export const metadata = { title: 'Nosotros | Nexo Contadores' };

const TEAM = [
    { name: 'Dr. Ricardo Fernández', role: 'Socio fundador', bio: 'Contador Público (UBA). Especialista en impuestos corporativos y reestructuraciones empresariales. Más de 25 años de experiencia.' },
    { name: 'Dra. Valeria Moreno', role: 'Socia — Área Laboral', bio: 'Contadora Pública (UADE). Especialista en derecho laboral y previsional. Referente en liquidación de sueldos para el sector gastronómico.' },
    { name: 'Lic. Martín Ibáñez', role: 'Contador Senior', bio: 'Licenciado en Administración (UNLZ). Responsable del área de PyMEs y monotributistas. Experto en Ingresos Brutos CABA y PBA.' },
];

const TIMELINE = [
    { year: '2003', text: 'Fundación del estudio con foco en PyMEs industriales.' },
    { year: '2008', text: 'Ampliación del equipo e incorporación del área laboral.' },
    { year: '2015', text: 'Apertura del servicio de auditoría para entidades financieras.' },
    { year: '2020', text: 'Digitalización completa del estudio. Atención 100% remota disponible.' },
    { year: '2024', text: 'Más de 300 clientes activos en toda Argentina.' },
];

export default async function AboutPage() {
    let team = TEAM;
    try {
        console.log('se intento buscar team')
        const res = await getTeam();
        console.log(res)

        if (res.length > 0) {
            team = res;
        }
    } catch (err) {
        console.error('PocketBase getTeam error:', err.message);
    }


    return (
        <>
            <section className="pt-32 pb-16" style={{ background: '#0f1f3d' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
                        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>El equipo</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Nosotros
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <Fade cascade triggerOnce duration={400}>

                <section className="py-20" style={{ background: '#f8f4ec' }}>
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
                                    Un estudio con historia y visión de futuro
                                </h2>
                                <p className="text-base leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                                    Nexo Contadores nació en 2003 con una premisa simple: que cada cliente sienta que tiene un contador de cabecera, alguien que conoce su negocio y lo acompaña a lo largo del tiempo.
                                </p>
                                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                                    Trabajamos con empresas de distintos sectores, profesionales independientes y emprendedores, brindando soluciones contables, impositivas y laborales adaptadas a cada realidad.
                                </p>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-0">
                                {TIMELINE.map(({ year, text }, i) => (
                                    <div key={year} className="flex gap-6 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: '#c9a84c' }} />
                                            {i < TIMELINE.length - 1 && <div className="w-px flex-1 my-1" style={{ background: '#ede8dc' }} />}
                                        </div>
                                        <div className="pb-8">
                                            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#c9a84c' }}>{year}</div>
                                            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>

            {/* Team */}
            <section className="py-20" style={{ background: '#fff' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
                            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Profesionales</span>
                        </div>
                        <h2 className="text-3xl font-bold" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>Nuestro equipo</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map(({ name, role, bio }) => (
                            <div key={name} className="p-8 rounded-sm" style={{ background: '#f8f4ec', border: '1px solid #ede8dc' }}>
                                <div className="w-14 h-14 rounded-sm mb-5 flex items-center justify-center text-xl font-bold" style={{ background: '#0f1f3d', color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}>
                                    {name.charAt(name.indexOf(' ') + 1)}
                                </div>
                                <h3 className="font-bold text-base mb-0.5" style={{ color: '#0f1f3d' }}>{name}</h3>
                                <div className="text-xs font-medium mb-3" style={{ color: '#c9a84c' }}>{role}</div>
                                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16" style={{ background: '#c9a84c' }}>
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>Trabajemos juntos</h3>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-sm" style={{ background: '#0f1f3d', color: '#fff' }}>
                        Contactar <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}