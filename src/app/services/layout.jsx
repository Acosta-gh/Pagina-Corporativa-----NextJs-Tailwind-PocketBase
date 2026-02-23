import { ServicesProvider } from '@/context/ServicesContext';

export default function ServicesLayout({ children }) {
  return <ServicesProvider perPage={9}>{children}</ServicesProvider>;
}