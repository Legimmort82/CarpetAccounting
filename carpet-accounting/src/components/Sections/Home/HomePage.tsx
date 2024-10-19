import Layout from "@/components/Layout/Layout";
import carpetImg from "@/assets/carpet.jpg";
import Image from "next/image";
import { useEffect } from "react";
import { apiClient } from "@/api/instance";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter()
    useEffect(() => {
      const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  
      if (!accessToken) {
        router.push("/auth/login"); // no token, redirect to login
        return;
      }
  
      // Verify the token with the API
      apiClient
        .get("/accounts/token-verify", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          // Token is valid
          console.log(res);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem("accessToken"); // remove invalid token
          router.push("/auth/login");
        });
    }, [router]);

  return (
    <>
      <Layout>
        <section className="flex flex-col gap-10 h-screen bg-white w-full overflow-auto justify-center items-center lg:mt-10">
          <div className="flex flex-col items-center justify-center gap-y-4 md:text-[30px] text-[22px] font-extrabold">
            <h1 className="text-[#050A30]">آقای جعفری خوش آمدید</h1>
            <h1 className="text-[#081a9e]">Welcome Mr.Jafari</h1>
          </div>
          <Image
            className="max-w-[1000px] w-[80%]"
            src={carpetImg}
            alt="carpet"
          />
        </section>
      </Layout>
    </>
  );
}

export default HomePage;
