import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInPayload, SignUpPayload } from "../../types/api/auth";
import { signIn, getIsMe, signUp } from "../../api/auth";


export const useSignIn = () => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: (payload: SignInPayload) => signIn(payload),
    });
  };

  export const useSignUp = () => {
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: (payload: SignUpPayload) => signUp(payload),
    });
  };

export const useGetIsMe = (isSignInSuccess: boolean) => {
  return useQuery({
    queryKey:["useGetIsMe"],
    queryFn: () => getIsMe(),
    select: (response) => response,
    enabled: isSignInSuccess
  });
};