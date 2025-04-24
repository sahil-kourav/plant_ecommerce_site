export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "number",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    componentType: "input",
    type: "number",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Create Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "indoor", label: "Indoor Plants" },
      { id: "outdoor", label: "Outdoor Plants" },
      { id: "flowering", label: "Flowering Plants" },
      { id: "gifting", label: "Gifting Plants"}
    ],
  },
  
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
  {
    id: "products",
    label: "All Plants",
    path: "/shop/listing",
  },
  {
    id: "indoor",
    label: "Indoor Plants",
    path: "/shop/listing?category=indoor",
  },
  {
    id: "outdoor",
    label: "Outdoor Plants",
    path: "/shop/listing?category=outdoor",
  },
  {
    id: "flowering",
    label: "Flowering Plants",
    path: "/shop/listing?category=flowering",
  },
  {
    id: "gifting",
    label: "Gifting Plants",
    path: "/shop/listing?category=gifting",
  },
];


export const categoryOptionsMap = {
  indoor: "Indoor Plants",
  outdoor: "Outdoor Plants",
  flowering: "Flowering Plants",
  gifting: "Gifting Plants",
};

export const filterOptions = {
  category: [
    { id: "indoor", label: "Indoor Plants" },
    { id: "outdoor", label: "Outdoor Plants" },
    { id: "flowering", label: "Flowering Plants" },
    { id: "gifting", label: "Gifting Plants"},
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
