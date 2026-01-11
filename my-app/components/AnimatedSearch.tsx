'use client';

import { useState, useRef, useEffect } from 'react';

interface AnimatedSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function AnimatedSearch({ placeholder = "खोज्नुहोस्...", onSearch }: AnimatedSearchProps) {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search effect
  useEffect(() => {
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(searchValue);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchValue, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (query) {
      setIsProcessing(true);
      // Simulate search processing
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (!searchValue) {
      setIsActive(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="finder">
          <div className="finder__outer">
            <div className="finder__inner">
              <div
                className={`finder__icon ${isActive ? 'active' : ''} ${isProcessing ? 'processing' : ''}`}
              />
              <input
                ref={inputRef}
                className="finder__input"
                type="text"
                name="q"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        .search-container {
          padding: 0;
          margin: 0;
          color: #292929;
          width: 100%;
          max-width: 28rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        form {
          transition: all 0.5s;
          width: 100%;
        }

        .finder {
          border: 1px solid #fff;
          background-color: #f6f5f0;
          border-radius: 15px;
          padding: 8px;
          box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
                      -9px -9px 16px rgba(255, 255, 255, 0.5);
        }

        .finder__outer {
          display: flex;
          width: 100%;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          box-shadow: inset 10px 10px 15px -10px #c3c3c3,
                      inset -10px -10px 15px -10px #ffffff;
        }

        .finder__inner {
          display: flex;
          align-items: center;
          position: relative;
          flex: 1;
        }

        .finder__input {
          flex: 1;
          border: none;
          background-color: transparent;
          outline: none;
          font-size: 1.1rem;
          letter-spacing: 0.75px;
          padding: 0.25rem 0;
          color: #292929;
        }

        .finder__input::placeholder {
          color: #999;
        }

        .finder__icon {
          width: 30px;
          height: 30px;
          margin-right: 1rem;
          transition: all 0.2s;
          box-shadow: inset 0 0 0 20px #292929;
          border-radius: 50%;
          position: relative;
          flex-shrink: 0;
        }

        .finder__icon::after,
        .finder__icon::before {
          display: block;
          content: "";
          position: absolute;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .finder__icon::after {
          width: 7px;
          height: 7px;
          background-color: #292929;
          border: 2px solid #f6f5f0;
          top: 50%;
          position: absolute;
          transform: translateY(-50%);
          left: 0px;
          right: 0;
          margin: auto;
          border-radius: 50%;
        }

        .finder__icon::before {
          width: 3px;
          height: 8px;
          background-color: #f6f5f0;
          top: 50%;
          left: 15px;
          transform: rotateZ(45deg) translate(-50%, 0);
          transform-origin: 0 0;
          border-radius: 3px;
        }

        .finder__icon.active {
          transform: translateY(-3px);
        }

        .finder__icon.active::after {
          border-width: 6px;
          background-color: #f6f5f0;
        }

        .finder__icon.active::before {
          background-color: #292929;
          width: 4px;
          transform: rotateZ(45deg) translate(-50%, 16px);
        }

        .finder__icon.processing {
          transform-origin: 50%;
          animation: spinner 0.3s linear infinite;
          animation-delay: 0.5s;
        }

        @keyframes spinner {
          0% {
            transform: rotateZ(45deg);
          }
          100% {
            transform: rotateZ(405deg);
          }
        }
      `}</style>
    </div>
  );
}