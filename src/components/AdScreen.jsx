// // App.jsx
// import React, { useEffect, useState } from "react";
// import AdDisplay from "./AdDisplay";
// import QRSection from "./QRSection";
// import sample_vid from "../assets/ad-vid-1.mp4";

// const dummyAdData = {
//   type: "carousel", // 'image' | 'video' | 'carousel'
//   src: [
//     "https://i.pinimg.com/736x/80/11/14/801114101f57a83cd18d6beb54400a68.jpg",
//     "https://www.pixelstalk.net/wp-content/uploads/2016/06/Samsung-Free-1080-x-1920-Backgrounds.jpg",
//     "https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-1080-x-1920-HD-Wallpapers-Download.jpg"
//   ],
//   qrLink: "https://example.com/product",
//   productText: "Amazing Product - Scan QR for details!"
// };

// // const dummyAdData = {
// //   type: "video", // 'image' | 'video' | 'carousel'
// //   src: [sample_vid],
// //   qrLink: "https://example.com/product",
// //   productText: "Scan it and Buy it!"
// // };

// function App() {
//   const [adData, setAdData] = useState(null);

//   useEffect(() => {
//     // Simulate API fetch
//     setTimeout(() => {
//       setAdData(dummyAdData);
//     }, 1000);
//   }, []);

//   if (!adData) return <div className="loading">Loading Ad...</div>;

//   return (
//     <div className="app-container">
//       <div className="ad-container">
//         <AdDisplay type={adData.type} src={adData.src} />
//       </div>
//       <QRSection qrLink={adData.qrLink} productText={adData.productText} />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdDisplay from "./AdDisplay";
import QRSection from "./QRSection";

const AdScreen = () => {
  const [adData, setAdData] = useState({
    src: ["/general1.jpg", "/general2.jpg", "/general3.jpg"],  // Carousel default ads
    qrLink: "#",
    productText: "Welcome! Scan to explore."
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/detect_person")
      .then((response) => {
        const data = response.data;
        if (data.matched_ads && data.matched_ads.length > 0) {
          const images = data.matched_ads.map(
            (ad) => `http://127.0.0.1:8000/${ad.ad_image}`
          );
          setAdData({
            src: images,
            qrLink: data.matched_ads[0].qr_code,
            productText: "Scan to shop!"
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching ad:", error);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="ad-container">
        <AdDisplay src={adData.src} />
      </div>
      <QRSection qrLink={adData.qrLink} productText={adData.productText} />
    </div>
  );
};

export default AdScreen;
