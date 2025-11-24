import React from 'react';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CURRENCY, COPY } from '../constants';

export const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-64 h-64 mb-6 text-slate-200 animate-pulse">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" className="text-slate-100 fill-slate-50" />
            <circle cx="12" cy="10" r="3" strokeWidth="1" />
            <path d="M12 21s9-6 9-13" strokeDasharray="4 4" />
            <path d="M12 21s-9-6-9-13" strokeDasharray="4 4" />
            <circle cx="9" cy="9" r="0.5" fill="currentColor" />
            <circle cx="15" cy="9" r="0.5" fill="currentColor" />
            <path d="M10 13a2 2 0 0 0 4 0" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-800">{COPY.cartEmpty}</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Your cart is lighter than air. Unlike your conscience after you eventually buy everything.
        </p>
        <Link to="/category/all">
          <Button size="lg" className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            Start Adding Regrets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Loot</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items */}
        <div className="lg:w-2/3 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-slate-200 shadow-sm">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-sm bg-slate-100" />
              <div className="flex-grow text-center sm:text-left">
                <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-electric">{item.title}</Link>
                <div className="text-slate-500 text-sm">{item.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-slate-100 rounded">
                    <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-slate-100 rounded">
                    <Plus size={16} />
                </button>
              </div>
              <div className="font-bold text-lg min-w-[80px] text-right">
                {CURRENCY}{(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-8 border border-slate-200 shadow-lg sticky top-24">
            <h3 className="text-xl font-bold mb-6">Summary</h3>
            
            <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{CURRENCY}{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{CURRENCY}5.99</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Guilt Tax</span>
                <span>{CURRENCY}0.00</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold mb-8 text-slate-900">
              <span>Total</span>
              <span>{CURRENCY}{(total + 5.99).toFixed(2)}</span>
            </div>

            <Button className="w-full mb-4" size="lg">
              Checkout
            </Button>
            
            <p className="text-xs text-center text-slate-400 italic">
              "{COPY.cartFull}" - Your Bank Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
