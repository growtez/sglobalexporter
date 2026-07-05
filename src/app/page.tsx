import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  User, Building2, Briefcase, PiggyBank, 
  ChevronDown, ChevronUp, Star, MapPin, 
  Share2, ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans w-full">
      {/* 1. Hero / Intro Section */}
      <section className="w-full bg-white pb-12">
        {/* Slider Mockup */}
        <div className="w-full overflow-hidden flex bg-[#2a2a2a] text-white">
          <div className="flex w-full">
            {/* Slide 1 */}
            <div className="w-1/4 relative group cursor-pointer border-r border-gray-700">
              <div className="h-48 md:h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                {/* Mock Image */}
                <div className="w-32 h-32 bg-white flex items-center justify-center text-gray-500 shadow-md relative z-10 rounded">
                  <span className="text-xs text-center font-medium px-2">Chamomile Tea</span>
                </div>
                {/* Blur bg */}
                <div className="absolute inset-0 bg-yellow-100/30 blur-md"></div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/70 p-3 text-center">
                <h3 className="font-medium text-sm">Chamomile Tea</h3>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-8 px-4 rounded-sm">Get Best Quote</Button>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="w-1/4 relative group cursor-pointer border-r border-gray-700">
               <div className="h-48 md:h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                <div className="w-32 h-32 bg-white flex items-center justify-center text-gray-500 shadow-md relative z-10 rounded">
                  <span className="text-xs font-medium">black tea</span>
                </div>
                <div className="absolute inset-0 bg-amber-900/30 blur-md"></div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/90 p-3 text-center">
                <h3 className="font-medium text-sm">black tea</h3>
              </div>
            </div>
            {/* Slide 3 */}
            <div className="w-1/4 relative group cursor-pointer border-r border-gray-700">
               <div className="h-48 md:h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                <div className="w-32 h-32 bg-white flex items-center justify-center text-gray-500 shadow-md relative z-10 rounded">
                  <span className="text-xs font-medium px-2 text-center">Ashwagandha Tea</span>
                </div>
                <div className="absolute inset-0 bg-green-900/30 blur-md"></div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/80 p-3 text-center">
                <h3 className="font-medium text-sm">Ashwagandha Tea</h3>
              </div>
            </div>
            {/* Slide 4 */}
            <div className="w-1/4 relative group cursor-pointer">
               <div className="h-48 md:h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                <div className="w-32 h-32 bg-white flex items-center justify-center text-gray-500 shadow-md relative z-10 rounded">
                  <span className="text-xs font-medium">CTC Tea</span>
                </div>
                <div className="absolute inset-0 bg-orange-900/30 blur-md"></div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/90 p-3 text-center">
                <h3 className="font-medium text-sm">CTC Tea</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center mt-12 max-w-5xl">
          <h1 className="text-xl md:text-[22px] font-medium text-[#2d58a7] mb-6">
            Welcome to Shahinur Global Exporter (Opc) Private Limited
          </h1>
          <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed mb-1 px-4">
            Established in the year 2023, we Manufacturer, Exporter, Supplier & Trader of Ashwagandha Tea, Black Tea, Chamomile Tea, CTC Tea, Darjeeling Tea, Green Tea, Loose Tea, Jasmine Tea, Oolong Tea, Orthodox Tea etc. Under the supervision of..
          </p>
          <button className="text-blue-500 text-[13px] hover:underline mb-8">Read More</button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {/* Cards */}
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
                <User className="text-gray-500 w-6 h-6" />
              </div>
              <p className="text-gray-400 text-xs mb-1">Founder</p>
              <p className="font-medium text-gray-800 text-[13px]">Mr. Shahinur Islam</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
                <Building2 className="text-gray-500 w-6 h-6" />
              </div>
              <p className="text-gray-400 text-xs mb-1">Year of Establishment</p>
              <p className="font-medium text-gray-800 text-[13px]">2023</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
                <Briefcase className="text-gray-500 w-6 h-6" />
              </div>
              <p className="text-gray-400 text-xs mb-1">Primary Business</p>
              <p className="font-medium text-gray-800 text-[13px]">Manufacturer</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
                <PiggyBank className="text-gray-500 w-6 h-6" />
              </div>
              <p className="text-gray-400 text-xs mb-1">Annual Turnover</p>
              <p className="font-medium text-gray-800 text-[13px]">Below Rs. 0.5 Crore Approx.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Range */}
      <section className="w-full bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl md:text-2xl font-medium text-[#2d58a7] text-center mb-8">Our Product Range</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {/* Product Item 1 */}
            <div className="border-r border-b border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-md relative overflow-hidden flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Jute Bag</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Jute Shopping Bag</li>
                <li className="cursor-pointer hover:text-blue-600">Plain Jute Tote Bag</li>
                <li className="cursor-pointer hover:text-blue-600">Plain Jute Pouch Bag</li>
                <li className="cursor-pointer hover:text-blue-600">Jute Cosmetic Bag</li>
              </ul>
              <button className="text-[#2d58a7] text-xs font-semibold mt-3 flex items-center hover:underline">View All <ArrowRight className="w-3 h-3 ml-1" /></button>
            </div>
            {/* Product Item 2 */}
            <div className="border-r border-b border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-md relative overflow-hidden flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Black Tea</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Pure Assam Tea</li>
                <li className="cursor-pointer hover:text-blue-600">Premium BOP Tea</li>
                <li className="cursor-pointer hover:text-blue-600">Loose Tea</li>
                <li className="cursor-pointer hover:text-blue-600">CTC Tea</li>
              </ul>
              <button className="text-[#2d58a7] text-xs font-semibold mt-3 flex items-center hover:underline">View All <ArrowRight className="w-3 h-3 ml-1" /></button>
            </div>
            {/* Product Item 3 */}
            <div className="border-r border-b lg:border-r border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Herbal Tea</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Oolong Tea</li>
                <li className="cursor-pointer hover:text-blue-600">Peppermint Tea</li>
              </ul>
            </div>
            {/* Product Item 4 */}
            <div className="border-b lg:border-r-0 border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-20 h-24 bg-gray-100 rounded-md flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Jute Carry Bags</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Plain Jute Carry Bag</li>
                <li className="cursor-pointer hover:text-blue-600">Printed Jute Carry Bag</li>
              </ul>
            </div>
             {/* Product Item 5 */}
            <div className="border-r lg:border-b-0 border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Flower Tea</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Jasmine Tea</li>
              </ul>
            </div>
            {/* Product Item 6 */}
            <div className="border-r lg:border-b-0 border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Tea</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">White Tea</li>
              </ul>
            </div>
            {/* Product Item 7 */}
            <div className="border-r sm:border-b-0 border-gray-200 p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Darjeeling Tea</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Darjeeling Tea</li>
              </ul>
            </div>
            {/* Product Item 8 */}
            <div className="p-6 flex flex-col items-center text-center group">
              <div className="h-32 mb-4 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center"><span className="text-xs text-gray-400">Image</span></div>
              </div>
              <h3 className="text-[#2d58a7] font-semibold text-[15px] mb-2 cursor-pointer hover:underline">Tea Leaves</h3>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="cursor-pointer hover:text-blue-600">Ashwagandha Tea</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="text-[#d65f1a] border-[#d65f1a] hover:bg-orange-50 rounded-sm px-6 h-9 text-xs uppercase tracking-wide font-medium bg-transparent">
              view all categories &gt;&gt;
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Ratings & Reviews */}
      <section className="w-full bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
             <h2 className="text-xl font-medium text-gray-800 inline-block border-b-[3px] border-blue-500 pb-1.5 px-2">
               Ratings & Reviews
             </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col md:flex-row mb-6">
             <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center gap-2 mb-4 text-[#1a68bc] font-semibold text-[13px]">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1a68bc]"></div> Overall Rating
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                   <div className="text-[40px] font-bold text-gray-900 mb-1 flex items-baseline">5.0<span className="text-2xl text-gray-400 font-normal">/5</span></div>
                   <div className="flex text-yellow-400 mb-3">
                     <Star className="w-4 h-4 fill-current mx-0.5" />
                     <Star className="w-4 h-4 fill-current mx-0.5" />
                     <Star className="w-4 h-4 fill-current mx-0.5" />
                     <Star className="w-4 h-4 fill-current mx-0.5" />
                     <Star className="w-4 h-4 fill-current mx-0.5" />
                   </div>
                   <p className="text-xs text-gray-500 mb-4">Reviewed by 1 Users</p>
                   <Button variant="outline" className="border-blue-300 text-blue-500 rounded-full h-[30px] px-5 text-xs font-medium hover:bg-blue-50">Write a Review</Button>
                </div>
             </div>
             
             <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center gap-2 mb-6 text-emerald-500 font-semibold text-[13px]">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500"></div> Rating Breakdown
                </div>
                <div className="space-y-2.5 px-2">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center text-xs text-gray-500 gap-3">
                      <span className="w-2 font-medium text-orange-400">{star}</span>
                      <Star className="w-3 h-3 text-orange-400 fill-current -ml-1" />
                      <div className="flex-1 h-[7px] bg-gray-200 rounded-full overflow-hidden">
                         <div className={`h-full ${star === 5 ? 'bg-emerald-500 w-full' : 'w-0'}`}></div>
                      </div>
                      <span className="w-2 text-right">{star === 5 ? '1' : '0'}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="md:w-1/3 p-6">
                <div className="flex items-center gap-2 mb-8 text-blue-400 font-semibold text-[13px]">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400"></div> User Satisfaction
                </div>
                <div className="flex justify-around px-2 mt-4">
                   <div className="flex flex-col items-center">
                     <div className="w-[60px] h-[60px] rounded-full border-[5px] border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-700 mb-3">0%</div>
                     <span className="text-xs text-gray-600 font-medium">Response</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <div className="w-[60px] h-[60px] rounded-full border-[5px] border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-700 mb-3">0%</div>
                     <span className="text-xs text-gray-600 font-medium">Quality</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <div className="w-[60px] h-[60px] rounded-full border-[5px] border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-700 mb-3">0%</div>
                     <span className="text-xs text-gray-600 font-medium">Delivery</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Individual Review */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 flex gap-4">
             <div className="w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center text-xl font-medium flex-shrink-0">
               R
             </div>
             <div>
               <div className="flex items-center gap-1 mb-1">
                 <h4 className="font-semibold text-[13px] text-gray-800">R.k. Aggarwal</h4>
                 <span className="text-[11px] text-gray-400">| Delhi,</span>
               </div>
               <p className="text-[11px] text-gray-500 mb-1.5">Product name : <span className="font-semibold text-gray-700">Assam Ctc Tea</span></p>
               <div className="flex items-center gap-2 mb-3">
                 <div className="flex text-yellow-400">
                     <Star className="w-[11px] h-[11px] fill-current mx-0.5" />
                     <Star className="w-[11px] h-[11px] fill-current mx-0.5" />
                     <Star className="w-[11px] h-[11px] fill-current mx-0.5" />
                     <Star className="w-[11px] h-[11px] fill-current mx-0.5" />
                     <Star className="w-[11px] h-[11px] fill-current mx-0.5" />
                 </div>
                 <span className="text-[11px] text-gray-400">| 07 Jan 2025</span>
               </div>
               <p className="text-[13px] text-gray-700">Refreshingly unique features that enhance usability</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className="w-full bg-gray-50 pb-16">
         <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-lg md:text-[20px] font-medium text-gray-800 text-center mb-6">
               FAQs : Shahinur Global Exporter (Opc) Private Limited
            </h2>
            
            <div className="space-y-2.5">
               {/* Expanded FAQ */}
               <div className="bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e96e25]"></div>
                 <div className="p-4 flex justify-between items-start cursor-pointer">
                    <div className="flex gap-2.5 items-start">
                       <span className="text-[#e96e25] font-bold text-[13px] mt-0.5">Q.</span>
                       <h3 className="font-semibold text-[13px] text-gray-800 mt-0.5 leading-snug">What is the year of establishment of Shahinur Global Exporter (Opc) Private Limited?</h3>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                       <ChevronUp className="w-4 h-4" />
                    </div>
                 </div>
                 <div className="px-4 pb-4 pl-[34px] text-[12px] text-gray-500 leading-relaxed pr-8">
                    The establishment year of Shahinur Global Exporter (Opc) Private Limited is 2023. Since its inception, the company has been engaged in business activities focused on customer satisfaction.
                 </div>
               </div>

               {/* Collapsed FAQs */}
               {[
                 "What are the main products offered by Shahinur Global Exporter (Opc) Private Limited?",
                 "Where is Shahinur Global Exporter (Opc) Private Limited located?",
                 "How many products are listed by Shahinur Global Exporter (Opc) Private Limited?",
                 "Which product categories does Shahinur Global Exporter (Opc) Private Limited specialize in?",
                 "What industries does Shahinur Global Exporter (Opc) Private Limited cater to?",
                 "Is Shahinur Global Exporter (Opc) Private Limited a manufacturer, supplier, exporter, or trader?",
                 "How can buyers contact Shahinur Global Exporter (Opc) Private Limited?",
                 "Does Shahinur Global Exporter (Opc) Private Limited supply products across India?",
                 "What is the complete address of Shahinur Global Exporter (Opc) Private Limited?"
               ].map((question, i) => (
                 <div key={i} className="bg-white border border-gray-200 rounded-sm shadow-sm relative">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e96e25]"></div>
                   <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                      <div className="flex gap-2.5 pr-4 items-center">
                         <span className="text-[#e96e25] font-bold text-[13px]">Q.</span>
                         <h3 className="font-semibold text-[13px] text-gray-800">{question}</h3>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Contact / Form Footer */}
      <section className="w-full bg-gray-50 pb-16">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row shadow-sm border border-gray-200 bg-white relative">
               {/* Form Side */}
               <div className="flex-1 flex flex-col">
                  <div className="bg-[#1864b4] text-white px-5 py-3.5 font-semibold text-[15px]">
                    Tell Us What are you looking for? Will call you back
                  </div>
                  <div className="p-6 md:p-10 lg:pr-[380px]">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Product/Service</label>
                          <input type="text" placeholder="Enter Product / Service" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                        </div>
                        <div className="flex gap-4">
                           <div className="flex-1">
                              <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Quantity</label>
                              <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                           </div>
                           <div className="flex-1">
                              <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Select Unit</label>
                              <select className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-400 bg-white focus:outline-none focus:border-blue-500 appearance-none">
                                 <option>Unit of Measurement</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="w-full md:w-[48%] mb-6">
                        <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Mobile No.</label>
                        <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                           <div className="bg-gray-50 px-3 py-2 border-r border-gray-300 text-sm text-gray-600 flex items-center gap-2">
                             <div className="w-4 h-[11px] flex flex-col rounded-[1px] overflow-hidden"><div className="h-1/3 bg-orange-500"></div><div className="h-1/3 bg-white"></div><div className="h-1/3 bg-green-500"></div></div>
                             +91
                           </div>
                           <input type="text" placeholder="Mobile No" className="flex-1 px-3 py-2 text-sm focus:outline-none placeholder-gray-400" />
                        </div>
                     </div>
                     <div className="flex flex-col items-center">
                        <Button className="bg-[#e96e25] hover:bg-[#d65f1a] text-white px-8 py-2.5 h-auto text-[14px] font-semibold rounded-[3px] mb-3">
                           Send Inquiry
                        </Button>
                        <p className="text-[11px] text-gray-500">
                           By clicking Send Inquiry, I accept the <span className="text-blue-500 cursor-pointer hover:underline">T&C</span> and <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>
                     </div>
                  </div>
               </div>
               
               {/* Contact Side (Desktop Absolute Floating Box) */}
               <div className="hidden lg:block absolute -top-8 right-8 bg-white shadow-xl border border-gray-200 rounded-[3px] w-[320px] z-10">
                  <div className="p-6">
                     <h3 className="font-bold text-gray-800 text-[13px] mb-5">Contact Us</h3>
                     
                     <div className="flex items-start gap-3 mb-4">
                        <User className="w-[18px] h-[18px] text-gray-400 mt-0.5" />
                        <div>
                           <p className="text-[13px] text-gray-800 font-semibold mb-0.5">Mr. Shahinur Islam</p>
                           <p className="text-[12px] text-blue-500">(Shahinur Global Exporter (Opc) Private Limited)</p>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-3 mb-5">
                        <MapPin className="w-[18px] h-[18px] text-gray-400 mt-0.5" />
                        <p className="text-[12px] text-gray-600 leading-relaxed pr-2">
                           Pipulbari part 1, Hatsingimari, Mankachar, Dhubri, South Salmara, Assam - 783135
                        </p>
                     </div>
                     
                     <div className="flex items-center gap-3 mb-5">
                        <Share2 className="w-[18px] h-[18px] text-gray-600" />
                        <span className="text-[13px] text-gray-800">Share us via</span>
                        <div className="flex gap-1.5 ml-1">
                           <div className="w-[22px] h-[22px] bg-[#3b5998] rounded-sm flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">f</div>
                           <div className="w-[22px] h-[22px] bg-black rounded-sm flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">X</div>
                           <div className="w-[22px] h-[22px] bg-[#007bb5] rounded-sm flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">in</div>
                           <div className="w-[22px] h-[22px] bg-[#cb2027] rounded-sm flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">P</div>
                        </div>
                     </div>

                     <p className="text-[12px] font-medium text-blue-600 hover:underline cursor-pointer mb-6">Manufacturers In South Salmara</p>
                     
                     <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-sm mb-6 font-semibold h-[34px] text-[13px]">
                        View Contact No.
                     </Button>

                     <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                        <div className="w-3.5 h-3.5 bg-orange-100 text-orange-500 rounded-sm flex items-center justify-center font-bold">!</div>
                        <span className="hover:underline cursor-pointer">Found Something Wrong with this Listing? Report Here.</span>
                     </div>
                  </div>
               </div>

               {/* Mobile view contact (simplified) */}
               <div className="p-6 lg:hidden border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 text-[13px] mb-4">Contact Us</h3>
                  <div className="flex items-start gap-3 mb-4">
                     <User className="w-[18px] h-[18px] text-gray-400 mt-0.5" />
                     <div>
                        <p className="text-[13px] text-gray-800 font-semibold mb-0.5">Mr. Shahinur Islam</p>
                        <p className="text-[12px] text-blue-500">(Shahinur Global Exporter (Opc) Private Limited)</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 mb-6">
                     <MapPin className="w-[18px] h-[18px] text-gray-400 mt-0.5" />
                     <p className="text-[12px] text-gray-600 leading-relaxed pr-2">
                        Pipulbari part 1, Hatsingimari, Mankachar, Dhubri, South Salmara, Assam - 783135
                     </p>
                  </div>
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-sm font-semibold h-[34px] text-[13px]">
                     View Contact No.
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
