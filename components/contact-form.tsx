"use client"
import { ContactMessage } from '@/lib/actions';
import { useFormState } from 'react-dom';   // ✅ ganti ini
import clsx from 'clsx';

const ContactForm = () => {
  const [state, fromAction, isPending] = useFormState(
    async (_prevState: any, formData: FormData) => {
      return await ContactMessage(formData);
    },
    null
  );

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      {state?.message && (
        <div
          className="pb-4 mb-4 text-sm text-gray-700 border border-gray-200 rounded-lg bg-green-50"
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      )}
      <form action={fromAction}>
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"  // ✅ wajib ada supaya FormData bisa ambil value
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Name"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"  // ✅ tambahin
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Email"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"  // ✅ tambahin
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Subject"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.subject}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"  // ✅ tambahin
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Message"
              rows={4}
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.message}</p>
            </div>
          </div>
        </div>

        <button
          className={clsx(
            "px-10 py-4 text-center w-full font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg cursor-pointer",
            { 'opacity-50 cursor-progress animate-pulse': isPending }
          )}
           type="submit"
           disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
