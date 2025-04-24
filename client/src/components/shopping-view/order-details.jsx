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
    <DialogContent className="max-w-full sm:max-w-[600px] px-4 sm:px-6 py-8">
      <div className="grid gap-6 text-sm sm:text-base">
        {/* Order Summary */}
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

          <div className="grid gap-2">
            <DetailRow label="Order ID" value={orderDetails?.id} />
            <DetailRow
              label="Order Date"
              // value={orderDetails?.orderDate?.split("T")[0]}
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
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border p-3 rounded-md bg-gray-50"
                >
                  <span className="text-gray-800 font-medium">
                    {item.title}
                  </span>
                  <span>Qty: {item.quantity}</span>
                  <span className="font-semibold">${item.price}</span>
                </li>
              ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        {/* <div className="grid gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Shipping Information
          </h2>
          <div className="grid gap-1 text-muted-foreground">
            <span className="text-gray-900 font-medium">{user?.userName}</span>
            <span className="text-gray-700">
              {orderDetails?.address?.address}
            </span>
            <span className="text-gray-700">
              {orderDetails?.address?.city} -{" "}
              {orderDetails?.address?.pincode}
            </span>
            <span className="text-gray-700">
              Phone: {orderDetails?.address?.phone}
            </span>
            {orderDetails?.address?.notes && (
              <span className="italic">{orderDetails.address.notes}</span>
            )}
          </div>
        </div>
      </div> */}

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
