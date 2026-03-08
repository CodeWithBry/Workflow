import { useEffect } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import AiHighlight from "./components/sections/AiHighlight";
import Analytics from "./components/sections/Analytics";
import HowItWorks from "./components/sections/HowItWorks";
import Testimonials from "./components/sections/Testimonials";
import CallToAction from "./components/sections/CallToAction";
import Footer from "./components/sections/Footer";
import "./styles.css"

/**
 * LandingPage is the single parent that owns all sections.
 * It also boots the global scroll-reveal observer so every
 * ".reveal" element across all children animates in.
 */
function LandingPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );

    // Observe after a short tick so section components have mounted
    const id = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    }, 50);

    return () => {
      clearTimeout(id);
      io.disconnect();
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <AiHighlight />
      <Analytics />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}

export default LandingPage;
