import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Student Registration</h1>
      <p className="text-xl mb-8">Register for your semester courses with ease</p>
      <Link href="/register" className="btn">
        Register Now
      </Link>
    </div>
  );
}