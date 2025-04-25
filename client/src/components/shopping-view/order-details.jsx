import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";
import { useEffect } from "react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  // console.log(orderDetails.id || "aman");
  const dispatch = useDispatch();
  return (
    <DialogContent className="max-w-full sm:max-w-[600px] max-h-[80vh] overflow-y-auto px-4 sm:px-6 py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="grid gap-6 text-sm sm:text-base">
        {/* Order Summary */}
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

          <div className="grid gap-2">
            <DetailRow label="Order ID" value={orderDetails?.id} />
            <DetailRow
              label="Order Date"
              value={
                orderDetails?.orderDate
                  ? new Date(orderDetails.orderDate).toLocaleDateString("en-GB")
                  : "Not Available"
              }
            />
            <DetailRow
              label="Order Price"
              value={`$${orderDetails?.totalAmount}`}
            />
            <DetailRow
              label="Payment Method"
              value={orderDetails?.paymentMethod}
            />
            <DetailRow
              label="Payment Status"
              value={orderDetails?.paymentStatus}
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-gray-700">Order Status</p>
              <Badge
                className={`capitalize py-1 px-3 text-white ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-gray-800"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
          <ul className="grid gap-3">
            {orderDetails?.items?.length > 0 &&
              orderDetails.items.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col justify-between gap-2 sm:gap-2 border p-3 rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">Title: </span>
                    {item.title}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">Quantity: </span>
                    <span>{item.quantity}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">Price: </span>
                    <span>${item.price}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5">
              <div className="grid gap-2 text-md">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary">Recipient:</span>{" "}
                  {user?.userName}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary">
                    Shipping Address:
                  </span>{" "}
                  {[
                    orderDetails?.address?.address,
                    orderDetails?.address?.city,
                    orderDetails?.address?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary">Phone:</span>{" "}
                  {orderDetails?.address?.phone || "N/A"}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary">Notes:</span>{" "}
                  {orderDetails?.address?.notes || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-gray-700">
      <p className="font-medium">{label}</p>
      <Label className="text-right break-words">{value}</Label>
    </div>
  );
}

export default ShoppingOrderDetailsView;
