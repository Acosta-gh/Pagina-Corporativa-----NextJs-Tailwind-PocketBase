"use client"
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getPosts } from '@/lib/pocketbase';

const PostsContext = createContext(null);

const CACHE_KEY = 'posts_cache';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutos

function loadCacheFromStorage() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const now = Date.now();
    const valid = {};
    for (const [page, entry] of Object.entries(parsed)) {
      if (now - entry.timestamp < CACHE_TTL) {
        valid[page] = entry;
      }
    }
    return valid;
  } catch {
    return {};
  }
}

function saveCacheToStorage(cache) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { }
}

export function PostsProvider({ children, perPage = 9 }) {
  // Ref para el cache: no necesita re-render y no genera dependencias en useEffect
  const cacheRef = useRef({});

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar cache desde sessionStorage una sola vez al montar

  useEffect(() => {
    cacheRef.current = loadCacheFromStorage();
    const cacheKey = String(currentPage);

    // Si está en cache, usarlo directamente sin hacer fetch
    if (cacheRef.current[cacheKey]) {
      const cached = cacheRef.current[cacheKey];
      setPosts(cached.items);
      setPageCount(cached.totalPages);
      return;
    }

    // Si no está en cache, fetch a PocketBase
    let cancelled = false;

    async function fetchPage() {
      try {
        setLoading(true);
        const res = await getPosts({ page: currentPage + 1, perPage });

        if (cancelled || !res) return;

        const entry = {
          items: res.items,
          totalPages: res.totalPages,
          timestamp: Date.now(),
        };

        cacheRef.current = { ...cacheRef.current, [cacheKey]: entry };
        saveCacheToStorage(cacheRef.current);

        setPosts(res.items);
        setPageCount(res.totalPages);
      } catch (err) {
        if (!cancelled) console.error('Error fetching posts:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPage();

    // Cleanup: marca como cancelado si el efecto se re-ejecuta antes de terminar
    return () => {
      cancelled = true;
    };
  }, [currentPage, perPage]);

  const handlePageClick = (e) => {
    console.log("handlePageClick");
    setCurrentPage(e.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PostsContext.Provider value={{ posts, currentPage, pageCount, loading, handlePageClick }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts debe usarse dentro de <PostsProvider>');
  return ctx;
}