export interface Product {
  id: string;
  number: string;
  name: string;
  nameFa?: string;
  collection: string;
  collectionFa?: string;
  price: number;
  currency: string;
  category: string;
  categoryFa?: string;
  material: string;
  materialFa?: string;
  description: string;
  descriptionFa?: string;
  details: string[];
  detailsFa?: string[];
  sizes: string[];
  dimensions?: string;
  accentColor?: string;
  colorName: string;
  colorNameFa?: string;
  silhouette: string;
  silhouetteFa?: string;
  edition: string;
  editionFa?: string;
}

export interface Look {
  id: string;
  lookNumber: string;
  title: string;
  titleFa?: string;
  subtitle: string;
  subtitleFa?: string;
  location: string;
  locationFa?: string;
  year: string;
  garments: string[];
  garmentsFa?: string[];
  concept: string;
  conceptFa?: string;
}

export interface MaterialItem {
  id: string;
  code: string;
  name: string;
  nameFa?: string;
  origin: string;
  originFa?: string;
  composition: string;
  compositionFa?: string;
  weight: string;
  description: string;
  descriptionFa?: string;
  properties: string[];
  propertiesFa?: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
