'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Calendar, Archive } from 'lucide-react';
import TopSearch from '../../../components/TopSearch';

// Archive data organized by year
const archiveData = [
    {
        year: "२०२५",
        news: [
            {
                id: 1,
                title: "हरिपुरका बिपन्न घरपरिवारलाई न्यानो कम्बल वितरण कार्यक्रम",
                excerpt: "सर्लाहीको हरिपुर नगरपालिकामा सिमान्तकृत दलित तथा मुसहर समुदायलाई लक्षित गरी न्यानो कम्बल वितरण कार्यक्रम सम्पन्न भएको छ।",
                image: "https://rwua.com.np/wp-content/uploads/2025/12/blimket-780x470-1.png",
                category: "Community Support",
                date: "जनवरी १५, २०२५"
            },
            {
                id: 2,
                title: "बालक्लब गठन तथा बालबालिकाको अधिकार",
                excerpt: "सर्लाहीमा विद्यालयको पहुँचमा पुग्न नसकेका २० जना अपाङ्ग बालबालिकालाई घरमै शिक्षा प्रदान हुने भएको छ।",
                image: "https://rwua.com.np/wp-content/uploads/2025/02/shared-image.jpeg",
                category: "Child Rights",
                date: "जनवरी १०, २०२५"
            }
        ]
    },
    {
        year: "२०२४",
        news: [
            {
                id: 3,
                title: "ग्रामिण नारी उत्थान संघको २९ औं साधारण सभा",
                excerpt: "ग्रामीण महिलाहरूको सशक्तिकरणका लागि आयोजित वार्षिक साधारण सभाको मुख्य बिन्दुहरू।",
                image: "https://rwua.com.np/wp-content/uploads/2021/10/1.jpg",
                category: "General Assembly",
                date: "डिसेम्बर २०, २०२४"
            },
            {
                id: 4,
                title: "समावेशी तथा दिगो ग्रामीण खानेपानी सुविधा कार्यक्रम",
                excerpt: "स्वच्छ खानेपानी पहुँचका लागि सञ्चालित कार्यक्रमका गतिविधिहरू र समुदायिक सहभागिता।",
                image: "https://rwua.com.np/wp-content/uploads/2021/04/11.jpg",
                category: "Water & Sanitation",
                date: "नोभेम्बर १५, २०२४"
            },
            {
                id: 5,
                title: "महिला सशक्तिकरण तालिम कार्यक्रम",
                excerpt: "ग्रामीण महिलाहरूको आर्थिक सशक्तिकरणका लागि सञ्चालित तालिम कार्यक्रम।",
                image: "https://rwua.com.np/wp-content/uploads/2020/01/13.jpg",
                category: "Women Empowerment",
                date: "अक्टोबर ५, २०२४"
            }
        ]
    },
    {
        year: "२०२३",
        news: [
            {
                id: 6,
                title: "कृषि उत्पादकता वृद्धि कार्यक्रम",
                excerpt: "आधुनिक कृषि प्रविधि प्रयोग गरी कृषि उत्पादकता बढाउने कार्यक्रम सञ्चालन।",
                image: "https://rwua.com.np/wp-content/uploads/2021/04/11.jpg",
                category: "Agriculture",
                date: "सेप्टेम्बर १२, २०२३"
            },
            {
                id: 7,
                title: "शिक्षा सामग्री वितरण कार्यक्रम",
                excerpt: "गरिब परिवारका बालबालिकाहरूलाई निःशुल्क शिक्षा सामग्री वितरण।",
                image: "https://rwua.com.np/wp-content/uploads/2025/02/shared-image.jpeg",
                category: "Education",
                date: "जुलाई ८, २०२३"
            }
        ]
    }
];

export default function ArchivePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Filter archive data based on search query and year
    const filteredArchive = useMemo(() => {
        let filtered = archiveData;

        // Filter by year if selected
        if (selectedYear) {
            filtered = filtered.filter(yearData => yearData.year === selectedYear);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.map(yearData => ({
                ...yearData,
                news: yearData.news.filter(news =>
                    news.title.toLowerCase().includes(query) ||
                    news.excerpt.toLowerCase().includes(query) ||
                    news.category.toLowerCase().includes(query)
                )
            })).filter(yearData => yearData.news.length > 0);
        }

        return filtered;
    }, [searchQuery, selectedYear]);

    // Get all available years
    const availableYears = archiveData.map(yearData => yearData.year);

    // Count total news items
    const totalNews = filteredArchive.reduce((total, yearData) => total + yearData.news.length, 0);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
            {/* Breadcrumb Section */}
            <section className="py-4 px-0 pt-[15px]" style={{
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
                            <Link href="/news" className="hover:text-purple-800">
                                News & Press
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-600 font-medium">पुराना र नयाँ जानकारी</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <div className="max-w-screen-lg mx-auto px-4">
                {/* Page Header */}
                <div className="text-center py-12">
                    <div className="flex items-center justify-center mb-4">
                        <Archive className="w-12 h-12 text-purple-600 mr-4" />
                        <h1 className="text-4xl font-bold text-gray-800">पुराना र नयाँ जानकारी</h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        हाम्रो संस्थाको सम्पूर्ण अभिलेख र डाटाबेस - वर्षअनुसार व्यवस्थित समाचारहरू र जानकारीहरू
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8">
                    <TopSearch onSearch={setSearchQuery} />

                    {/* Year Filter */}
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700 font-medium">वर्ष छान्नुहोस्:</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                            >
                                <option value="">सबै वर्षहरू</option>
                                {availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <main className="mt-12">
                    {/* Show search results count */}
                    {(searchQuery || selectedYear) && (
                        <div className="mb-6 text-gray-600">
                            <p className="text-sm">
                                Showing {totalNews} result{totalNews !== 1 ? 's' : ''}
                                {searchQuery && ` for "${searchQuery}"`}
                                {selectedYear && ` from ${selectedYear}`}
                            </p>
                        </div>
                    )}

                    {/* No results message */}
                    {(searchQuery || selectedYear) && totalNews === 0 && (
                        <div className="text-center py-12">
                            <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No archived news found</p>
                            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Archive Content by Year */}
                    {filteredArchive.map((yearData) => (
                        <div key={yearData.year} className="mb-12">
                            {/* Year Header */}
                            <div className="flex items-center mb-8">
                                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                                <h2 className="text-3xl font-bold text-gray-800">{yearData.year}</h2>
                                <div className="ml-4 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {yearData.news.length} समाचार{yearData.news.length !== 1 ? 'हरू' : ''}
                                </div>
                            </div>

                            {/* News Grid for the Year */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {yearData.news.map((news) => (
                                    <div key={news.id} className="rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer" style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(0, 0, 0, 0.08)',
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)'
                                    }}>
                                        <div className="h-48 overflow-hidden">
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                width={400}
                                                height={250}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                                                    {news.category}
                                                </span>
                                                <span className="text-xs text-gray-500">{news.date}</span>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 hover:text-deep-purple transition-colors duration-200 cursor-pointer">
                                                <Link href={`/news/${news.id}`} className="hover:text-deep-purple transition-colors duration-200">
                                                    {news.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {news.excerpt}
                                            </p>
                                            <Link href={`/news/${news.id}`} className="inline-flex items-center text-deep-purple hover:text-black font-semibold text-sm transition-colors duration-200 group">
                                                Read Archive
                                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Load More Button */}
                    {!searchQuery && !selectedYear && (
                        <div className="text-center mt-12">
                            <button className="inline-flex items-center text-deep-purple hover:text-white font-semibold text-sm transition-all duration-300 group bg-transparent border-2 border-deep-purple hover:border-deep-purple hover:bg-deep-purple rounded-lg py-3 px-6">
                                Load More Archives
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <div className="pb-24"></div>
        </div>
    );
}