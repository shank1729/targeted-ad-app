// // AdDisplay.jsx
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "../App.css";

// const isVideo = (file) => {
//   return /\.(mp4|webm|ogg)$/i.test(file);
// };

// const AdDisplay = ({ src }) => {
//   return (
//     <Swiper
//       modules={[Autoplay, Pagination]}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       pagination={{ clickable: true }}
//       loop={true}
//       className="ad-carousel"
//     >
//       {src.map((media, index) => (
//         <SwiperSlide key={index}>
//           {isVideo(media) ? (
//             <video
//               className="ad-media"
//               src={media}
//               autoPlay
//               muted
//               loop
//               playsInline
//               controls={false}
//             />
//           ) : (
//             <img className="ad-media" src={media} alt={`Ad ${index + 1}`} />
//           )}
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default AdDisplay;
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";

const AdDisplay = ({ src }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // If autoplay needs to be re-enabled on mount
    if (swiperRef.current) {
      swiperRef.current.autoplay?.start();
    }
  }, [src]);

  const handleVideoPlay = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const handleVideoEnded = () => {
    swiperRef.current?.slideNext();
    swiperRef.current?.autoplay?.start();
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="ad-carousel"
    >
      {src.map((media, index) => {
        const isVideo = media.endsWith(".mp4") || media.endsWith(".webm");
        return (
          <SwiperSlide key={index}>
            {isVideo ? (
              <video
                className="ad-media"
                src={media}
                autoPlay
                muted
                onPlay={handleVideoPlay}
                onEnded={handleVideoEnded}
              />
            ) : (
              <img className="ad-media" src={media} alt={`Ad ${index + 1}`} />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default AdDisplay;
