import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import ContactSection from "@/app/components/sections/ContactSection";
import SubpageBackground from "@/app/components/SubpageBackground";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen isolate">
      <SubpageBackground />
      <Navigation variant="subpage" />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
