export interface Product {
  title: string;
  desc: string;
  categoryType?: number;
  price: number;
  count: number;
  discountPercent?: number;
  brand: string;
  color?: string;
  isActive: boolean;
  imageFile: ImageFile;
}

export interface ImageFile {
  originalSizeUrl: string;
  thumbNailUrl?: string;
}
