import React, { useState } from 'react';
import { X, Calculator, Send, CheckCircle2, Zap } from 'lucide-react';
import { PHONE_NUMBER } from '../data/electricalData';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultZone?: string;
}

export function QuoteCalculatorModal({
  isOpen,
  onClose,
  defaultService = 'depannage',
  defaultZone = 'Dakar',
}: QuoteCalculatorModalProps) {
  const [service, setService] = useState(defaultService);
  const [zone, setZone] = useState(defaultZone);
  const [isEmergencyNight, setIsEmergencyNight] = useState(false);
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  // Pricing rules calculation in FCFA
  const calculateEstimate = () => {
    let baseMin = 15000;
    let baseMax = 30000;

    if (service === 'depannage') {
      baseMin = 15000;
      baseMax = 35000;
    } else if (service === 'tableau') {
      baseMin = 45000;
      baseMax = 95000;
    } else if (service === 'luminaires') {
      baseMin = 20000;
      baseMax = 50000;
    } else if (service === 'renovation') {
      baseMin = 85000;
      baseMax = 250000;
    }

    // Zone multiplier for travel
    let travelBonus = 0;
    if (zone === 'Keur Ndiaye' || zone === 'Diamniadio') {
      travelBonus = 5000;
    }

    // Night/Emergency surcharge
    const emergencyBonus = isEmergencyNight ? 10000 : 0;

    return {
      min: baseMin + travelBonus + emergencyBonus,
      max: baseMax + travelBonus + emergencyBonus,
    };
  };

  const estimate = calculateEstimate();

  const handleSendWhatsApp = () => {
    const serviceLabels: Record<string, string> = {
      depannage: 'Dépannage d’urgence 24h/24',
      tableau: 'Tableau électrique & Sécurité',
      luminaires: 'Pose de luminaires LED',
      renovation: 'Installation & Rénovation complète',
    };

    const text = `Bonjour Bassirou Ngom,
Je souhaite un devis pour des travaux électriques :
- Service : ${serviceLabels[service] || service}
- Zone : ${zone}
- Urgence de nuit : ${isEmergencyNight ? 'OUI (24h/24)' : 'Non (intervention en journée)'}
- Détails : ${details || 'Pas de précision supplémentaire'}
- Estimation calculée : ~${estimate.min.toLocaleString('fr-FR')} à ${estimate.max.toLocaleString(
      'fr-FR'
    )} FCFA
${phone ? `- Mon numéro : ${phone}` : ''}
Merci de me recontacter !`;

    const url = `https://wa.me/221777869282?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Simulateur de Devis Instantané</h3>
              <p className="text-xs text-slate-400">Estimation transparente en FCFA (CFA)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Service selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Type de prestation
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'depannage', label: '⚡ Dépannage 24h/24', desc: 'Panne, court-circuit' },
                { id: 'tableau', label: '🛡️ Tableau électrique', desc: 'Disjoncteur, sécurité' },
                { id: 'luminaires', label: '💡 Luminaires LED', desc: 'Spots, rubans, appliques' },
                { id: 'renovation', label: '🏗️ Rénovation / Câblage', desc: 'Maison, villa, magasin' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setService(item.id)}
                  className={`p-3 rounded-xl text-left border transition ${
                    service === item.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Zone selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Zone d’intervention
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Dakar', 'Rufisque', 'Keur Ndiaye', 'Diamniadio'].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZone(z)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition ${
                    zone === z
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Night emergency toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">Urgence de nuit 24h/24 ?</span>
                <span className="text-[11px] text-slate-400 block">
                  Intervention immédiate entre 20h et 7h du matin
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEmergencyNight}
                onChange={(e) => setIsEmergencyNight(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Additional details */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Précisions (Optionnel)
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ex: Disjoncteur qui saute au salon, 6 spots à poser..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Estimate Result Box */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-900 border border-amber-500/30 rounded-xl">
            <div className="text-xs text-amber-400 font-semibold mb-1 flex items-center justify-between">
              <span>Fourchette estimative indicative</span>
              <span className="text-[11px] text-slate-400">Main d'œuvre & déplacement</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {estimate.min.toLocaleString('fr-FR')} - {estimate.max.toLocaleString('fr-FR')}{' '}
              <span className="text-amber-400 text-lg font-bold">FCFA</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              *Le tarif définitif est confirmé sur place après diagnostic précis. Pas de mauvaise surprise.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Envoyer sur WhatsApp ({PHONE_NUMBER})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
