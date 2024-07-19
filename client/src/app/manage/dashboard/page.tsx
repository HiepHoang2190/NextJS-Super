import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import React from 'react'

export default async function Dashboard() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!
  let name = ''

  try {
    const result = await accountApiRequest.sme(accessToken)
    name = result.payload.data.name
    // console.log(result)
  } catch (error : any) {
    // console.log(JSON.stringify(error))
    // console.log(error)
    // console.log(error.digest?.includes('NEXT_REDIRECT')) 
    if(error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
  return (
    <div>Dashboard {name}</div>
  )
}
