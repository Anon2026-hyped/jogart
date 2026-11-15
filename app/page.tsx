import { getHomeContent } from './site-content';

export default function Home() {
  return (
    <main id="main">
      <div dangerouslySetInnerHTML={{ __html: getHomeContent() }} />
    </main>
  );
}
