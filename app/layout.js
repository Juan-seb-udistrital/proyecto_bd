import Navigation from '/components/Navigation'

export default function RootLayout ({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
