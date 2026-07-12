import { useState } from 'react';

function Ahome() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'books', label: 'Books' },
    { id: 'sellers', label: 'Sellers' },
    { id: 'users', label: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="hidden w-72 min-h-screen flex-col bg-gray-950 text-white shadow-2xl md:flex">
        <div className="border-b border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold">Admin Panel</h2>
          <p className="mt-1 text-sm text-gray-400">Monitor the bookstore platform.</p>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${activeTab === item.id ? 'bg-white text-gray-950' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Dashboard</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
          <p className="mt-2 text-sm text-gray-600">Keep your catalog, sellers, and users organized from one professional workspace.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Total Books</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">128</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Active Sellers</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">24</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Registered Users</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">1,482</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Ahome;