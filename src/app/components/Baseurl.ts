import Cookies from 'js-cookie'
export const BaseUrl='https://hoorbookapp.com/'
const tokent =Cookies.get('access_token_login')
export const headers = {
    Authorization: `Bearer ${tokent}`,
    userType: '2',
    fcmToken: 'fGS7RgUcR66lms505IQllc:APA91bF-AdXcn94TKHQ2eKEqTX22eQTxr6LRSwpHyzwWXjvwBFfLQ_yYWO0ZNfd9ScbxHjKBZaGLosJK2G1wfrKp6G4h3FeDfdNovPZD3PX8iV-ckfYf3ig',
    lang: 'ar',
    'Content-Type': 'application/json',
  };