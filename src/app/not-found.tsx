import ErrorPage from "@/app/error";

export default function NotFound() {
  return <ErrorPage error={{ message: "404" }} />
}

