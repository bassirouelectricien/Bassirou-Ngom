import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client if key exists
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Smart local fallback generator in case API key is missing or offline
function generateFallbackSeo(data: {
  services: string;
  zone: string;
  contact: string;
  name?: string;
}) {
  const name = data.name || 'Bassirou Ngom';
  const zones = data.zone
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const primaryZone = zones.length > 0 ? zones.slice(0, 2).join(' & ') : 'Dakar';

  const seoTitle = `Électricien 24h/24 ${primaryZone} | ${name}`.slice(0, 60);
  const metaDescription =
    `Besoin d'un électricien à ${primaryZone} ? Dépannage urgent 24h/24, tableau électrique & LED par ${name}. Contact WhatsApp direct : ${data.contact}.`.slice(
      0,
      155
    );
  const ogTitle = `⚡ ${name} - Électricien Professionnel 24h/24 (${primaryZone})`;
  const ogDescription = `Dépannage d'urgence 24h/24, rénovation tableau électrique et luminaires LED à ${data.zone}. WhatsApp direct : ${data.contact}.`;

  const keywords = [
    'électricien Dakar',
    'dépannage électrique 24h/24',
    'électricien Rufisque',
    'électricien Keur Ndiaye',
    'électricien Diamniadio',
    'tableau électrique',
    'pose luminaires LED',
    'court circuit urgence',
    'artisan électricien Sénégal',
    'Senelec conformité',
  ];

  const localAdvice = [
    `Ciblez les requêtes géolocalisées avec 'urgence' : ex: "dépannage électricien nuit Rufisque".`,
    `Affichez le numéro WhatsApp cliquable directement dans la meta description et le titre.`,
    `Enregistrez votre fiche Google Business Profile avec l'adresse à Dakar ou Rufisque pour apparaître dans le pack local Google Maps.`,
    `Intégrez le balisage Schema.org LocalBusiness / Electrician avec l'attribut areaServed pour booster le référencement local.`,
  ];

  return {
    seoTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    keywords,
    h1Suggestion: `Électricien Professionnel 24h/24 à ${primaryZone} - Dépannage & Installation`,
    localAdvice,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Electrician',
      name,
      url: 'https://electricienprofessionnel.lovable.app/',
      telephone: data.contact.replace(/[^\d+]/g, ''),
      areaServed: zones.length ? zones : ['Dakar', 'Rufisque', 'Keur Ndiaye', 'Diamniadio'],
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

// API endpoint for SEO metadata generation
app.post('/api/generate-seo', async (req, res) => {
  try {
    const { services, zone, contact, name = 'Bassirou Ngom' } = req.body;

    if (!services || !zone || !contact) {
      return res.status(400).json({
        error: 'Veuillez fournir les services, la zone et le contact.',
      });
    }

    if (!ai) {
      // Return high quality structured fallback
      const fallbackResult = generateFallbackSeo({ services, zone, contact, name });
      return res.json({
        ...fallbackResult,
        source: 'local_engine',
        message: 'Généré avec le moteur expert SEO local (Artisan Sénégal).',
      });
    }

    const prompt = `Tu es un expert mondial en SEO local pour les artisans du bâtiment au Sénégal (Dakar, Rufisque, Keur Ndiaye, Diamniadio).
Génère un ensemble complet de métadonnées SEO et conseils d'optimisation pour :
- Nom de l'artisan / entreprise : ${name}
- Services proposés : ${services}
- Zone d'intervention : ${zone}
- Contact / WhatsApp : ${contact}

Consignes strictes pour le référencement Google & réseaux sociaux :
1. "seoTitle" : Doit faire MAXIMUM 60 caractères (idéalement 50-60 car.). Doit contenir le métier (Électricien), la zone clé (Dakar / Rufisque) et un argument fort (24h/24 ou Devis Gratuit).
2. "metaDescription" : Doit faire MAXIMUM 155 caractères (idéalement 135-155 car.). Doit être ultra-incitative au clic, mentionner l'intervention 24h/24, le contact ou WhatsApp, et les zones.
3. "ogTitle" : Titre accrocheur pour le partage WhatsApp et Facebook (avec émojis professionnels).
4. "ogDescription" : Description valorisante pour le partage WhatsApp / réseaux sociaux.
5. "keywords" : Liste de 8 à 12 mots-clés de longue traîne ultra-recherchés au Sénégal.
6. "h1Suggestion" : Suggestion de titre principal H1 pour la page web.
7. "localAdvice" : 4 conseils concrets de SEO local pour dépasser ses concurrents sur Google à Dakar et sa banlieue.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            seoTitle: {
              type: Type.STRING,
              description: 'Titre SEO pour Google (max 60 caractères)',
            },
            metaDescription: {
              type: Type.STRING,
              description: 'Meta description Google (max 155 caractères)',
            },
            ogTitle: {
              type: Type.STRING,
              description: 'Titre OpenGraph pour Facebook et WhatsApp',
            },
            ogDescription: {
              type: Type.STRING,
              description: 'Description OpenGraph',
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Mots-clés SEO locaux',
            },
            h1Suggestion: {
              type: Type.STRING,
              description: 'Titre H1 recommandé',
            },
            localAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Conseils pratiques SEO local',
            },
          },
          required: [
            'seoTitle',
            'metaDescription',
            'ogTitle',
            'ogDescription',
            'keywords',
            'h1Suggestion',
            'localAdvice',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    // Add valid Schema.org
    const zones = zone.split(',').map((s: string) => s.trim()).filter(Boolean);
    const result = {
      ...parsed,
      source: 'gemini_ai',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'Electrician',
        name,
        url: 'https://electricienprofessionnel.lovable.app/',
        telephone: contact.replace(/[^\d+]/g, ''),
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

    res.json(result);
  } catch (error: any) {
    console.error('Erreur API SEO:', error);
    // Graceful fallback to avoid breaking user flow
    const { services, zone, contact, name } = req.body;
    const fallback = generateFallbackSeo({ services, zone, contact, name });
    res.json({
      ...fallback,
      source: 'fallback',
      warning: error?.message || 'Génération assurée par le moteur de secours.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Setup Vite middleware in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
