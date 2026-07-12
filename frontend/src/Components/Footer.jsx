import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-sans mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">BooksWorld</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              An elegant space dedicated to modern masterpieces, timeless classics, and curation for the discerning reader.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Shop Catalog</Link></li>
              <li><Link to="/seller" className="hover:text-white transition">Become a Seller</Link></li>
              <li><Link to="/admin" className="hover:text-white transition">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Return & Refund Details</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400">Receive updates on monthly literary drops and exclusive collections.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 text-white placeholder-gray-500" 
              />
              <button className="bg-white text-gray-900 px-4 py-1.5 rounded text-sm font-bold hover:bg-gray-200 transition">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BooksWorld. All rights reserved.</p>
          <p className="italic">"A room without books is like a body without a soul." — Cicero</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;