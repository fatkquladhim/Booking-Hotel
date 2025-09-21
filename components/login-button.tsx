import { signIn } from '@/auth';
import {FaG} from 'react-icons/fa6';

export const LoginGoogleButton = () => {
  return (
    <form action={async() => {"use server"; await signIn("google");}}>
      <button className='flex items-center justify-center gap-2 text-white bg-blue-700 w-full font-medium px-6 py-3 text-base rounded-sm hover:bg-blue-600 cursor-pointer'>
          <FaG className='size-6'/>
          Sign In With Google
      </button>
    </form>
  )
}
