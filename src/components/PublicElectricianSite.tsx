import React, { useState } from 'react';
import {
  Zap,
  PhoneCall,
  Clock,
  MapPin,
  ShieldCheck,
  Sliders,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Star,
  ArrowRight,
  MessageCircle,
  FileText,
  BadgeCheck,
  ChevronRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  ELECTRICIAN_NAME,
  PHONE_NUMBER,
  RAW_PHONE,
  WHATSAPP_URL,
  ELECTRICAL_SERVICES,
  INTERVENTION_ZONES,
  CUSTOMER_REVIEWS,
  SAFETY_TIPS,
} from '../data/electricalData';
import { ServiceItem } from '../types';

interface PublicElectricianSiteProps {
  onOpenCalculator: (serviceId?: string) => void;
  onOpenSeoStudio: () => void;
}

export function PublicElectricianSite({
  onOpenCalculator,
  onOpenSeoStudio,
}: PublicElectricianSiteProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeZoneTab, setActiveZoneTab] = useState('Dakar');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'sliders':
        return <Sliders className="w-6 h-6 text-amber-400" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-amber-400" />;
    }
  };

  const activeZone = INTERVENTION_ZONES.find((z) => z.name === activeZoneTab) || INTERVENTION_ZONES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Notification Bar for 24h/24 Emergency */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs py-2 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span>URGENCE ÉLECTRIQUE 24H/24 & 7J/7 : Dépannage rapide à Dakar, Rufisque, Keur Ndiaye & Diamniadio</span>
          </div>
          <a
            href={`tel:${RAW_PHONE}`}
            className="hidden sm:inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 px-3 py-1 rounded-full text-xs hover:bg-slate-900 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Appeler : {PHONE_NUMBER}</span>
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                {ELECTRICIAN_NAME}
              </span>
              <span className="text-[11px] font-medium text-amber-400 block tracking-wide">
                ÉLECTRICIEN PROFESSIONNEL AGRÉÉ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSeoStudio}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Générateur SEO Studio</span>
            </button>

            <a
              href={`https://wa.me/221777869282?text=${encodeURIComponent(
                'Bonjour Bassirou Ngom, j’ai une demande de dépannage / devis électrique.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <a
              href={`tel:${RAW_PHONE}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80 bg-grid-subtle">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Intervention Immédiate 24h/24 en 30 minutes</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Votre Électricien Qualifié à{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                  Dakar & Banlieue
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Dépannage d’urgence 24h/24, mise aux normes de tableau électrique, installation complète de villas et pose de luminaires LED à{' '}
                <strong className="text-white font-semibold">Dakar, Keur Ndiaye, Rufisque et Diamniadio</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href={`tel:${RAW_PHONE}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition transform active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Appel d’Urgence 24h/24</span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Écrire sur WhatsApp (+221 77 786 92 82)</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenCalculator()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Calculer un Devis</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dispo 24h/24 7j/7</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Arrivée en 30 min</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Devis 100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Normes Senelec & NF</span>
                </div>
              </div>
            </div>

            {/* Right Hero Badge Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <BadgeCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Artisan Certifié</h2>
                      <p className="text-xs text-slate-400">Plus de 10 ans d’expérience terrain</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    En Service
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Dépannage d’urgence</h4>
                      <p className="text-[11px] text-slate-400">
                        Court-circuits, prises grillées, disjoncteur général qui saute.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-3">
                    <Sliders className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Sécurisation Tableau</h4>
                      <p className="text-[11px] text-slate-400">
                        Interrupteurs différentiels 30mA et parafoudre anti-surtension.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Pose Luminaires LED</h4>
                      <p className="text-[11px] text-slate-400">
                        Économisez jusqu’à 70% d’énergie avec les spots & bandeaux LED.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Contact direct WhatsApp</span>
                    <span className="text-sm font-bold text-amber-400">{PHONE_NUMBER}</span>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-slate-950 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Nos Prestations Électriques
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
              Des interventions expertes et garanties
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Que ce soit pour une panne en pleine nuit ou un chantier de construction complet, nous vous garantissons sécurité, propreté et respect des délais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ELECTRICAL_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition duration-300 shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getServiceIcon(srv.iconName)}
                    </div>
                    {srv.emergencyAvailable ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        24h/24 Urgence
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                        Travaux & Pose
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{srv.shortDesc}</p>

                  <div className="space-y-2 mb-6">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Tarification</span>
                    <span className="text-xs font-bold text-amber-400">{srv.priceEstimate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenCalculator(srv.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition cursor-pointer"
                    >
                      Estimer
                    </button>
                    <a
                      href={`https://wa.me/221777869282?text=${encodeURIComponent(
                        `Bonjour Bassirou Ngom, je vous contacte pour le service : ${srv.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Commander</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Zones Interactive Section */}
      <section id="zones" className="py-20 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Zone de Couverture Express
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
              Présent rapidement partout à Dakar & Banlieue
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Véhicule équipé de matériel de détection et pièces de remplacement immédiates pour un délai d’intervention optimal.
            </p>
          </div>

          {/* Zone Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {INTERVENTION_ZONES.map((zone) => (
              <button
                key={zone.name}
                type="button"
                onClick={() => setActiveZoneTab(zone.name)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
                  activeZoneTab === zone.name
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{zone.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    activeZoneTab === zone.name
                      ? 'bg-slate-950 text-amber-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ~{zone.eta}
                </span>
              </button>
            ))}
          </div>

          {/* Active Zone Detail Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">{activeZone.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    Intervention en ~{activeZone.eta}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{activeZone.subtitle}</p>
              </div>

              <a
                href={`tel:${RAW_PHONE}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Appeler pour {activeZone.name}</span>
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Quartiers & Communes desservis :
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeZone.neighborhoods.map((nb, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {nb}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Dépannage d’urgence de jour comme de nuit sans majoration excessive.</span>
                </span>
                <a
                  href={`https://wa.me/221777869282?text=${encodeURIComponent(
                    `Bonjour Bassirou Ngom, j’ai une urgence à ${activeZone.name}. Pouvez-vous intervenir ?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold shrink-0 ml-2"
                >
                  Envoyer ma localisation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Emergency FAQ Section */}
      <section className="py-20 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Guide de Sécurité
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Que faire en cas d’urgence électrique chez vous ?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Les accidents électriques domestiques peuvent être dangereux. Suivez ces consignes de premier secours avant notre arrivée.
              </p>

              <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs text-red-200">
                  <strong className="font-bold text-red-300 block mb-0.5">Règle d'or :</strong>
                  En cas de départ de feu ou d'étincelles répétées, ne jetez jamais d'eau sur une installation électrique sous tension !
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-300 pl-7 leading-relaxed">{tip.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-white font-bold text-sm ml-2">4.9 / 5 (48 avis vérifiés)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              La confiance de nos clients à Dakar & Banlieue
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">{rev.author}</h4>
                    <span className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {rev.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-3 bg-slate-950 px-2.5 py-1 rounded inline-block">
                  Service : {rev.service}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Vérifié par contact WhatsApp</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            Une panne ou un projet d’installation électrique ?
          </h2>
          <p className="text-slate-950/80 font-medium text-sm sm:text-base max-w-xl mx-auto mb-6">
            Contactez Bassirou Ngom maintenant pour une intervention en 30 minutes ou un devis gratuit sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${RAW_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-950 text-amber-400 hover:bg-slate-900 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Appeler le {PHONE_NUMBER}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{ELECTRICIAN_NAME} - Artisan Électricien Professionnel</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>Dakar</span>
            <span>•</span>
            <span>Rufisque</span>
            <span>•</span>
            <span>Keur Ndiaye</span>
            <span>•</span>
            <span>Diamniadio</span>
          </div>

          <div className="text-slate-500">
            Urgence 24h/24 : {PHONE_NUMBER}
          </div>
        </div>
      </footer>

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-full shadow-2xl hover:scale-110 transition duration-200 flex items-center justify-center cursor-pointer group"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full ring-2 ring-slate-950 animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-slate-950 text-slate-950" />
      </a>
    </div>
  );
}
