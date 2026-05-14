const fs = require('fs');

const content = `"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, MapPin, Calendar, FileText, Play, Shield, ChevronLeft, ArrowRight, Leaf, Eye, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use Framer Motion variants for cinematic feel
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function VerificationPage({ params }: { params: { productId: string, batchId: string } }) {
  const [mounted, setMounted] = useState(false);
  const [batchData, setBatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simulate fetching real batch and product data from DB
    setTimeout(() => {
      setBatchData({
        batchId: params.batchId,
        productName: "Highland Macadamia, Premium Reserve",
        brand: "Highland Heritage",
        status: "Verified Authentic",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy video
        farmInfo: {
          name: "Dak Nong Heritage Estate",
          location: "Tuy Duc Province, Central Highlands",
          farmerName: "Artisan Tran",
          harvestMethod: "Hand-selected, sun-dried"
        },
        productionDate: "2025-05-01",
        expirationDate: "2026-05-01",
        logisticsTimeline: [
          { event: "Hand Harvesting", date: "Apr 25, 2025", location: "Dak Nong Estate" },
          { event: "Cold Press Drying", date: "Apr 28, 2025", location: "Highland Facility" },
          { event: "Quality Assurance", date: "May 01, 2025", location: "HCMC QC Center" }
        ],
        certificates: [
          { name: "VietGAP Organic", file: "#" },
          { name: "ISO 22000:2018", file: "#" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [params]);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] text-[#2C3830] min-h-screen font-sans selection:bg-[#2C3830] selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#2C3830]/5">
        <Link href="/" className="flex items-center gap-2 text-[#2C3830]/60 hover:text-[#2C3830] transition-colors">
          <ChevronLeft size={20} strokeWidth={1.5} />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] mt-0.5">Return</span>
        </Link>
        <div className="text-sm font-serif italic tracking-wide text-[#2C3830]">
          Highland Heritage
        </div>
      </header>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm uppercase tracking-widest text-[#2C3830]/60"
          >
            Authenticating...
          </motion.div>
        </div>
      ) : (
        <motion.main 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-xl mx-auto pt-32 pb-32 px-6"
        >
          {/* Document Header (Digital Passport Vibe) */}
          <motion.div variants={fadeIn} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-green-700/20 bg-green-50 mb-8 relative">
              <Shield className="text-green-700 w-10 h-10" strokeWidth={1} />
              <div className="absolute -bottom-2 bg-green-700 text-white text-[10px] uppercase tracking-widest py-1 px-3 rounded-full">
                Authentic
              </div>
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2C3830]/50 mb-3">Digital Certificate of Authenticity</p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">{batchData.productName}</h1>
            <p className="text-sm text-[#2C3830]/60 italic font-serif">by {batchData.brand}</p>
          </motion.div>

          {/* Product Data Grid */}
          <motion.div variants={fadeIn} className="grid grid-cols-2 text-sm border-t border-b border-[#2C3830]/10 mb-16">
            <div className="border-r border-[#2C3830]/10 py-6 pr-6">
              <p className="text-[9px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Product ID</p>
              <p className="font-mono text-[#2C3830] break-all">{params.productId}</p>
            </div>
            <div className="py-6 pl-6">
              <p className="text-[9px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Batch Number</p>
              <p className="font-mono text-[#2C3830] break-all">{batchData.batchId}</p>
            </div>
            <div className="border-t border-r border-[#2C3830]/10 py-6 pr-6">
              <p className="text-[9px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Production</p>
              <p className="font-mono text-[#2C3830]">{batchData.productionDate}</p>
            </div>
            <div className="border-t border-[#2C3830]/10 py-6 pl-6">
              <p className="text-[9px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Best Before</p>
              <p className="font-mono text-[#2C3830]">{batchData.expirationDate}</p>
            </div>
          </motion.div>

          {/* Cinematic Video/Photo */}
          <motion.section variants={fadeIn} className="mb-20">
            <div className="aspect-[4/5] md:aspect-video w-full rounded-2xl overflow-hidden relative bg-[#2C3830] group">
              <video 
                src={batchData.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute pl-8 pb-8 bottom-0 left-0 right-0 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center bg-white/10 text-white cursor-pointer hover:bg-white hover:text-[#2C3830] transition-colors">
                    <Play className="w-4 h-4 ml-1" />
                 </div>
                 <p className="text-white text-sm font-serif italic">View the harvest</p>
              </div>
            </div>
          </motion.section>

          {/* Provenance Document */}
          <motion.section variants={fadeIn} className="mb-20 relative">
            <h3 className="text-xs uppercase tracking-[0.2em] mb-10 text-center text-[#2C3830]/50">— Provenance —</h3>
            
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#2C3830]/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/images/pattern.png')] bg-contain opacity-5 pointer-events-none" />
              
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#2C3830]/40" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-xl mb-1">{batchData.farmInfo.name}</h4>
                  <p className="text-[#2C3830]/60 text-sm tracking-wide">{batchData.farmInfo.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#2C3830]/5 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Harvest Method</p>
                  <p className="font-medium text-[#2C3830]/90">{batchData.farmInfo.harvestMethod}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#2C3830]/40 mb-2">Lead Artisan</p>
                  <p className="font-medium text-[#2C3830]/90">{batchData.farmInfo.farmerName}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section variants={fadeIn} className="mb-20">
            <h3 className="text-xs uppercase tracking-[0.2em] mb-10 text-center text-[#2C3830]/50">— Logistics Journey —</h3>
            <div className="relative pl-4 space-y-12">
              <div className="absolute top-2 bottom-2 left-4 w-px bg-[#2C3830]/10" />
              {batchData.logisticsTimeline.map((item: any, index: number) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#FAF9F6] border border-[#2C3830] z-10" />
                  <div className="mb-1 flex items-baseline gap-4">
                    <h4 className="font-serif text-lg">{item.event}</h4>
                    <span className="text-[10px] text-[#2C3830]/50 uppercase tracking-wider font-mono">{item.date}</span>
                  </div>
                  <p className="text-sm text-[#2C3830]/70 italic">{item.location}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Certificates */}
          <motion.section variants={fadeIn} className="mb-10">
             <h3 className="text-xs uppercase tracking-[0.2em] mb-8 text-center text-[#2C3830]/50">— Certifications —</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {batchData.certificates.map((cert: any, idx: number) => (
                 <a key={idx} href={cert.file} className="group flex items-center justify-between p-5 bg-white rounded-xl border border-[#2C3830]/5 hover:border-[#2C3830]/20 transition-all hover:shadow-sm">
                   <div className="flex items-center gap-3">
                     <FileText className="text-[#2C3830]/40 w-5 h-5 group-hover:text-[#2C3830]" strokeWidth={1.5} />
                     <span className="font-serif text-sm">{cert.name}</span>
                   </div>
                   <Eye className="w-4 h-4 text-[#2C3830]/20 group-hover:text-[#2C3830]" />
                 </a>
               ))}
             </div>
          </motion.section>

        </motion.main>
      )}

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {!loading && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6] to-transparent z-40"
          >
            <div className="max-w-xl mx-auto flex gap-4">
              <Link href={\`/shop/\${params.productId}\`} className="flex-1 bg-[#2C3830] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors hover:shadow-xl shadow-lg">
                <span className="text-sm font-medium tracking-wide">Buy Direct from Farm</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;
fs.writeFileSync('src/app/verification/[productId]/[batchId]/page.tsx', content);
