import Navigation from '@/components/Navigation/Navigation';
import Dashboard from '@/components/Dashboard/Dashboard';
import Content from '@/components/Content/Content';

export default function Home() {
  return (
    <main className={`main-grid-container`}>
      <Navigation />
      <Dashboard />
      <Content />
    </main>
  );
}
