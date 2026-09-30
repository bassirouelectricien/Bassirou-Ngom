import { useState } from 'react';
import { PublicElectricianSite } from './components/PublicElectricianSite';
import { SeoGeneratorAdmin } from './components/SeoGeneratorAdmin';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { SeoHead } from './components/SeoHead';
import { SeoResult } from './types';
import { Globe, Settings, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { PHONE_NUMBER } from './data/electricalData';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'seo-admin'>('public');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorService, setCalculatorService] = useState('depannage');

  // Active SEO metadata applied to the application
  const [activeSeo, setActiveSeo] = useState<SeoResult>({
    seoTitle: 'Électricien 24h/24 Dakar, Rufisque | Bassirou Ngom',
    metaDescription:
      "Besoin d'un électricien à Dakar, Rufisque, Diamniadio ? Dépannage urgent 24h/24, tableau électrique & LED. Contact rapide WhatsApp au +221 77 786 92 82.",
    ogTitle: '⚡ Bassirou Ngom - Électricien Professionnel 24h/24 Dakar',
    ogDescription:
      "Dépannage électrique d'urgence 24h/24, installation tableau électrique, pose de luminaires LED à Dakar, Rufisque, Keur Ndiaye, Diamniadio.",
    keywords: [
      'électricien Dakar',
      'dépannage électrique 24h/24',
      'électricien Rufisque',
      'électricien Keur Ndiaye',
      'électricien Diamniadio',
      'tableau électrique',
      'luminaires LED',
      'court-circuit urgence',
      'artisan électricien Sénégal',
    ],
    h1Suggestion:
      'Électricien Professionnel 24h/24 à Dakar, Rufisque & Diamniadio - Dépannage & Installation',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Electrician',
      name: 'Bassirou Ngom',
      url: 'https://electricienprofessionnel.lovable.app/',
      telephone: '+221777869282',
      areaServed: ['Dakar', 'Keur Ndiaye', 'Rufisque', 'Diamniadio'],
      serviceType: [
        'Dépannage électrique 24h/24',
        'Installation électrique',
        'Installation de tableau électrique',
        'Pose de luminaires LED',
      ],
      priceRange: '$$',
      openingHours: 'Mo-Su 00:00-24:00',
    },
  });

  const handleApplySeo = (newSeo: SeoResult) => {
    setActiveSeo(newSeo);
  };

  const handleOpenCalculator = (serviceId?: string) => {
    if (serviceId) {
      if (serviceId.includes('depannage')) setCalculatorService('depannage');
      else if (serviceId.includes('tableau')) setCalculatorService('tableau');
      else if (serviceId.includes('luminaire')) setCalculatorService('luminaires');
      else setCalculatorService('renovation');
    }
    setIsCalculatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Live Synchronized Metadata & Schema.org in document.head */}
      <SeoHead seoResult={activeSeo} />

      {/* Studio Navigation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md px-4 py-2">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-300">
              Application Déployée :{' '}
              <span className="text-amber-400 font-bold">Bassirou Ngom - Dakar & Banlieue</span>
            </span>
            <span className="hidden md:inline text-xs text-slate-500">• {PHONE_NUMBER}</span>
          </div>

          {/* View Switcher Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentView('public')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'public'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Site Web Client (24h/24)</span>
            </button>

            <button
              onClick={() => setCurrentView('seo-admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'seo-admin'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Générateur SEO Intelligent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View */}
      <main className="flex-1">
        {currentView === 'public' ? (
          <PublicElectricianSite
            onOpenCalculator={handleOpenCalculator}
            onOpenSeoStudio={() => setCurrentView('seo-admin')}
          />
        ) : (
          <div className="bg-slate-950 min-h-screen">
            <SeoGeneratorAdmin onApplySeo={handleApplySeo} activeSeo={activeSeo} />
          </div>
        )}
      </main>

      {/* Quote Calculator Modal */}
      <QuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        defaultService={calculatorService}
        defaultZone="Dakar"
      />
    </div>
  );
}
