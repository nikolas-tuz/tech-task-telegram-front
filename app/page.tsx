import Auth from '@/components/Pages/Home/Auth';
import Content from '@/components/Pages/Home/Content';

export default function Home() {
  return (
    <main className={`main-grid-container px-8 h-screen justify-center items-center`}>
      <Auth />
      <Content />
    </main>
  );
}
