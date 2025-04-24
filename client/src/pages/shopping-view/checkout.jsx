import Address from "@/components/shopping-view/address";
import img from "../../assets/account-banner.png";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems?.items?.length) {
      return toast({
        title: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
    }

    if (!currentSelectedAddress) {
      return toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?.id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?.id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden">
        <img
          src={img}
          alt="Checkout Banner"
          className="h-full w-full object-cover object-center"
        />
      </div>
  
      {/* Main Checkout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 px-4 sm:px-6 lg:px-12 py-6">
        
        {/* Left Side: Cart Summary */}
        <div className="flex flex-col gap-6 bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center border-b pb-2">Your Cart</h2>
          <div className="max-h-[420px] overflow-y-auto space-y-5 pr-0">
            {cartItems?.items?.length > 0 &&
              cartItems.items.map((item, index) => (
                <div key={index}>
                  <UserCartItemsContent cartItem={item} />
                </div>
              ))}
          </div>
  
          {/* Total & Checkout */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalCartAmount.toFixed(2)}</span>
            </div>
            <Button
              onClick={handleInitiatePaypalPayment}
              className="w-full text-base py-5"
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
  
        {/* Right Side: Address */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center border-b pb-2">Select Delivery Address</h2>
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
      </div>
    </div>
  );
}  
export default ShoppingCheckout;
