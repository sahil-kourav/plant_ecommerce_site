import { Button } from "@/components/ui/button";
import floweringPlant from "../../assets/Flowering-plants.webp";
import indoorPlant from "../../assets/indoor-plants.jpg";
import outdoorPlant from "../../assets/outdoor-plant.webp";
import giftingPlant from "../../assets/gifting-plant.jpg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import Testimonials from "./Testimonials";


const categoriesWithImage = [
  { 
    id: "indoor", 
    label: "Indoor Plants", 
    professionalLabel: "Indoor Plant Collection", 
    image: indoorPlant 
  },
  { 
    id: "flowering", 
    label: "Flowering Plants", 
    professionalLabel: "Exquisite Flowering Plants", 
    image: floweringPlant 
  },
  { 
    id: "outdoor", 
    label: "Outdoor Plants", 
    professionalLabel: "High-Quality Outdoor Plants", 
    image: outdoorPlant 
  },
  { 
    id: "gifting", 
    label: "Gifting Plants", 
    professionalLabel: "Premium Gifting Plants", 
    image: giftingPlant 
  },
];


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  function getCategoryProducts(categoryId) {
    return productList?.filter(
      (product) => product.category?.toLowerCase() === categoryId
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Slider */}
      {/* <div className="relative rounded-lg w-full sm:w-[682px] md:w-[780px] lg:w-[951px] xl:w-[1290px] mx-auto h-[273px] sm:h-[455px] lg:h-[600px] mt-5 overflow-hidden"> */}
      <div className="relative rounded-lg w-[90%] xs:w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] mx-auto h-[200px] xs:h-[180px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[600px] mt-10 overflow-hidden">


        {featureImageList?.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 shadow-md"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 shadow-md"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Shop by Category */}
    {/* <div className="flex flex-col min-h-screen mx-4 sm:mx-6 md:mx-4 lg:mx-12">
      <section className="flex flex-col items-center py-10 px-4 "> */}
      <div className="flex flex-col min-h-screen mx-4 sm:mx-6 md:mx-4 lg:mx-12">
      <section className="flex flex-col items-center py-12 px-4 w-[100%] sm:w-[90%] md:w-[90%] lg:w-auto">
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mt-5 mb-10 text-green-800">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriesWithImage.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="group cursor-pointer hover:shadow-md transition-shadow rounded-2xl bg-white border border-gray-200"
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden mb-5 shadow-lg transition-transform group-hover:scale-105">
                    <img
                      src={categoryItem.image}
                      alt={categoryItem.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-center font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category-wise Sections */}
      {categoriesWithImage.map((categoryItem) => {
        const products = getCategoryProducts(categoryItem.id);
        if (!products || products.length === 0) return null;

        return (
          <section key={categoryItem.id} className="py-6 px-2 bg-white">
            <div className="max-w-6xl mx-auto">
<h3 className="text-3xl sm:text-3xl md:text-3xl lg:text-3xl text-center mb-10 text-gray-800">
                {categoryItem.professionalLabel}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))}
              </div>

            </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="border border-gray-400 px-8 py-1.5 rounded-md hover:bg-gray-100 transition"
                >
                  View All Plants
                </button>
              </div>
          </section>
        );
      })}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
       <Testimonials />
       </div>
    </div>
  );
}

export default ShoppingHome;








