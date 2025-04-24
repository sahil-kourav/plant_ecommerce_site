import { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {

  return (
    <Card className="w-full max-w-[350px] mx-auto my-4 cursor-pointer border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg bg-white">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[240px] object-cover rounded-t-2xl transition-all duration-300 hover:opacity-90"
          />
        </div>

        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2 truncate">{product?.title}</h2>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"
              } text-base font-semibold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-base font-bold text-green-600">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 px-4 pb-4">
          <Button
            variant="outline"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?.id);
              setFormData(product);
            }}
            className="w-full"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(product?.id)}
            className="w-full"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
