import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import { Helmet } from "react-helmet-async";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="landing-page" ref={containerRef}>
      <Helmet>
        <title>Image Editor Pro - Professional Online Photo Editor</title>
        <meta name="description" content="Transform your images with precision. The most powerful browser-based editor with filters, cropping, and professional tools. Free, private, and secure." />
        <meta name="keywords" content="image editor, photo editor, online editor, crop image, filter image, privacy first" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://image-editor-pro.com/" />
        <meta property="og:title" content="Image Editor Pro - Professional Online Photo Editor" />
        <meta property="og:description" content="Transform your images with precision. The most powerful browser-based editor with filters, cropping, and professional tools." />
        <meta property="og:image" content="/Public/metaicon2.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://image-editor-pro.com/" />
        <meta property="twitter:title" content="Image Editor Pro - Professional Online Photo Editor" />
        <meta property="twitter:description" content="Transform your images with precision. The most powerful browser-based editor with filters, cropping, and professional tools." />
        <meta property="twitter:image" content="/Public/metaicon2.png" />
      </Helmet>

      {/* Header */}
      <header className="landing-header">
        <Link to="/" className="logo">
          <i className="ri-image-edit-line"></i>
          <span>Image Editor Pro</span>
        </Link>
        
        <nav>
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
            <li><a href="#features">Features</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><Link to="/editor" className="btn btn-primary">Launch Editor</Link></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 text-2xl text-white bg-white/5 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-bold">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
              <Link to="/editor" className="btn btn-primary btn-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Launch Editor
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section (Elements 3-4) */}
      <section className="hero">
        <motion.span 
          className="section-tag"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Power at your fingertips
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Transform your images with <span className="highlight">Precision</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The most powerful browser-based editor. Filters, cropping, 
          and professional tools combined with a seamless user experience.
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/editor" className="btn btn-primary btn-lg">Start Editing Now</Link>
          <a href="#features" className="btn btn-secondary btn-lg">How it works</a>
        </motion.div>
        
        {/* Hero Image Mockup (Element 6) */}
        <motion.div 
          className="mt-16 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="rounded-2xl overflow-hidden bg-black border border-white/5">
            <div className="h-8 bg-white/10 flex items-center px-4 gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="aspect-video bg-neutral-900 flex items-center justify-center relative group">
               <i className="ri-image-edit-fill text-[120px] text-white/5 group-hover:text-blue-500/10 transition-colors duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <div className="text-left">
                   <p className="text-white font-bold text-xl">Professional Interface</p>
                   <p className="text-white/60 text-sm">Sleek, intuitive, and feature-rich.</p>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Stats (Element 5) */}
      <section className="stats py-24">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {[ 
            { label: "Active Users", val: "50K+" },
            { label: "Edited Photos", val: "2M+" },
            { label: "Uptime", val: "99.9%" },
            { label: "Rating", val: "4.9/5" }
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" variants={fadeInUp}>
              <h3 className="text-4xl font-extrabold text-blue-500 mb-2">{stat.val}</h3>
              <p className="text-sm text-neutral-500 font-medium uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Bento Grid (Element 7) */}
      <section id="features">
        <span className="section-tag">Capabilities</span>
        <h2>Powerful tools, simple interface.</h2>
        <motion.div 
          className="bento-grid"
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div className="bento-card large" variants={fadeInUp}>
            <i className="ri-equalizer-line"></i>
            <h3>Advanced Filters</h3>
            <p>Control every aspect of your image with professional-grade filters. Adjust brightness, contrast, and more with ease.</p>
          </motion.div>
          <motion.div className="bento-card" variants={fadeInUp}>
            <i className="ri-aspect-ratio-line"></i>
            <h3>Smart Cropping</h3>
            <p>Precise aspect ratio presets for social media and beyond.</p>
          </motion.div>
          <motion.div className="bento-card" variants={fadeInUp}>
            <i className="ri-refresh-line"></i>
            <h3>History Tracking</h3>
            <p>Never lose an edit. Full undo/redo support for a worry-free workflow.</p>
          </motion.div>
          <motion.div className="bento-card" variants={fadeInUp}>
            <i className="ri-arrow-left-right-line"></i>
            <h3>Compare Mode</h3>
            <p>Instantly compare your edits with the original source.</p>
          </motion.div>
          <motion.div className="bento-card" variants={fadeInUp}>
            <i className="ri-rotate-lock-line"></i>
            <h3>Transform Tools</h3>
            <p>Rotate, flip, and mirror your images with pixel precision.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Accordion (Element 9) */}
      <section id="faq">
        <span className="section-tag">FAQ</span>
        <h2>Common Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "Is it free to use?", a: "Yes! Image Editor Pro is completely free to use right in your browser." },
            { q: "Do you store my images?", a: "No. All edits happen locally in your browser. Your images never touch our servers." },
            { q: "What formats are supported?", a: "We support PNG, JPEG, WebP, and other common web formats." }
          ].map((item, i) => (
            <motion.details 
              key={i} 
              className="group bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden"
              variants={fadeInUp}
            >
              <summary className="p-6 cursor-pointer font-bold flex justify-between items-center list-none">
                {item.q}
                <i className="ri-add-line group-open:rotate-45 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                {item.a}
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Final CTA (Element 10) */}
      <section className="pb-32">
        <motion.div 
          className="bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative"
          variants={fadeInUp}
        >
          <div className="relative z-10">
            <h2 className="text-white !mb-6">Ready to create?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Join thousands of creators using Image Editor Pro to perfect their vision.</p>
            <Link to="/editor" className="btn !bg-white !text-blue-600 !border-white btn-lg hover:scale-105 transition-transform">
              Open the Editor Now <i className="ri-arrow-right-line ml-2" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400 blur-3xl rounded-full" />
        </motion.div>
      </section>

      {/* Footer (Element 11) */}
      <footer className="border-t border-white/5 py-12 px-[5%]">
        <div className="max-w-1200 mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
             <div className="logo mb-6 text-xl font-bold flex items-center gap-2">
               <i className="ri-image-edit-line text-blue-500"></i>
               <span>Image Editor Pro</span>
             </div>
             <p className="text-neutral-500 max-w-sm">The world's most powerful browser-based image editor for creators and professionals.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              <li><Link to="/editor">Editor</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="https://x.com/maty_ritam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all"><i className="ri-twitter-x-line" /></a>
              <a href="https://github.com/ritam-g" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all"><i className="ri-github-line" /></a>
              <a href="https://www.linkedin.com/in/ritammaty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-500 transition-all"><i className="ri-linkedin-line" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-neutral-600">
          © 2026 Image Editor Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
