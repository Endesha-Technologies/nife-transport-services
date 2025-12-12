import type { Metadata } from 'next';
// Client component import
import ServicesClient from './ServicesClientComponent';

export const metadata: Metadata = {
  title: 'Our Services | Nife Transport Services',
  description: 'Comprehensive freight and trucking services including general freight, construction materials, temperature-controlled goods, and heavy haul logistics.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}