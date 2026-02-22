import Link from 'next/link';
import { getPosts } from '@/lib/pocketbase';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = { title: 'Blog | Nexo Contadores' };

const FALLBACK_POSTS = [
  { id: 1, slug: 'monotributo-2024', title: '¿Cuándo conviene pasar de Monotributo a Responsable Inscripto?', excerpt: 'Analizamos los factores clave que determinan el momento óptimo para el cambio de régimen, considerando facturación, costos y beneficios.', created: '2024-10-15', category: 'Impuestos' },
  { id: 2, slug: 'liquidacion-sueldos', title: 'Todo lo que debe saber sobre la liquidación de sueldos en Argentina', excerpt: 'Guía completa sobre conceptos remunerativos, no remunerativos, horas extra y las últimas actualizaciones del RIPTE.', created: '2024-09-28', category: 'Laboral' },
  { id: 3, slug: 'bienes-personales-2024', title: 'Cambios en Bienes Personales para 2024: lo que necesita saber', excerpt: 'El paquete fiscal modificó aspectos clave del impuesto a los Bienes Personales. Aquí explicamos los cambios y su impacto.', created: '2024-09-10', category: 'Impuestos' },
  { id: 4, slug: 'sas-vs-srl', title: 'SAS vs SRL: ¿qué estructura conviene para su empresa?', excerpt: 'Comparativa detallada entre la Sociedad por Acciones Simplificada y la Sociedad de Responsabilidad Limitada.', created: '2024-08-22', category: 'Societario' },
  { id: 5, slug: 'ingresos-brutos-caba', title: 'Ingresos Brutos en CABA: exenciones y alícuotas para 2024', excerpt: 'Actualización completa de alícuotas, exenciones y obligaciones formales del impuesto a los Ingresos Brutos en la Ciudad de Buenos Aires.', created: '2024-08-05', category: 'Impuestos' },
  { id: 6, slug: 'auditoria-pyme', title: '¿Por qué su PyME necesita una auditoría contable anual?', excerpt: 'Más allá de la obligación legal, una auditoría bien hecha es una herramienta de gestión que detecta riesgos y oportunidades de mejora.', created: '2024-07-18', category: 'Auditoría' },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
}

const CATEGORY_COLORS = {
  Impuestos: '#0f1f3d',
  Laboral: '#1a3260',
  Societario: '#2d4a7a',
  Auditoría: '#c9a84c',
};

export default async function BlogPage() {
  let posts = FALLBACK_POSTS;
  try {
    const res = await getPosts();
    console.log(res);
    if (res.items?.length > 0) posts = res.items;
  } catch {}

  return (
    <>
      <section className="pt-32 pb-16" style={{ background: '#0f1f3d' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Recursos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Blog & Novedades
          </h1>
        </div>
      </section>

      <section className="py-20" style={{ background: '#f8f4ec' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.id || i}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                style={{ border: '1px solid #ede8dc' }}
              >
                {/* Color accent top bar */}
                <div className="h-1 w-full" style={{ background: CATEGORY_COLORS[post.category] || '#c9a84c' }} />

                <div className="p-7 flex flex-col flex-1">
                  {post.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider mb-3 inline-block" style={{ color: '#c9a84c' }}>
                      {post.category}
                    </span>
                  )}
                  <h2 className="font-bold text-base leading-snug mb-3 group-hover:text-current transition-colors" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#6b7280' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.created)}
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#c9a84c' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}