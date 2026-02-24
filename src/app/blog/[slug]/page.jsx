export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getPost } from '@/lib/pocketbase';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

// Fallback for demo
const FALLBACK = {
    title: 'Artículo de ejemplo',
    content: '<p>Este artículo proviene de PocketBase. Cuando la base de datos esté conectada, aquí aparecerá el contenido completo del artículo.</p><p>Por ahora, este es un placeholder para mostrar el layout de la página de detalle.</p>',
    created: new Date().toISOString(),
    category: 'General',
    excerpt: 'Artículo de ejemplo desde PocketBase.',
};

export default async function PostPage({ params }) {
    const { slug } = await params;

    let post = FALLBACK;
    try {
        post = await getPost(slug);
    } catch { }

    if (!post) notFound();

    return (
        <>
            <section className="pt-32 pb-12" style={{ background: '#0f1f3d' }}>
                <div className="max-w-3xl mx-auto px-6">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-xs mb-6 hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <ArrowLeft className="w-3.5 h-3.5" /> Volver al blog
                    </Link>
                    {post.category && (
                        <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: '#c9a84c' }}>{post.category}</span>
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-1.5 mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </section>

            <section className="py-16" style={{ background: '#f8f4ec' }}>
                <div className="max-w-3xl mx-auto px-6">
                    <div
                        className="prose prose-sm max-w-none"
                        style={{ color: '#2d2d2d', lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
                    />

                    <div className="mt-16 pt-8" style={{ borderTop: '1px solid #ede8dc' }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: '#0f1f3d' }}>¿Tiene dudas sobre este tema?</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#c9a84c' }}>
                            Consultenos sin cargo →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}