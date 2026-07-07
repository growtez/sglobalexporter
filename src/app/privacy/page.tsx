import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shahinur Global Exporter",
  description: "Learn how Shahinur Global Exporter collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-cream/30 dark:bg-stone-900/10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-800 p-8 sm:p-12 shadow-sm rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
        <h1 className="text-4xl font-serif font-bold text-forest dark:text-cream mb-2">Privacy Policy</h1>
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-8 uppercase tracking-wider">Last updated: July 2026</p>
        
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-300">
          <p>
            At <strong>Shahinur Global Exporter (OPC) Private Limited</strong>, accessible from sglobalexporter.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by sglobalexporter.com and how we use it.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">1. Information We Collect</h2>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <p>
            When you register for an Account or make a bulk inquiry, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and maintain our website and tea export services.</li>
            <li>Improve, personalize, and expand our website and product offerings.</li>
            <li>Understand and analyze how you use our website.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
            <li>Process your transactions and manage sample requests.</li>
            <li>Find and prevent fraud.</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">3. Cookies and Web Beacons</h2>
          <p>
            Like any other website, sglobalexporter.com uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">4. Third-Party Privacy Policies</h2>
          <p>
            Our website privacy policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest dark:text-cream pt-4 border-t border-stone-100 dark:border-stone-700">5. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:shahinur23287@gmail.com" className="text-gold hover:underline">shahinur23287@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
