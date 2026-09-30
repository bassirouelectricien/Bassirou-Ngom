import { ServiceItem, ZoneInfo, CustomerReview } from '../types';

export const ELECTRICIAN_NAME = 'Bassirou Ngom';
export const PHONE_NUMBER = '+221 77 786 92 82';
export const RAW_PHONE = '+221777869282';
export const WHATSAPP_URL = `https://wa.me/221777869282?text=${encodeURIComponent(
  'Bonjour Bassirou Ngom, j’ai besoin d’une intervention électrique urgente / devis.'
)}`;

export const ELECTRICAL_SERVICES: ServiceItem[] = [
  {
    id: 'depannage-24h',
    title: 'Dépannage Électrique 24h/24',
    shortDesc: 'Intervention d’urgence jour et nuit pour pannes, court-circuits et coupures de courant.',
    fullDesc:
      'Disjoncteur général qui saute sans arrêt, odeur anormale de brûlé dans le tableau, prise grillée ou coupure totale de courant ? Notre service d’urgence intervient 24h/24 et 7j/7 avec équipement de mesure et pièces de rechange immédiates.',
    iconName: 'zap',
    emergencyAvailable: true,
    typicalDuration: '20 à 45 minutes',
    priceEstimate: 'À partir de 15 000 FCFA',
    highlights: [
      'Disponibilité 24h/24 et 7j/7 sans interruption',
      'Diagnostic précis avec multimètre et caméra thermique',
      'Sécurisation immédiate des circuits défaillants',
      'Intervention rapide Dakar & banlieue',
    ],
  },
  {
    id: 'tableau-electrique',
    title: 'Tableau Électrique & Sécurité',
    shortDesc: 'Remplacement de vieux coffrets, disjoncteurs différentiels 30mA et parafoudre anti-surtension.',
    fullDesc:
      'Le tableau électrique est le cœur battant de votre sécurité domestique ou professionnelle. Nous procédons au remplacement des anciens fusibles, à la pose d’interrupteurs différentiels 30mA pour protéger les personnes contre l’électrocution, et à l’installation de parafoudres adaptés aux fluctuations Senelec.',
    iconName: 'sliders',
    emergencyAvailable: true,
    typicalDuration: '2 à 5 heures',
    priceEstimate: 'Sur devis (Dès 45 000 FCFA)',
    highlights: [
      'Protection contre les surtensions et orages',
      'Équilibrage des phases (monophasé et triphasé)',
      'Étiquetage clair et repérage de chaque disjoncteur',
      'Conformité aux normes NF C 15-100',
    ],
  },
  {
    id: 'installation-complete',
    title: 'Installation Électrique & Rénovation',
    shortDesc: 'Câblage complet de villas, appartements neufs, bureaux et commerces selon les normes.',
    fullDesc:
      'De la saignée au passage des gaines ICTA, en passant par le tirage de câbles cuivre normalisés, pose de prises de terre et raccordement au compteur Senelec. Réalisation soignée garantissant longévité, confort et sécurité pour toute votre habitation.',
    iconName: 'shieldCheck',
    emergencyAvailable: false,
    typicalDuration: 'Sur planning de chantier',
    priceEstimate: 'Devis personnalisé gratuit',
    highlights: [
      'Étude de charge et schéma unifilaire',
      'Mise à la terre avec piquet et mesure de boucle',
      'Matériel de marques reconnues (Legrand, Schneider, etc.)',
      'Garantie sur tous les travaux réalisés',
    ],
  },
  {
    id: 'luminaires-led',
    title: 'Pose de Luminaires & Éclairage LED',
    shortDesc: 'Spots encastrés, rubans LED décoratifs, appliques modernes et projecteurs solaires extérieurs.',
    fullDesc:
      'Sublimez vos espaces de vie et réduisez votre facture Senelec jusqu’à 70% grâce aux technologies LED basse consommation. Pose experte de faux-plafonds lumineux, rails de spots, éclairage indirect pour salon, lustres de prestige et projecteurs détecteurs de mouvement.',
    iconName: 'lightbulb',
    emergencyAvailable: false,
    typicalDuration: '1 à 3 heures',
    priceEstimate: 'À partir de 10 000 FCFA / point',
    highlights: [
      'Économies d’énergie jusqu’à 75% sur la facture',
      'Éclairage chaleureux (2700K à 4000K) ou RGB dimmable',
      'Éclairage extérieur étanche IP65 résistant aux intempéries',
      'Conseils esthétiques personnalisés pour chaque pièce',
    ],
  },
];

export const INTERVENTION_ZONES: ZoneInfo[] = [
  {
    name: 'Dakar',
    subtitle: 'Centre & Grande Métropole',
    eta: '20 - 35 min',
    featured: true,
    neighborhoods: [
      'Plateau',
      'Almadies',
      'Ngor',
      'Yoff',
      'Mermoz',
      'Fann-Point E',
      'Maristes',
      'Sacré-Cœur',
      'Grand Yoff',
      'Pikine',
      'Guédiawaye',
    ],
  },
  {
    name: 'Rufisque',
    subtitle: 'Ville historique & Côtes',
    eta: '15 - 30 min',
    featured: true,
    neighborhoods: [
      'Rufisque Centre',
      'Dangou',
      'Arafat',
      'Cité Tacko',
      'Bargny',
      'Sendou',
      'Gouye Mouride',
      'Colobane Rufisque',
    ],
  },
  {
    name: 'Keur Ndiaye',
    subtitle: 'Zone résidentielle & Périphérie',
    eta: '25 - 40 min',
    featured: false,
    neighborhoods: [
      'Keur Ndiaye Lô',
      'Kounoune',
      'Niaga',
      'Sangalkam',
      'Cités nouvelles',
      'Axe Bambilor',
    ],
  },
  {
    name: 'Diamniadio',
    subtitle: 'Pôle Urbain & Plateformes Industrielles',
    eta: '20 - 35 min',
    featured: true,
    neighborhoods: [
      'Pôle Urbain Diamniadio',
      'Cités ministérielles',
      'Parc Industriel',
      'Centre International Abdou Diouf',
      'Sébikotane',
      'Axe AIBD',
    ],
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Mamadou Diop',
    location: 'Dakar (Maristes)',
    service: 'Dépannage d’urgence 24h/24',
    rating: 5,
    comment:
      'Court-circuit violent à 23h un dimanche soir, plus d’électricité ni de frigo. Bassirou est arrivé en 30 minutes montre en main avec son matériel. Il a trouvé le problème en 10 minutes et tout remis en ordre en toute sécurité. Professionnalisme exceptionnel !',
    date: 'Il y a 3 jours',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Aïssatou Sow',
    location: 'Rufisque (Dangou)',
    service: 'Rénovation tableau électrique',
    rating: 5,
    comment:
      'Mon ancien tableau disjonctait sans cesse dès qu’on allumait le climatiseur. Bassirou a refait tout le câblage et posé des différentiels Legrand neufs. Travail très propre, finitions impeccables et prix très honnête.',
    date: 'Il y a 1 semaine',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Cheikh Tidiane Ndiaye',
    location: 'Diamniadio (Pôle Urbain)',
    service: 'Installation électrique villa complète',
    rating: 5,
    comment:
      'Chantier de construction d’une villa R+1 à Diamniadio. Câblage complet, prise de terre certifiée et raccordement. Chantier livré dans les délais avec le schéma technique bien expliqué. Je recommande les yeux fermés !',
    date: 'Il y a 2 semaines',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Fatou Binetou Sarr',
    location: 'Keur Ndiaye',
    service: 'Pose de spots & luminaires LED',
    rating: 5,
    comment:
      'Installation de rubans LED dans le faux-plafond du salon et spots encastrés dans la cuisine. Le rendu lumineux est magnifique et moderne. Très ponctuel et respectueux.',
    date: 'Il y a 3 semaines',
    verified: true,
  },
];

export const SAFETY_TIPS = [
  {
    title: 'Odeur de brûlé ou grésillement dans le tableau ?',
    action:
      'Coupez immédiatement le disjoncteur général Senelec. N’ouvrez pas le coffret si vous n’êtes pas électricien et contactez notre service d’urgence 24h/24.',
  },
  {
    title: 'Disjoncteur différentiel qui refuse de se réarmer ?',
    action:
      'Abaissez tous les disjoncteurs divisionnaires, réarmez le différentiel, puis remontez-les un par un pour identifier le circuit en défaut.',
  },
  {
    title: 'Choc électrique ou picotement sur les appareils métalliques ?',
    action:
      'Signe d’un défaut grave d’isolement ou d’absence de mise à la terre. Risque mortel d’électrocution : faites contrôler la boucle de terre d’urgence.',
  },
];
