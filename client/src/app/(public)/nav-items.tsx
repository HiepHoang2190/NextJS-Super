"use client";

import { useAppContext } from "@/components/app-provider"
import { getAccessTokenFromLocalStorage } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

const menuItems = [
 
  {
    title: "Món ăn",
    href: "/menu", // authRequired = undefined nghĩa là đăng nhập hay chưa đều hiển thị
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    authRequired: true,
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false, // Khi false nghĩa là chưa đăng nhập thì sẽ hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true, // True nghĩa là đăng nhập rồi mới hiển thị
  },
];

//  Server: Món ăn, Đăng nhập. Do server không biết trạng thái đăng nhập của user
//  Client: Đầu tiên client sẽ hiển thị là món ăn , đăng nhập. Nhưng ngay sau đó thì client render ra là  Món ăn, Đơn hàng , Quản lý do đã check được trạng thái đăng nhập

export default function NavItems({ className }: { className?: string }) {
  // const [isAuth, setIsAuth] = useState(false)
  // useEffect (() => {
  //   setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
  // },[])
  const { isAuth } = useAppContext()
  // console.log(isAuth)
  return menuItems.map((item) => {
    if (
      (item.authRequired === false && isAuth) ||
      (item.authRequired === true && !isAuth)
    )
      return null

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
