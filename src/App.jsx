import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  // State to control the dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // State to trigger welcome animation
  const [animateText, setAnimateText] = useState(false);

  // State to trigger logo animation
  const [animateLogo, setAnimateLogo] = useState(false);

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  // Animate text after component mounts
  useEffect(() => {
    setAnimateText(true);
    setAnimateLogo(true); // Start logo animation on mount

    // Event listener for clicking outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Function to split the text into individual letters wrapped in span
  const renderJumpingText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-transform duration-500 ${animateText ? 'jump' : ''}`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
          background: `linear-gradient(to right, 
            red, 
            orange, 
            yellow, 
            green, 
            blue, 
            indigo, 
            violet)`, // Gradient background
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent', // Make text transparent to show gradient
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="relative min-h-screen transition-colors duration-1000" style={{ background: 'linear-gradient(to right, #f3ec78, #af4261)' }}>
      <div className='text-white font-bold text-3xl flex justify-between p-4'>
        <div>
          <img 
            src="https://files.logoscdn.com/v1/assets/14904106/optimized?share=OdlwiB5OxhoI1yI0" 
            width={130} 
            height={130} 
            alt="img" 
            className={`transition-transform duration-500 ${animateLogo ? 'logo-jump' : ''}`} // Apply logo animation
            style={{
              display: 'block', // Center the logo properly
              margin: '0 auto',
            }}
          />
        </div>
        <div className='relative' ref={dropdownRef}>
          <button 
            className='border rounded-2xl px-6 py-2 bg-purple-500 text-white hover:bg-purple-700 transition duration-300'
            onClick={toggleDropdown}  // Toggle dropdown on click
          >
            Account
            <span className={`ml-2 transition-transform ${dropdownVisible ? 'rotate-180' : 'rotate-0'}`}>▼</span> {/* Arrow icon */}
          </button>
          
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg transform transition-all duration-500 ease-in-out scale-y-100 origin-top" style={{ animation: 'slideDown 0.5s ease forwards' }}>
              <ul className="py-1 text-black">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <span className="mr-2">🔑</span>Sign In
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <span className="mr-2">👤</span>Login
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center items-center' style={{ minHeight: 'calc(100vh - 200px)' }}>
        <h1 className="text-6xl font-bold italic">
          {renderJumpingText("Welcome to Debug")}
        </h1>
      </div>

      <style jsx>{`
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .jump {
          animation: jump 0.5s ease-in-out infinite; /* Continuous jumping */
        }

        @keyframes logo-jump {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1); /* Scale effect */
          }
        }

        .logo-jump {
          animation: logo-jump 0.5s ease-in-out infinite; /* Continuous scaling */
        }

        @keyframes slideDown {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
