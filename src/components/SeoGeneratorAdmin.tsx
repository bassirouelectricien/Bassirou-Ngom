import React, { useState } from 'react';
import { generateSeoMetadata, SeoResult } from '../lib/generateSeoMetadata';
import {
  Sparkles,
  Copy,
  Check,
  Globe,
  Share2,
  Code2,
  FileCheck,
  AlertCircle,
  Lightbulb,
  Smartphone,
  Monitor,
  ExternalLink,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

const initialData = {
  services:
    "Dépannage d'urgence 24h/24, installation tableau électrique, pose de luminaires LED",
  zone: 'Dakar, Keur Ndiaye, Rufisque, Diamniadio',
  contact: '+221 77 786 92 82 (WhatsApp)',
  name: 'Bassirou Ngom',
};

interface SeoGeneratorAdminProps {
  onApplySeo?: (seo: SeoResult) => void;
  activeSeo?: SeoResult | null;
}

export function SeoGeneratorAdmin({ onApplySeo, activeSeo }: SeoGeneratorAdminProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedNotice, setAppliedNotice] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'jsonld' | 'keywords'>('html');

  const [seoResult, setSeoResult] = useState<SeoResult | null>(
    activeSeo || {
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
      localAdvice: [
        'Placez le numéro WhatsApp en début de balise description pour générer des appels immédiats.',
        'Ajoutez des pages d’atterrissage locales pour Dakar, Rufisque, Keur Ndiaye et Diamniadio.',
        'Revendiquez votre profil d’établissement Google Maps avec la catégorie "Électricien".',
        'Intégrez le balisage Schema.org avec les horaires d’ouverture 24h/24.',
      ],
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
    }
  );

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.services.trim()) {
      setError('Veuillez renseigner les services.');
      return;
    }

    if (!formData.zone.trim()) {
      setError('Veuillez renseigner la zone.');
      return;
    }

    if (!formData.contact.trim()) {
      setError('Veuillez renseigner le contact.');
      return;
    }

    setLoading(true);

    try {
      const result = await generateSeoMetadata(formData);
      setSeoResult(result);
      if (onApplySeo) {
        onApplySeo(result);
        setAppliedNotice(true);
        setTimeout(() => setAppliedNotice(false), 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de la génération SEO.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToSite = () => {
    if (seoResult && onApplySeo) {
      onApplySeo(seoResult);
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 3000);
    }
  };

  const setServicePreset = (preset: { services: string; zone?: string }) => {
    setFormData((prev) => ({
      ...prev,
      services: preset.services,
      ...(preset.zone ? { zone: preset.zone } : {}),
    }));
  };

  // Character counter status
  const titleLen = seoResult?.seoTitle.length || 0;
  const descLen = seoResult?.metaDescription.length || 0;

  const htmlMetaCode = seoResult
    ? `<!-- Balises SEO Générées pour ${formData.name} -->
<title>${seoResult.seoTitle}</title>
<meta name="description" content="${seoResult.metaDescription}" />
<meta name="keywords" content="${seoResult.keywords.join(', ')}" />

<!-- OpenGraph / Facebook / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${seoResult.ogTitle}" />
<meta property="og:description" content="${seoResult.ogDescription}" />
<meta property="og:locale" content="fr_SN" />
<meta property="og:url" content="https://electricienprofessionnel.lovable.app/" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${seoResult.seoTitle}" />
<meta name="twitter:description" content="${seoResult.metaDescription}" />`
    : '';

  const jsonLdCode = seoResult?.schemaJson
    ? `<script type="application/ld+json">
${JSON.stringify(seoResult.schemaJson, null, 2)}
</script>`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              SEO Engine & Schema.org LocalBusiness
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Générateur SEO Intelligent & Aperçu Google / WhatsApp
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Générez automatiquement vos titres Google, descriptions, balises OpenGraph, mots-clés et données structurées pour <span className="text-amber-400 font-semibold">{formData.name}</span>.
            </p>
          </div>

          {seoResult && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyToSite}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {appliedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    Appliqué au site !
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    Appliquer en direct sur le site
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Generator Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <span>⚙️</span> Paramètres de l’artisan
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Ces informations alimentent l'algorithme SEO pour cibler les recherches géolocalisées à Dakar et ses environs.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nom de l'artisan / Entreprise
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Bassirou Ngom"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3.5 py-2.5 text-sm text-white transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Services proposés
                  </label>
                  <span className="text-[11px] text-slate-400">Précis & complets</span>
                </div>
                <textarea
                  rows={4}
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="Dépannage d'urgence 24h/24, installation tableau électrique, pose de luminaires LED..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3.5 py-2.5 text-sm text-white resize-none transition-colors"
                />

                {/* Preset quick buttons */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setServicePreset({
                        services:
                          "Dépannage d'urgence 24h/24, court-circuit, panne générale, disjoncteur qui saute, réparation prises",
                      })
                    }
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition"
                  >
                    ⚡ Urgence 24h
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setServicePreset({
                        services:
                          'Rénovation tableau électrique, pose différentiel 30mA, parafoudre anti-surtension Senelec',
                      })
                    }
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition"
                  >
                    🛡️ Tableau & Sécurité
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setServicePreset({
                        services:
                          'Pose de luminaires LED, spots encastrés plafond, rubans LED, projecteurs extérieurs solaires',
                      })
                    }
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition"
                  >
                    💡 Luminaires LED
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Zone d'intervention
                </label>
                <input
                  type="text"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  placeholder="Dakar, Keur Ndiaye, Rufisque, Diamniadio"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3.5 py-2.5 text-sm text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Contact / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+221 77 786 92 82 (WhatsApp)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3.5 py-2.5 text-sm text-white transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Génération SEO intelligente en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Générer les métadonnées SEO</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick local SEO recommendations card */}
          {seoResult?.localAdvice && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4" />
                Conseils SEO local au Sénégal
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {seoResult.localAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column: Results & Previews */}
        <div className="lg:col-span-7 space-y-6">
          {seoResult ? (
            <>
              {/* Detailed Metrics & Tag Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>🔍</span> Résultat des métadonnées
                  </h3>
                  <div className="flex items-center gap-2">
                    {seoResult.source && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/20">
                        {seoResult.source === 'gemini_ai' ? 'Gemini 3.8 Flash' : 'Moteur SEO Expert'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Title field */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider">
                        Balise Title
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            titleLen <= 60 && titleLen >= 30
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {titleLen} / 60 car. {titleLen <= 60 ? '✓ Idéal' : '⚠️ Long'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(seoResult.seoTitle, 'title')}
                          className="text-slate-400 hover:text-white transition p-1"
                          title="Copier le titre"
                        >
                          {copiedKey === 'title' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white selection:bg-amber-500 selection:text-slate-950">
                      {seoResult.seoTitle}
                    </p>
                  </div>

                  {/* Meta Description field */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider">
                        Meta Description
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            descLen <= 155 && descLen >= 110
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {descLen} / 155 car. {descLen <= 155 ? '✓ Idéal' : '⚠️ Long'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(seoResult.metaDescription, 'desc')}
                          className="text-slate-400 hover:text-white transition p-1"
                          title="Copier la description"
                        >
                          {copiedKey === 'desc' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-200 selection:bg-amber-500 selection:text-slate-950">
                      {seoResult.metaDescription}
                    </p>
                  </div>

                  {/* Keywords pills */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider">
                        Mots-Clés Locaux ({seoResult.keywords.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(seoResult.keywords.join(', '), 'keywords')}
                        className="text-slate-400 hover:text-white transition p-1 flex items-center gap-1 text-xs"
                      >
                        {copiedKey === 'keywords' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiés</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier tout</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {seoResult.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="inline-block bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs px-2.5 py-1 rounded-md border border-slate-700 transition"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Selector Header for Aperçu */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Aperçu Multi-Écrans
                    </span>
                    <h3 className="text-sm font-extrabold text-white">
                      Visualisation Google & WhatsApp selon l'appareil
                    </h3>
                  </div>

                  {/* Device Switcher Pills */}
                  <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                        previewDevice === 'mobile'
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Vue Mobile</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-950/20 rounded font-mono">
                        375px
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                        previewDevice === 'desktop'
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                      <span>Vue Desktop</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-950/20 rounded font-mono">
                        Large
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  {previewDevice === 'mobile' ? (
                    <div className="flex items-center gap-2 text-amber-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        <strong>Mode Smartphone :</strong> Plus de 80% des recherches d'électricien d'urgence au Sénégal viennent d'un mobile.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>
                        <strong>Mode Ordinateur :</strong> Affichage étendu avec liens annexes (sitelinks) et avis Google Maps.
                      </span>
                    </div>
                  )}
                  <span className="text-slate-500 hidden md:inline">
                    {previewDevice === 'mobile' ? 'Coupure titre : ~55 car.' : 'Coupure titre : ~60 car.'}
                  </span>
                </div>
              </div>

              {/* SERP Google Preview Simulator */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <h3 className="text-base font-bold text-white">
                      Aperçu Résultat de Recherche Google ({previewDevice === 'mobile' ? 'Mobile' : 'Desktop'})
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {previewDevice === 'mobile' ? 'iPhone / Android' : 'PC / Mac'}
                  </span>
                </div>

                {previewDevice === 'mobile' ? (
                  /* Realistic Smartphone Mobile Frame */
                  <div className="max-w-sm mx-auto bg-slate-950 rounded-[2.5rem] p-3 ring-8 ring-slate-800 shadow-2xl border border-slate-700/60">
                    {/* Simulated Phone Top Speaker & Notch */}
                    <div className="flex items-center justify-between px-6 pt-2 pb-3 text-[11px] font-semibold text-slate-400">
                      <span>13:25</span>
                      <div className="w-16 h-3.5 bg-slate-800 rounded-full" />
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span>5G</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Google Mobile Search Bar Simulation */}
                    <div className="bg-white rounded-full px-3.5 py-2 shadow-sm mb-3 flex items-center justify-between text-xs text-slate-600 border border-slate-200">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold text-blue-500">G</span>
                        <span className="text-slate-700 truncate">électricien 24h/24 dakar</span>
                      </div>
                      <span className="text-slate-400 shrink-0">🔍</span>
                    </div>

                    {/* Mobile SERP Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-slate-800 font-sans">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          ⚡
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-medium text-slate-900 leading-none truncate">
                            {formData.name} - Électricien Professionnel
                          </span>
                          <span className="text-[11px] text-slate-500 leading-tight truncate">
                            electricienprofessionnel.lovable.app
                          </span>
                        </div>
                      </div>

                      <a
                        href="#preview"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#1a0dab] hover:underline text-base font-semibold leading-snug line-clamp-2 block mb-1.5"
                      >
                        {seoResult.seoTitle}
                      </a>

                      <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                        <span className="text-amber-500 font-bold">★ 4.9</span>
                        <span>(48)</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">24h/24 Ouvert</span>
                      </div>

                      <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3 mb-3">
                        {seoResult.metaDescription}
                      </p>

                      {/* Google Mobile Direct Quick Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                        <a
                          href={`tel:${formData.contact.replace(/[^\d+]/g, '')}`}
                          className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          <span>📞</span>
                          <span>Appeler</span>
                        </a>
                        <a
                          href={`https://wa.me/221777869282?text=${encodeURIComponent(
                            'Bonjour Bassirou Ngom, j’ai trouvé votre fiche sur Google.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          <span>💬</span>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Realistic Desktop Google Browser Frame */
                  <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                    {/* Simulated Browser Chrome / URL Bar */}
                    <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex-1 bg-slate-950 rounded-lg px-3 py-1 text-xs font-mono text-slate-400 truncate flex items-center gap-2 border border-slate-800">
                        <span className="text-emerald-400">🔒</span>
                        <span>https://www.google.sn/search?q=electricien+dakar+24h</span>
                      </div>
                    </div>

                    {/* Google Desktop SERP Result Content */}
                    <div className="bg-white p-5 md:p-6 text-slate-800 font-sans">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            ⚡
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-900 leading-none">
                              {formData.name} - Électricien Professionnel
                            </span>
                            <span className="text-[11px] text-slate-500 leading-tight">
                              https://electricienprofessionnel.lovable.app
                            </span>
                          </div>
                        </div>
                        <div className="text-slate-400 text-xs hover:text-slate-600 cursor-pointer">
                          ⋮
                        </div>
                      </div>

                      <a
                        href="#preview"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#1a0dab] hover:underline text-xl font-medium leading-snug line-clamp-2 block mb-1.5"
                      >
                        {seoResult.seoTitle}
                      </a>

                      {/* Rich snippet stars & badge */}
                      <div className="flex items-center gap-2 text-xs text-slate-600 mb-1.5">
                        <span className="text-amber-500 font-bold">★ 4.9</span>
                        <span>(48 avis Google)</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">Intervention 24h/24</span>
                        <span>•</span>
                        <span>Dakar, Rufisque, Keur Ndiaye & Diamniadio</span>
                      </div>

                      <p className="text-sm text-[#4d5156] leading-relaxed max-w-2xl">
                        {seoResult.metaDescription}
                      </p>

                      {/* Desktop 2-column Sitelinks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                        <div className="p-2 rounded hover:bg-slate-50 transition">
                          <span className="text-[#1a0dab] font-medium hover:underline block text-sm">
                            Dépannage 24h/24 Urgence
                          </span>
                          <span className="text-slate-500 text-[11px] block mt-0.5">
                            Court-circuit, panne générale, disjoncteur général qui saute. Arrivée 30 min.
                          </span>
                        </div>
                        <div className="p-2 rounded hover:bg-slate-50 transition">
                          <span className="text-[#1a0dab] font-medium hover:underline block text-sm">
                            Tableau Électrique & LED
                          </span>
                          <span className="text-slate-500 text-[11px] block mt-0.5">
                            Mise en conformité Senelec, différentiels 30mA et luminaires LED basse conso.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Share Preview: WhatsApp & Facebook */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    <span>Aperçu Partage WhatsApp ({previewDevice === 'mobile' ? 'Mobile' : 'Web'})</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    OpenGraph `og:title` & `og:description`
                  </span>
                </div>

                <div
                  className={`bg-[#0b141a] p-4 rounded-2xl border border-slate-800 text-white transition-all ${
                    previewDevice === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-3 pb-2 border-b border-[#1f2c34]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{previewDevice === 'mobile' ? 'Discussion WhatsApp Mobile' : 'WhatsApp Web Desktop'}</span>
                    </div>
                    <span className="text-slate-400 text-[10px]">Aujourd'hui 13:26</span>
                  </div>

                  {/* Chat bubble */}
                  <div className="bg-[#1f2c34] rounded-2xl overflow-hidden border border-[#2a3942] shadow-md">
                    <div className="h-32 bg-gradient-to-tr from-slate-950 via-amber-950 to-slate-900 p-4 flex flex-col justify-end relative">
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                        24H / 24
                      </div>
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                        ⚡ {formData.name} • Dakar & Banlieue
                      </div>
                      <div className="text-sm md:text-base font-bold text-white leading-tight">
                        {seoResult.ogTitle}
                      </div>
                    </div>
                    <div className="p-3 bg-[#182229]">
                      <div className="text-xs font-semibold text-slate-200 mb-1 line-clamp-1">
                        {seoResult.ogTitle}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                        {seoResult.ogDescription}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                        <span className="truncate">electricienprofessionnel.lovable.app</span>
                        <span className="text-slate-400 text-[10px] shrink-0 ml-2">13:26 ✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Snippets Inspector (HTML Meta & JSON-LD) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>Code Prêt à l’Emploi (HTML & Schema.org)</span>
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('html')}
                      className={`px-3 py-1 rounded transition ${
                        activeCodeTab === 'html'
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Balises HTML
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('jsonld')}
                      className={`px-3 py-1 rounded transition ${
                        activeCodeTab === 'jsonld'
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Schema.org (JSON-LD)
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-72 selection:bg-amber-500 selection:text-slate-950 leading-relaxed">
                    {activeCodeTab === 'html' ? htmlMetaCode : jsonLdCode}
                  </pre>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        activeCodeTab === 'html' ? htmlMetaCode : jsonLdCode,
                        'code'
                      )
                    }
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 flex items-center gap-1.5 transition shadow"
                  >
                    {copiedKey === 'code' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier le code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <Sparkles className="w-10 h-10 text-amber-400/50 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Aucune métadonnée générée</h3>
              <p className="text-sm max-w-md mx-auto">
                Renseignez le formulaire à gauche et cliquez sur "Générer les métadonnées SEO" pour obtenir vos balises Google, aperçu WhatsApp et Schema.org.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
