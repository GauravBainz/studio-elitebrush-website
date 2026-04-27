import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-10 px-6 text-center border-t border-white/10 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com/profile.php?id=61568642015108"
            className="text-white/70 hover:text-red-500 transition-colors"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/elitebrushco/"
            className="text-white/70 hover:text-red-500 transition-colors"
            aria-label="Instagram"
          >
            <Image
              src="/images/instagram-logo.jpg"
              alt="Instagram"
              width={28}
              height={28}
              className="object-contain"
            />
          </a>
        </div>
        <p className="text-white/70">© {new Date().getFullYear()} EliteBrush Co. All rights reserved.</p>
      </div>
    </footer>
  );
}
