"use client"
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getServices } from '@/lib/pocketbase';

const ServicesContext = createContext(null);

const CACHE_KEY = 'services_cache';
const CACHE_TTL = 1000 * 60 * 60; // 60 minutos

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

export function ServicesProvider({ children, perPage = 9 }) {
    // Ref para el cache: no necesita re-render y no genera dependencias en useEffect
    const cacheRef = useRef({});

    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar cache desde sessionStorage una sola vez al montar
    useEffect(() => {
        cacheRef.current = loadCacheFromStorage();
    }, []);

    useEffect(() => {
        const cacheKey = String(currentPage);

        // Si está en cache, usarlo directamente sin hacer fetch
        if (cacheRef.current[cacheKey]) {
            const cached = cacheRef.current[cacheKey];
            setServices(cached.items);
            setPageCount(cached.totalPages);
            return;
        }

        // Si no está en cache, fetch a PocketBase
        let cancelled = false;

        async function fetchPage() {
            try {
                setLoading(true);
                const res = await getServices({ page: currentPage + 1, perPage });

                if (cancelled || !res) return;

                const formattedRes = {
                    ...res,
                    items:
                        res.items.map(item =>
                        ({
                            ...item,
                            features: item.features ? item.features.split(",").map(f => f.trim()) : []
                        }))
                };

                const entry = {
                    items: formattedRes.items,
                    totalPages: formattedRes.totalPages,
                    timestamp: Date.now(),
                };

                cacheRef.current = { ...cacheRef.current, [cacheKey]: entry };
                saveCacheToStorage(cacheRef.current);

                setServices(formattedRes.items);
                setPageCount(formattedRes.totalPages);
            } catch (err) {
                if (!cancelled) console.error('Error fetching services:', err);
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
        setCurrentPage(e.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });

    };  

    return (
        <ServicesContext.Provider value={{ services, currentPage, pageCount, loading, handlePageClick }}>
            {children}
        </ServicesContext.Provider>
    );
}

export function useServices() {
    const ctx = useContext(ServicesContext);
    if (!ctx) throw new Error('useServices debe usarse dentro de <ServicesProvider>');
    return ctx;
}