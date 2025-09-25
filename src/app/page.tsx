import Link from 'next/link'


export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Stargaze!</h1>
      <p>Your movie discovery and watchlist app</p>
      <Link href="/about">About</Link>
    </main>
  )
}
