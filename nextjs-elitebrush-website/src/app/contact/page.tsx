import Link from "next/link";
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
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
      
      <section className="mt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="mb-1">Email: info@elitebrush.co</p>
            <p className="mb-1">Phone: (555) 123-4567</p>
            <p>Address: 123 Painter's Lane, Artville, CA 90210</p>
          </div>
        </div>
      </section>
    </main>
  );
}