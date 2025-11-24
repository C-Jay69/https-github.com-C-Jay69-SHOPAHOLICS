import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CURRENCY } from '../constants';
import { Button } from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { Filter } from 'lucide-react';

export const Catalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const { products: allProducts } = useProducts();

  const products = useMemo(() => {
    if (!category || category === 'all') return allProducts;
    return allProducts.filter(p => p.category === category);
  }, [category, allProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{category === 'all' ? 'All Products' : category}</h1>
          <p className="text-slate-500">Showing {products.length} ways to spend money.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-600 rounded-sm hover:bg-slate-50">
             <Filter size={16} /> Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-white border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col">
            <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.isDupeCandidate && (
                <div className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                  Premium
                </div>
              )}
            </Link>
            <div className="p-4 flex-grow flex flex-col">
              <div className="text-xs text-slate-400 mb-1">{product.category}</div>
              <Link to={`/product/${product.id}`} className="font-bold text-slate-900 mb-2 hover:text-electric line-clamp-2">
                {product.title}
              </Link>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-medium ml-1">{product.rating}</span>
                <span className="text-slate-400 text-xs ml-2">({product.reviews})</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">{CURRENCY}{product.price.toFixed(2)}</span>
                <Button size="sm" onClick={() => addItem(product)} variant="outline">Add</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">No products found. The warehouse gnomes are sleeping.</p>
          <Link to="/category/all" className="text-electric font-bold mt-4 inline-block">Go Back</Link>
        </div>
      )}
    </div>
  );
};