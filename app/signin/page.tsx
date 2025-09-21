import { Metadata } from "next"
import {LoginGoogleButton} from "@/components/login-button"

export const metadata: Metadata = {
    title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center">
        <div className="bg-white w-96 mx-auto p-8 rounded-sm shadow-lg">
            <h1 className="text-4xl font-bold mb-1 ">Sign In</h1>
            <p className="font-medium text-gray-600">Please sign in to your account</p>
            <div className="py-4 text-center">
                <LoginGoogleButton />
            </div>
        </div>
    </div>
  )
}

export default SignInPage