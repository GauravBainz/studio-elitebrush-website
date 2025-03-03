import Link from "next/link";
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-0">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <span className="text-white hover:text-red-500 transition-all">
            EliteBrush Co.
          </span>
        </Link>
      </div>

      <div className="absolute top-4 right-4">
        <Link 
          href="/about" 
          className="px-5 py-2 text-white rounded-md transition-all 
                    hover:text-red-500 hover:text-shadow-lg">
          Our Story
        </Link>
      </div>
      
      <section className="mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-10">
          <form 
            action="https://formspree.io/f/mwpvgwqq"  // Replace this with your Formspree endpoint
            method="POST"
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"  // Include the name attribute for Formspree
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"  // Include the name attribute for Formspree
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"  // Include the name attribute for Formspree
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                id="service"
                name="service"  // Include the name attribute for Formspree
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                required
              >
                <option value="epoxy">Epoxy</option>
                <option value="painting">Painting</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"  // Include the name attribute for Formspree
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 hover:shadow-lg hover:shadow-red-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-black">Contact Information</h3>
            <p className="mb-1 text-black">
              <a href="mailto:elitebrushco@gmail.com" className="hover:text-red-500">
                Email: elitebrushco@gmail.com
              </a>
            </p>
            <p className="mb-1 text-black">
              <a href="tel:+12506405402" className="hover:text-red-500">
                Phone: (250) 640-5402
              </a>
            </p>
            <p className="text-black">
              <a
                href="https://www.google.com/maps?q=Prince+George,+BC"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500"
              >
                Prince George / Northern British Columbia
              </a>
            </p>
          </div>


        </div>
      </section>
    </main>
  );
}
