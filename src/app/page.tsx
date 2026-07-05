import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-forest overflow-hidden flex items-center">
        {/* We would ideally use a high-res background image here, using a placeholder color with a subtle pattern for now */}
        <div className="absolute inset-0 bg-forest/90 z-10" />
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1576092762791-dd9e222046d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" 
          aria-hidden="true" 
        />
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-2xl text-cream">
            <span className="uppercase tracking-[0.3em] text-sm font-medium text-gold mb-6 block">
              Heritage in Every Grain & Leaf
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              The Finest of <br/> Assam, Exported Global.
            </h1>
            <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-xl font-light">
              Discover unparalleled quality with our curated selection of premium Assamese tea and heritage rice, sourced directly from the finest estates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-charcoal hover:bg-gold/90 text-lg px-8">
                  Shop the Collection
                </Button>
              </Link>
              <Link href="/b2b">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-cream text-cream hover:bg-cream hover:text-forest text-lg px-8">
                  Wholesale Inquiries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-4">Our Heritage Categories</h2>
            <div className="h-1 w-24 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <Link href="/products?category=tea" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2067&auto=format&fit=crop"
                  alt="Premium Assam Tea"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-serif text-white mb-2">Assam Tea</h3>
                  <span className="text-white/90 uppercase tracking-widest text-sm font-medium group-hover:text-gold transition-colors">Explore Collection &rarr;</span>
                </div>
              </div>
            </Link>

            <Link href="/products?category=rice" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop"
                  alt="Heritage Assam Rice"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-serif text-white mb-2">Premium Rice</h3>
                  <span className="text-white/90 uppercase tracking-widest text-sm font-medium group-hover:text-gold transition-colors">Explore Collection &rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* B2B Callout */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-6">Partner With Us</h2>
            <p className="text-lg text-stone-600 mb-10 font-light">
              We specialize in fulfilling bulk orders for luxury hospitality brands, fine dining establishments, and premium retailers across the globe. Minimum orders start at 50kg.
            </p>
            <Link href="/b2b">
              <Button size="lg">Request a Custom Quote</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
