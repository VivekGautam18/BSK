import { useState, useEffect, useRef } from 'react';
import { type ReactNode } from 'react';
import {
  Building2,
  CreditCard,
  Wallet,
  ShieldCheck,
  HeartPulse,
  Home,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  TrendingUp,
  ArrowRight,
  Globe,
  Link,
  type LucideIcon
} from 'lucide-react';

// --- Custom Hooks ---
const useScrollReveal = (): [React.MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// --- Sub-Components ---

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  description: string;
  light?: boolean;
}

const SectionHeader = ({ badge, title, description, light = false }: SectionHeaderProps) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`max-w-3xl mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${light ? 'bg-white/10 text-blue-200' : 'bg-blue-50 text-blue-600'}`}>
        {badge}
      </span>
      <h2 className={`text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <p className={`text-lg font-medium leading-relaxed ${light ? 'text-blue-100/70' : 'text-slate-500'}`}>
        {description}
      </p>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const TeamMember = ({ name, role, image, delay }: TeamMemberProps) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="flex gap-4">
            <button onClick={() => window.open('https://wa.me/918802585850', '_blank')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><Link size={18} /></button>
            <button onClick={() => window.open('mailto: kumar.satvinder5@gmail.com', '_blank')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><Mail size={18} /></button>
          </div>
        </div>
      </div>
      <div className="p-8 text-center">
        <h4 className="text-xl font-black text-slate-900 mb-1">{name}</h4>
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{role}</p>
      </div>
    </div>
  );
};

// --- ServiceCard ---

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay: number;
}

const ServiceCard = ({ icon: Icon, title, desc, delay }: ServiceCardProps) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8 font-medium">{desc}</p>
      <button className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
        Learn More <ArrowRight size={16} />
      </button>
    </div>
  );
};

// --- Navbar ---

interface NavbarProps {
  view: string;
  setView: (v: string) => void;
}

const Navbar = ({ view, setView }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'main' },
    { name: 'Services', id: 'services' },
    { name: 'Meet the Team', id: 'team' },
    { name: 'Careers', id: 'careers' },
  ];

  const handleNav = (id: string) => {
    if (id === 'team') {
      setView('team');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'main') {
      setView('main');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('main');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 100);
    }
    setMobileMenu(false);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('main')}>
          <img src="/logo.jpeg" alt="BSK Logo" className="w-10 h-10 rounded-xl object-contain shadow-blue-200 shadow-xl transition-transform group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className={`text-lg font-black tracking-tighter leading-none ${scrolled || view === 'team' ? 'text-slate-900' : 'text-white'}`}>BSK FINANCIAL</span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${scrolled || view === 'team' ? 'text-blue-600' : 'text-blue-200'}`}>Solution Services</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${(view === 'team' && link.id === 'team') || (view === 'main' && link.id === 'main')
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : scrolled || view === 'team' ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className={`ml-4 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all ${scrolled || view === 'team' ? 'bg-slate-900 text-white' : 'bg-white text-blue-600'
              }`}
          >
            Get Started
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X className={scrolled || view === 'team' ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled || view === 'team' ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[-1] flex flex-col justify-center items-center gap-8 transition-all duration-500 ${mobileMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        {navLinks.map(link => (
          <button key={link.id} onClick={() => handleNav(link.id)} className="text-3xl font-black text-slate-900 tracking-tighter hover:text-blue-600 transition-colors">
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- HomeView ---

interface HomeViewProps {
  setView: (v: string) => void;
}

const HomeView = ({ setView }: HomeViewProps) => (
  <>
    <section className="relative min-h-screen flex items-center bg-[#010816] overflow-hidden pt-20">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-[10px] font-black text-blue-100 uppercase tracking-[0.2em]">Partnered with 15+ Major Banks</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Smart Capital. <br /> <span className="text-blue-500">Expert Care.</span>
          </h1>
          <p className="text-xl text-blue-100/60 max-w-xl leading-relaxed font-medium">
            Navigating the complex world of finance so you don't have to. From elite credit cards to complex property advisory, BSK is your Chandigarh headquarters for growth.
          </p>
          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all flex items-center gap-3 group"
            >
              Explore Solutions <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => setView('team')}
              className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Meet the Experts
            </button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent p-1 border border-white/10 rounded-[60px] backdrop-blur-sm animate-float">
            <div className="bg-slate-900/40 rounded-[58px] p-16 overflow-hidden relative group">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-[30px] flex items-center justify-center text-white mb-10 shadow-2xl">
                  <TrendingUp size={48} />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-4 italic">Reliability.</h3>
                <p className="text-blue-200/50 uppercase font-black tracking-[0.4em] text-xs">Industry Leader Since 2012</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>

    <section id="services" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="What we offer"
          title={<>Our Financial <br /> Ecosystem.</>}
          description="We provide 360-degree financial coverage, ensuring every aspect of your monetary health is optimized for growth and security."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {([
            // Replace only the services array inside HomeView's services section:

            { icon: CreditCard, title: "Premium Cards", desc: "Access high-limit credit cards from HDFC, SBI, ICICI & Axis through BSK's banking network. Enjoy airport lounge access, 1.5–5% cashback on everyday spends, fuel surcharge waivers, and travel perks. Premium cards available with annual fees from ₹5,000–₹50,000. Eligibility: 750+ CIBIL score, min. income ₹3 LPA." },

            { icon: Wallet, title: "Dynamic Loans", desc: "Personal loans from ₹50,000–₹40 lakh at 9.99%–16.50% p.a. (SBI from 10%, HDFC from 10.50%, ICICI from 10.75%). Home loans starting at 7.50% p.a. (SBI), 7.90% (HDFC). 24-hour digital processing for pre-approved customers. Tenure up to 60 months. Better rates for 750+ CIBIL scores." },

            { icon: ShieldCheck, title: "Life Security", desc: "₹1 Crore term life cover from ₹440/month (0% GST since Sept 2025). A healthy 25-year-old non-smoker pays just ₹522/month until age 60. Add critical illness & accidental death riders. Top insurers with 99%+ claim settlement ratios. Premiums lock in at purchase age — buy early, save more." },

            { icon: HeartPulse, title: "Health Assets", desc: "Cashless health insurance across 10,000–20,000+ network hospitals (HDFC ERGO, Star Health, ICICI Lombard, Niva Bupa). Family floater plans (₹10L cover, family of 3) from ₹14,000–₹22,000/year. Tax deduction up to ₹25,000/year under Sec 80D. Healthcare costs in India rising 14% annually — cover yourself now." },

            { icon: Building2, title: "Business Coverage", desc: "Protect your enterprise from fire, transit loss, professional liability, and operational risks. Comprehensive SME and corporate insurance plans customized for Chandigarh's growing business ecosystem. Covers inventory, assets, and liabilities under a single policy with minimal documentation and fast claim processing." },

            { icon: Home, title: "Property Hub", desc: "Expert Tricity real estate advisory — Chandigarh premium sectors at ₹9,700–₹15,100/sq.ft, Mohali at ₹4,950–₹6,500/sq.ft, and Panchkula for lifestyle investing. Mohali commercial yields 8–12% annually. Sectors like 48 & Mullanpur saw 95%+ appreciation in 3 years. RERA-verified listings only." },
          ] as { icon: LucideIcon; title: string; desc: string }[]).map((item, i) => (
            <ServiceCard key={i} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>

    <section id="careers" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[50px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-[3s]"></div>
          <div className="relative z-10 p-12 md:p-24 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-white">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Your Next <span className="text-blue-500 underline decoration-4 underline-offset-8">Big Move</span> is Here.</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">BSK Financial is expanding. We are looking for ambitious professionals to join our sales, management, and HR teams in Chandigarh.</p>
              <div className="flex flex-wrap gap-4">
                {(['Tele-callers', 'Managers', 'HR Executives'] as string[]).map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => window.open('https://wa.me/918802585850', '_blank')}
                className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl"
              >
                Apply for Positions
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                  <h4 className="text-3xl font-black text-white">₹20k+</h4>
                  <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Top Tier Salary</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 translate-x-8">
                  <h4 className="text-3xl font-black text-white">100%</h4>
                  <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Growth Path</p>
                </div>
              </div>
              <div className="pt-12">
                <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl">
                  <h4 className="text-3xl font-black text-white">Immediate</h4>
                  <p className="text-[10px] font-black uppercase text-blue-100 tracking-widest">Hiring Start</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

// --- TeamView ---

const TeamView = () => (
  <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24 space-y-4">
        <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Our Leadership</span>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">Meet the <span className="text-blue-600">Architects</span>.</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">The collective experience of our leadership team drives the excellence and trust our clients rely on.</p>
      </div>

      <div className="mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl grid md:grid-cols-2 group">
            <div className="overflow-hidden">
              <img src="Satvinder.jpeg" alt="Director" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center space-y-6">
              <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Managing Director</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Satvinder Choudhary</h2>
              <p className="text-slate-500 leading-relaxed font-medium italic">
                "At BSK Financial, we don't just sell services; we build bridges to financial stability for thousands of families across Northern India."
              </p>
              <div className="flex gap-4 pt-4">
                <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><Link /></button>
                <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><X /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {([
          { name: "Arjun Singh", role: "Senior Manager (SM)", image: "ArjunSingh.jpeg" },
          { name: "Sandeep Kaur", role: "Senior manager (SM)", image: "Sandeepkaur.jpeg" },
          { name: "depti", role: "Senior manager (SM)", image: "depti.jpeg" },
          { name: "Praveen Kumar", role: "Marketing Sales officer", image: "Praveenkumar.jpeg" },
          { name: "Bhumika Tushavar", role: "Senior Executive", image: "BhumikaTushavar.jpeg" },
          { name: "Jasbir", role: "Senior Executive", image: "jasbeer.jpeg" },
          { name: "Mehak Rangra", role: "Senior Executive", image: "MehakRangra.jpeg" },
          { name: "money", role: "Senior Executive", image: "money.jpeg" },
          { name: "Prerna", role: "Senior Executive", image: "Prerna.jpeg" },
          { name: "Shilpi", role: "Senior Executive", image: "shilpi.jpeg" },
          { name: "Sonam", role: "Senior Executive", image: "sonam.jpeg" },
          { name: "Arti", role: "Sales Executive", image: "Arti.jpeg" },
          { name: "Khushboo", role: "Executive", image: "khusboo.jpeg" },
        ] as { name: string; role: string; image: string }[]).map((member, i) => (
          <TeamMember key={i} {...member} delay={i * 100} />
        ))}
      </div>

      <div className="mt-32 bg-slate-900 rounded-[50px] p-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 animate-pulse"></div>
        <div className="relative z-10 space-y-8">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight">Want to be part of this team?</h3>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">We're always looking for driven individuals to help us redefine the financial services landscape.</p>
          <button
            onClick={() => window.open('https://wa.me/918802585850', '_blank')}
            className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            See Open Roles
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Contact ---

const Contact = () => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="space-y-12">
            <SectionHeader
              badge="Get in Touch"
              title={<>Ready to Secure <br /> Your Future?</>}
              description="Our advisors are standing by to provide you with a complimentary consultation for any of our services."
            />
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
                <Phone className="text-blue-600 mb-4" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Call Support</p>
                <p className="text-lg font-black text-slate-900">+91 88025 85850</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
                <Mail className="text-blue-600 mb-4" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Inquiry</p>
                <p className="text-lg font-black text-slate-900">kumar.satvinder5@gmail.com</p>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl flex items-start gap-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 mb-1">Main Headquarters</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  1787 1st Floor, Deep Complex, Hallo Majra, Chandigarh 160002
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[60px] p-12 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-blue-600/5 pointer-events-none"></div>
            <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-3xl font-black text-white mb-8 tracking-tight">Request a Callback</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="+91 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Financial Service</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
                  <option className="bg-slate-900">Credit Cards</option>
                  <option className="bg-slate-900">Loans (PL/HL)</option>
                  <option className="bg-slate-900">Insurance</option>
                  <option className="bg-slate-900">Real Estate</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Tell us what you need..."></textarea>
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = () => (
  <footer className="bg-[#010816] text-white pt-32 pb-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="BSK Logo" className="w-12 h-12 rounded-xl object-contain shadow-blue-200 shadow-xl" />
            <h2 className="text-3xl font-black tracking-tighter">BSK FINANCIAL</h2>
          </div>
          <p className="text-blue-100/40 max-w-sm leading-relaxed font-medium">
            Redefining financial consultancy through transparency, expertise, and a relentless commitment to client success since 2012.
          </p>
          <div className="flex gap-4">
            {([Globe, Link, X] as LucideIcon[]).map((Icon, i) => (
              <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all group">
                <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Navigation</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-500">
            <li><a href="#" className="hover:text-white transition-colors">Strategic Assets</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Banking Partners</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Career Pathways</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Legal & Compliance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Headquarters</h4>
          <div className="space-y-6">
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              Deep Complex, 1st Floor,<br />
              Hallo Majra, Chandigarh, 160002
            </p>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-700 uppercase">Director</p>
              <p className="font-black text-blue-100">Satvinder Choudhary</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">© 2024 BSK Financial Solution Services. Crafted for excellence.</p>
        <div className="flex gap-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Term of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState('main');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar view={view} setView={setView} />

      <main className="transition-all duration-500">
        {view === 'main' ? (
          <HomeView setView={setView} />
        ) : (
          <TeamView />
        )}
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
        <button
          onClick={() => window.open('https://wa.me/918802585850', '_blank')}
          className="w-16 h-16 bg-[#25D366] text-white rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all group relative"
        >
          <Phone size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">WhatsApp Us</span>
        </button>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
}
