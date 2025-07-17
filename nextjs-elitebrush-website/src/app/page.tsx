"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import BeforeAfterSlider from "./components/BeforeAfterSlider";


export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [currentReview, setCurrentReview] = useState(0);
  
  const testimonials = [
    {
      text: "Elite Brush is our go-to for painting and epoxy. Their work is clean, professional, and always on schedule. Clients are impressed, and so are we.",
      name: "Sunny Kullar",
      role: "Kullar Homes"
    },
    {
      text: "Gaurav and his team did an exceptional job. I was happy with his patience and detailed quote. They were flexible with my schedule and got the job done on a timely manner to get my project ready. I will definitely be working with Elitebrush Co moving forward. Thank guys!",
      name: "Mehtab Bal",
      role: "Residential Client"
    },
    {
      text: "The job you two did was an awesome job 5 out 5 I will get you two back to do some more painting very soon thank-you for the beautiful work you two did!",
      name: "Bonnie",
      role: "Residential Client"
    },
    {
      text: "Kavan did an incredible job repainting our exterior stucco. I was shocked by how quickly his team completed the job, and how accommodating they were throughout. If you’re looking for a trustworthy and highly professional painting company, I would recommend Elite Brush Co!",
      name: "Tori Fisher",
      role: "Residential Client"
    },
    {
      text: "We really appreciate the fast turnaround and quality work! Thank You!",
      name: "Cobra Auto",
      role: "Commercial Client"
    }
  ];



  const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;

    // Navigation functions
    const nextPage = () => {
      const maxPage = Math.ceil(testimonials.length / reviewsPerPage) - 1;
      setCurrentPage((prev) => (prev + 1) % (maxPage + 1));
    };

    const prevPage = () => {
      const maxPage = Math.ceil(testimonials.length / reviewsPerPage) - 1;
      setCurrentPage((prev) => (prev - 1 + maxPage + 1) % (maxPage + 1));
    };

    // Get current reviews to display
    const getCurrentReviews = () => {
      const startIndex = currentPage * reviewsPerPage;
      return testimonials.slice(startIndex, startIndex + reviewsPerPage);
    };

    // Optional: Auto-advance pages
    useEffect(() => {
      const maxPage = Math.ceil(testimonials.length / reviewsPerPage) - 1;
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % (maxPage + 1));
      }, 8000); // Longer interval since showing 3 reviews
      return () => clearInterval(interval);
    }, [testimonials.length]);






  // Navigation functions
  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Make the navbar visible when scrolling up or at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Video Background Container */}
      <div className="fixed inset-0">
        {/* Full-screen video background with position adjustment */}
        <div className="h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover w-full h-full"
          style={{ 
            transform: "scale(1.15) translateY(2%)", 
            transformOrigin: "center center"
          }}
        >
          <source src="/videos/background-vid-v4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
        
        {/* Optional overlay to darken the video */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <header 
        className={`fixed top-0 w-full z-20 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-10 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Area - No background */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="text-white text-2xl font-bold">
                  <Image
                    src="/images/elite-logo-nobg.png"
                    alt="Elite Brush Co. Logo"
                    width={140}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - enclosed in red rectangle with blur */}
            <nav className="hidden md:block">
              <div className="bg-black/60 backdrop-blur-lg rounded-full px-8 py-3 border border-gray-700/50">
                <ul className="flex items-center space-x-10 text-white font-medium">
                <li>
                    <Link href="#about" className="relative group py-2 px-1">
                      <span className="relative z-10 transition-colors group-hover:text-red-500">About</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </li>
                <li>
                    <Link href="#services" className="relative group py-2 px-1">
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Gallery</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </li>
                <li>
                    <Link href="#painting" className="relative group py-2 px-1">
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Painting</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                <li>
                    <Link href="#epoxy" className="relative group py-2 px-1">
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Epoxy</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="relative group py-2 px-1">
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Contact</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Mobile menu button - only visible on mobile */}
            <button 
              className="md:hidden text-white p-2 bg-black/60 backdrop-blur-sm rounded-md" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - only visible when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-sm mx-10 mt-2 rounded-md">
            <ul className="flex flex-col space-y-4 px-4 py-4 text-white font-medium">
              <li><Link href="#about" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link href="#services" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Gallery</Link></li>
              <li><Link href="#painting" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Painting</Link></li>
              <li><Link href="#epoxy" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Epoxy</Link></li>
              <li><Link href="#contact" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
            </ul>
          </div>
        )}
      </header>

      {/* Content Container - adjusted to account for fixed header */}
      {/* Content Container - adjusted to account for fixed header */}
    <div className="relative z-10 flex items-center justify-center md:justify-start min-h-screen pt-24 px-10 md:pl-20 md:pr-10">
      <div className="text-white max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">Elevate Your Space With Elite Precision</h1>
        <p className="text-xl md:text-2xl mb-8 text-center md:text-left">Northern BC's Premier Painting and Epoxy Flooring</p>
        <div className="flex justify-center md:justify-start">
          <Link href={"#contact"}>
            <button className="bg-red-500 text-white px-8 py-4 rounded-md text-lg font-bold transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:bg-white hover:text-red-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]">
              Transform Your Space Now!
            </button>
          </Link>
        </div>
      </div>
    </div>






      <section id="about" className="relative z-10 py-20">
  <div className="container mx-auto px-4 md:px-10">
    {/* Glass panel background */}
    <div className="absolute inset-0 bg-black/90"></div>
    
    <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
      {/* Left side - Company story */}
      <div className="text-white p-4 md:p-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">Who we are</h2>
        <p className="mb-4">Elite Brush Co. is revolutionizing the painting and epoxy industry in Northern BC through unmatched work ethic and craftsmanship.</p>
        <p className="mb-4">Based in Prince George, we bring our passion to our community, doing whatever it takes to exceed expectations and keep our customers smiling. Our commitment isn't just to painting walls—it's to transforming spaces and creating experiences that truly satisfy.</p>
        <div className="flex space-x-6">
          {/* Stats */}
          <div>
            <p className="text-red-500 text-3xl font-bold">50+</p>
            <p className="text-sm">Projects Completed</p>
          </div>
          <div>
            <p className="text-red-500 text-3xl font-bold">100%</p>
            <p className="text-sm">Client Satisfaction</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Images and testimonial */}
      <div className="relative">
        {/* Two images side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/gaurav-headshot.jpeg"
              alt="Elite Brush Co. Team 1"
              width={300}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/kavan-headshot.jpeg"
              alt="Elite Brush Co. Team 2"
              width={300}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Testimonial - below on mobile/iPad, overlapping on desktop */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl w-full md:w-4/5 lg:w-auto lg:max-w-s mt-6 md:mt-6 lg:mt-0 ml-auto mr-0 lg:absolute lg:-bottom-20 lg:-right-5">
          {/* 5-star rating */}
          <div className="flex mb-2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          </div>
          <p className="italic text-white text-sm md:text-base">
            "The job you two did was an awesome job 5 out 5 I will get you two back to do some more painting very soon thank-you for the beautiful work you two did!"
          </p>
          <p className="text-red-400 mt-2 text-sm md:text-base">— Bonnie, Happy Customer</p>
        </div>
      </div>
    </div>
  </div>
</section>


















<section 
  id="services" 
  className="relative z-10 py-20 bg-gradient-to-b from-black/90 to-red-500/90"
>
  <div className="container mx-auto px-6 md:px-10">
    <h2 className="text-4xl font-bold text-center text-white mb-16">Our Premium Services</h2>
    
    <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Painting Services Card */}
      <div className="group relative overflow-hidden rounded-xl h-80">
        {/* Background Image */}
        <Image
          src="/images/house-services.jpg"
          alt="Professional Painting Services"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-8 w-full transition-all duration-300 group-hover:pb-12">
          <h3 className="text-2xl font-bold text-white mb-2">Professional Painting</h3>
          <p className="text-white/80 mb-4">Interior, exterior, residential & commercial painting solutions.</p>
          <Link href="/paintings">
            <span className="text-red-500 flex items-center cursor-pointer">
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      
      {/* Epoxy Flooring Card */}
      <div className="group relative overflow-hidden rounded-xl h-80">
        {/* Background Image */}
        <Image
          src="/images/HubertMetallic.JPG"
          alt="Epoxy Flooring Services"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-8 w-full transition-all duration-300 group-hover:pb-12">
          <h3 className="text-2xl font-bold text-white mb-2">Epoxy Flooring</h3>
          <p className="text-white/80 mb-4">Durable, beautiful epoxy solutions for garages, basements & more.</p>
          <Link href="/epoxy">
            <span className="text-red-500 flex items-center cursor-pointer">
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>













<section id="painting" className="relative z-10 py-20 bg-gradient-to-b from-red-500/90 to-black/90">
  <div className="container mx-auto px-6 md:px-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Professional Painting Services</h2>
      <p className="text-xl text-white/80 max-w-3xl mx-auto">We transform spaces with premium paints and expert techniques for results that last.</p>
    </div>
    
    {/* Services Grid */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
      {/* Service 1 */}
      <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-white">
        <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Interior Painting</h3>
        <p className="text-white/80">Transform your living spaces with our premium interior painting services.</p>
      </div>
      
      {/* Service 2 */}
      <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-white">
        <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M8 12v8" />
            <path d="M16 12v8" />
            <path d="M4 8h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Exterior Painting</h3>
        <p className="text-white/80">Weather-resistant solutions that protect and beautify your home's exterior.</p>
      </div>
      
      {/* Service 3 */}
      <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-white">
        <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Commercial Painting</h3>
        <p className="text-white/80">Professional solutions for offices, retail spaces and commercial properties.</p>
      </div>
    </div>
    
    {/* Before/After Slider */}
    <div className="max-w-4xl mx-auto bg-black/20 p-6 rounded-xl mb-10">
      <h3 className="text-2xl font-bold text-white text-center mb-6">See The Difference</h3>
      <BeforeAfterSlider 
        afterImage="/images/house-after.JPG"
        beforeImage="/images/house-before.JPG"
      />
    </div>
    
    {/* Centered Explore Projects Link */}
    <div className="flex justify-center mt-12 mb-6">
  <Link href="/paintings">
    <span className="bg-black text-red-500 font-bold py-3 px-6 rounded-lg flex items-center cursor-pointer hover:bg-white transition-all transform hover:scale-105 shadow-lg text-lg">
      Explore Painting Projects
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </span>
  </Link>
</div>
  </div>
</section>

















<section id="epoxy" className="relative z-10 py-20 bg-gradient-to-b from-black/90 to-red-500/90">
  <div className="container mx-auto px-6 md:px-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Professional Epoxy Services</h2>
      <p className="text-xl text-white/80 max-w-3xl mx-auto">We craft epoxy floors unlike anything seen before in Northern BC, combining innovation, durability, and stunning design.</p>
    </div>
    
    {/* Services Grid */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Service 1 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 text-white overflow-hidden flex flex-col">
        <div className="h-56 w-full overflow-hidden">
          <img 
            src="/images/flakesystem.jpeg" 
            alt="Flake System" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Flake System</h3>
          <p className="text-white/80">Flake System Epoxy offers a high-performance, decorative flake flooring solution that delivers unmatched durability and a unique, vibrant finish.</p>
        </div>
      </div>
      
      {/* Service 2 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 text-white overflow-hidden flex flex-col">
        <div className="h-56 w-full overflow-hidden">
          <img 
            src="/images/one-colour-metallic.jpeg" 
            alt="Exterior Epoxy Application" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Solid Colour Metallic</h3>
          <p className="text-white/80">Our Solid Color Metallic Epoxy system features a seamless, high-gloss finish with metallic pigments that create a unique, swirling effect, offering both durability and a striking aesthetic for any space.</p>
        </div>
      </div>
      
      {/* Service 3 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 text-white overflow-hidden flex flex-col">
        <div className="h-56 w-full overflow-hidden">
          <img 
            src="/images/metallic.jpeg" 
            alt="Metallic Epoxy Flooring" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Metallic</h3>
          <p className="text-white/80">Our Multi-Color Metallic Epoxy system blends vibrant metallic pigments to create a dynamic, one-of-a-kind floor with depth and movement, offering both beauty and long-lasting durability.</p>
        </div>
      </div>
    </div>
  </div>
  {/* Centered Explore Projects Link */}
  {/* Centered Explore Projects Link */}
<div className="flex justify-center mt-12 mb-6">
  <Link href="/epoxy">
    <span className="bg-black text-red-500 font-bold py-3 px-6 rounded-lg flex items-center cursor-pointer hover:bg-white transition-all transform hover:scale-105 shadow-lg text-lg">
      Explore Epoxy Projects
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </span>
  </Link>
</div>
</section>





















<section id="testimonials" className="relative z-10 py-20 bg-gradient-to-b from-red-500/90 to-black/90">
  <div className="container mx-auto px-6 md:px-10">
    <h2 className="text-4xl font-bold text-center text-white mb-16">What Our Clients Say</h2>
    
    {/* Single Review Display */}
    <div className="max-w-4xl mx-auto relative">
      <div className="bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-white/10 relative min-h-[300px] flex flex-col justify-center">
        <div className="absolute -top-6 -left-6">
          <div className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>
        
        <div className="text-white mb-8 text-center">
          <p className="italic text-lg md:text-xl leading-relaxed">"{testimonials[currentReview].text}"</p>
        </div>
        
        <div className="text-center">
          <p className="text-white font-medium text-lg">{testimonials[currentReview].name}</p>
          <p className="text-white/60">{testimonials[currentReview].role}</p>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevReview}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextReview}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    {/* Dot Indicators */}
    <div className="flex justify-center mt-8 space-x-2">
      {testimonials.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentReview(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentReview === index 
              ? 'bg-red-500' 
              : 'bg-white/30 hover:bg-white/50'
          }`}
        />
      ))}
    </div>
    
    {/* Review Counter */}
    <div className="text-center mt-4">
      <p className="text-white/60 text-sm">
        {currentReview + 1} of {testimonials.length}
      </p>
    </div>
    
    {/* Reviews Summary */}
    <div className="flex flex-wrap justify-center items-center gap-10 mt-16">
      <div className="text-center">
        <div className="flex text-yellow-400 justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-white font-bold text-xl">5/5</p>
        <p className="text-white/60">Google Reviews</p>
      </div>
    </div>
  </div>
</section>






















<section id="contact" className="relative z-10 py-20 bg-gradient-to-b from-black/90 to-red-500/90">
  <div className="container mx-auto px-6 md:px-10">
    <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
      <h2 className="text-4xl font-bold text-center text-white mb-2">Transform Your Space</h2>
      <p className="text-xl text-center text-white/80 mb-10">Get a free, no-obligation quote for your project</p>
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form with Formspree */}
        <div>
          <form action="https://formspree.io/f/mwpvgwqq" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="John Smith"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="(555) 123-4567"
                required
              />
            </div>
            
            <div>
              <label htmlFor="service" className="block text-white text-sm font-medium mb-2">Service Needed</label>
              <select
                id="service"
                name="service"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="" className="bg-gray-800">Select a service</option>
                <option value="epoxy" className="bg-gray-800">Epoxy</option>
                <option value="painting" className="bg-gray-800">Painting</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Project Details</label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Get Your Free Quote
            </button>
          </form>
        </div>
        
        {/* Contact Information with Clickable Elements */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Address</p>
                  <a 
                    href="https://maps.google.com/?q=Prince+George,+BC" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Prince George, BC
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a 
                    href="tel:+12506405402" 
                    className="block text-white/70 hover:text-white transition-colors"
                  >
                    (250) 640-5402
                  </a>
                  <a 
                    href="tel:+17782810166" 
                    className="block text-white/70 hover:text-white transition-colors"
                  >
                    (778) 281-0166
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a 
                    href="mailto:elitebrushco@gmail.com" 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    elitebrushco@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-4">Our Service Hours</h4>
            <div className="grid grid-cols-2 gap-2 text-white/70">
              <p>Monday - Friday:</p>
              <p>8:00 AM - 8:00 PM</p>
              <p>Weekends:</p>
              <p>8:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




    </div>

  
  );
}