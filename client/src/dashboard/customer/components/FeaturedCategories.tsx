import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  href: string;
}

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Apparel & Fashion",
    itemCount: 124,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    href: "/categories/apparel",
  },
  {
    id: "2",
    name: "Electronics & Tech",
    itemCount: 86,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    href: "/categories/tech",
  },
  {
    id: "3",
    name: "Home & Living",
    itemCount: 95,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    href: "/categories/home",
  },
  {
    id: "4",
    name: "Footwear",
    itemCount: 62,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    href: "/categories/footwear",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="section bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex-between mb-8 flex-col gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div className="badge-primary mb-2 gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Explore Collections</span>
            </div>
            <h2 className="heading text-2xl sm:text-3xl">Featured Categories</h2>
            <p className="subheading mt-1 text-sm">
              Discover top product collections across vendor storefronts
            </p>
          </div>

          <Link to="/categories" className="btn-outline gap-2 text-sm">
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="card-hover group relative overflow-hidden p-0"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={category.image}
                  alt={category.name}
                  className="image-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Item Count Badge */}
                <span className="badge absolute top-3 right-3 bg-background/80 backdrop-blur-md">
                  {category.itemCount} Items
                </span>
              </div>

              {/* Category Content */}
              <div className="flex-between p-4 bg-card">
                <div>
                  <h3 className="heading text-base font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <span className="muted text-xs">Browse store collection</span>
                </div>
                <div className="btn-ghost p-1.5 text-muted-foreground group-hover:text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}