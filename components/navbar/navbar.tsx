import Image from "next/image";
import Link from "next/link";
import Navlinks from "@/components/navbar/navlinks";

const Navbar = () => {
  return (
   <div className='fixed top-0 w-full bg-white shadow-sm z-20'>
     <div className='max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4'>
        <Link href="/">
            <Image src="/logo.webp" alt="Logo" width={120} height={40} priority />
        </Link>
        <Navlinks />
     </div>
   </div>
  )
}

export default Navbar