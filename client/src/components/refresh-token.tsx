'use client'

import { checkAndRefreshToken, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import jwt from "jsonwebtoken"
import authApiRequest from '@/apiRequests/auth'
import { useRouter } from 'next/navigation'

// Những page sau sẽ không check refresh token
const UNAUTHENTICATED_PATH = ['/login','/refresh-token','/logout']
export default function RefreshToken() {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(()=> {
    if(UNAUTHENTICATED_PATH.includes(pathname)) return

    let interval: any = null
    // const checkAndRefreshToken = async () => {
    //   // Không nên đưa logic lấy access và refresh token ra khỏi cacis fuction `checkAndRefreshToken`
    //   // Vì để mỗi lần mà checkAndRefresToken() đưuọc gọi thì chúng ta sẽ có một access và refresh token mới
    //   // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
    //   const accessToken = getAccessTokenFromLocalStorage()
    //   const refreshToken = getRefreshTokenFromLocalStorage()
    //   // Chưa đăng nhập thì cũng không cho chạy
    //   if(!accessToken || !refreshToken) return
    //   const decodedAccessToken = jwt.decode(accessToken) as {
    //     exp: number,
    //     iat: number
    //   }
    //   const decodedRefreshToken = jwt.decode(refreshToken) as {
    //     exp: number,
    //     iat: number
    //   }
    //   // Thời điểm hết hạn của token là tính theo epoch time (s)
    //   // Còn khi các bạn dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time(ms)
    //   const now = Math.round(new Date().getTime()/ 1000)
    //   // trường hợp refresh token hết hạn thì không xử lý nữa
    //   if(decodedRefreshToken.exp <= now) return
    //   //  Ví dụ access token của chúng ta có thời gian hết hạn là 10s
    //   // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ refresh token lại
    //   // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp -now
    //   // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
    //   if(decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat)/3) {
    //     // Gọi API refresh token
    //     try {
    //       const res = await authApiRequest.refreshToken()
    //       setAccessTokenToLocalStorage(res.payload.data.accessToken)
    //       setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
    //     } catch (error) {
    //       clearInterval(interval)
    //     }
    //   }
    // }
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval)
        router.push('/login')
      }
    })
    // Timeout interval phải bé hơn thời gian hết hạn của access token
    // Ví dụ thời gian hết hạn access token là 10s thì 1s mình sẽ cho check 1 lần
    const TIMEOUT = 1000
    interval = setInterval(() =>checkAndRefreshToken ({
      onError: () => {
        clearInterval(interval)
        router.push('/login')
      }
    }), 1000)
    return() => {
      clearInterval(interval)
    }
  },[pathname,router])
  return (null)
}
