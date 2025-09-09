import { StaticImageData } from "next/image";
import { ReactNode } from "react";
export interface ApiResponse<T>{
    statusCode: number;
    meta: string | null;
    succeeded: boolean;
    message: string;
    errors: string | null;
    data: T;
    status?:{
      status:boolean
      code:number
      messages:string
      validation_message:string
    };
  }





////////// field form 

export interface FieldForm {
  name: string;
  label?: string;
  type: "text" | "number" | "email" | "select"|"password";
  options?: { label: string; value: string | number }[];      
  fetchUrl?: string;
  placeholder?:string 
  requierd?:boolean   
      
}

////////// field form 


////login
export interface Login{
    access_token: string;
  token_type: string;
  user: UserData;
}
////login

//// register

export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  type: number;
  type_name: string;
  libraryInformations: any;
  CartCount: number;
  points: number | null;
  pointsSettings?: {
    points: string;
    price: string;
    point_price: string;
  };
}
export interface Register{
 token: string;
  type: string;
  user: UserData;
}

//////card type
export interface CardProps {
  id: number
  name: string
  description: string
  image: string | StaticImageData
  price: string
  originalPrice?: string
  discount?: number
  stock?: number
  soldOut?: boolean
  love?: boolean
  handellove?: () => void
  packet_pieces?: number
  packet_price?: string,
  piece_price?:string,
  piece_price_after_offer?: string | null
  packet_price_after_offer?: string | null
  category?: Record<string, any> 
  reviews_avg?: number,
  user_favourite?:boolean,
  offer?:string
}

///card type 




///category type 

export interface CategoryProps {
  id: number,
  image: string | StaticImageData
  name: string
  products_count?: number
}
///category type 


///// slider type
export interface Product {
  id: number;
  category_id: number;
  category: string;
  offer: number;
}

export interface ProductSliderItem {
  id: number;
  title: string;
  image: string;
  product_id: number;
  product: Product;
}

export interface SwiperSliderProps {
  items: ProductSliderItem[];
  height?: string;
  objectFit?: "cover" | "contain";
  showNavigation?: boolean;
  showPagination?: boolean;
  autoPlayDelay?: number;
  offer?:number;
  category_id?:number;
}


///// slider type

///CategoryWithProducts type
export interface CategoryWithProducts {
  id: number;
  name: string;
  image: string;
  products_count: number;
  products: CardProps[];
}



///CategoryWithProducts type



// home type
export interface HomePageData{
sliders: ProductSliderItem[];
  hotDeals: CardProps[];
  topSelling: CardProps[];
  categoriesWithProducts: CategoryWithProducts[];
  categories: CategoryProps[];
  data?:[]
}
// home type

export interface acesstoken{
  accessToken: string;
  expires: string;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
  user: {
    name: string;
    email: string;
    image?: string;
    sub?: string;
  };
}


/// state managment
export interface HomeDataState {
  data: HomePageData;
  loadingdata: boolean;
  fetchHomeData: () => Promise<void>;
}

//// pagination 
export interface ProductsState {
  products: CardProps[];
  page: number;
  lastPage: number;
  loading: boolean;
  hasMore: boolean;
  searchTerm:string;

  setSearchTerm: (term: string) => void;
  fetchProducts: (reset?: boolean, search?: string,

  filter?: {
    hasStock?: string;
    hasColors?: string;
    hasPacket?: string;
    hasOffer?: string;
    category?:string
  }
  ) => Promise<void>;
}



/// details
export interface user{
  id:number,
  name:string;
  email:string;
}
export interface colors{
  id:number;
  code:string;
  stock:number;
  media?:number[];
}
export interface media{
  id:number;
  image:string | StaticImageData;
  color_id:number;
}
export interface reviews{
  id:number;
  review:number;
  comment:string;
  created_at:string;
  user:user;
}

export interface Category{
  id:number;
  name:string;
  image:string | StaticImageData;

}

export interface ProductDetails {
    id: number;
  name: string;
  desc: string;
  image: string | StaticImageData;
  stock: number;
  packet_pieces: number;
  piece_price: string;
  packet_price: string;
  piece_price_after_offer: string | null;
  packet_price_after_offer: string | null;
  offer: number;
  user_favourite: boolean;
  Category:Category,
  reviews: reviews[];
  reviews_avg: number;
  media: media[];
  colors: colors[];
}

///// add to chart
export interface AddToChart {
  product_id: number,
  qty: number,
   product_type: string,
  color_id?: number
}
export interface Favorit{
  product_id: number,

}
export interface Comment{
  reviewable_type:string,
  reviewable_id:number,
  review:string,
  comment:string,
}

//// favorit
export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}


export interface Product_Card{
  id: number;
  name: string;
  desc: string;
  image: string;
  stock: number;
  packet_pieces: number;
  piece_price: string;
  packet_price: string;
  piece_price_after_offer: string;
  packet_price_after_offer: string;
}
export interface CartItem {
  disabled?: boolean;
  id: number;
  product_id: number;
  color_id: number | null;
  qty: number;
  product_type: string;
  price_before_discount: string;
  price_after_discount: string;
  created_at: string; 
  product: Product_Card;
  color: colors;
}
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
 export interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export  interface Info {
  total: string; 
  delivery_discount: number;
  points_settings: {
    points: string;
    price: string;
    point_price: string;
  };
}
export interface CartData {
  data: CartItem[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
export interface MainData {
  data: CartData;
  info: Info;
}

export interface ResponseStatus {
  status: boolean;
  code: number;
  messages: string;
}

export interface CartResponse {
  data: MainData;
  status: ResponseStatus;
  info:{
    total:string,
    delivery_discount:number,
      points_settings: {
                points: string,
                price: string,
                point_price: string
            }
  }
}
export interface code{

  code:string
}


//////////// Profile
export interface PointsSettings {
  points: string;
  price: string;
  point_price: string;
}

export interface Profile{
    id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  type: number;
  type_name: string;
  libraryInformations: any | null;
  CartCount: number;
  points: number;
  pointsSettings: PointsSettings;
}

//////////// Profile
export interface Simpledash{
          id: number,
          name: string,
          image: string,
          products_count: number
}

export interface postLocation {
    full_name: string;
    phone: string;
    governorate_id: string;
    city_id: string;
    area_id: string;
    address_details: string;
    latitude: string;
    longitude: string;
}

export interface address {
       name: string,
        phone: string,
        governorateId: string,
        cityId: string,
        areaId: string,
        details: string,
}
export interface addressNames{
    governorate: string;
    city: string;
    area: string;
}

export interface BottomSelectFieldProps {
  title: string;
  placeholder?: string;
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  icon?: ReactNode;
  canOpen?: boolean; // new prop
  onBlockedOpen?: () => void; // new prop
}


export interface Details_Order{
  total:number
  delivery_discount:number;
  points_settings:{
    points:number;
    price:number;
  }
}
export interface Checkout {
  show: boolean;
  discount:Coupoun;
  id: number;
  code?: string;
  items: Details_Order;
  use_points?: boolean;
  oncheckout: () => void;
  // color_id:number|null
  close: () => void;
}

export interface surecash{
    
    user_address_id: number;
    payment_type: string;
    notes:string;
    code?: string;
    use_points?: string;
    color_id?:number;
  }


export interface AddressData {
  id: number;
  governorate: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
    delivery_discount_percentage: string;
  };
  area: {
    id: number;
    name: string;
    cost: string;
    final_cost: number;
  };
  address_details: string;
  latitude: number;
  longitude: number;
  full_name: string;
  phone: string;
  phone_verified_at: string;
  verification_code: number;
}
/////////// for orders 


export interface Order {
  id: number;
  total: string;
  discount: string;
  discount_type: string;
  delivery_fee: string;
  sub_total: string;
  points_discount: string;
  status: string;
  payment_type: string;
  payment_status: string;
  Cancel_reason: string | null;
  notes: string;
  created_at: string;
  refund: boolean;
  address: Address;
  order_meta: OrderMeta[];
}
export interface OrderData {
  id: number;
  total: string;
  discount: string;
  discount_type: string;
  delivery_fee: string;
  sub_total: string;
  points_discount: string;
  status: string;
  payment_type: string;
  payment_status: string;
  Cancel_reason: string;
  notes: string;
  created_at: string;
  refund: boolean;
  address: Address;
  order_meta: OrderMeta[];
}
export interface Address {
  id: number;
  latitude: number;
  longitude: number;
  governorate: string;
  city: string;
  area: string;
  full_name: string;
  address_details: string;
  phone: string;
}

export interface OrderMeta {
  id: number;
  product_id: number;
  color_id: number | null;
  qty: number;
  product_type: string;
  price_before_discount: string | null;
  price_after_discount: string;
  created_at: string;
  product: Product_Order;
  color: Color;
}

export interface Product_Order {
  id: number;
  name: string;
  desc: string;
  image: string;
  stock: number;
  packet_pieces: number;
}

export interface Color {
  id: number | null;
  code: string | null;
}



export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
export type moodel_order = {
  reasons: string[];
  reason: string;
  status: string;
  label:string;
  cancelOrder?: (reason: string, status: string) => void;
  setReason?: (reason: string) => void;
};


export interface Coupoun{
  type:string,
  value:number;
}