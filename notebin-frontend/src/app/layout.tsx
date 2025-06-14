import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Notebin" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {}
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <header className="bg-amber-300 shadow-sm p-4 flex justify-between">
            <h1 className="text-lg font-bold text-gray-800">Notebin</h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline font-bold">Home</Link>
              <Link href="/register" className="hover:underline font-bold">Register</Link>
            </nav>
          </header>
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
