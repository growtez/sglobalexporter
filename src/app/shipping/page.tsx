import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Shahinur Global Exporter",
  description: "Learn about the shipping and export procedures at Shahinur Global Exporter.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-cream/30 dark:bg-stone-900/10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-800 p-8 sm:p-12 shadow-sm rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
        <h1 className="text-4xl font-serif font-bold text-forest dark:text-cream mb-2">Shipping & Export Policy</h1>
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-8 uppercase tracking-wider">Last updated: July 2026</p>
        
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-300">
          <p>
            Thank you for choosing <strong>Shahinur Global Exporter</strong> as your trusted partner for premium Assamese tea. Below are the terms and conditions that constitute our Shipping and Export Policy.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">1. Domestic Shipping (India)</h2>
          <p>
            All domestic wholesale orders and sample packages are processed within 3-5 business days. Shipments are not dispatched on Sundays or national holidays. 
          </p>
          <p>
            Standard transit times range from 5-7 business days depending on the destination state. Delivery delays can occasionally occur due to logistics issues or adverse weather conditions in the northeastern region.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">2. International Export (Global Shipping)</h2>
          <p>
            We export premium tea to over 30 countries. International shipping options include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Ocean Freight (FCL / LCL):</strong> Recommended for wholesale volumes. Port of loading is typically Kolkata (CCU) or Haldia.</li>
            <li><strong>Air Freight:</strong> Recommended for fast delivery of premium grade specialty teas.</li>
            <li><strong>Courier Services (DHL/FedEx):</strong> Used primarily for samples and small B2B trials.</li>
          </ul>
          <p>
            Export documentation including Phytosanitary Certificates, Certificate of Origin, tea quality analyses, and custom clearance documents will be prepared and provided by our compliance team.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">3. Customs, Duties, and Taxes</h2>
          <p>
            Shahinur Global Exporter is not responsible for any customs clearance fees, import duties, or taxes applied to your order at the destination country. All fees imposed during or after shipping are the sole responsibility of the customer (unless specified otherwise in written incoterms agreements).
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">4. Damage and Loss</h2>
          <p>
            Our export shipments are covered by marine cargo transit insurance (subject to selected Incoterms such as CIF/CIP). If you receive your order damaged, please contact the shipment carrier or our support team immediately to file a claim.
          </p>
          <p>
            Please save all packaging materials and damaged goods before filing a claim.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">5. Questions & Support</h2>
          <p>
            For any shipping and export inquiries, please contact our logistics desk at <a href="mailto:shahinur23287@gmail.com" className="text-gold hover:underline">shahinur23287@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
