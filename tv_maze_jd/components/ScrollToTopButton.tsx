"use client"

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const isBrowser = () => typeof window !== "undefined";
  const [isVisible, setIsVisible] = useState(false);

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
        setIsVisible(true)
    }
    else{
        setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button className={`fixed bottom-0 right-0 bg-black rounded-s-full px-4 py-2 mr-6 mb-[71px] z-50 items-center text-xs flex gap-2 text-white cursor-pointer scrollToTopButton ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      Back to top
    </button>
  );
}
