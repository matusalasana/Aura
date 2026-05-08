import { useCartItems } from "../hooks/useCartItems"
import CartItemsGrid from "../components/CartItemsGrid"
const CartPage = () => {
  const { data: cartItems, isLoading, isError } = useCartItems();
  
  if(isError){
    return <p>Something went wrong</p>;
  };
  
  return (
    <div>
      <CartItemsGrid
        data={cartItems ?? []}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CartPage;