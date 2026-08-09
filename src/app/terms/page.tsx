import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Shahinur Global Exporter",
  description: "Read the Terms of Service for Shahinur Global Exporter.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-cream/30 dark:bg-stone-900/10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-800 p-8 sm:p-12 shadow-sm rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
        <h1 className="text-4xl font-serif font-bold text-forest dark:text-cream mb-2">Terms of Service</h1>
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-8 uppercase tracking-wider">Last updated: July 2026</p>
        
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-300">
          <p>
            Welcome to <strong>Shahinur Global Exporter</strong>!
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the use of Shahinur Global Exporter (OPC) Private Limited&apos;s Website, located at sglobalexporter.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use sglobalexporter.com if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">1. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, Shahinur Global Exporter and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">2. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Publishing any Website material in any other media without credit or permission.</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
            <li>Publicly performing and/or showing any Website material.</li>
            <li>Using this Website in any way that is or may be damaging to this Website.</li>
            <li>Using this Website in any way that impacts user access to this Website.</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">3. Your Content</h2>
          <p>
            In these Website Standard Terms and Conditions, &quot;Your Content&quot; shall mean any audio, video text, images, or other material you choose to display on this Website. By displaying Your Content, you grant Shahinur Global Exporter a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">4. No Warranties</h2>
          <p>
            This Website is provided &quot;as is,&quot; with all faults, and Shahinur Global Exporter expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">5. Limitation of Liability</h2>
          <p>
            In no event shall Shahinur Global Exporter, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:shahinur23287@gmail.com" className="text-gold hover:underline">shahinur23287@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
