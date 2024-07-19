import accountApiRequest from "@/apiRequests/account"
import { AccountResType } from "@/schemaValidations/account.schema";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAccountMe = (
  // onSuccess?: (data: AccountResType) => void
) => {
  return useQuery({
    queryKey: ["account-me"],
    // queryFn: () =>
    //   accountApiRequest.me().then((res) => {
    //     console.log(res)
    //     if(onSuccess) onSuccess(res.payload)
    //     return res
    //   }),
    queryFn: accountApiRequest.me
      
  });
};


export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe
  })
}