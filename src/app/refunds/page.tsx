import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Shahinur Global Exporter",
  description: "Read about the refund and return policies at Shahinur Global Exporter.",
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-cream/30 dark:bg-stone-900/10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-800 p-8 sm:p-12 shadow-sm rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
        <h1 className="text-4xl font-serif font-bold text-forest dark:text-cream mb-2">Refund & Return Policy</h1>
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-8 uppercase tracking-wider">Last updated: July 2026</p>
        
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-300">
          <p>
            At <strong>Shahinur Global Exporter</strong>, we strive to ensure absolute satisfaction with our premium teas. Due to the food-grade and agricultural nature of our products, returns and refunds are handled according to strict safety guidelines.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">1. Sample Shipments</h2>
          <p>
            Sample orders are dispatched to ensure buyers can verify quality before making bulk purchases. Sample costs (if charged) are generally non-refundable, but they may be credited against your subsequent commercial order.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">2. Wholesale & Commercial Bulk Orders</h2>
          <p>
            Once commercial bulk tea shipments are prepared, packaged, and customized (e.g. custom brand labeling or specific bag sizing), orders cannot be cancelled or returned unless a quality deviation is verified.
          </p>
          <p>
            If you believe the delivered tea quality does not match the approved pre-shipment sample, please contact us within 14 business days of delivery. Quality claims must be accompanied by an official testing report from an accredited third-party tea laboratory or inspector.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">3. Damaged or Contaminated Goods</h2>
          <p>
            If products arrive contaminated, damp, or physically compromised due to carrier handling, please document the damage with photos immediately and retain the original shipping container. 
          </p>
          <p>
            Contact us within 48 hours of receipt at <a href="mailto:shahinur23287@gmail.com" className="text-gold hover:underline">shahinur23287@gmail.com</a> with description and photos of the damage. We will work with the logistics insurance to issue a replacement or refund for the damaged portion.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">4. Processing Refunds</h2>
          <p>
            Approved refunds will be processed within 10-15 business days through the original payment method or telegraphic transfer (T/T), depending on the terms agreed in the purchase contract.
          </p>
        </div>
      </div>
    </div>
  );
}
