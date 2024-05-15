import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInPayload, SignUpPayload } from "../../types/api/auth";
import { signIn, getIsMe, signUp } from "../../api/auth";
import axios, { AxiosError } from 'axios';

export const useSignIn = () => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: (payload: SignInPayload) => signIn(payload),
      onError: (error: AxiosError | Error) => {
        if(!('isAxiosError' in error)) {
          console.log('Non-Axios error:', error.message);
          return;
        }

        if(error.response) {
          console.error('Error response:', error.response.data);
        } else {
          console.error('Network error:', error.message);
        }
      },
    });
  };

  export const useSignUp = () => {
    return useMutation({
      // mutationKey: ["signup"],
      mutationFn: (payload: SignUpPayload) => signUp(payload),
    });
  };

export const useGetIsMe = (isSignInSuccess: boolean, token: string) => {
  return useQuery({
    queryKey:["useGetIsMe" + token],
    queryFn: () => getIsMe(),
    select: (response) => response,
    enabled: isSignInSuccess,
  });
};