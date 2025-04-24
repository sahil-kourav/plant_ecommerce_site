import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { categoryOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-[300px] mx-auto my-2 border border-gray-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015] bg-white">
      <div onClick={() => handleGetProductDetails(product?.id)}>
        <div className="group">
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[200px] object-cover rounded-t-2xl transition-all duration-300 hover:opacity-90"
            />
          </div>
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-3 left-3 bg-red-600 text-white">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              Only {product?.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-3 left-3 bg-red-600 text-white">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4 pb-2">
          <h2 className="text-lg mb-1 font-semibold truncate">{product?.title}</h2>
          <Badge
            variant="outline"
            className="text-xs mb-1 px-2 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {categoryOptionsMap[product?.category]}
          </Badge>

          <div className="flex gap-2 items-center">
            {product?.salePrice > 0 && (
              <span className="text-base font-semibold">
                ${product?.salePrice}
              </span>
            )}
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-primary"
              } text-base font-semibold`}
            >
              ${product?.price}
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="px-4 pb-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <button
            onClick={() =>  handleAddtoCart(product?.id, product?.totalStock)}
            className="w-full border border-gray-400 px-8 py-1.5 rounded-md hover:bg-gray-100 transition"
          >
            Add to Cart
          </button>

        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
