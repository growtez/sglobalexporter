import { Suspense } from "react";
import B2BForm from "@/components/checkout/B2BForm";

export const metadata = {
  title: "Wholesale Inquiry | SGlobalExporter",
  description: "Request a custom B2B quote for premium Assamese tea and rice.",
};

export default function B2BPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-6">
            Wholesale Partnerships
          </h1>
          <div className="prose prose-stone text-stone-600 mb-8">
            <p>
              SGlobalExporter partners with premium retailers, distributors, and hospitality brands across Europe and domestic markets to supply the finest Assamese tea and rice.
            </p>
            <p>
              Our direct-trade model ensures unmatched freshness, complete traceability, and ethical sourcing practices that empower local farming communities.
            </p>
            <h3>Why Partner With Us?</h3>
            <ul>
              <li>Direct sourcing from heritage estates</li>
              <li>Customized packaging and private labeling</li>
              <li>Flexible order volumes starting at 50kg</li>
              <li>End-to-end logistics support to EU destinations</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <h2 className="text-2xl font-serif text-charcoal mb-6">Request a Quote</h2>
          <Suspense fallback={<div className="text-stone-500">Loading form...</div>}>
            <B2BForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
