import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Cập nhật trích dẫn phù hợp với nội dung CNXH và Thời kỳ quá độ
const QUOTES = [
  {
    quote: "Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một thời kỳ cải biến cách mạng từ xã hội nọ sang xã hội kia.",
    source: "C. Mác (Phê phán cương lĩnh Gôta)"
  },
  {
    quote: "Về lý luận, không thể nghi ngờ gì được rằng giữa chủ nghĩa tư bản và chủ nghĩa cộng sản, có một thời kỳ quá độ nhất định.",
    source: "V.I. Lênin"
  },
  {
    quote: "Chủ nghĩa xã hội giải phóng giai cấp, giải phóng dân tộc, giải phóng xã hội, giải phóng con người, tạo điều kiện để con người phát triển toàn diện.",
    source: "Đặc trưng bản chất CNXH"
  },
  {
    quote: "Sự thay thế hình thái kinh tế - xã hội tư bản chủ nghĩa bằng hình thái kinh tế - xã hội cộng sản chủ nghĩa là quá trình lịch sử - tự nhiên.",
    source: "Học thuyết Mác - Lênin"
  },
  {
    quote: "Nhà nước của thời kỳ ấy không thể là cái gì khác hơn là nền chuyên chính cách mạng của giai cấp vô sản.",
    source: "C. Mác"
  }
];

export const Banner = () => {
  // Giữ nguyên các texture banner (bạn có thể thay ảnh chủ đề Công nghiệp/Nước Nga/Công nhân nếu muốn)
  const SLIDES = useMemo(
    () => [
      "textures/banner01.jpg",
      "textures/banner02.jpg",
      "textures/banner03.jpg",
      "textures/banner04.jpg",
      "textures/banner05.jpg",
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);
  const AUTOPLAY_MS = 6000;

  const goTo = useCallback(
    (index) => {
      const next = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
      setCurrent(next);
    },
    [SLIDES.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (SLIDES.length <= 1) return;

    const start = () => {
      if (intervalRef.current != null) return;
      intervalRef.current = window.setInterval(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
      }, AUTOPLAY_MS);
    };

    const stop = () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isHover) start();

    return () => stop();
  }, [SLIDES.length, isHover]);

  return (
    <section
      id="banner"
      className="mt-[69px] relative w-full bg-gradient-to-b from-red-900 via-red-800 to-red-900"
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M30 5l5.09 10.26L46 16.27l-8 7.79 1.89 11.02L30 29.77l-9.89 5.31L22 24.06l-8-7.79 10.91-1.01L30 5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* Main Banner Slider */}
        <div
          className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl shadow-2xl ring-2 ring-yellow-500/30"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Slides */}
          <div
            className="flex h-full w-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((src, idx) => (
              <div className="relative w-full h-full flex-shrink-0" key={idx}>
                <img
                  src={src}
                  alt={`Chủ nghĩa xã hội Slide ${idx + 1}`}
                  className="h-full w-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-900/40 to-red-900/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/95 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-3xl px-8 md:px-16">
                    {/* Yellow star decoration */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="mb-4"
                    >
                      <Star className="w-12 h-12 text-yellow-400 drop-shadow-lg" fill="currentColor" />
                    </motion.div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                      Tìm hiểu về
                      <span className="block text-yellow-400 mt-2">Chủ nghĩa Xã hội &</span>
                      <span className="block text-yellow-200 text-2xl md:text-4xl mt-1">Thời kỳ quá độ</span>
                    </h1>
                    
                    {/* Quote */}
                    <div className="mt-6 p-4 bg-red-800/60 backdrop-blur-md rounded-lg border-l-4 border-yellow-400 shadow-lg">
                      <p className="text-lg md:text-xl text-white italic leading-relaxed">
                        "{QUOTES[idx]?.quote || QUOTES[0].quote}"
                      </p>
                      <p className="mt-2 text-yellow-400 font-semibold text-right">
                        — {QUOTES[idx]?.source || QUOTES[0].source}
                      </p>
                    </div>
                    
                    <button 
                        onClick={() => {
                            const element = document.getElementById('overview');
                            if(element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-bold text-red-900 hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg shadow-yellow-500/30 transform hover:-translate-y-1"
                    >
                      Bắt đầu tìm hiểu
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {SLIDES.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-yellow-500/80 p-2 text-red-900 hover:bg-yellow-400 transition shadow-lg backdrop-blur-sm"
              >
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5A1 1 0 1 1 12.707 5.293L8.414 9.586l4.293 4.293a1 1 0 0 1 0 1.414Z" clipRule="evenodd"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-yellow-500/80 p-2 text-red-900 hover:bg-yellow-400 transition shadow-lg backdrop-blur-sm"
              >
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 7.293 14.293L11.586 10 7.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {SLIDES.length > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current 
                    ? "w-8 bg-yellow-400" 
                    :  "w-2 bg-yellow-400/40 hover:bg-yellow-400/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;