import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Zap, TrendingUp, ShoppingCart, Play } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-0 pb-20">
      
      {/* Video Carousel / Header Loop */}
      <div className="w-full h-16 md:h-28 bg-black overflow-hidden relative border-b-4 border-electric group z-20">
        <video 
          className="w-full h-full object-cover opacity-80"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          {/* User provided video file */}
          <source src="/header-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric/30 via-transparent to-magenta/30 mix-blend-overlay pointer-events-none"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="whitespace-nowrap overflow-hidden w-full">
                <div className="inline-block animate-marquee pl-full text-white font-black tracking-widest uppercase text-sm md:text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <span className="mx-8 text-amber">⚡ Flash Sale: 50% Off Regret</span>
                  <span className="mx-8 text-lime">⚡ New Dupes Added Daily</span>
                  <span className="mx-8 text-cyan">⚡ Free Shipping on Orders Over £500</span>
                  <span className="mx-8 text-magenta">⚡ Impulse Coach is Watching You</span>
                  <span className="mx-8 text-white">⚡ Don't Think, Just Buy</span>
                </div>
             </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[650px] flex items-center border-b border-slate-800">
        {/* Colorful Gradients matching user palette */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-magenta/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Shopping Frenzy" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 flex flex-col items-start max-w-5xl z-10">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-lime text-lime text-xs font-bold px-4 py-2 mb-8 uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(190,247,84,0.4)]">
            <span className="w-2 h-2 rounded-full bg-lime animate-bounce"></span>
            Professional Enablers
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black leading-none mb-6 drop-shadow-2xl italic tracking-tighter">
            <span className="text-white block">SPEND</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan to-lime">FIRST.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-magenta to-electric block mt-2">THINK NEVER.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-pale mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
            Welcome to <span className="font-bold text-white">Shopaholics Inc</span>. 
            The premier destination for high-velocity retail therapy and questionable financial decisions.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link to="/category/all">
              <button className="bg-electric hover:bg-magenta text-white text-xl font-bold px-12 py-6 rounded-sm shadow-[8px_8px_0px_0px_#FFBF00] hover:shadow-[8px_8px_0px_0px_#00FFFF] hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 group">
                Start Spending <ShoppingCart size={24} className="group-hover:rotate-12 transition-transform" />
              </button>
            </Link>
            <Link to="/account">
               <button className="bg-transparent border-2 border-lime text-lime hover:bg-lime hover:text-black text-xl font-bold px-12 py-6 rounded-sm transition-all duration-200 flex items-center gap-2 backdrop-blur-sm">
                Watch Demo <Play size={24} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 border-b-8 border-electric shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-electric/10 text-electric group-hover:bg-electric group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-electric transition-colors">Impulse Coach</h3>
            <p className="text-slate-500 leading-relaxed">
              Our AI judges your cart before you checkout. It's like shopping with your financially responsible mother, but British.
            </p>
          </div>
          <div className="bg-white p-8 border-b-8 border-amber shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-amber/10 text-amber-600 group-hover:bg-amber group-hover:text-black transition-colors rounded-full flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-amber-600 transition-colors">Dupe Finder</h3>
            <p className="text-slate-500 leading-relaxed">
              Found something expensive? We'll automatically find a cheaper knock-off that looks 90% similar.
            </p>
          </div>
          <div className="bg-white p-8 border-b-8 border-magenta shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-magenta/10 text-magenta group-hover:bg-magenta group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
              <ArrowRight size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-magenta transition-colors">Next Day Regret</h3>
            <p className="text-slate-500 leading-relaxed">
              Fast shipping means you get your impulse buys before the dopamine hit wears off.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-electric font-bold tracking-widest uppercase text-sm mb-2 block">Departments</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic">Choose Your Poison</h2>
          </div>
          <Link to="/category/all" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-magenta transition-colors border-b-2 border-transparent hover:border-magenta pb-1">
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/category/Electronics" className="group relative h-96 overflow-hidden block bg-slate-900 rounded-sm shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" alt="Tech" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="w-12 h-2 bg-cyan mb-4 transition-all duration-300 group-hover:w-32"></div>
              <h3 className="text-white text-4xl font-black mb-2 uppercase italic">Electronics</h3>
              <p className="text-cyan text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Gadgets to collect dust</p>
            </div>
          </Link>
          
          <Link to="/category/Fashion" className="group relative h-96 overflow-hidden block bg-slate-900 rounded-sm shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" alt="Fashion" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="w-12 h-2 bg-magenta mb-4 transition-all duration-300 group-hover:w-32"></div>
              <h3 className="text-white text-4xl font-black mb-2 uppercase italic">Fashion</h3>
              <p className="text-magenta text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Fast trends, faster regret</p>
            </div>
          </Link>
          
          <Link to="/category/Kitchen" className="group relative h-96 overflow-hidden block bg-slate-900 rounded-sm md:col-span-2 lg:col-span-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80" alt="Kitchen" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="w-12 h-2 bg-amber mb-4 transition-all duration-300 group-hover:w-32"></div>
              <h3 className="text-white text-4xl font-black mb-2 uppercase italic">Kitchen</h3>
              <p className="text-amber text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Professional chef cosplay</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/category/all">
            <Button size="lg" className="w-full">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pale relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <ShoppingCart size={200} />
         </div>

         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 uppercase italic">Ready to make a mistake?</h2>
            <p className="text-slate-600 mb-10 text-xl font-light">
                Our warehouse is overflowing with items that looked great in the photos. 
                Help us, help you, help the economy.
            </p>
            <div className="inline-block p-2 bg-gradient-to-r from-electric via-magenta to-amber rounded-sm transform rotate-1 hover:rotate-0 transition-all duration-300">
                <Link to="/category/all">
                    <button className="bg-white text-slate-900 font-black px-12 py-5 text-xl hover:bg-slate-50 transition-colors rounded-sm uppercase tracking-widest">
                        Browse The Catalog
                    </button>
                </Link>
            </div>
         </div>
      </section>
    </div>
  );
};