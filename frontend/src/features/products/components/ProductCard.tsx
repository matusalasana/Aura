import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

type ProductCardProps = {
  category: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating_count: number;
  rating: number;
  image: string;
  onClickWishlist: () => void;
  onClickAddToCart: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  category,
  name,
  description,
  price,
  stock,
  rating_count,
  rating,
  image,
  onClickWishlist,
  onClickAddToCart,
}) => {
  return (
    <div className="card bg-base-100 w-full max-w-sm overflow-hidden rounded-3xl border border-base-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <figure className="relative bg-base-200">
        <img
          src={image}
          alt={name}
          className="h-72 w-full object-cover"
        />

        {/* Wishlist Button */}
        <button
          onClick={onClickWishlist}
          className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-base-100/80 backdrop-blur hover:scale-105"
        >
          <Heart size={18} />
        </button>

        {/* Category */}
        <div className="badge badge-neutral absolute left-4 top-4 rounded-full px-3 py-3 text-xs font-medium">
          {category}
        </div>
      </figure>

      {/* CONTENT */}
      <div className="card-body gap-4 p-5">
        {/* Name + Description */}
        <div>
          <h2 className="line-clamp-1 text-xl font-semibold">{name}</h2>

          <p className="mt-2 line-clamp-2 text-sm text-base-content/70">
            {description}
          </p>
        </div>

        {/* Rating + Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-medium">{rating}</span>

            <span className="text-base-content/60">
              ({rating_count})
            </span>
          </div>

          <div
            className={`badge rounded-full px-3 py-3 text-xs ${
              stock > 0
                ? "badge-success badge-outline"
                : "badge-error badge-outline"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">${price}</p>
          </div>

          <button
            onClick={onClickAddToCart}
            disabled={stock === 0}
            className="btn btn-neutral rounded-2xl px-5"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;