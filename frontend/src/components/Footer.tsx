import { Link } from "react-router-dom";
import { 
  BiLogoInstagram, BiLogoTiktok, BiLogoTwitter, BiLogoYoutube
} from "react-icons/bi";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useState } from "react";
// Replace this with your actual logo import
// import TextToSvgComponent from '../assets/Logo'; 

function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* --- DESIGNER BACKGROUND AMBIENCE --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- NEWSLETTER FLOATING HUB --- */}
        <div className="relative mb-32">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-2xl"></div>
          <div className="relative bg-[#0a0a0a] border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Newsletter</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                STAY <br/> <span className="italic font-light text-white/50 group-hover:text-white transition-colors duration-700">AHEAD.</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium max-w-sm">
                Join our inner circle for early access to drops and studio updates.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all text-lg font-light"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 group/btn">
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-4 px-2 uppercase tracking-widest">By joining, you agree to our digital terms.</p>
            </form>
          </div>
        </div>

        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex flex-col gap-4">
              <div 
                className="flex items-center gap-3 cursor-pointer group w-fit" 
                onClick={scrollToTop}
              >
                <div className="h-10 w-10 bg-white text-black flex items-center justify-center rounded-xl font-black text-xl group-hover:rotate-[360deg] transition-transform duration-1000">A</div>
                <span className="text-4xl font-black tracking-tighter uppercase">AURA</span>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-sm">
                A digital-first studio crafting contemporary identity through high-performance aesthetics.
              </p>
            </div>

            <div className="flex gap-3">
              {[BiLogoInstagram, BiLogoTiktok, BiLogoTwitter, BiLogoYoutube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-500"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
            {[
              { title: "Navigation", links: ["Shop All", "Collections", "Archive", "Sizing"] },
              { title: "The Studio", links: ["Sustainability", "Ethos", "Careers", "Press"] },
              { title: "Support", links: ["Track Order", "Returns", "Contact", "FAQ"] }
            ].map((col, i) => (
              <div key={i} className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-black">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <Link to="/" className="text-gray-500 hover:text-white transition-all duration-300 font-bold text-sm uppercase tracking-wider">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- SYSTEM BAR --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase">
            <span>{currentYear} © AURA STUDIOS</span>
            <span className="hidden md:block opacity-20">/</span>
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-3 group cursor-default">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">Crafted with</span>
            <FaHeart className="text-indigo-500 group-hover:text-red-500 transition-colors animate-pulse" />
            <span className="text-[10px] font-black text-white group-hover:text-indigo-500 transition-colors uppercase tracking-widest">by Aura Team</span>
          </div>

          <div className="flex gap-2">
            {['VISA', 'MC', 'AMEX', 'PAYPAL'].map(p => (
              <div key={p} className="text-[8px] font-black border border-white/10 px-2 py-1 rounded bg-white/[0.02] text-gray-500 grayscale hover:grayscale-0 hover:border-white/30 transition-all cursor-default">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
