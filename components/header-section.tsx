import Image from "next/image";
import { title } from "process";

const HeaderSection= ({
    title, subtitle
}: {
    title: string; subtitle: string;
}) => {
  return (
    <header className="relative h-80 text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image 
                src="/hero.jpg"
                alt="Header Image"
                fill
                className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-100 text-center pt-14">
            <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
            <p className="text-xl text-gray-300">{subtitle}</p>
        </div>
    </header>
  )
}

export default HeaderSection