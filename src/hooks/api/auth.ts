import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInPayload, SignUpPayload } from "../../types/api/auth";
import { signIn, getIsMe, signUp } from "../../api/auth";
import store from "store2";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: SignInPayload) => signIn(payload),
    onSuccess: (data) => {
      store.set("token", data?.data);
    },
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
    queryKey: ["useGetIsMe"],
    queryFn: () => getIsMe(),
    select: (response) => response,
    enabled: isSignInSuccess,
  });
};
