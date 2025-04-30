// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import Address from "@/components/shopping-view/address";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { useToast } from "@/components/ui/use-toast";
// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymemntStart] = useState(false);
//   const [showAddressSection, setShowAddressSection] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const totalCartAmount =
//     cartItems?.items?.reduce(
//       (sum, item) =>
//         sum +
//         (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
//       0
//     ) || 0;

//   function handleInitiatePaypalPayment() {
//     if (!cartItems?.items?.length) {
//       return toast({
//         title: "Your cart is empty. Please add items to proceed.",
//         variant: "destructive",
//       });
//     }
//     if (!currentSelectedAddress) {
//       return toast({
//         title: "Please select or add an address to proceed.",
//         variant: "destructive",
//       });
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?.id,
//       cartItems: cartItems.items.map((item) => ({
//         productId: item?.productId,
//         title: item?.title,
//         image: item?.image,
//         price: item?.salePrice > 0 ? item?.salePrice : item?.price,
//         quantity: item?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?.id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       if (data?.payload?.success) {
//         setIsPaymemntStart(true);
//       } else {
//         setIsPaymemntStart(false);
//       }
//     });
//   }

//   function handleCashOnDelivery() {
//     if (!cartItems?.items?.length) {
//       return toast({
//         title: "Your cart is empty. Please add items to proceed.",
//         variant: "destructive",
//       });
//     }
//     if (!currentSelectedAddress) {
//       return toast({
//         title: "Please select or add an address to proceed.",
//         variant: "destructive",
//       });
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?.id,
//       cartItems: cartItems.items.map((item) => ({
//         productId: item?.productId,
//         title: item?.title,
//         image: item?.image,
//         price: item?.salePrice > 0 ? item?.salePrice : item?.price,
//         quantity: item?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?.id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "cash-on-delivery",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Order placed successfully with Cash on Delivery.",
//           variant: "default",
//         });
//       } else {
//         toast({
//           title: "Failed to place COD order. Try again.",
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   // Redirect to PayPal if payment method is PayPal
//   if (approvalURL && paymentMethod === "paypal") {
//     window.location.href = approvalURL;
//   }

//   return (
//     <div className="flex flex-col">
//       {/* Main Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-10">
//         {/* Left Side: Cart Items */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-700">
//             Shopping Cart
//           </h2>

//           {/* Cart Items */}
//           <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
//             {cartItems?.items?.length > 0 ? (
//               cartItems.items.map((item, index) => (
//                 <UserCartItemsContent key={index} cartItem={item} />
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             )}
//           </div>

//           {/* Continue Shopping */}
//           <div className="mt-6">
//             <a
//               href="/shop/home"
//               className="text-green-600 display-inline hover:underline flex items-center gap-2"
//             >
//               ← Continue Shopping
//             </a>
//           </div>
//         </div>

//         {/* Right Side: Order Summary */}
//         <div className="bg-gray-50 mt-5 p-2 rounded-xl shadow-md flex flex-col justify-between">
//           <h2 className="text-2xl font-bold mb-4 border-b pb-1 text-gray-700">
//             Order Summary
//           </h2>

//           {/* Address Section */}
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">Delivery Address</h3>

//             {currentSelectedAddress ? (
//               <div className="bg-white p-2 rounded-md shadow-sm space-y-1">
//                 <p className="text-gray-800">
//                   {currentSelectedAddress?.address}
//                 </p>
//                 <p className="text-gray-600">
//                   {currentSelectedAddress?.city},{" "}
//                   {currentSelectedAddress?.pincode}
//                 </p>
//                 <p className="text-gray-600">
//                   Phone - {currentSelectedAddress?.phone}
//                 </p>
//                 <p className="text-gray-600">
//                   Notes - {currentSelectedAddress?.notes}
//                 </p>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="mt-4 w-full"
//                   onClick={() => {
//                     setShowAddressSection(true);
//                     setCurrentSelectedAddress(null);
//                   }}
//                 >
//                   Change Address
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 {!showAddressSection && (
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => setShowAddressSection(true)}
//                   >
//                     + Add Address
//                   </Button>
//                 )}
//                 {showAddressSection && (
//                   <Address
//                     selectedId={currentSelectedAddress}
//                     setCurrentSelectedAddress={(address) => {
//                       setCurrentSelectedAddress(address);
//                       setShowAddressSection(false);
//                     }}
//                   />
//                 )}
//               </>
//             )}
//           </div>

//           {/* Payment Method */}
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold mb-2 ">Payment Method</h3>
//             <select
//               className="w-full p-2 border rounded-md"
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               value={paymentMethod}
//             >
//               <option value="">Select Payment Method</option>
//               <option value="paypal">Online Payment</option>
//               <option value="cod">Cash On Delivery</option>
//             </select>
//           </div>

//           {/* Order Price Summary */}
//           <div className="space-y-2 text-gray-700 border-t pt-4 mb-4">
//             <div className="flex justify-between">
//               <span>Price:</span>
//               <span>₹{totalCartAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping Fee:</span>
//               <span className="text-green-600 font-semibold">Free</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Tax (2%):</span>
//               <span>₹{(totalCartAmount * 0.02).toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg text-black border-t pt-2">
//               <span>Total Amount:</span>
//               <span>
//               ₹{(totalCartAmount + totalCartAmount * 0.02).toFixed(2)}
//               </span>
//             </div>
//           </div>

//           {/* Checkout Button */}
//           {paymentMethod === "paypal" && (
//             <Button
//               className="w-full py-5 text-base"
//               onClick={handleInitiatePaypalPayment}
//               disabled={isPaymentStart || paymentMethod !== "paypal"}
//             >
//               {isPaymentStart ? "Processing Payment..." : "Proceed to Checkout"}
//             </Button>
//           )}

//           {/* COD Button */}
//           {paymentMethod === "cod" && (
//             <Button
//               onClick={handleCashOnDelivery}
//               className="w-full text-base py-5 bg-gray-500 hover:bg-gray-600"
//               disabled={isPaymentStart}
//             >
//               {isPaymentStart ? "Processing COD..." : "Cash on Delivery"}
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;


















import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [showAddressSection, setShowAddressSection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalCartAmount =
    cartItems?.items?.reduce(
      (sum, item) =>
        sum +
        (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
      0
    ) || 0;

  const buildOrderData = (method) => ({
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
    paymentMethod: method,
    paymentStatus: "pending",
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
    paymentId: "",
    payerId: "",
  });

  const validateOrder = () => {
    if (!cartItems?.items?.length) {
      toast({ title: "Your cart is empty.", variant: "destructive" });
      return false;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Please select or add an address.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateOrder()) return;

    const method = paymentMethod === "cod" ? "cash-on-delivery" : "paypal";
    const orderData = buildOrderData(method);

    setIsPaymentStart(true);

    dispatch(createNewOrder(orderData)).then((data) => {
      const success = data?.payload?.success;

      if (success) {
        if (method === "paypal") {
          // Only redirect if it's PayPal
          window.location.href = approvalURL;
        } else {
          toast({
            title: "Order placed successfully with Cash on Delivery.",
            variant: "default",
          });
        }
      } else {
        toast({
          title: "Failed to place the order. Try again.",
          variant: "destructive",
        });
      }

      setIsPaymentStart(false);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-10">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-700">Shopping Cart</h2>

          <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
            {cartItems?.items?.length > 0 ? (
              cartItems.items.map((item, i) => (
                <UserCartItemsContent key={i} cartItem={item} />
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <div className="mt-6">
            <a
              href="/shop/home"
              className="text-green-600 display-inline hover:underline flex items-center gap-2"
            >
              ← Continue Shopping
            </a>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-gray-50 mt-5 p-2 rounded-xl shadow-md flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-4 border-b pb-1 text-gray-700">Order Summary</h2>

          {/* Address Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Delivery Address</h3>
            {currentSelectedAddress ? (
              <div className="bg-white p-2 rounded-md shadow-sm space-y-1">
                <p className="text-gray-800">{currentSelectedAddress?.address}</p>
                <p className="text-gray-600">
                  {currentSelectedAddress?.city}, {currentSelectedAddress?.pincode}
                </p>
                <p className="text-gray-600">Phone - {currentSelectedAddress?.phone}</p>
                <p className="text-gray-600">Notes - {currentSelectedAddress?.notes}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => {
                    setShowAddressSection(true);
                    setCurrentSelectedAddress(null);
                  }}
                >
                  Change Address
                </Button>
              </div>
            ) : (
              <>
                {!showAddressSection && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowAddressSection(true)}
                  >
                    + Add Address
                  </Button>
                )}
                {showAddressSection && (
                  <Address
                    selectedId={currentSelectedAddress}
                    setCurrentSelectedAddress={(address) => {
                      setCurrentSelectedAddress(address);
                      setShowAddressSection(false);
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <option value="">Select Payment Method</option>
              <option value="paypal">Online Payment</option>
              <option value="cod">Cash On Delivery</option>
            </select>
          </div>

          {/* Price Summary */}
          <div className="space-y-2 text-gray-700 border-t pt-4 mb-4">
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{totalCartAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (2%):</span>
              <span>₹{(totalCartAmount * 0.02).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-black border-t pt-2">
              <span>Total Amount:</span>
              <span>₹{(totalCartAmount + totalCartAmount * 0.02).toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          {paymentMethod && (
            <Button
              onClick={handlePlaceOrder}
              className={`w-full py-5 text-base ${
                paymentMethod === "cod" ? "bg-gray-900 hover:bg-gray-800" : ""
              }`}
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Processing..."
                : paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Proceed to Checkout"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
