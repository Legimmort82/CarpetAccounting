import Layout from "@/components/Layout/Layout"
import carpetImg from "@/assets/carpet.jpg"
import Image from "next/image"

function HomePage() {
  return (
    <>
      <Layout>
        <section className="h-screen bg-white w-full overflow-auto flex justify-center items-center">
          <Image src={carpetImg} alt="carpet"/>
        </section>
      </Layout>
    </>
  )
}

export default HomePage