import DemoShowcase from './demo-showcase';

export const metadata = {
  title: 'Live Demo | Enchanted Notebook',
  description: 'Explore the Enchanted Notebook product surface, companion profiles, product clip, and playable page loop.',
};

export default function DemoPage() {
  return <DemoShowcase mode="home" />;
}
