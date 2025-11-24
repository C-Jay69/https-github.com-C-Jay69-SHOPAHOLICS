import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User as UserIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COPY } from '../constants';
import { useCart } from '../hooks/useCart';
import { ChatBot } from './ChatBot';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Electronics', path: '/category/Electronics' },
    { name: 'Fashion', path: '/category/Fashion' },
    { name: 'Kitchen', path: '/category/Kitchen' },
    { name: 'Impulse Coach', path: '/account' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, query param. Here just alert/mock.
    navigate('/category/all');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative">
            <img 
              src="/logo.png" 
              alt="Shopaholics Inc" 
              className="h-20 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wide hover:text-electric transition-colors ${location.pathname === link.path ? 'text-electric decoration-wavy underline underline-offset-4' : 'text-slate-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors hover:text-electric">
              <Search size={22} />
            </button>
            <Link to="/account" className="hidden md:block p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors hover:text-magenta">
              <UserIcon size={22} />
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full text-slate-600 group">
              <ShoppingBag size={22} className="group-hover:text-amber transition-colors" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-electric text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 absolute w-full shadow-lg z-50">
            <form onSubmit={handleSearch} className="mb-4 relative">
                <input type="text" placeholder="Search for things you don't need..." className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-sm border border-slate-200 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric" />
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            </form>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-electric pl-2 border-l-4 border-transparent hover:border-lime transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="text-sm text-slate-400 pt-4 border-t font-mono">Admin Panel</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-pale/30">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-auto border-t-4 border-gradient-to-r from-electric via-magenta to-lime">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-electric">Shopaholics Inc</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We are not responsible for your credit card statement. 
              Please shop responsibly, or wildly. We prefer the latter.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amber">Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/category/Electronics" className="hover:text-cyan transition-colors">Tech You Don't Understand</Link></li>
              <li><Link to="/category/Fashion" className="hover:text-cyan transition-colors">Clothes to Impress Strangers</Link></li>
              <li><Link to="/category/Kitchen" className="hover:text-cyan transition-colors">Kitchen Gadgets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lime">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan transition-colors">Track Order (Good luck)</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Returns (Awkward)</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-magenta">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-2">Sign up for alerts on stuff you'll regret missing.</p>
            <div className="flex">
              <input type="email" placeholder="email@regret.com" className="bg-slate-800 border-none text-white px-3 py-2 text-sm w-full focus:ring-1 focus:ring-electric placeholder-slate-600" />
              <button className="bg-electric px-4 py-2 text-white text-sm hover:bg-cyan hover:text-black font-bold transition-colors">Go</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600 flex justify-between items-center">
          <span>{COPY.footer}</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-electric"></div>
            <div className="w-3 h-3 rounded-full bg-amber"></div>
            <div className="w-3 h-3 rounded-full bg-magenta"></div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};