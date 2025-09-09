import axios from 'axios'
import { BaseUrl, headers } from '@/app/components/Baseurl'
import { CartResponse } from '@/app/lib/type'
import { useEffect } from 'react'

export const getCartItems = async (): Promise<CartResponse> => {
  const res = await axios.get(`${BaseUrl}api/carts`, { headers })
  return res.data
}

export const getCartLength = async (): Promise<number> => {
  const res = await axios.get<CartResponse>(`${BaseUrl}api/carts`, { headers })
  return res.data.data.data.data.length
}
