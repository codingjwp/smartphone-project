import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'First Post',
}

export default function FirstPoset() {
  return (
  <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
  </>
  );
}