import { SeoResult } from '../types';

export type { SeoResult };

export async function generateSeoMetadata(data: {
  services: string;
  zone: string;
  contact: string;
  name?: string;
}): Promise<SeoResult> {
  const name = data.name || 'Bassirou Ngom';

  try {
    const response = await fetch('/api/generate-seo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        services: data.services,
        zone: data.zone,
        contact: data.contact,
        name,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result as SeoResult;
    }
  } catch (err) {
    console.warn('Backend endpoint unvailable, using client-side intelligent SEO generation', err);
  }

  // Robust Client-side Generator fallback
  const zones = data.zone
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const primaryZone = zones.length > 0 ? zones.slice(0, 2).join(' & ') : 'Dakar';

  const seoTitle = `Électricien 24h/24 ${primaryZone} | ${name}`.slice(0, 60);
  const metaDescription =
    `Besoin d'un électricien à ${primaryZone} ? Dépannage urgent 24h/24, tableau électrique & LED par ${name}. Contact WhatsApp direct : ${data.contact}.`.slice(0, 155);

  const ogTitle = `⚡ ${name} - Électricien Professionnel 24h/24 (${primaryZone})`;
  const ogDescription = `Intervention d'urgence 24h/24, rénovation tableau électrique et luminaires LED à ${data.zone}. WhatsApp direct : ${data.contact}.`;

  const keywords = [
    `électricien ${zones[0] || 'Dakar'}`,
    `dépannage électrique 24h/24`,
    `électricien ${zones[1] || 'Rufisque'}`,
    `électricien ${zones[2] || 'Keur Ndiaye'}`,
    `électricien ${zones[3] || 'Diamniadio'}`,
    'installation tableau électrique',
    'pose luminaires LED',
    'court circuit urgence Sénégal',
    'artisan électricien agréé',
    'devis électricité Dakar',
    'disjoncteur différentiel 30mA',
    'mise aux normes Senelec',
  ];

  const localAdvice = [
    `Mettez en avant le service d'urgence de nuit : "Dépannage électrique 24h/24 à ${primaryZone}". Les pannes nocturnes ont un taux de conversion de plus de 45% sur WhatsApp.`,
    `Intégrez le bouton WhatsApp direct avec message pré-rempli pour minimiser les frictions de contact sur smartphone.`,
    `Optimisez votre balisage Schema.org "Electrician" avec les attributs areaServed: [${zones.map((z) => `"${z}"`).join(', ')}].`,
    `Créez une page ou section dédiée pour chaque ville (Dakar, Rufisque, Keur Ndiaye, Diamniadio) afin de dominer le référencement local Google Maps.`,
  ];

  return {
    seoTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    keywords,
    h1Suggestion: `Électricien Professionnel 24h/24 à ${primaryZone} - Dépannage & Installation`,
    localAdvice,
    source: 'client_expert_engine',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Electrician',
      name,
      url: 'https://electricienprofessionnel.lovable.app/',
      telephone: data.contact.replace(/[^\d+]/g, ''),
      areaServed: zones,
      serviceType: [
        'Dépannage électrique 24h/24',
        'Installation électrique',
        'Installation de tableau électrique',
        'Pose de luminaires LED',
      ],
      priceRange: '$$',
      openingHours: 'Mo-Su 00:00-24:00',
    },
  };
}
