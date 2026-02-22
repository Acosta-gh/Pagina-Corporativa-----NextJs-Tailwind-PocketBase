import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f1f3d', color: 'rgba(255,255,255,0.7)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: '#c9a84c' }}>
                <span className="font-bold text-sm" style={{ color: '#0f1f3d', fontFamily: 'Playfair Display, serif' }}>N</span>
              </div>
              <span className="font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Nexo <span style={{ color: '#c9a84c' }}>Contadores</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Más de 20 años brindando asesoramiento contable, impositivo y laboral a empresas y particulares.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {['Inicio', 'Servicios', 'Nosotros', 'Blog', 'Contacto'].map(label => (
                <li key={label}>
                  <Link href={label === 'Inicio' ? '/' : `/${label.toLowerCase()}`} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#c9a84c' }} />
                <span>Av. Corrientes 1234, Piso 5<br />Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#c9a84c' }} />
                <span>+54 11 4321-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#c9a84c' }} />
                <span>info@nexocontadores.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span>© {new Date().getFullYear()} Nexo Contadores. Todos los derechos reservados.</span>
          <span style={{ color: '#c9a84c' }}>Matrícula FACPCE Nº 12345</span>
        </div>
      </div>
    </footer>
  );
}