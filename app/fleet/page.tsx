import type { Metadata } from 'next';
import FleetClient from './FleetClient';

export const metadata: Metadata = {
  title: 'Our Fleet | Nife Transport Services',
  description: 'Explore our modern, diverse fleet of trucks designed to handle any cargo type safely and efficiently.',
};

export default function FleetPage() {
  console.log('Rendering FleetPage');
  return <FleetClient />;
}