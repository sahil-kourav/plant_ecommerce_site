import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-xl w-full p-4 sm:p-6">
      <SheetHeader>
        <SheetTitle className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent cartItem={item} key={item.productId} />
            ))
          : <p className="text-center text-gray-500">Your cart is empty.</p>}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-lg sm:text-xl font-semibold">
          <span>Total</span>
          <span>
            ${totalCartAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 py-3 sm:py-4 text-lg bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
