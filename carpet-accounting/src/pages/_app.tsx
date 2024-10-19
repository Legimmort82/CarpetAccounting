import "@/styles/globals.css";
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
const queryClient = new QueryClient();

const myFont = localFont({ src: "../assets/fonts/Vazir-Light.ttf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
    </QueryClientProvider>
  );
}
