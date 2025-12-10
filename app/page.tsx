import Hero from './components/home/Hero';
import ServicesSummary from './components/home/ServicesSummary';
import WhyChooseUs from './components/home/WhyChooseUs';
import Testimonials from './components/home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSummary />
      <WhyChooseUs />
      <Testimonials />
      {/* Add more home page sections here */}
    </>
  );
}
