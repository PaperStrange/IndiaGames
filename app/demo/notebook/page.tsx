import DemoShowcase from '../demo-showcase';

export const metadata = {
  title: 'Notebook Flow | Enchanted Notebook',
  description: 'Try the Enchanted Notebook write, pause, reply, and keep interaction loop.',
};

export default function NotebookDemoPage() {
  return <DemoShowcase mode="notebook" />;
}
