import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CURRENCY } from '../constants';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { Button } from '../components/ui/Button';
import { AlertTriangle, Check } from 'lucide-react';
import { Product } from '../types';
import { getImpulseAdvice, findDupeExplanation } from '../services/geminiService';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addItem, total } = useCart();
  const [dupe, setDupe] = useState<Product | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [dupeReason, setDupeReason] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (product) {
      // Simulate Impulse Coach Advice
      setLoadingAI(true);
      getImpulseAdvice(product, total).then(text => {
        setAdvice(text);
      });

      // Mock Dupe Logic
      if (product.isDupeCandidate) {
        const cheaper = products.find(p => 
          p.category === product.category && 
          p.price < product.price * 0.6 && 
          p.id !== product.id
        );
        if (cheaper) {
            findDupeExplanation(product, cheaper).then(reason => {
                setDupe(cheaper);
                setDupeReason(reason);
            }).finally(() => setLoadingAI(false));
        } else {
            setLoadingAI(false);
        }
      } else {
        setLoadingAI(false);
      }
    }
  }, [product, total, products]);

  if (!product) return <div className="p-10 text-center">Product not found. Maybe it was a hallucination.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-slate-100 p-8 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-w-full max-h-[500px] object-contain shadow-lg" />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-sm">{product.category}</span>
            {product.rating >= 4.5 && <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-sm">Top Rated</span>}
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-slate-900">{product.title}</h1>
          <p className="text-2xl text-electric font-bold mb-6">{CURRENCY}{product.price.toFixed(2)}</p>
          
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* AI Advice Widget */}
          <div className="bg-blue-50 border-l-4 border-electric p-4 mb-8 rounded-r-md">
            <div className="flex items-start gap-3">
                <div className="bg-electric text-white p-2 rounded-full shrink-0">
                    <span className="font-bold font-mono text-sm">AI</span>
                </div>
                <div>
                    <h4 className="font-bold text-electric text-sm uppercase tracking-wide mb-1">Impulse Coach says:</h4>
                    <p className="text-slate-800 italic">"{loadingAI ? "Judging your choices..." : advice}"</p>
                </div>
            </div>
          </div>

          {/* Dupe Finder Alert */}
          {dupe && !loadingAI && (
            <div className="bg-cyan/10 border border-cyan p-6 mb-8 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan text-black text-xs font-bold px-2 py-1">DUPE FOUND</div>
              <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-cyan" />
                Save {CURRENCY}{(product.price - dupe.price).toFixed(2)} with this alternative!
              </h4>
              <p className="text-sm text-slate-600 mb-4">{dupeReason}</p>
              
              <div className="flex items-center gap-4 bg-white p-3 rounded-sm border border-slate-200">
                <img src={dupe.image} className="w-12 h-12 object-cover rounded-sm" alt={dupe.title} />
                <div className="flex-grow">
                    <div className="font-bold text-sm">{dupe.title}</div>
                    <div className="text-electric font-bold">{CURRENCY}{dupe.price.toFixed(2)}</div>
                </div>
                <Button size="sm" onClick={() => addItem(dupe)}>Buy Dupe</Button>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <Button size="lg" className="flex-grow" onClick={() => addItem(product)}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Save for Later
            </Button>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h4 className="font-bold mb-4">Specs</h4>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {product.specs && Object.entries(product.specs).map(([key, val]) => (
                <div key={key}>
                  <dt className="text-slate-500">{key}</dt>
                  <dd className="font-medium">{val}</dd>
                </div>
              ))}
              <div>
                <dt className="text-slate-500">Stock</dt>
                <dd className="font-medium text-green-600 flex items-center gap-1"><Check size={14} /> In Stock</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};