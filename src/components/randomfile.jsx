
/////////////////////////soclution page contete
//  <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center space-y-3 mb-12">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700">
//             <Layers className="h-3.5 w-3.5 text-indigo-500" />
//             <span>Full Feature Matrix</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
//             Discover the Plan That's Right for You
//           </h2>
//           <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
//             Here are all the amazing features included in our plans
//           </p>
//         </div>

//         {/* Comparison Table Container */}
//         <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
//           {/* Table Header (Sticky / Top) */}
//           <div className="grid grid-cols-12 bg-slate-900 text-white p-5 sm:p-6 items-center border-b border-slate-800">
//             <div className="col-span-5 sm:col-span-4 font-bold text-sm sm:text-base text-slate-300">
//               Features by Category
//             </div>
//             <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center gap-2">
//               <div className="space-y-1">
//                 <div className="text-xs sm:text-sm font-extrabold text-white">
//                   Individuals & Startups
//                 </div>
//                 <div className="text-xs text-indigo-200 font-medium hidden sm:block">
//                   ${isAnnual ? "119" : "149"}/mo
//                 </div>
//                 <Link
//                   href="/book-demo"
//                   className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
//                 >
//                   Start Now
//                 </Link>
//               </div>

//               <div className="space-y-1 relative">
//                 <div
//                   className="text-xs sm:text-sm font-extrabold"
//                   style={{ color: "var(--secondary)" }}
//                 >
//                   Enterprises
//                 </div>
//                 <div className="text-xs text-cyan-200 font-medium hidden sm:block">
//                   ${isAnnual ? "179" : "199"}/mo
//                 </div>
//                 <Link
//                   href="/book-demo"
//                   className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg text-white shadow-sm transition-all"
//                   style={{ backgroundColor: "var(--primary)" }}
//                 >
//                   Start Now
//                 </Link>
//               </div>

//               <div className="space-y-1">
//                 <div className="text-xs sm:text-sm font-extrabold text-white">
//                   DevRel Agencies
//                 </div>
//                 <div className="text-xs text-slate-400 font-medium hidden sm:block">
//                   Custom
//                 </div>
//                 <Link
//                   href="/contact"
//                   className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
//                 >
//                   Get Onboarded
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Table Body by Categories */}
//           <div className="divide-y divide-slate-100">
//             {COMPARISON_CATEGORIES.map((category, catIdx) => {
//               const IconComponent = category.icon;
//               return (
//                 <div key={catIdx} className="overflow-x-auto">
//                   {/* Category Title Row */}
//                   <div className="bg-slate-50/80 px-6 py-4 flex items-center gap-2.5 border-t border-b border-slate-200/70">
//                     <span
//                       className="p-1.5 rounded-lg"
//                       style={{
//                         backgroundColor: "var(--primary-light)",
//                         color: "var(--primary)",
//                       }}
//                     >
//                       <IconComponent className="h-4 w-4" />
//                     </span>
//                     <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">
//                       {category.title}
//                     </h3>
//                   </div>

//                   {/* Feature Rows */}
//                   <div className="divide-y divide-slate-100">
//                     {category.features.map((feat, fIdx) => (
//                       <div
//                         key={fIdx}
//                         className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-slate-50/50 transition-colors text-xs sm:text-sm"
//                       >
//                         <div className="col-span-5 sm:col-span-4 font-medium text-slate-700 pr-2">
//                           {feat.name}
//                         </div>
//                         <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center items-center">
//                           <div className="flex justify-center">
//                             {renderCellContent(feat.individuals)}
//                           </div>
//                           <div className="flex justify-center bg-indigo-50/20 py-1.5 rounded-lg">
//                             {renderCellContent(feat.enterprise)}
//                           </div>
//                           <div className="flex justify-center">
//                             {renderCellContent(feat.agency)}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Table Footer Bottom Action Row */}
//           <div className="grid grid-cols-12 bg-slate-50 px-6 py-6 border-t border-slate-200 items-center">
//             <div className="col-span-5 sm:col-span-4 font-bold text-sm sm:text-base text-slate-800">
//               Choose a Plan
//             </div>
//             <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center gap-3">
//               <Link
//                 href="/book-demo"
//                 className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
//               >
//                 Start Now
//               </Link>
//               <Link
//                 href="/book-demo"
//                 className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-95"
//                 style={{
//                   backgroundColor: "var(--primary)",
//                   boxShadow: "0 4px 14px var(--primary-glow)",
//                 }}
//               >
//                 Start Now
//               </Link>
//               <Link
//                 href="/contact"
//                 className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
//               >
//                 Get Onboarded
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

    
//       <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="relative rounded-3xl overflow-hidden border border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/40 to-slate-100 p-8 sm:p-12 shadow-xl">
       
//           <div
//             className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-3xl opacity-20 pointer-events-none"
//             style={{ backgroundColor: "var(--primary)" }}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
//             <div className="lg:col-span-8 space-y-6">
//               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
//                 <HeartHandshake className="h-4 w-4" />
//                 <span>Non-Profit & Student Initiatives</span>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
//                   Buzzoraa for Non-profit Communities &amp; Startups
//                 </h3>
//                 <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
//                   Get a dedicated community space for all your members, their
//                   content, profiles & multiple engagement options to share
//                   knowledge and build recognition.
//                 </p>
//               </div>

//               <div className="pt-2">
//                 <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-4">
//                   For The Tech Community Leaders:
//                 </h4>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
//                   {[
//                     "Community and events dashboard",
//                     "Member management",
//                     "Community & Event Analytics",
//                     "Community newsletters",
//                     "Generative member growth",
//                     "Channels and forums",
//                     "Online & Offline events with smart shortlisting",
//                     "Networking with experts and community leaders",
//                   ].map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
//                     >
//                       <span
//                         className="h-4 w-4 rounded-full flex items-center justify-center shrink-0"
//                         style={{
//                           backgroundColor: "var(--primary-light)",
//                           color: "var(--primary)",
//                         }}
//                       >
//                         <Check className="h-3 w-3 stroke-[3]" />
//                       </span>
//                       <span>{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <Link
//                   href="/book-demo"
//                   className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95"
//                   style={{
//                     backgroundColor: "var(--primary)",
//                     boxShadow: "0 8px 24px var(--primary-glow)",
//                   }}
//                 >
//                   <span>Apply Now</span>
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             </div>

           
//             <div className="lg:col-span-4 flex justify-center">
//               <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-6 shadow-md text-center space-y-4">
//                 <div
//                   className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center shadow-inner"
//                   style={{
//                     backgroundColor: "var(--primary-light)",
//                     color: "var(--primary)",
//                   }}
//                 >
//                   <Rocket className="h-8 w-8" />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-base text-slate-900">
//                     Empowering Tech Leaders
//                   </h4>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Free and subsidized community infrastructure for student
//                     clubs, open-source maintainers, and grassroots developer
//                     networks worldwide.
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
//                   ⚡ Over 500+ student and grassroots chapters powered
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

    
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center space-y-3 mb-12">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
//             More avenues to interact with Brands &amp; Builders on Buzzoraa
//           </h2>
//           <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
//             Social engagement, advocacy campaigns, content amplification with member loops,
//             and high-intent conversation pipelines.
//           </p>
//           <div className="pt-4">
//             <span className="text-xs font-black uppercase tracking-widest text-slate-400">
//               Communities &amp; Brands Already on Buzzoraa
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {COMMUNITIES.map((comm, idx) => (
//             <div
//               key={idx}
//               className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
//             >
//               <div>
//                 <span
//                   className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-3"
//                   style={{
//                     backgroundColor: "var(--primary-light)",
//                     color: "var(--primary)",
//                   }}
//                 >
//                   {comm.category}
//                 </span>
//                 <h4 className="text-base sm:text-lg font-black text-slate-900">
//                   {comm.name}
//                 </h4>
//                 <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
//                   {comm.description}
//                 </p>
//               </div>

//               <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
//                 <Globe2 className="h-3.5 w-3.5" />
//                 <span>Verified Ecosystem Chapter</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

     
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         <div className="text-center space-y-3 mb-10">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700">
//             <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
//             <span>Got Questions?</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-xs sm:text-sm text-slate-500">
//             Everything you need to know about setting up, billing, and scaling
//             your community platform.
//           </p>
//         </div>

//         <div className="space-y-3.5">
//           {FAQS.map((faq, idx) => {
//             const isOpen = openFaq === idx;
//             return (
//               <div
//                 key={idx}
//                 className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs transition-all overflow-hidden"
//               >
//                 <button
//                   type="button"
//                   onClick={() => toggleFaq(idx)}
//                   className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
//                 >
//                   <span className="text-sm sm:text-base font-bold text-slate-900 pr-2">
//                     {faq.q}
//                   </span>
//                   <span
//                     className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
//                       ? "rotate-180 bg-slate-900 text-white"
//                       : "bg-slate-100 text-slate-600"
//                       }`}
//                   >
//                     <ChevronDown className="h-4 w-4" />
//                   </span>
//                 </button>

//                 {isOpen && (
//                   <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
//                     <p className="pt-3">{faq.a}</p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-8">
//         <div
//           className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl"
//           style={{
//             backgroundImage:
//               "linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)",
//           }}
//         >
//           <div
//             className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none"
//             style={{ backgroundColor: "var(--primary)" }}
//           />

//           <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
//             <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
//               Ready to Accelerate Your Developer Community?
//             </h3>
//             <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
//               Join leading global developer chapters and scale your events,
//               hackathons, and ecosystem in minutes.
//             </p>
//             <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
//               <Link
//                 href="/book-demo"
//                 className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95"
//                 style={{
//                   backgroundColor: "var(--primary)",
//                   boxShadow: "0 6px 20px var(--primary-glow)",
//                 }}
//               >
//                 Start 7-Day Free Trial
//               </Link>
//               <Link
//                 href="/contact"
//                 className="px-6 py-3 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>