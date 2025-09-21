import { Metadata } from "next"
import HeaderSection from "@/components/header-section"
import Image from "next/image"
import {IoEyeOutline,IoLocateOutline} from "react-icons/io5"

export const metadata: Metadata = {
    title: "About Us - Company",
    description: "Learn more about our company, mission, and values.",
}

const AboutPage = () => {
  return (
    <div>
      <HeaderSection title="About Us" subtitle="Learn more about our company" />
      <div className="max-w-screen-xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <Image
                src="/about-image.jpg"
                alt="About Image"
                width={650}
                height={570}
                className="rounded-lg object-cover"
            />
            <div>
                <h1 className="text-5xl font-bold mb-4 text-gray-900">Who We Are</h1>
                <p className="text-gray-700 py-7">
                    We are a leading company in our industry, committed to providing quality services to our clients Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <ul className="list-item space-y-6 pt-8">
                    <li className="flex gap-5">
                        <div className="flex-none mt-1">
                            <IoEyeOutline className="size-7"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                            <p className="text-gray-600">To deliver exceptional value and exceed our clients' expectations through innovative solutions and dedicated service.</p>
                        </div>
                    </li>
                    <li className="flex gap-5">
                        <div className="flex-none mt-1">
                            <IoLocateOutline className="size-7"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam qui alias vitae rerum repudiandae adipisci reprehenderit ea! Est, ducimus!</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage