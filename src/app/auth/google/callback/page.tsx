"use client"

import { useEffect , useState} from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function GoogleCallback() {
  const router = useRouter()
  const {setAuthState} = useAuth()
  const {toast} = useToast()
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) return; // Prevent multiple executions
    setIsProcessing(true);

    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const code = urlParams.get("code");

    if (error) {
      console.error("Google OAuth error:", error);
      toast({
        title: "Error",
        description: `Google sign-in failed: ${error}`,
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (code) {
      console.log("Google OAuth Code:", code);

      // fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`, {
      fetch("https://jomnumtech-api.shinoshike.studio/auth/google",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
          .then(async (response) => {
            const text = await response.text(); // Read response as text
            console.log("Google Login Response:", text); // Log raw response
            try {
              return JSON.parse(text); // Try parsing JSON
            } catch (e: unknown) {
              if (e instanceof SyntaxError) {
                console.error("JSON parsing error:", e.message);
                throw new Error("Invalid JSON response from server");
              }
              throw new Error("Unexpected error occurred");
            }

          })
          .then((data) => {
            console.log("Google Login Response:", data);

            if (data.user && data.access_token && data.refresh_token) { // ✅ Check correct response structure
              setAuthState(data.user, {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                token_type: data.token_type
              });

              toast({
                title: "Success!",
                description: "You have been signed in with Google.",
              });

              router.push("/profile");
            } else {
              throw new Error("Invalid response format from server");  // ✅ More specific error handling
            }
          })

          .catch((error) => {
            console.error("Error during Google sign-in:", error);
            toast({
              title: "Error",
              description: "Failed to sign in with Google. Please try again.",
              variant: "destructive",
            });
            router.push("/");
          });

    }
  }, [router, setAuthState, toast]);
}