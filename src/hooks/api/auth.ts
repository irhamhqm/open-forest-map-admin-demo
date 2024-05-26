import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInPayload, SignUpPayload, ForgotPasswordPayload, ResetPasswordPayload } from "../../types/api/auth";
import { signIn, getIsMe, signUp, forgotPassword, resetPassword } from "../../api/auth";

export const useSignIn = () => {
    return useMutation({
      // mutationKey: ["login"],
      mutationFn: (payload: SignInPayload) => signIn(payload),
    });
  };

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (payload: SignUpPayload) => signUp(payload),
  });
};

export const useGetIsMe = (isSignInSuccess: boolean, token: string) => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();

  return useQuery({
    queryKey: ["useGetIsMe", token, currentTime],
    queryFn: () => getIsMe(),
    select: (response) => response,
    enabled: isSignInSuccess,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
};