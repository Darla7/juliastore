export type DesignerConfig = {
  canvas: {
    width: number;
    height: number;
  };
  printArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  variants: {
    color: string;
    mockup: string;
  }[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  mockupUrl?: string;
  category: 'print-on-demand' | 'pdf-templates' | 'actual-stuffs';
  subcategory?: string;

  // 🔥 OPTIONAL — only for print-on-demand
  designer?: DesignerConfig;
};

