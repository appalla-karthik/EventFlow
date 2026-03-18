import { useQuery } from "@tanstack/react-query";

const MOCK_HERO_SLIDES = [
  {
    id: 1,
    title: "LUXURY GALA",
    subtitle: "A night of elegance and philanthropy",
    video: "/videos/hero-gala.mp4",
    videoFallback:
      "https://assets.mixkit.co/videos/preview/mixkit-elegant-party-at-the-rooftop-4052-large.mp4",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
    date: "OCT 24, 2025",
    location: "PARIS, FRANCE"
  },
  {
    id: 2,
    title: "SONIC FESTIVAL",
    subtitle: "International music experience",
    video: "/videos/hero-festival.mp4",
    videoFallback:
      "https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-having-fun-at-a-party-4007-large.mp4",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
    date: "NOV 12, 2025",
    location: "IBIZA, SPAIN"
  },
  {
    id: 3,
    title: "FUTURE SUMMIT",
    subtitle: "Corporate innovation conference",
    video: "/videos/hero-summit.mp4",
    videoFallback:
      "https://assets.mixkit.co/videos/preview/mixkit-business-people-having-a-meeting-in-a-conference-room-2880-large.mp4",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
    date: "DEC 05, 2025",
    location: "TOKYO, JAPAN"
  }
];

const MOCK_FEATURED_EVENTS = [
  {
    id: 1,
    title: "Met Gala 2025",
    category: "Gala",
    date: "SEP 14",
    location: "New York",
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=800&q=80",
  },
  {
    id: 2,
    title: "Vogue Fashion Week",
    category: "Fashion",
    date: "OCT 02",
    location: "Milan",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
  },
  {
    id: 3,
    title: "Tech Innovators Summit",
    category: "Conference",
    date: "NOV 20",
    location: "San Francisco",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
  },
  {
    id: 4,
    title: "Symphony Under Stars",
    category: "Concert",
    date: "DEC 10",
    location: "Vienna",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  }
];

const MOCK_CATEGORIES = [
  {
    id: 1,
    slug: "corporate-events",
    title: "Corporate Events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
  {
    id: 2,
    slug: "live-entertainment",
    title: "Live Entertainment",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  },
  {
    id: 3,
    slug: "wedding-social",
    title: "Wedding & Social",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  {
    id: 4,
    slug: "cultural-festivals",
    title: "Cultural Festivals",
    image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=800&q=80",
  },
  {
    id: 5,
    slug: "product-launches",
    title: "Product Launches",
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&q=80",
  },
];

export const MOCK_CATEGORY_DETAILS = [
  {
    id: 1,
    slug: "corporate-events",
    title: "Corporate Events",
    subtitle: "Boardroom polish with stadium-scale production.",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1600&q=80",
    intro:
      "From flagship summits to executive retreats, we engineer environments that sharpen focus and elevate decision-making.",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80",
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80",
    ],
    events: [
      {
        id: "ce-01",
        title: "Aurora Leadership Summit",
        date: "Mar 12, 2026",
        location: "Singapore",
        format: "Global Summit",
        price: "$4,900",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
        tagline: "C-suite strategy and future market alignment.",
      },
      {
        id: "ce-02",
        title: "Vertex Innovation Forum",
        date: "Apr 22, 2026",
        location: "Berlin",
        format: "Executive Forum",
        price: "$3,600",
        image:
          "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80",
        tagline: "Data-led roadmaps with immersive product labs.",
      },
      {
        id: "ce-03",
        title: "Nimbus Partner Assembly",
        date: "May 09, 2026",
        location: "Toronto",
        format: "Partner Experience",
        price: "$2,800",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
        tagline: "Alliance positioning with high-touch hospitality.",
      },
      {
        id: "ce-04",
        title: "Executive Retreat: Atlas",
        date: "Jun 02, 2026",
        location: "Lake Como",
        format: "Retreat",
        price: "$7,200",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
        tagline: "Private strategy sessions in villa settings.",
      },
      {
        id: "ce-05",
        title: "Pulse Annual Assembly",
        date: "Jul 18, 2026",
        location: "Chicago",
        format: "Town Hall",
        price: "$1,900",
        image:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80",
        tagline: "Stagecraft, sound, and narrative storytelling.",
      },
    ],
  },
  {
    id: 2,
    slug: "live-entertainment",
    title: "Live Entertainment",
    subtitle: "High-energy nights, precision production.",
    heroImage:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80",
    intro:
      "Concerts, festival stages, and live shows built for maximum impact and unforgettable crowd energy.",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1200&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
      "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    ],
    events: [
      {
        id: "le-01",
        title: "Neon Pulse Live",
        date: "Apr 05, 2026",
        location: "Los Angeles",
        format: "Arena Tour",
        price: "$210",
        image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1200&q=80",
        tagline: "Kinetic lighting, modular stage design.",
      },
      {
        id: "le-02",
        title: "Sonic Fields Festival",
        date: "May 29, 2026",
        location: "Austin",
        format: "Outdoor Festival",
        price: "$340",
        image:
          "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200&q=80",
        tagline: "Multi-stage programming with art installations.",
      },
      {
        id: "le-03",
        title: "Midnight Symphony",
        date: "Jun 14, 2026",
        location: "London",
        format: "Orchestral Night",
        price: "$160",
        image:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
        tagline: "Immersive orchestration with cinematic visuals.",
      },
      {
        id: "le-04",
        title: "Skyline Sessions",
        date: "Jul 02, 2026",
        location: "Dubai",
        format: "Rooftop Series",
        price: "$120",
        image:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
        tagline: "Sunset performances with curated hospitality.",
      },
      {
        id: "le-05",
        title: "Voltage Live",
        date: "Aug 21, 2026",
        location: "Tokyo",
        format: "Electronic Night",
        price: "$190",
        image:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
        tagline: "Immersive soundscapes and light choreography.",
      },
    ],
  },
  {
    id: 3,
    slug: "wedding-social",
    title: "Wedding & Social",
    subtitle: "Luxury celebrations with intimate detail.",
    heroImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
    intro:
      "Personal milestones crafted with couture florals, lighting design, and guest experiences that feel effortless.",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    ],
    events: [
      {
        id: "ws-01",
        title: "Garden Vow Atelier",
        date: "May 15, 2026",
        location: "Lake Como",
        format: "Destination Wedding",
        price: "$38,000",
        image:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
        tagline: "Couture floral design with lakeside ceremony.",
      },
      {
        id: "ws-02",
        title: "Midnight Terrace Soiree",
        date: "Jun 09, 2026",
        location: "Paris",
        format: "Private Social",
        price: "$18,500",
        image:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
        tagline: "Black-tie celebration under skyline lighting.",
      },
      {
        id: "ws-03",
        title: "Villa Candlelight",
        date: "Jul 22, 2026",
        location: "Mallorca",
        format: "Wedding Weekend",
        price: "$44,000",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
        tagline: "Three-day program with guest concierge.",
      },
      {
        id: "ws-04",
        title: "Rosewood Reception",
        date: "Aug 18, 2026",
        location: "New York",
        format: "City Wedding",
        price: "$29,500",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
        tagline: "Ballroom elegance with live quartet.",
      },
      {
        id: "ws-05",
        title: "Sunset Harbour Gala",
        date: "Sep 06, 2026",
        location: "Sydney",
        format: "Social Gala",
        price: "$24,900",
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
        tagline: "Harbour-side dining and coastal ceremony.",
      },
    ],
  },
  {
    id: 4,
    slug: "cultural-festivals",
    title: "Cultural Festivals",
    subtitle: "Community storytelling at scale.",
    heroImage:
      "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=1600&q=80",
    intro:
      "City-wide activations, heritage celebrations, and immersive festivals curated with regional artistry.",
    gallery: [
      "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=1200&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200&q=80",
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    ],
    events: [
      {
        id: "cf-01",
        title: "Saffron Lantern Festival",
        date: "Mar 28, 2026",
        location: "Jaipur",
        format: "City Festival",
        price: "$120",
        image:
          "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=1200&q=80",
        tagline: "Light installations, artisan markets, music.",
      },
      {
        id: "cf-02",
        title: "Harbor Heritage Week",
        date: "Apr 16, 2026",
        location: "Lisbon",
        format: "Cultural Week",
        price: "$160",
        image:
          "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
        tagline: "Heritage parades with immersive storytelling.",
      },
      {
        id: "cf-03",
        title: "Desert Rhythm Fair",
        date: "May 07, 2026",
        location: "Marrakesh",
        format: "Open-Air Festival",
        price: "$140",
        image:
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
        tagline: "Cultural performances across multiple stages.",
      },
      {
        id: "cf-04",
        title: "Coastal Spirit Festival",
        date: "Jun 12, 2026",
        location: "Cape Town",
        format: "Cultural Celebration",
        price: "$180",
        image:
          "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200&q=80",
        tagline: "Food, art, and live storytelling along the bay.",
      },
      {
        id: "cf-05",
        title: "Nordic Folk Nights",
        date: "Jul 03, 2026",
        location: "Reykjavik",
        format: "Seasonal Festival",
        price: "$130",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
        tagline: "Midnight sun concerts and artisan halls.",
      },
    ],
  },
  {
    id: 5,
    slug: "product-launches",
    title: "Product Launches",
    subtitle: "Reveal moments engineered for impact.",
    heroImage:
      "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=1600&q=80",
    intro:
      "Launch environments that merge storytelling, light design, and product immersion.",
    gallery: [
      "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    ],
    events: [
      {
        id: "pl-01",
        title: "Aether EV Reveal",
        date: "Apr 11, 2026",
        location: "Seoul",
        format: "Launch Event",
        price: "$6,800",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
        tagline: "Immersive reveal with cinematic lighting.",
      },
      {
        id: "pl-02",
        title: "Nova Mobile Unveil",
        date: "May 24, 2026",
        location: "San Francisco",
        format: "Press Showcase",
        price: "$4,200",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        tagline: "Hands-on experience with guided demos.",
      },
      {
        id: "pl-03",
        title: "Studio Glass Atelier",
        date: "Jun 19, 2026",
        location: "Milan",
        format: "Brand Launch",
        price: "$3,400",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
        tagline: "Luxury set design with live craft artisans.",
      },
      {
        id: "pl-04",
        title: "Pulse Wearables Night",
        date: "Jul 08, 2026",
        location: "New York",
        format: "Industry Preview",
        price: "$2,950",
        image:
          "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80",
        tagline: "Immersive story zones and media walls.",
      },
      {
        id: "pl-05",
        title: "Helix Home Experience",
        date: "Aug 02, 2026",
        location: "London",
        format: "Pop-Up Launch",
        price: "$2,400",
        image:
          "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=1200&q=80",
        tagline: "Interactive product walkthroughs and lighting.",
      },
    ],
  },
];

export const MOCK_EVENT_DETAILS = [
  {
    id: 1,
    title: "Met Gala 2025",
    subtitle: "The Art of Time: A Celebration of Sartorial Excellence",
    category: "GALA",
    date: "MAY 5, 2025",
    location: "Metropolitan Museum of Art, New York",
    price: 35000,
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=1920&q=80",
    description: "The most anticipated event in the fashion calendar. An exclusive evening that unites the worlds of fashion, art, and celebrity philanthropy beneath the iconic roof of the Metropolitan Museum of Art.",
    highlights: ["Dress code: Black Tie / Theme Attire", "300 curated guests", "Live auction for charity", "Post-event private dinner"],
    schedule: [
      {
        day: "Day 1 — Arrival",
        date: "May 4",
        items: [
          { time: "14:00", title: "VIP Check-In & Welcome Drinks", desc: "Champagne reception at The Plaza Hotel. Personal stylist consultations available." },
          { time: "16:00", title: "Pre-Gala Fashion Preview", desc: "Exclusive preview of this year's Met exhibition with the head curator." },
          { time: "19:00", title: "Intimate Dinner", desc: "Private dinner with 20 select guests and the event's honorary chair." },
          { time: "22:00", title: "Night at leisure", desc: "Complimentary access to the hotel spa and rooftop lounge." },
        ]
      },
      {
        day: "Day 2 — The Gala",
        date: "May 5",
        items: [
          { time: "10:00", title: "Morning Glam Session", desc: "Hair, makeup, and styling with top New York artists provided exclusively for guests." },
          { time: "17:00", title: "Red Carpet Arrival", desc: "Arrive at the museum's iconic steps. Professional photography and media coverage." },
          { time: "18:30", title: "Cocktail Reception", desc: "Canapés by Michelin-starred chef Daniel Humm. Free-flow Krug Champagne." },
          { time: "20:00", title: "The Gala Dinner", desc: "Seven-course seated dinner in the Great Hall. Live performance by a surprise musical act." },
          { time: "23:00", title: "After Party", desc: "Exclusive after-party in the Egyptian Wing with world-class DJ lineup until 3AM." },
        ]
      },
      {
        day: "Day 3 — Farewell",
        date: "May 6",
        items: [
          { time: "10:00", title: "Private Museum Tour", desc: "Exclusive walkthrough of the newly-opened exhibit with the chief curator, for Gala guests only." },
          { time: "13:00", title: "Farewell Brunch", desc: "Rooftop brunch at The Mark Hotel, overlooking Central Park." },
          { time: "16:00", title: "Departures", desc: "Private car transfer service to JFK and Newark airports." },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Vogue Fashion Week",
    subtitle: "Where Couture Meets Culture",
    category: "FASHION",
    date: "OCT 2, 2025",
    location: "Armani/Teatro, Milan",
    price: 12000,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1920&q=80",
    description: "Milan's most exclusive front-row experience during Fashion Week. Six shows, three nights, and unlimited access to the world's most coveted fashion events.",
    highlights: ["Front-row seats at 6 runway shows", "Designer meet & greet", "VIP after-parties", "Personal stylist service"],
    schedule: [
      {
        day: "Day 1 — Arrivals",
        date: "Oct 1",
        items: [
          { time: "12:00", title: "Arrival & Orientation", desc: "Private transfer from MXP. Welcome kit with schedule and access passes." },
          { time: "15:00", title: "First Show: Valentino", desc: "Front-row seats at the Valentino Spring/Summer collection runway show." },
          { time: "20:00", title: "Designers Dinner", desc: "Intimate dinner with three Milan-based designers at Ristorante Cracco." },
        ]
      },
      {
        day: "Day 2 — Runway",
        date: "Oct 2",
        items: [
          { time: "10:00", title: "Prada Show", desc: "Exclusive access to the Prada Fondazione runway with backstage access." },
          { time: "14:00", title: "Gucci Experience", desc: "Private tour of the Gucci Garden followed by the main runway show." },
          { time: "21:00", title: "Vogue After-Party", desc: "The official Vogue Italia after-party at Palazzo Reale." },
        ]
      },
      {
        day: "Day 3 — Finale",
        date: "Oct 3",
        items: [
          { time: "11:00", title: "Armani Grand Finale", desc: "Front-row at Giorgio Armani's collection. Champagne reception post-show." },
          { time: "16:00", title: "Styling Session", desc: "Personal shopping session at the Armani/Privé boutique on Via Manzoni." },
          { time: "20:00", title: "Gala Farewell Dinner", desc: "Final dinner at Armani/Nobu with all guests and attending designers." },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Tech Innovators Summit",
    subtitle: "Building the Future, Together",
    category: "CONFERENCE",
    date: "NOV 20, 2025",
    location: "Moscone Center, San Francisco",
    price: 5500,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80",
    description: "The premier technology conference gathering the world's most influential founders, investors, and innovators for three days of ideas, collaboration, and inspiration.",
    highlights: ["Keynotes from 20+ top executives", "Investor matchmaking sessions", "Startup pitch competition", "Networking dinners"],
    schedule: [
      {
        day: "Day 1 — Ideas",
        date: "Nov 20",
        items: [
          { time: "09:00", title: "Opening Keynote", desc: "The State of the Future — keynote from the Summit's founding chair." },
          { time: "11:00", title: "AI & Society Panel", desc: "Leading AI researchers discuss the next decade of human-machine collaboration." },
          { time: "14:00", title: "Startup Showcase", desc: "50 curated startups pitch to a panel of top-tier VCs in a live competition format." },
          { time: "19:00", title: "Founders Dinner", desc: "Curated dinner connecting 100 select founders with strategic investors." },
        ]
      },
      {
        day: "Day 2 — Build",
        date: "Nov 21",
        items: [
          { time: "09:00", title: "Deep-Dive Workshops", desc: "Hands-on sessions on AI infrastructure, climate tech, and digital health." },
          { time: "13:00", title: "VC Office Hours", desc: "One-on-one meetings with partners from a16z, Sequoia, and Benchmark." },
          { time: "18:00", title: "Demo Day Finals", desc: "Top 10 startups present to the full audience in the main hall." },
        ]
      },
      {
        day: "Day 3 — Scale",
        date: "Nov 22",
        items: [
          { time: "10:00", title: "Global Expansion Panel", desc: "How to scale from San Francisco to the world — lessons from unicorn founders." },
          { time: "14:00", title: "Award Ceremony", desc: "Recognition of this year's most innovative startups and breakthrough technologies." },
          { time: "17:00", title: "Closing Celebration", desc: "Rooftop celebration at Salesforce Tower with live music and networking." },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Symphony Under Stars",
    subtitle: "An Evening of Timeless Music",
    category: "CONCERT",
    date: "DEC 10, 2025",
    location: "Schönbrunn Palace, Vienna",
    price: 8000,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80",
    description: "The Vienna Philharmonic performs under an open sky in the imperial gardens of Schönbrunn Palace. An unforgettable evening of classical masterworks illuminated by thousands of candles.",
    highlights: ["Vienna Philharmonic Orchestra", "Palace garden setting", "Candlelit dinner post-concert", "Imperial suite access"],
    schedule: [
      {
        day: "Evening — Arrival",
        date: "Dec 10",
        items: [
          { time: "17:00", title: "Palace Arrival & Tour", desc: "Private guided tour of the imperial apartments, reserved exclusively for concert guests." },
          { time: "18:30", title: "Pre-Concert Reception", desc: "Champagne and hors d'oeuvres in the Orangery garden. String quartet performance." },
          { time: "20:00", title: "The Concert Begins", desc: "The Vienna Philharmonic takes the stage in the illuminated palace gardens. Program: Beethoven, Mozart, Brahms." },
          { time: "22:00", title: "Candlelit Dinner", desc: "Post-concert seated dinner in the Palace Orangery, prepared by Chef Heinz Reitbauer." },
          { time: "00:00", title: "Farewell & Transfer", desc: "Private chauffeur service to all Vienna hotels and the airport." },
        ]
      }
    ]
  }
];

export function useHeroSlides() {
  return useQuery({
    queryKey: ['hero-slides'],
    queryFn: async () => MOCK_HERO_SLIDES,
    staleTime: Infinity,
  });
}

export function useFeaturedEvents() {
  return useQuery({
    queryKey: ['featured-events'],
    queryFn: async () => MOCK_FEATURED_EVENTS,
    staleTime: Infinity,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => MOCK_CATEGORIES,
    staleTime: Infinity,
  });
}

export function useEventDetail(id: number) {
  return useQuery({
    queryKey: ['event-detail', id],
    queryFn: async () => MOCK_EVENT_DETAILS.find(e => e.id === id) ?? null,
    staleTime: Infinity,
  });
}
