export const metadata = {
  title: 'Stargaze',
  description: 'Discover and track the movies you love',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
