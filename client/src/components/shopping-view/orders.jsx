import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  const handleFetchOrderDetails = (id) => {
    dispatch(resetOrderDetails()); 
    dispatch(getOrderDetails(id));
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <CardTitle className="text-xl sm:text-2xl text-gray-800 font-bold">
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-gray-700 font-semibold">Order ID</TableHead>
                <TableHead className="text-gray-700 font-semibold">Order Date</TableHead>
                <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                <TableHead className="text-gray-700 font-semibold">Total</TableHead>
                <TableHead className="text-gray-700 font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList?.length > 0 &&
                orderList.map((orderItem) => (
                  <TableRow key={orderItem.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700 break-words">
                      {orderItem.id}
                    </TableCell>
                    <TableCell>
                    {new Date(orderItem?.orderDate).toLocaleDateString("en-GB")}
                  </TableCell> 
                    <TableCell>
                      <Badge
                        className={`capitalize py-1 px-3 text-white text-xs font-semibold rounded-full shadow-sm ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-gray-800"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800">
                      ${orderItem.totalAmount}
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={
                          openDetailsDialog &&
                          orderDetails?.id === orderItem.id
                        }
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem.id)}
                          className="text-sm px-4 py-2 bg-primary hover:bg-primary/90"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View (Card-based layout) */}
        <div className="sm:hidden px-4 py-4 space-y-4">
          {orderList?.length > 0 &&
            orderList.map((orderItem) => (
              <div
                key={orderItem.id}
                className="border rounded-xl p-4 shadow-md bg-white space-y-2"
              >
                <div className="text-sm text-gray-700 font-semibold">
                  Order ID:
                  <span className="ml-1 font-normal break-words">
                    {orderItem.id}
                  </span>
                </div>
                <div className="text-sm text-gray-700 font-semibold">
                  Date:
                  <span className="ml-1 font-normal">
                    {/* {orderItem?.orderDate?.split("T")[0]} */}
                    {new Date(orderItem?.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-700 font-semibold">
                  Status:
                  <Badge
                    className={`ml-1 capitalize py-1 px-3 text-white text-xs font-semibold rounded-full ${
                      orderItem.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-gray-800"
                    }`}
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </div>
                <div className="text-sm text-gray-700 font-semibold">
                  Total:
                  <span className="ml-1 font-bold text-gray-900">
                    ${orderItem.totalAmount}
                  </span>
                </div>
                <Dialog
                  open={openDetailsDialog && orderDetails?.id === orderItem.id}
                  onOpenChange={() => {
                    setOpenDetailsDialog(false);
                    dispatch(resetOrderDetails());
                  }}
                >
                  <Button
                    className="w-full mt-3 text-sm bg-primary hover:bg-primary/90"
                    onClick={() => handleFetchOrderDetails(orderItem.id)}
                  >
                    View Details
                  </Button>
                  <ShoppingOrderDetailsView orderDetails={orderDetails} />
                </Dialog>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
