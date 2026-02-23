    "use client";
    import { useState } from 'react';
    import { Send, CheckCircle, AlertCircle } from 'lucide-react';
    import { createContact } from '@/lib/pocketbase';

    export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

    const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
        await createContact(form);
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
        console.error(err);
        setStatus('error');
        }
    };

    const inputClass = "w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors focus:border-current";
    const inputStyle = { background: '#fff', border: '1px solid #ede8dc', color: '#2d2d2d' };

    return (
        <div className="p-8 rounded-sm" style={{ background: '#fff', border: '1px solid #ede8dc' }}>
        <h3 className="text-xl font-bold mb-6" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>
            Envíenos su consulta
        </h3>

        {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
            <CheckCircle className="w-10 h-10" style={{ color: '#c9a84c' }} />
            <h4 className="font-bold text-lg" style={{ color: '#0f1f3d' }}>¡Mensaje enviado!</h4>
            <p className="text-sm" style={{ color: '#6b7280' }}>Le responderemos dentro de las 24 hs. hábiles.</p>
            <button onClick={() => setStatus(null)} className="mt-4 text-xs underline" style={{ color: '#c9a84c' }}>
                Enviar otro mensaje
            </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#2d2d2d' }}>Nombre *</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Juan García" className={inputClass} style={inputStyle} />
                </div>
                <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#2d2d2d' }}>Teléfono</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+54 11..." className={inputClass} style={inputStyle} />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#2d2d2d' }}>Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="juan@empresa.com" className={inputClass} style={inputStyle} />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#2d2d2d' }}>Consulta *</label>
                <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Describa su situación o necesidad..." className={inputClass + " resize-none"} style={inputStyle} />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="w-4 h-4" />
                Error al enviar. Verifique la conexión con PocketBase o intente más tarde.
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: '#0f1f3d', color: '#fff' }}
            >
                {status === 'loading' ? (
                <span className="animate-pulse">Enviando...</span>
                ) : (
                <><Send className="w-4 h-4" /> Enviar consulta</>
                )}
            </button>

            <p className="text-xs text-center" style={{ color: '#6b7280' }}>
                Sus datos son tratados con absoluta confidencialidad.
            </p>
            </form>
        )}
        </div>
    );
    }