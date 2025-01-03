import React from 'react';

const Header = ({ handleLogout }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <nav className="flex items-center space-x-4">
        <a className="hover:underline px-2 text-[.7rem] text-[rgb(89,167,222)]" href="https://tempcover.motorcertificate.com/who-we-cover" rel="noopener noreferrer">
          Who we cover - eligibility
        </a>
        <a className="hover:underline px-2 text-[.7rem] text-[rgb(89,167,222)]" href="https://tempcover.motorcertificate.com/why-choose-tempcover" rel="noopener noreferrer">
          Why choose Tempcover?
        </a>
        <div 
          className="px-2 text-[.8rem] text-[rgb(89,167,222)] border-r border-[rgb(89,167,222)] cursor-pointer" 
          onClick={handleLogout} // Call handleLogout passed from parent
        >
          Logout
        </div>
        <a className="hover:underline px-2 text-[.8rem] text-[rgb(89,167,222)]" href="https://tempcover.motorcertificate.com/frequently-asked-questions" rel="noopener noreferrer">
          FAQ's
        </a>
      </nav>

      {/* Add your logos here */}
      <div className="flex space-x-4">
        <a href="#" className="w-8 h-8">
          <img src="../public/twitter_logo.png" alt="Twitter" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="../public/facebook.png" alt="Facebook" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="../public/yt_logo.png" alt="YouTube" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="../public/linkedIn.png" alt="LinkedIn" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="../public/google+.png" alt="Google Plus" className="w-full h-full object-contain" />
        </a>
      </div>
    </header>
  );
};

export default Header;
