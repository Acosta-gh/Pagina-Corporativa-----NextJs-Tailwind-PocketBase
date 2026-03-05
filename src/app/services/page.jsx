"use client";

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ReactPaginate from "react-paginate";
import { useServices } from '@/context/ServicesContext';
import { ServicesSkeletonGrid } from '@/components/ui/ServicesSkeletonCard';
import FadeUp from '@/components/animations/FadeUp';

export default function ServicesPage() {
    const { services, currentPage, pageCount, loading, handlePageClick } = useServices();

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-16" style={{ background: '#0f1f3d' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <FadeUp delay={0.05}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-px" style={{ background: '#c9a84c' }} />
                            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#c9a84c' }}>Lo que hacemos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Nuestros Servicios
                        </h1>
                    </FadeUp>
                </div>
            </section>

            {/* Services grid */}
            <section className="py-20" style={{ background: '#f8f4ec' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <ServicesSkeletonGrid count={9} />
                        ) : (
                            services.map((s, i) => (
                                <FadeUp key={s.id || i} delay={i * 0.07} threshold={0.1}>
                                    <div className="bg-white rounded-sm p-8 group hover:shadow-lg transition-shadow duration-300 h-full" style={{ border: '1px solid #ede8dc' }}>
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
                                </FadeUp>
                            ))
                        )}
                    </div>

                    {pageCount > 1 && !loading && (
                        <ReactPaginate
                            previousLabel="←"
                            nextLabel="→"
                            breakLabel="..."
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center gap-2 mt-10"
                            pageClassName="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-sm text-sm cursor-pointer hover:border-gray-400 transition-colors"
                            previousClassName="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-sm text-sm cursor-pointer hover:border-gray-400 transition-colors"
                            nextClassName="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-sm text-sm cursor-pointer hover:border-gray-400 transition-colors"
                            activeClassName="!border-[#c9a84c] bg-[#0f1f3d] text-white"
                            disabledClassName="opacity-30 cursor-not-allowed"
                            forcePage={currentPage}
                            renderOnZeroPageCount={null}
                            pageLinkClassName="w-full h-full flex items-center justify-center"
                            previousLinkClassName="w-full h-full flex items-center justify-center"
                            nextLinkClassName="w-full h-full flex items-center justify-center"
                        />
                    )}

                    {loading && (
                        <div className="flex justify-center items-center mt-10">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#c9a84c] rounded-full animate-spin" />
                        </div>
                    )}

                    <FadeUp delay={0.1} className="mt-16">
                        <div className="text-center p-12 rounded-sm" style={{ background: '#0f1f3d' }}>
                            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>¿No encontró lo que busca?</h3>
                            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>Contáctenos y analizamos su situación sin compromiso.</p>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-sm" style={{ background: '#c9a84c', color: '#0f1f3d' }}>
                                Consultar <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </>
    );
}