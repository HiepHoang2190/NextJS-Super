"use client"

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useEffect } from "react"

function RefreshToken() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams.get("refreshToken")
  const redirectPathname = searchParams.get("redirect")
  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname || "/")
        },
      })
    } else {
      router.push("/")
    }
  }, [router, refreshTokenFromUrl, redirectPathname])
  return <div>Refresh Token...</div>
}
export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <RefreshToken></RefreshToken>
    </Suspense>
  );
}
