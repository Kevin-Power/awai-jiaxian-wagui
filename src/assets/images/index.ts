import hero from "./hero.jpg";
import shop from "./shop.jpg";

export const images = {
  hero,
  shop,
  wagui: hero,
  zongzi: hero,
} as const;

export type ImageKey = keyof typeof images;
