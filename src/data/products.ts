import s1 from "@/assets/saree-1.jpg";
import s2 from "@/assets/saree-2.jpg";
import s3 from "@/assets/saree-3.jpg";
import s4 from "@/assets/saree-4.jpg";
import s5 from "@/assets/saree-5.jpg";
import s6 from "@/assets/saree-6.jpg";
import s7 from "@/assets/saree-7.jpg";
import s8 from "@/assets/saree-8.jpg";
import s9 from "@/assets/saree-9.jpg";
import s10 from "@/assets/saree-10.jpg";
import s11 from "@/assets/saree-11.jpg";
import s12 from "@/assets/saree-12.jpg";
import s13 from "@/assets/saree-13.jpg";
import s14 from "@/assets/saree-14.jpg";
import s15 from "@/assets/saree-15.jpg";
import s16 from "@/assets/saree-16.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  gallery: string[];
  category: "Banarasi" | "Kanchipuram" | "Silk" | "Cotton" | "Designer" | "Wedding" | "Party";
  fabric: string;
  color: string;
  occasion: string;
  rating: number;
  reviews: number;
  stock: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  trending?: boolean;
  description: string;
};

export const products: Product[] = [
  {
    id: "rani-banarasi",
    name: "Rani Banarasi Pure Silk Saree",
    price: 8499, mrp: 14999, image: s1, gallery: [s1, s7, s3],
    category: "Banarasi", fabric: "Pure Silk", color: "Red", occasion: "Wedding",
    rating: 4.8, reviews: 312, stock: 12, bestSeller: true, trending: true,
    description: "Handwoven Banarasi pure silk saree with intricate gold zari motifs. A timeless drape for weddings and grand occasions.",
  },
  {
    id: "neelam-kanchipuram",
    name: "Neelam Kanchipuram Silk Saree",
    price: 12999, mrp: 19999, image: s2, gallery: [s2, s3, s1],
    category: "Kanchipuram", fabric: "Kanchipuram Silk", color: "Royal Blue", occasion: "Bridal",
    rating: 4.9, reviews: 211, stock: 8, bestSeller: true,
    description: "Authentic Kanchipuram silk in royal blue with a contrast gold border, woven by master artisans of Tamil Nadu.",
  },
  {
    id: "panna-festive",
    name: "Panna Emerald Festive Silk",
    price: 6299, mrp: 10999, image: s3, gallery: [s3, s8, s1],
    category: "Silk", fabric: "Art Silk", color: "Green", occasion: "Festive",
    rating: 4.7, reviews: 188, stock: 20, trending: true,
    description: "Lush emerald green silk saree with golden floral booti — perfect for festive evenings.",
  },
  {
    id: "gulabi-chiffon",
    name: "Gulabi Pink Sequin Chiffon",
    price: 3499, mrp: 5999, image: s4, gallery: [s4, s8],
    category: "Designer", fabric: "Chiffon", color: "Pink", occasion: "Party",
    rating: 4.6, reviews: 142, stock: 25, newArrival: true,
    description: "Featherlight chiffon designer saree dotted with hand-stitched silver sequins.",
  },
  {
    id: "ivory-handloom",
    name: "Ivory Handloom Cotton Saree",
    price: 1899, mrp: 2999, image: s5, gallery: [s5],
    category: "Cotton", fabric: "Handloom Cotton", color: "Ivory", occasion: "Daily",
    rating: 4.5, reviews: 96, stock: 40, newArrival: true,
    description: "Breathable handloom cotton saree with a contrast pink border — minimal, elegant, everyday luxury.",
  },
  {
    id: "noir-designer",
    name: "Noir Sequin Designer Saree",
    price: 5499, mrp: 8999, image: s6, gallery: [s6, s4],
    category: "Party", fabric: "Satin", color: "Black", occasion: "Party",
    rating: 4.7, reviews: 173, stock: 14, trending: true,
    description: "Liquid satin black saree with intricate silver embellished border. Made for spotlights.",
  },
  {
    id: "raniroop-bridal",
    name: "Raniroop Bridal Lehenga Saree",
    price: 18999, mrp: 29999, image: s7, gallery: [s7, s1],
    category: "Wedding", fabric: "Velvet & Silk", color: "Red", occasion: "Bridal",
    rating: 4.9, reviews: 421, stock: 5, bestSeller: true,
    description: "Heritage bridal saree with heavy zardozi work, handcrafted by artisans of Banaras.",
  },
  {
    id: "haldi-georgette",
    name: "Haldi Floral Georgette Saree",
    price: 2499, mrp: 4499, image: s8, gallery: [s8, s4],
    category: "Designer", fabric: "Georgette", color: "Yellow", occasion: "Haldi",
    rating: 4.6, reviews: 88, stock: 30, newArrival: true, trending: true,
    description: "Sunshine yellow floral georgette saree — light, breezy and made for haldi celebrations.",
  },
  {
    id: "mayur-paithani",
    name: "Mayur Paithani Peacock Silk",
    price: 15999, mrp: 24999, image: s9, gallery: [s9, s3, s1],
    category: "Wedding", fabric: "Paithani Silk", color: "Peacock Green", occasion: "Wedding",
    rating: 4.9, reviews: 156, stock: 7, bestSeller: true, newArrival: true,
    description: "Maharashtrian heritage Paithani saree with iconic peacock motifs and a kaleidoscopic gold border.",
  },
  {
    id: "bandhej-orange",
    name: "Bandhej Orange Tie-Dye Silk",
    price: 3999, mrp: 6999, image: s10, gallery: [s10, s4],
    category: "Designer", fabric: "Bandhani Silk", color: "Orange", occasion: "Festive",
    rating: 4.7, reviews: 124, stock: 22, trending: true,
    description: "Vibrant Rajasthani Bandhani silk saree in sunset orange and red, dotted with traditional tie-dye patterns.",
  },
  {
    id: "kalamkari-tussar",
    name: "Kalamkari Tussar Silk Saree",
    price: 5499, mrp: 8999, image: s11, gallery: [s11, s5],
    category: "Silk", fabric: "Tussar Silk", color: "Mustard Gold", occasion: "Festive",
    rating: 4.6, reviews: 98, stock: 18, newArrival: true,
    description: "Hand-painted Kalamkari florals on natural Tussar silk — earthy, artistic, and effortlessly elegant.",
  },
  {
    id: "lavender-organza",
    name: "Lavender Sequin Organza Saree",
    price: 4599, mrp: 7999, image: s12, gallery: [s12, s4],
    category: "Party", fabric: "Organza", color: "Lavender", occasion: "Cocktail",
    rating: 4.7, reviews: 187, stock: 16, newArrival: true, trending: true,
    description: "Ethereal lavender organza saree with scattered sequin work and a delicate silver border.",
  },
  {
    id: "teal-linen",
    name: "Teal Pure Linen Saree",
    price: 2299, mrp: 3999, image: s13, gallery: [s13, s5],
    category: "Cotton", fabric: "Linen", color: "Teal", occasion: "Daily",
    rating: 4.5, reviews: 76, stock: 35, newArrival: true,
    description: "Crisp pure linen saree in sea teal with a warm copper border — breathable sophistication for work and weekends.",
  },
  {
    id: "leheriya-pink",
    name: "Leheriya Pink Wave Silk Saree",
    price: 3299, mrp: 5499, image: s14, gallery: [s14, s4],
    category: "Designer", fabric: "Georgette", color: "Pink", occasion: "Haldi",
    rating: 4.6, reviews: 112, stock: 28, trending: true,
    description: "Playful Leheriya wave stripes in candy pink, finished with a gota-patti border for festive flair.",
  },
  {
    id: "chikankari-white",
    name: "Chikankari White Shadow Work Saree",
    price: 4999, mrp: 8499, image: s15, gallery: [s15, s5],
    category: "Designer", fabric: "Georgette", color: "White", occasion: "Party",
    rating: 4.8, reviews: 203, stock: 19, bestSeller: true,
    description: "Lucknowi Chikankari white-on-white shadow work with pearl and sequin highlights — understated luxury.",
  },
  {
    id: "indigo-kanjivaram",
    name: "Indigo Blue Kanjivaram Bridal Saree",
    price: 21999, mrp: 34999, image: s16, gallery: [s16, s2, s7],
    category: "Kanchipuram", fabric: "Kanjivaram Silk", color: "Indigo Blue", occasion: "Bridal",
    rating: 4.9, reviews: 267, stock: 4, bestSeller: true,
    description: "Regal indigo Kanjivaram silk with a grand gold temple border — a South Indian bridal heirloom.",
  },
];

export const categories = [
  { slug: "Banarasi", name: "Banarasi", image: s1 },
  { slug: "Kanchipuram", name: "Kanchipuram", image: s16 },
  { slug: "Silk", name: "Silk", image: s3 },
  { slug: "Designer", name: "Designer", image: s15 },
  { slug: "Cotton", name: "Cotton", image: s13 },
  { slug: "Party", name: "Party Wear", image: s12 },
  { slug: "Wedding", name: "Wedding", image: s7 },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);
