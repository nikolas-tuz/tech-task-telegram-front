import Auth from '@/components/Pages/Home/Auth';
import InitialContent from '@/components/Pages/Home/InitialContent';
import Navigation from '@/components/Pages/Home/Navigation';

export default function Home() {
  return (
    <main className={`main-grid-container pt-7 px-8`}>
      <Navigation />
      <Auth />
      <InitialContent />
    </main>
  );
}
