import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

let BASE_URL;

if(import.meta.env.DEV){
  BASE_URL="http://localhost:3000"
}else{
  BASE_URL = import.meta.env.VITE_AUTH_API_URL
}

export const authClient = createAuthClient({
    baseURL: BASE_URL,
})