import { Leaf, LogOut, Menu, ShoppingCart, User, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
    }
  }

  return (
    <nav className="flex flex-col mb-4 lg:mb-0 lg:flex-row lg:items-center gap-4 lg:gap-6">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-md font-medium cursor-pointer hover:text-green-700 transition-colors"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative hover:bg-green-50"
        >
          <ShoppingCart className="w-5 h-5 text-foreground" />
          <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-muted transition">
              <User className="h-6 w-6 text-foreground" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          to="/shop/home"
          className="flex items-center gap-2 hover:text-green-900 transition-colors"
        >
          <Leaf className="h-6 w-6" />
          <span className="font-bold text-xl tracking-wide">VrakshEarth</span>
        </Link>

        {/* Mobile & Tablet Layout */}
        <div className="flex items-center gap-5 lg:hidden">
          {/* Cart Icon */}
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="outline"
              size="icon"
              className="relative hover:bg-green-50"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartItems?.items?.length || 0}
              </span>
              <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems?.items || []}
            />
          </Sheet>

          {/* Menu Icon */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-6 space-y-4">
              {/* Menu Items */}
              <MenuItems />

              {/* Account and Logout */}
              <div className="flex flex-col gap-4 mt-4">
                <div
                  onClick={() => navigate("/shop/account")}
                  className="flex items-center text-md font-medium hover:text-green-700 cursor-pointer"
                >
                  Account
                </div>
                <div
                  onClick={handleLogout}
                  className="flex items-center text-md font-medium text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
