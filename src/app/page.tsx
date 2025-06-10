import { getProducts, getReviews } from "@/libs/api";
import ReviewsBlock from "./components/ReviewsBlock";
import CartSummary from "./components/CartSummary";
import ProductCard from "./components/ProductCard";
import { Product } from "./types/types";
import Header from "./components/Header";


export default async function Home() {
  const productsRes = await getProducts();
  const reviewsRes = await getReviews();

  const products = productsRes.data.items;
  const reviews = reviewsRes;

  return (
    <main>
      <Header />
      <ReviewsBlock reviews={reviews} />
      <CartSummary product={products} />
      <div className="products-grid">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
