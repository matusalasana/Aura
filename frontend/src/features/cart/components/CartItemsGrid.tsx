import CartBox from "./CartBox"



const CartItemsGrid = ({
  data,
  isLoading
}) => {
  if (isLoading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading cart items...
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((c) => (
        <CartBox
          name={c.name}
          image={"https://bxxwonszqwilodfqvjbv.supabase.co/storage/v1/object/public/product-images/New-Arrival-High-Quality-Male-Jacket.jpeg"}
          price={c.price}
          quantity={c.quantity}
          stock={c.stock_quantity}
          onIncrease={() => alert("Increased")}
          onDecrease={() => alert("Decreased")}
          onRemove={() => alert("Deleted")}
        />
      ))}
    </div>
  );
};

export default CartItemsGrid;