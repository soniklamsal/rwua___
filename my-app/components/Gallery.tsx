'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "ग्रामिण नारी उत्थान संघको २९ औं साधारण सभा",
    description: "ग्रामीण नारी उत्थान संघको २९ औं साधारण सभामा सहभागी सदस्यहरूको तस्बिर र कार्यक्रमका मुख्य बिन्दुहरू।",
    image: "https://rwua.com.np/wp-content/uploads/2021/10/1.jpg"
  },
  {
    id: 2,
    title: "वियोन द फिनिस लाईन समावेशी तथा दिगो ग्रामीण खानेपानी सुविधा कार्याक्रम",
    description: "ग्रामीण क्षेत्रमा खानेपानी सुविधा विस्तार गर्ने कार्यक्रमका तस्बिरहरू र सामुदायिक सहभागिता।",
    image: "https://rwua.com.np/wp-content/uploads/2021/04/11.jpg"
  },
  {
    id: 3,
    title: "न्यानो कम्मल बितरण",
    description: "जाडोको मौसममा आवश्यकतामा परेका परिवारहरूलाई न्यानो कम्बल वितरण कार्यक्रम।",
    image: "https://rwua.com.np/wp-content/uploads/2020/01/13.jpg"
  },
  {
    id: 4,
    title: "LCRC र स्थानीय सरोकारवालाहरु लाइ स्थानीय तहमा बाल भेला सञ्चालन सम्बन्धि दुई दिने तालिम",
    description: "बाल अधिकार र बाल संरक्षणका विषयमा स्थानीय तहका प्रतिनिधिहरूलाई दिइएको तालिम कार्यक्रम।",
    image: "https://rwua.com.np/wp-content/uploads/2025/02/%E0%A4%AC%E0%A4%B2%E0%A5%8D%E0%A4%AD%E0%A5%87%E0%A4%B2%E0%A4%BE.jpg"
  }
];

export default function Gallery() {

  return (
    <div className="gallery-wrapper">
      {/* Breadcrumb Section */}
      <section className="py-4 px-0 pt-[15px] relative z-10" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-end">
            <nav className="flex items-center text-sm text-gray-600 font-sans">
              <Link href="/" className="hover:text-purple-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                मुख्य पृष्ठ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Gallery</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-4 px-2" style={{ backgroundColor: '#ffffff', maxHeight: '90vh', overflow: 'hidden' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">फोटो ग्यालरी</h1>
            <p className="text-sm text-gray-600">हाम्रा गतिविधिहरू र कार्यक्रमहरूका तस्बिरहरू</p>
          </div>

          <div className="flex justify-center">
            <div className="card-container">
              {galleryData.map((item, index) => {
                let cardClass = 'card';
                let cardStyle: React.CSSProperties = {};

                // Position cards in 4 corners
                if (index === 0) {
                  // Top Left
                  cardStyle = {
                    top: '0px',
                    left: '0px',
                    width: '145px',
                    height: '145px',
                    backgroundImage: `url(${item.image})`
                  };
                } else if (index === 1) {
                  // Top Right
                  cardClass = 'card-d3';
                  cardStyle = {
                    top: '0px',
                    right: '0px',
                    width: '145px',
                    height: '145px',
                    backgroundImage: `url(${item.image})`
                  };
                } else if (index === 2) {
                  // Bottom Left
                  cardStyle = {
                    bottom: '0px',
                    left: '0px',
                    width: '145px',
                    height: '145px',
                    backgroundImage: `url(${item.image})`
                  };
                } else if (index === 3) {
                  // Bottom Right
                  cardClass = 'card-d3';
                  cardStyle = {
                    bottom: '0px',
                    right: '0px',
                    width: '145px',
                    height: '145px',
                    backgroundImage: `url(${item.image})`
                  };
                }

                return (
                  <div
                    key={item.id}
                    className={cardClass}
                    style={cardStyle}
                  >
                    <div className="card-content">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gallery-wrapper {
          min-height: 100vh;
          background-color: #ffffff;
          overflow-x: hidden;
          overflow-y: hidden;
          width: 100%;
          max-width: 100vw;
        }

        .card-container {
          position: relative;
          height: 300px;
          width: 300px;
          max-width: 100%;
          overflow: hidden;
          border-radius: 16px;
          margin: 0 auto;
        }

        .card {
          position: absolute;
          transition: all 0.5s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.5rem;
          color: white;
          z-index: 1;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }

        .card:hover {
          height: 280px !important;
          width: 280px !important;
          max-width: 65vw !important;
          max-height: 55vh !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          right: auto !important;
          bottom: auto !important;
          z-index: 10;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }

        .card-d3 {
          position: absolute;
          transition: all 0.5s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.5rem;
          color: white;
          z-index: 1;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }

        .card-d3:hover {
          height: 280px !important;
          width: 280px !important;
          max-width: 65vw !important;
          max-height: 55vh !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          right: auto !important;
          bottom: auto !important;
          z-index: 10;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }

        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .card:hover .card-content,
        .card-d3:hover .card-content {
          padding-bottom: 2rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .card-description {
          font-size: 0.875rem;
          opacity: 0;
          max-height: 0;
          transition: all 0.3s ease;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card:hover .card-description,
        .card-d3:hover .card-description {
          opacity: 1;
          max-height: 60px;
        }

        @media (max-width: 768px) {
          .card-container {
            height: 250px;
            width: 250px;
            max-width: calc(100vw - 2rem);
          }

          .card:hover {
            height: 230px !important;
            width: 230px !important;
            max-width: calc(75vw - 2rem) !important;
            max-height: 45vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .card-d3:hover {
            height: 230px !important;
            width: 230px !important;
            max-width: calc(75vw - 2rem) !important;
            max-height: 45vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .card-title {
            font-size: 0.8rem;
          }

          .card-description {
            font-size: 0.65rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        @media (max-width: 480px) {
          .card-container {
            height: 200px;
            width: 200px;
            max-width: calc(100vw - 2rem);
          }

          .card:hover {
            height: 180px !important;
            width: 180px !important;
            max-width: calc(80vw - 2rem) !important;
            max-height: 35vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .card-d3:hover {
            height: 180px !important;
            width: 180px !important;
            max-width: calc(80vw - 2rem) !important;
            max-height: 35vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .card-title {
            font-size: 0.7rem;
          }

          .card-description {
            font-size: 0.6rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}