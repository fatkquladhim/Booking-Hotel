import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative text-white h-screen overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="/hero.jpg"
                alt="Hero Background"
                fill
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">Welcome to Our Hotel In <span className="text-yellow-500">Paradise</span></h1>
            <p className="text-xl text-gray-300 mb-8"> Get Special Offers just for you today!</p>
            <div className="flex gap-5">
                <Link href="/room" className="bg-yellow-400 text-white hover:bg-amber-500 font-semibold py-2 px-6 md:px-10 text-lg hover:scale-105 hover:shadow-lg transition-shadow duration-300">Book now</Link>
                <Link href="/room" className="bg-transparent border border-yellow-400 text-white hover:bg-amber-500 font-semibold py-2 px-6 md:px-10 text-lg hover:scale-105 hover:shadow-lg transition-shadow duration-300">Contact Us</Link>
            </div>
        </div>
    </div>
  )
}

export default Hero