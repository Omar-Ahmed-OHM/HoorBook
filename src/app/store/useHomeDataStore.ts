import axios from 'axios';
import { BaseUrl,headers } from '../components/Baseurl';
import { HomePageData, HomeDataState, ApiResponse } from './../lib/type';
import {create} from 'zustand';
export const HomeStore=create<HomeDataState>((set)=>({
    data: {
    sliders: [],
    hotDeals: [],
    topSelling: [],
    categoriesWithProducts: [],
    categories: []
  },
  loadingdata: true,
  fetchHomeData:async()=>{
      try{
  const response= await axios.get(`${BaseUrl}api/home`,{headers});
      set({ data: response.data.data });
      }
      catch(error){
        console.log(error);
        
      }
      finally{
            set({ loadingdata: false });
      }
  },
}))