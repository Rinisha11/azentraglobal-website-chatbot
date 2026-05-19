import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Changed Link to useNavigate

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // Show button only after scrolling down 100px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to handle scrolling to the form
  const handleRegisterClick = () => {
    // 1. Try to find the element with id="registration-form"
    const formSection = document.getElementById("registration-form");

    if (formSection) {
      // 2. If found (we are on the correct page), scroll to it
      formSection.scrollIntoView({ behavior: "smooth" });
      setIsExpanded(false); // Close the menu
    } else {
      // 3. If not found (we are on Home/About), navigate to the training page
      // Change "/training" to whatever your route path is for the Training page
      navigate("/training"); 
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-2 mb-2"
          >
            {/* Option 1: WhatsApp */}
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-full pr-6 pl-4 h-12 flex items-center gap-2 justify-end"
            >
              <a 
                href="https://wa.me/918925553350?text=Hi,%20I'm%20interested%20in%20Training" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="font-semibold">Ask a Doubt</span>
                <MessageCircle className="h-5 w-5 fill-current" />
              </a>
            </Button>

            {/* Option 2: Register / Book - UPDATED */}
            <Button
              onClick={handleRegisterClick}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full pr-6 pl-4 h-12 flex items-center gap-2 justify-end cursor-pointer"
            >
              <span className="font-semibold">Register Now</span>
              <Calendar className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
                size="icon"
                className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
                    isExpanded ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
                >
              {isExpanded ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <div className="relative">
                  {/* The pulsing ring effect */}
                  <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30"></span>
                  <Calendar className="h-6 w-6 text-white relative z-10" />
                </div>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};