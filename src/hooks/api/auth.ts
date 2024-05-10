import { useMutation } from "@tanstack/react-query";
import { SignInPayload } from "../../types/api/auth";
import { signIn } from "../../api/auth";


export const useSignIn = () => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: (payload: SignInPayload) => signIn(payload),
    });
  };