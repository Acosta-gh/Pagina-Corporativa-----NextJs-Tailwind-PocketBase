"use client"

import { useState } from 'react';
import { usePosts } from '@/context/PostsContext';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import ReactPaginate from "react-paginate";
import { PostSkeletonGrid } from '@/components/ui/PostSkeletonCard';
import { Fade } from 'react-awesome-reveal';

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

export default function BlogPage() {

  const { posts, currentPage, pageCount, loading, handlePageClick } = usePosts();
  const [navigating, setNavigating] = useState(null);

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

      <Fade cascade triggerOnce duration={600}>
        <section className="py-20" style={{ background: '#f8f4ec' }}>
          <div className="max-w-6xl mx-auto px-6">

            {loading ? (
              <PostSkeletonGrid count={9} />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <Link
                    key={post.id || i}
                    href={`/blog/${post.slug}`}
                    onClick={() => setNavigating(post.slug)}
                    className="group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col relative"
                    style={{ border: '1px solid #ede8dc' }}
                  >
                    {/* Overlay de loading */}
                    {navigating === post.slug && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-sm"
                        style={{ background: 'rgba(15,31,61,0.6)' }}>
                        <div className="w-6 h-6 border-3 border-white border-t-[#c9a84c] rounded-full animate-spin"
                          style={{ borderWidth: '3px' }} />
                      </div>
                    )}

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
            )}

          </div>
          {/* Pagination */}
          {pageCount > 1 && loading == false && (
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
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#c9a84c] rounded-full animate-spin"></div>
            </div>
          )}
        </section>
      </Fade>
    </>
  );
}