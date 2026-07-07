import { createClient } from "@/lib/supabase/server";
import StatusDropdown from "@/components/admin/StatusDropdown";
import DeleteInquiryButton from "@/components/admin/DeleteInquiryButton";
import { 
  Building2, 
  Phone, 
  Globe, 
  Scale, 
  Calendar, 
  MessageSquare, 
  Package, 
  Inbox,
  Mail
} from "lucide-react";

export const metadata = { title: "Inquiries | Admin – SGlobalExporter" };

const statusBorderMap: Record<string, string> = {
  pending: "border-l-4 border-l-amber-500",
  reviewed: "border-l-4 border-l-blue-500",
  quoted: "border-l-4 border-l-emerald-500",
  closed: "border-l-4 border-l-stone-400",
};

const avatarBgMap: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  quoted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  closed: "bg-stone-100 text-stone-600 dark:bg-stone-850 dark:text-stone-300",
};

// Helper to parse B2B contact form messages
function parseInquiryMessage(message: string) {
  if (!message) return { cleanMessage: null, extracted: {} as Record<string, string> };

  const extracted: Record<string, string> = {};
  const keysToRemove: string[] = [];

  // Match [Key: Value]
  const regex = /\[([^:]+):\s*([^\]]+)\]/g;
  let match;
  while ((match = regex.exec(message)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    extracted[key] = value;
    keysToRemove.push(match[0]);
  }

  let cleanMessage = message;
  keysToRemove.forEach((item) => {
    cleanMessage = cleanMessage.replace(item, "");
  });

  cleanMessage = cleanMessage.replace(/^\s+|\s+$/g, "");

  return {
    cleanMessage: cleanMessage || null,
    extracted,
  };
}

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, profiles(full_name, company_name, phone_number), products(name, category)")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">B2B Inquiries</h1>
          {/* <p className="text-stone-550 mt-1 text-sm md:text-base">
            Manage product price quotes and customer sourcing requests.
          </p> */}
        </div>
        <div className="bg-white border border-stone-100 px-4 py-2.5 rounded-xl shadow-xs self-start sm:self-auto text-base">
          <span className="text-stone-550 font-medium">Total Inquiries:</span>
          <span className="ml-2 text-forest dark:text-gold font-bold text-xl">
            {inquiries?.length ?? 0}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((inq: any) => {
            const { cleanMessage, extracted } = parseInquiryMessage(inq.message);
            const status = inq.status || "pending";
            const borderClass = statusBorderMap[status] || "border-l-4 border-l-stone-300";
            const avatarBgClass = avatarBgMap[status] || "bg-forest/10 text-forest";

            // Extract customer info from profile or custom contact form fields
            const fullName = inq.profiles?.full_name || "Guest Buyer";
            const companyName = inq.profiles?.company_name || extracted["Company Name"] || "";
            const phoneNumber = inq.profiles?.phone_number || extracted["Mobile"] || "";
            const emailAddress = inq.email || extracted["Email"] || "";
            
            // Format product detail
            const productName = inq.products?.name || extracted["Product/Service"] || "—";
            const productCategory = inq.products?.category || "B2B Custom Inquiry";

            // Quantity formatting helper
            const formatQuantity = (kg: number) => {
              if (!kg) return "—";
              if (kg >= 1000) {
                const tons = kg / 1000;
                return `${kg.toLocaleString("en-IN")} kg (${tons.toLocaleString("en-IN")} MT)`;
              }
              return `${kg.toLocaleString("en-IN")} kg`;
            };

            // Display message
            const displayMessage = cleanMessage || extracted["Message"];

            return (
              <div
                key={inq.id}
                className={`bg-white rounded-2xl shadow-xs border border-stone-100 hover:shadow-sm transition-all duration-300 overflow-hidden p-6 space-y-5 ${borderClass}`}
              >
                {/* Header Row: Name & Contact Form Tag (Left) | Status Selector (Right) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-50">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0 ${avatarBgClass}`}>
                      {(fullName ?? "?")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-charcoal text-lg md:text-xl leading-tight truncate">{fullName}</h3>
                        {companyName && (
                          <span className="text-sm md:text-base text-stone-400 font-medium truncate">
                            · {companyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Status Dropdown selector and Delete Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                    <StatusDropdown inquiryId={inq.id} currentStatus={status} />
                    <DeleteInquiryButton id={inq.id} />
                  </div>
                </div>

                {/* Grid details: Product, Quantity, Phone, Email, Destination, Date */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4.5 gap-x-8">
                  {/* Field 1: Product */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Package size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Product</p>
                      <p className="font-normal text-charcoal text-sm md:text-base mt-0.5 truncate">{productName}</p>
                      <p className="text-xs md:text-sm text-stone-400 truncate">{productCategory}</p>
                    </div>
                  </div>

                  {/* Field 2: Quantity */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Scale size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Quantity</p>
                      <p className="font-normal text-charcoal text-sm md:text-base mt-0.5 truncate">{formatQuantity(inq.requested_kg)}</p>
                    </div>
                  </div>

                  {/* Field 3: Phone No */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Phone size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Phone No</p>
                      <p className="font-normal text-charcoal text-sm md:text-base mt-0.5 truncate">{phoneNumber || "—"}</p>
                    </div>
                  </div>

                  {/* Field 4: Email Address */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Mail size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0 col-span-1">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Email Address</p>
                      <p className="font-normal text-charcoal text-xs sm:text-sm md:text-base mt-0.5 truncate" title={emailAddress}>{emailAddress || "—"}</p>
                    </div>
                  </div>

                  {/* Field 5: Destination */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Globe size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Destination</p>
                      <p className="font-normal text-charcoal text-sm md:text-base mt-0.5 truncate">{inq.destination_country || "India"}</p>
                    </div>
                  </div>

                  {/* Field 6: Inquiry Date */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Calendar size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-stone-450 font-bold uppercase tracking-wider">Inquiry Date</p>
                      <p className="font-normal text-charcoal text-xs sm:text-sm md:text-base mt-0.5">
                        {new Date(inq.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Message Box */}
                {displayMessage && (
                  <div className="p-4 bg-stone-50 rounded-xl border-l-4 border-l-gold border border-stone-100 text-sm">
                    <p className="font-bold text-stone-500 flex items-center gap-1.5 mb-1.5 text-xs md:text-sm">
                      <MessageSquare size={14} className="text-gold" />
                      Customer Note
                    </p>
                    <p className="text-stone-600 dark:text-stone-300 italic leading-relaxed whitespace-pre-line text-sm md:text-base">
                      "{displayMessage}"
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl shadow-xs border border-stone-100 py-20 text-center flex flex-col items-center justify-center">
            <div className="bg-stone-50 p-4 rounded-full text-stone-300 mb-4 border border-stone-50">
              <Inbox size={40} />
            </div>
            <p className="text-stone-600 font-semibold text-xl">No Inquiries Found</p>
            <p className="text-stone-450 text-base mt-1 max-w-sm">
              Any B2B requests or portal inquiries will appear here for reviews and quote processing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
