import { create } from 'zustand'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { BaseUrl } from '@/app/components/Baseurl'
import { CartResponse } from '@/app/lib/type'

const getAuthHeaders = () => {
  const token = Cookies.get('access_token_login')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

type CartStore = {
  cartCount: number
  setCartCount: (count: number) => void
  refreshCartCount: () => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,

  setCartCount: (count) => set({ cartCount: count }),

  refreshCartCount: async () => {
    const token = Cookies.get('access_token_login')

    if (!token) {
      set({ cartCount: 0 })
      return
    }

    try {
      const res = await axios.get<CartResponse>(
        `${BaseUrl}api/carts`,
        { headers: getAuthHeaders() }
      )

      const count = res.data.data.data.data.length
      set({ cartCount: count })
    } catch (error) {
      console.error('❌ فشل في جلب عدد السلة:', error)
      toast.error('❌ فشل جلب عدد السلة')
      set({ cartCount: 0 })
    }
  }
}))
