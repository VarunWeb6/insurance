import React from 'react';

const Header = ({ handleLogout }) => {
  return (
    <header className="sticky top-0 bg-white shadow-xs border transition-all z-36 py-2 px-2 lg:px-10 ">
      <nav className="flex items-center space-x-4 flex-wrap justify-center items-end">
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
        <div className="flex pl-32">
        <a href="#" className="w-8 h-8">
          <img src="/twitter_logo.png" alt="Twitter" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="/facebook.png" alt="Facebook" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="/yt_logo.png" alt="YouTube" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="/linkedIn.png" alt="LinkedIn" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-8 h-8">
          <img src="/google+.png" alt="Google Plus" className="w-full h-full object-contain" />
        </a>
      </div>
      </nav>

      {/* Add your logos here */}
      
    </header>
  );
};

export default Header;
