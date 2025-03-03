import Link from "next/link";
import Image from 'next/image';

export default function AboutPage() {
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
          href="/contact" 
          className="px-5 py-2 text-white rounded-md transition-all 
                    hover:text-red-500 hover:text-shadow-lg">
          Contact
        </Link>
      </div>
      
      <section className="mt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Story</h1>

        {/* Image Section */}
        <div className="flex justify-between gap-4 mb-8">
          <div className="flex-1 text-center">
            <Image 
              src="/images/gaurav-headshot.jpeg" 
              alt="Gaurav's Headshot" 
              width={500} 
              height={300} 
              className="object-cover rounded-sm"
            />
            <p className="mt-2 text-lg font-semibold text-white">Gaurav Singh Bains</p> {/* Name under the first image */}
          </div>
          <div className="flex-1 text-center">
            <Image 
              src="/images/kavan-headshot.jpeg" 
              alt="Kavan's Headshot" 
              width={500} 
              height={300} 
              className="object-cover rounded-sm"
            />
            <p className="mt-2 text-lg font-semibold text-white">Kavan Singh Varaich</p> {/* Name under the second image */}
          </div>
        </div>

        <div className="max-w-2xl mx-auto rounded-lg shadow-md p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Who We Are</h2>
            <p className="mb-6 text-white text-lg leading-relaxed">
              At EliteBrush Co, we&apos;re passionate young entrepreneurs committed to transforming the painting and epoxy industry in Northern BC with superior craftsmanship and innovation.
            </p>
            <p className="mb-6 text-white text-lg leading-relaxed">
              What sets us apart is our dedication to excellence. We use only premium materials and state-of-the-art equipment to deliver results that exceed expectations.
            </p>
            <p className="mb-6 text-white text-lg leading-relaxed">
              Every project is an opportunity for us to create something extraordinary. We bring creativity and precision to every job, unlocking the true potential of your space.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Our goal is to build Northern BC&apos;s premier painting and epoxy brand, one transformation at a time. Let us elevate your space with our passion, skill, and artistry.
            </p>
          </div>
    </div>

      </section>
    </main>
  );
}