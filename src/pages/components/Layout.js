import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Student Registration</title>
        <meta name="description" content="Student semester registration system" />
      </Head>
      
      <header className="bg-blue-600 text-white p-4">
        <div className="container">
          <h1 className="text-2xl font-bold">
            <Link href="/">University Registration System</Link>
          </h1>
          <nav className="mt-2">
            <Link href="/register" className="text-white hover:underline mr-4">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} University Registration System</p>
        </div>
      </footer>
    </>
  );
}