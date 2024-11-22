import { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight < documentHeight - 50) {
        setIsVisible(false); // Sayfa yukarı kayarsa footer'ı gizle
      } else {
        setIsVisible(true); // Sayfa en alta gelirse footer'ı göster
      }
    };

    window.addEventListener("scroll", handleScroll);

   
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? "visible" : "hidden"}`}>
      <div className="footer-content">
        <p>&copy; 2024 Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
