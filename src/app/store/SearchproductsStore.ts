import { headers,BaseUrl } from './../components/Baseurl';
// SearchproductsStore.ts
import { ApiResponse, ProductsState } from './../lib/type';
import { create } from 'zustand';
import axios from 'axios';

export const Searchproduct = create<ProductsState>((set, get) => ({
  products: [],
  page: 1,
  lastPage: 1,
  loading: false,
  hasMore: true,
  searchTerm: "",

  hasColors: '',
  hasOffer: '',
  hasStock: '',
  hasPacket: '',

  setSearchTerm: (term: string) => set({ searchTerm: term }),

  fetchProducts: async (
    reset = false,
    search = '',
    filter = {
      hasStock: '',
      hasColors: '',
      hasPacket: '',
      hasOffer: '',
      category: ''
    }
  ) => {
    const {
      page,
      lastPage,
      loading,
      searchTerm,
    } = get();

    if (loading || (!reset && page > lastPage)) return;

    const currentPage = reset ? 1 : page;
    const searchQuery = search || searchTerm;

    const params = new URLSearchParams({
      page: currentPage.toString(),
      name: searchQuery,
      hasColors: filter.hasColors || '',
      hasOffer: filter.hasOffer || '',
      hasStock: filter.hasStock || '',
      hasPacket: filter.hasPacket || '',
      category: filter.category || ''
    });
  if (params.get("name") === "") {
  params.delete("name");
}
    const url = `${BaseUrl}api/products?${params.toString()}`;
    

    set({ loading: true });

   try {
  const response: ApiResponse<any> = await axios.get(url, { headers });

  const result = response.data.data;

  const newProducts = result.data;

const newLastPage = result.meta?.last_page || currentPage;

  set((state) => ({
    products: reset ? newProducts : [...state.products, ...newProducts],
    page: currentPage + 1,
    lastPage: newLastPage,
    hasMore: currentPage < newLastPage,
  }));
} catch (error) {
  console.error('Fetch Error:', error);
}
 finally {
      set({ loading: false });
    }
  }
}));
