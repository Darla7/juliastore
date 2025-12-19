import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import Newsletter from '@/components/NewsLetter';
import SearchSection from '@/components/SearchSection';
import Footer from '@/components/Footer';

import {
  printOnDemandProducts,
  pdfTemplates,
  actualStuffs,
} from '@/data/products';
import PromotionalSection from '@/components/PromotionalSection';

export default function HomePage() {
  return (
    <main>
     
      <Hero /> 
      <CategorySection
        title="Print on Demand"
        products={printOnDemandProducts}
        showMore
        categoryId="print-on-demand"
      />

      <CategorySection
        title="PDF Templates"
        products={pdfTemplates}
        showMore
        categoryId="pdf-templates"
      />
      <CategorySection
        title="Actual Stuffs"
        products={actualStuffs}
        showMore
        categoryId="actual-stuffs"
      />
       <Newsletter /> 
      <PromotionalSection />
      <SearchSection />
     
    </main>
  );
}

