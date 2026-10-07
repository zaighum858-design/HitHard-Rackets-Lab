export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'rackets' | 'strings' | 'grips' | 'accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  fallbackGradient: string; // for high-fidelity CSS fallback
  specs: Record<string, string>;
  features: string[];
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: "racket-volt",
    name: "Carbon-Volt Pro 100",
    category: "rackets",
    price: 189.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewsCount: 142,
    description: "Engineered for explosive baseline players. The high-modulus carbon frame offers superior torsion resistance and crisp feedback, generating extreme ball velocity with micro-second dwell times.",
    image: "/src/assets/images/product_custom_racket_1791381480165.jpg",
    fallbackGradient: "from-[#2C4139] to-[#12221C]",
    specs: {
      "Material": "HM Graphite & Nano-Carbon Tubules",
      "Weight": "305g / 10.8 oz",
      "Head Size": "100 sq. in / 645 sq. cm",
      "Balance": "320mm / Head Light",
      "String Pattern": "16 x 19"
    },
    features: [
      "Aerodynamic frame geometry for increased swing speed",
      "Vibration dampening core inserts",
      "Enlarged sweet spot for forgiving off-center strikes"
    ],
    reviews: [
      { id: "rev-1", author: "Marcus K.", rating: 5, date: "2026-08-12", comment: "The power from the baseline is insane. Stringing it at 53lbs gives me the perfect mix of depth and spin." },
      { id: "rev-2", author: "Elena R.", rating: 4, date: "2026-09-01", comment: "Beautiful design and extremely solid on the volley. Highly recommended for tournament players." }
    ]
  },
  {
    id: "racket-saber",
    name: "Saber Featherweight Speed",
    category: "rackets",
    price: 149.00,
    rating: 4.8,
    reviewsCount: 96,
    description: "The ultimate lightning-fast frame for badminton champions. High-tension compatible structural rings paired with an ultra-thin aerodynamic shaft for blazing overhead smashes and ultra-quick defense responses.",
    image: "/src/assets/images/product_saber_racket_1791382227494.jpg",
    fallbackGradient: "from-[#386252] to-[#1E3B30]",
    specs: {
      "Material": "Ultra-Elastic High Flex Carbon",
      "Weight": "82g (4U) / Super Light",
      "Balance": "Head Heavy (295mm)",
      "Flex": "Medium-Stiff",
      "Max Tension": "32 lbs"
    },
    features: [
      "Ultra-slim 6.6mm aerodynamic carbon shaft",
      "Box-frame design for high-tension stability",
      "Shock-absorbing grommet strips"
    ],
    reviews: [
      { id: "rev-3", author: "Justin L.", rating: 5, date: "2026-07-20", comment: "Smashes hit with unmatched speed. It is extremely fast in flat drive rallies." }
    ]
  },
  {
    id: "racket-padel",
    name: "Hexa-Carbon Padel Elite",
    category: "rackets",
    price: 210.00,
    originalPrice: 250.00,
    rating: 4.9,
    reviewsCount: 68,
    description: "A premium teardrop-shaped Padel racket featuring structured 12K carbon faces and an elastic Soft-EVA core. Delivering supreme tactile control, textured grip surfaces, and robust overhead power.",
    image: "/src/assets/images/product_padel_racket_1791382243943.jpg",
    fallbackGradient: "from-[#1D2521] to-[#253D32]",
    specs: {
      "Material": "12K Carbon Face & Soft-EVA Core",
      "Weight": "365g",
      "Shape": "Teardrop (Balanced)",
      "Thickness": "38mm",
      "Surface Texture": "Hexagonal 3D Grip"
    },
    features: [
      "Textured 3D surface for maximum slice and spin",
      "Comfort core for tennis-elbow prevention",
      "Double carbon tube frame structure"
    ],
    reviews: [
      { id: "rev-4", author: "Santiago G.", rating: 5, date: "2026-09-14", comment: "Excellent touch off the glass. High lob consistency and massive spin on the vibora." }
    ]
  },
  {
    id: "string-chrono",
    name: "Chrono-Spun Polyester String",
    category: "strings",
    price: 18.00,
    rating: 4.7,
    reviewsCount: 210,
    description: "Monofilament co-polyester strings designed for ultimate durability and heavy, biting spin. Engineered with a pentagonal cross-section that grabs the ball for intense baseline rotation.",
    image: "/src/assets/images/product_premium_grip_1791381490200.jpg",
    fallbackGradient: "from-[#355A4C] to-[#172D24]",
    specs: {
      "Type": "Co-Polyester Monofilament",
      "Gauge": "16L (1.25mm)",
      "Length": "12.2m / 40ft (Set)",
      "Color": "Neon Forest Teal"
    },
    features: [
      "Pentagonal profile for maximum spin potential",
      "Zero-creep tension stability",
      "Highly resistant to string-movement and friction"
    ],
    reviews: [
      { id: "rev-5", author: "Daniel T.", rating: 5, date: "2026-09-18", comment: "Bites the ball beautifully. Great durability for hard hitters." }
    ]
  },
  {
    id: "string-vortex",
    name: "Vortex Natural Gut 16",
    category: "strings",
    price: 42.00,
    rating: 5.0,
    reviewsCount: 84,
    description: "The gold standard of tennis feel, comfort, and tension retention. Crafted from premium organic fibers with a proprietary protective coating to offer unmatched pocketing and arm-friendly play.",
    image: "/src/assets/images/product_vortex_string_1791382262292.jpg",
    fallbackGradient: "from-[#4B5E55] to-[#2F4138]",
    specs: {
      "Type": "Natural Gut Collagen Fibers",
      "Gauge": "16 (1.30mm)",
      "Length": "12m (Set)",
      "Color": "Cream Ivory"
    },
    features: [
      "Maximum elasticity for unparalleled pocketing feel",
      "Easiest string on sensitive arms/elbows",
      "Extremely consistent performance over its lifetime"
    ],
    reviews: [
      { id: "rev-6", author: "Sarah B.", rating: 5, date: "2026-08-29", comment: "There is nothing like natural gut. Pricey, but the feel is absolutely worth it." }
    ]
  },
  {
    id: "grip-hydro",
    name: "Hydro-Sorb Overgrip (3-Pack)",
    category: "grips",
    price: 10.00,
    rating: 4.9,
    reviewsCount: 320,
    description: "Ultra-absorbent polyurethane overgrips with an ultra-tacky polyurethane feel. Specially treated with quick-drying micro-pores to maintain perfect grip dry-friction, even in high sweat conditions.",
    image: "/src/assets/images/product_premium_grip_1791381490200.jpg",
    fallbackGradient: "from-[#2A443A] to-[#12261E]",
    specs: {
      "Material": "Polyurethane Micro-pore Felt",
      "Thickness": "0.55mm",
      "Width": "25mm",
      "Length": "1100mm",
      "Pack Size": "3 Overgrips with finishing tape"
    },
    features: [
      "Rapid sweat-absorption channels",
      "High tack surface texture for slip prevention",
      "Includes premium elasticized sealing tape"
    ],
    reviews: [
      { id: "rev-7", author: "Tom S.", rating: 5, date: "2026-09-22", comment: "The tackiness lasts twice as long as standard grips. Nice and soft too." }
    ]
  },
  {
    id: "grip-hexa",
    name: "Hexa-Dry Perforated Roll",
    category: "grips",
    price: 15.00,
    rating: 4.6,
    reviewsCount: 105,
    description: "A premium perforated grip roll offering pure moisture dispersion. Features a distinct raised hexagonal spine that enhances finger anchor positions for exceptional rotational stability.",
    image: "/src/assets/images/product_hexa_grip_1791382279237.jpg",
    fallbackGradient: "from-[#1D2B24] to-[#0D1612]",
    specs: {
      "Material": "Ribbed Perforated EVA Core Poly",
      "Thickness": "0.65mm",
      "Style": "Ribbed with Hex-Spine Profile",
      "Length": "5m (Multi-wrap roll)"
    },
    features: [
      "Elevated center spine for extra grip alignment",
      "High density perforation allows maximum airflow",
      "Excellent shock dampening properties"
    ],
    reviews: []
  },
  {
    id: "acc-dampener",
    name: "Hex-Core Vibration Dampener",
    category: "accessories",
    price: 8.00,
    rating: 4.8,
    reviewsCount: 154,
    description: "Dual-density hexagonal silicone dampeners that span across the center main strings. Dramatically reduces high-frequency frame ping and resonance without muting the organic feel of the string bed.",
    image: "/src/assets/images/product_premium_grip_1791381490200.jpg", // Neat fallback to premium accessories image
    fallbackGradient: "from-[#314A3E] to-[#192D24]",
    specs: {
      "Material": "High-Grade Shock Silicone",
      "Shape": "Low-Profile Hexagon",
      "Pack Qty": "2 Dampeners",
      "Colors": "Forest Green / Matte Black"
    },
    features: [
      "Locks firmly onto strings - will never fly off during play",
      "Optimized string vibration absorption spectrum",
      "Extremely durable and weatherproof"
    ],
    reviews: []
  },
  {
    id: "acc-balls",
    name: "Pro-Court Championship Balls (Can of 4)",
    category: "accessories",
    price: 9.00,
    rating: 4.7,
    reviewsCount: 184,
    description: "Premium pressurized tennis balls built for ultimate visibility and hard-court durability. Feature high-grade felt with water-resistant treatment for consistent aerodynamic flight and bounce.",
    image: "/src/assets/images/product_tennis_balls_1791382295426.jpg",
    fallbackGradient: "from-[#20362C] to-[#0F1E18]",
    specs: {
      "Approval": "ITF & USTA Approved for Matchplay",
      "Core": "Re-engineered Pressurized Rubber",
      "Felt": "Play-Woven Extra Duty Felt",
      "Packaging": "Pressurized Aluminum Can"
    },
    features: [
      "Opti-Vis yellow felt treatment for 20% higher visibility",
      "Resilient pressurized core retains bounce longer",
      "Excellent durability on both hard and clay courts"
    ],
    reviews: []
  },
  {
    id: "acc-bag",
    name: "Aero-Sling Tactical Racket Bag",
    category: "accessories",
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.9,
    reviewsCount: 112,
    description: "The ultimate gear companion. Built with heavy-duty waterproof ballistic nylon and absolute compartment organization. Features a thermally-insulated compartment that shields up to 3 rackets from extreme weather and string creep.",
    image: "/src/assets/images/product_tactical_bag_1791382316016.jpg",
    fallbackGradient: "from-[#263D34] to-[#14231E]",
    specs: {
      "Material": "1200D Waterproof Ballistic Nylon",
      "Capacity": "Up to 6 Rackets + Apparel + Shoes",
      "Dimensions": "75cm x 32cm x 30cm",
      "Insulation": "ThermaShield Foil Barrier"
    },
    features: [
      "Ventilated shoe pocket with wet/dry split",
      "Ergonomic load-distributing backpack straps",
      "Fleece-lined accessories safe-pocket"
    ],
    reviews: [
      { id: "rev-8", author: "Chris P.", rating: 5, date: "2026-09-05", comment: "The thermal pocket actually works! Kept my strings in perfect tension during a 95-degree tournament day." }
    ]
  }
];
