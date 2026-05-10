import s1 from "@/assets/saree-1.jpg";
import s2 from "@/assets/saree-2.jpg";
import s3 from "@/assets/saree-3.jpg";
import s4 from "@/assets/saree-4.jpg";
import s5 from "@/assets/saree-5.jpg";
import s6 from "@/assets/saree-6.jpg";
import s7 from "@/assets/saree-7.jpg";
import s8 from "@/assets/saree-8.jpg";

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
];

export const categories = [
  { slug: "Banarasi", name: "Banarasi", image: s1 },
  { slug: "Kanchipuram", name: "Kanchipuram", image: s2 },
  { slug: "Silk", name: "Silk", image: s3 },
  { slug: "Designer", name: "Designer", image: s4 },
  { slug: "Cotton", name: "Cotton", image: s5 },
  { slug: "Party", name: "Party Wear", image: s6 },
  { slug: "Wedding", name: "Wedding", image: s7 },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);