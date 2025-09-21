import { Metadata } from 'next';
import HeaderSection from '@/components/header-section';
import {
    IoMailOutline, IoLocationOutline, IoCallOutline
} from 'react-icons/io5';
import ContactForm from '@/components/contact-form';


export const metadata: Metadata = {
  title: 'Contact',
}

const ContactPage = () => {
  return (
    <div>
        <HeaderSection title="Contact" subtitle="Get in touch with us" />
        <div className="max-w-screen-xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2  gap-8">
                <div>
                    <h1 className='text-lg text-gray-700 mb-3'>Contact Us</h1>
                    <h1 className='text-5xl font-semibold text-gray-900 mb-4'>We'd love to hear from you!</h1>
                    <p className='text-gray-600 py-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Please fill out the form below to get in touch with us.</p>
                    <ul className='list-item space-y-6 pt-8'>
                        <li className='flex gap-5'>
                            <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                <IoMailOutline className='size-7' />
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-semibold mb-1'>Email:</h4>
                                <p>example@example.com</p>
                            </div>
                        </li>

                        <li className='flex gap-5'>
                            <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                <IoCallOutline className='size-7' />
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-semibold mb-1'>Phone Number:</h4>
                                <p>(123) 456-7890</p>
                            </div>
                        </li>

                        <li className='flex gap-5'>
                            <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                <IoLocationOutline className='size-7' />
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-semibold mb-1'>Address:</h4>
                                <p>Turen Malang Jawa Timur Indonesia</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <ContactForm />
            </div>
        </div>
    </div>
  ) 
}

export default ContactPage