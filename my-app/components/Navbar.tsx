'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown, Newspaper, Trophy, Users, Clock, Archive, FileText } from 'lucide-react';

const navLinkStyle = {
  display: 'block',
  position: 'relative' as const,
  transition: '0.3s',
  fontSize: '14px',
  padding: '0 3px',
  fontFamily: '"Open Sans", sans-serif',
  cursor: 'pointer'
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if current path is news-related
  const isNewsActive = pathname?.startsWith('/news') || false;

  return (
    <>
      {/* Top Bar */}
      <div
        className="text-white overflow-hidden transition-all duration-500"
        style={{
          background: '#0F172A',
          color: 'rgba(255, 255, 255, 0.9)',
          height: '45px',
          fontSize: '14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative' as const,
          zIndex: 999
        }}
      >
        <div className="mx-auto px-4" style={{ maxWidth: '1160px' }}>
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <span className="hidden sm:inline">✉</span>
                <span className="text-xs sm:text-sm">rwua.haripur@rwua.org</span>
              </div>
              <div className="hidden sm:block cursor-pointer hover:text-white transition-colors">☎ 046-411109</div>
              <div className="hidden md:block cursor-pointer hover:text-white transition-colors">Sun-Fri 10am – 5pm</div>
            </div>
            <a
              href="tel:046-411109"
              className="bg-red-600 hover:bg-red-700 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-lg"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">046-411109</span>
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* Main Navbar - Hidden on mobile when sidebar is open */}
      <div
        className={`text-white sticky top-0 transition-all duration-300 ${isMobileMenuOpen ? 'lg:block hidden' : 'block'}`}
        style={{
          background: '#1E40AF',
          transition: 'all 0.3s',
          zIndex: 1000,
          padding: '12px 0',
          position: 'relative' as const,
          fontSize: '14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1160px' }}>
          <div className="flex items-center justify-between" style={{ minHeight: '60px' }}>
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link href="/" className="logo" style={{
                fontSize: '32px',
                margin: 0,
                padding: 0,
                lineHeight: 1,
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                position: 'relative' as const,
                zIndex: 1
              }}>
                <Image
                  src="https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg"
                  alt="RWUA Logo"
                  width={80}
                  height={80}
                  className="img-fluid rounded-full"
                  style={{
                    maxHeight: '80px',
                    maxWidth: '80px',
                    height: 'auto',
                    width: 'auto',
                    verticalAlign: 'middle',
                    borderStyle: 'none',
                    borderRadius: '50%',
                    objectFit: 'cover' as const
                  }}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link
                href="/"
                className={`nav-link font-medium transition-colors relative ${pathname === '/' ? 'active' : ''}`}
                style={navLinkStyle}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className={`nav-link font-medium transition-colors relative ${pathname === '/gallery' ? 'active' : ''}`}
                style={navLinkStyle}
              >
                Gallery
              </Link>
              <div className="relative group hover-precise">
                <Link
                  href="/news"
                  className={`nav-link font-medium transition-colors relative flex items-center px-2 py-1 ${isNewsActive ? 'active' : ''}`}
                  style={{ ...navLinkStyle, display: 'flex', alignItems: 'center' }}
                >
                  <span>News & Press</span>
                  <ChevronDown className="w-3 h-3 ml-1 transform group-hover:rotate-180 transition-transform" />
                </Link>

                {/* Animated Mega Menu */}
                <div className="mega-menu-container absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[1001]" style={{ width: '80vw', maxWidth: '1000px' }}>
                  <div className="mega-menu-arrow" style={{ left: '50%', transform: 'translateX(-50%) rotate(45deg)' }}></div>
                  <div className="mega-menu-content bg-white shadow-2xl overflow-hidden">
                    <div className="px-2">
                      {/* All News Section - Top */}
                      <div className="border-b border-gray-200 p-3">
                        <Link href="/news" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-all duration-200">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                            <Newspaper className="text-gray-600 w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-gray-800 font-bold text-sm">सम्पूर्ण समाचारहरू</div>
                            <div className="text-gray-500 text-xs">सबै समाचार र अपडेटहरू एकै ठाउँमा</div>
                          </div>
                          <div className="ml-auto">
                            <ChevronDown className="w-5 h-5 text-gray-400 transform rotate-[-90deg] group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      </div>

                      <div className="flex">
                        {/* News Section */}
                        <div className="mega-menu-section p-3 border-r border-gray-200 flex-1">
                          <div className="text-gray-500 uppercase font-semibold tracking-wide text-xs mb-2">समाचार</div>
                          <div className="space-y-1">
                            <Link href="/news/success-stories" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                                <Trophy className="text-gray-600 w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-xs">सफलताको कथा</div>
                                <div className="text-gray-500 text-xs">उपलब्धि र सफलताका कथाहरू</div>
                              </div>
                            </Link>
                            <Link href="/news/facebook" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                                <Users className="text-gray-600 w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-xs">फेस्बूक बाट ल्याइेका समाचार</div>
                                <div className="text-gray-500 text-xs">सामाजिक सञ्जालका समाचारहरू</div>
                              </div>
                            </Link>
                            <Link href="/news/latest-updates" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                                <Clock className="text-gray-600 w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-xs">ताजा अपडेट</div>
                                <div className="text-gray-500 text-xs">नवीनतम समाचार र जानकारी</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Archive Section */}
                        <div className="mega-menu-section p-3 flex-1">
                          <div className="text-gray-500 uppercase font-semibold tracking-wide text-xs mb-2">अभिलेख</div>
                          <div className="space-y-1">
                            <Link href="/news/archive" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                                <Archive className="text-gray-600 w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-xs">पुराना र नयाँ जानकारी</div>
                                <div className="text-gray-500 text-xs">सम्पूर्ण अभिलेख र डाटाबेस</div>
                              </div>
                            </Link>
                            <Link href="/about/registration" className="mega-menu-item group flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                                <FileText className="text-gray-600 w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-xs">दर्ता नं. ८/५०/५१</div>
                                <div className="text-gray-500 text-xs">संस्थाको दर्ता विवरण</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/success-story"
                className={`nav-link font-medium transition-colors relative ${pathname === '/success-story' ? 'active' : ''}`}
                style={navLinkStyle}
              >
                Success Story
              </Link>
              <Link
                href="/vacancy"
                className={`nav-link font-medium transition-colors relative ${pathname === '/vacancy' ? 'active' : ''}`}
                style={navLinkStyle}
              >
                All Vacancy
              </Link>
              <Link
                href="/contact"
                className={`nav-link font-medium transition-colors relative ${pathname === '/contact' ? 'active' : ''}`}
                style={navLinkStyle}
              >
                Contact Us
              </Link>
            </nav>

            {/* Download Button - Right */}
            <div className="hidden lg:flex flex-shrink-0">
              <Link
                href="/downloads"
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Downloads
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile Toggle Button - Always visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className={`fixed z-[9999] lg:hidden flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 top-[85px] right-4`}
        style={{
          background: '#1E40AF',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}
        aria-label="Toggle mobile menu"
      >
        <div className="relative">
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9000] lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar fixed top-0 right-0 h-full transition-all duration-300 ease-in-out z-[9500] lg:hidden ${isMobileMenuOpen ? 'w-64 sm:w-80' : 'w-0'
        }`} style={{
          background: '#1E40AF',
          boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.2)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
        {/* Sidebar Content */}
        <div className="flex flex-col h-full border-r border-gray-200 pt-16 pb-4 overflow-hidden">
          {/* Logo Section */}
          <div className="px-4 mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src="https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg"
                  alt="RWUA Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white font-bold text-xl">RWUA</span>
                <span className="text-white text-xs italic block">Organization</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-2" aria-label="Sidebar">
              {/* Main Navigation */}
              <div className="space-y-1">
                <Link
                  href="/"
                  className="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-800 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Home
                  </span>
                </Link>

                <Link
                  href="/gallery"
                  className="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-800 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Gallery
                  </span>
                </Link>

                {/* News & Press with Dropdown */}
                <div>
                  <button
                    className="w-full text-white hover:bg-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                    onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
                  >
                    <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                    <span className={`flex-1 text-left transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                      News & Press
                    </span>
                    <ChevronDown className={`w-4 h-4 transform transition-all duration-200 ${isNewsDropdownOpen ? 'rotate-180' : ''} ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
                  </button>

                  {/* Dropdown Items */}
                  <div className={`overflow-hidden transition-all duration-300 ${isNewsDropdownOpen && isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-8 mt-1 space-y-1">
                      <Link
                        href="/news"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-blue-700 transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="truncate">सम्पूर्ण समाचारहरू</span>
                      </Link>
                      <Link
                        href="/news/success-stories"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-blue-700 transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="truncate">सफलताको कथा</span>
                      </Link>
                      <Link
                        href="/news/facebook"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-blue-700 transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="truncate">फेस्बूक बाट ल्याइेका समाचार</span>
                      </Link>
                      <Link
                        href="/news/latest-updates"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-blue-700 transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="truncate">ताजा अपडेट</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href="/success-story"
                  className="text-white hover:bg-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Success Story
                  </span>
                </Link>

                <Link
                  href="/vacancy"
                  className="text-white hover:bg-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    All Vacancy
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="text-white hover:bg-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <Phone className="text-white mr-3 flex-shrink-0 h-6 w-6" />
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Contact Us
                  </span>
                </Link>

                <Link
                  href="/downloads"
                  className="text-white hover:bg-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="text-white mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Downloads
                  </span>
                </Link>
              </div>


            </nav>
          </div>


        </div>
      </div>
    </>
  );
}