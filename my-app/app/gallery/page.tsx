'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    alt: 'Women empowerment workshop',
    title: 'Community Workshop',
    category: 'Education'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800',
    alt: 'Rural development project',
    title: 'Rural Development',
    category: 'Infrastructure'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    alt: 'Healthcare initiative',
    title: 'Healthcare Program',
    category: 'Health'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    alt: 'Agricultural training',
    title: 'Agricultural Training',
    category: 'Agriculture'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    alt: 'Skills development',
    title: 'Skills Development',
    category: 'Education'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    alt: 'Community meeting',
    title: 'Community Meeting',
    category: 'Community'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=800',
    alt: 'Skill training session',
    title: 'Skill Training',
    category: 'Education'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&q=80&w=800',
    alt: 'Education program',
    title: 'Education Programs',
    category: 'Education'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    alt: 'Agricultural support',
    title: 'Agricultural Support',
    category: 'Agriculture'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    alt: 'Microfinance program',
    title: 'Microfinance Program',
    category: 'Finance'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    alt: 'Cooperative formation',
    title: 'Cooperative Formation',
    category: 'Community'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    alt: 'Leadership training',
    title: 'Leadership Training',
    category: 'Education'
  }
];

const categories = ['All', 'Education', 'Health', 'Infrastructure', 'Agriculture', 'Community', 'Finance'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  // Function to open modal and block background scroll
  const openModal = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';
  };

  // Function to close modal and restore background scroll
  const closeModal = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setSelectedImage(null);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-orange-500"></div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">
                Our Impact
              </span>
              <div className="w-12 h-[2px] bg-orange-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-700 leading-tight mb-6">
              Gallery of <span className="text-orange-500 italic font-serif">Change</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Witness the transformative journey of rural communities through our comprehensive programs and initiatives.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${selectedCategory === category
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-orange-500 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-lg font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Selected Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}