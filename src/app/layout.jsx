import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import { Playfair_Display, DM_Sans } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata = {
  title: 'Nexo Contadores | Asesoramiento Contable y Fiscal',
  description: 'Estudio contable con más de 20 años de experiencia en asesoramiento impositivo, laboral y societario.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className='playfair.variable dmSans.variable'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}