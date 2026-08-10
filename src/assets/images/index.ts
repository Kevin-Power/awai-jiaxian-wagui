import hero from "./hero.jpg";
import shop from "./shop.jpg";
import wagui from "./wagui.jpg";
import zongzi from "./zongzi.jpg";

export const images = {
  hero,
  shop,
  wagui,
  zongzi,
} as const;

export type ImageKey = keyof typeof images;
