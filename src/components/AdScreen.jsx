import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AdDisplay from "./AdDisplay";
import QRSection from "./QRSection";

// Sample ad mapping (customize as needed)
const adLibrary = {
  Male: {
     "(0-2)": {
      images: ["/male_0_2_1.jpg"],
      qr: "https://example.com/male-baby",
    },
    "(4-6)": {
      images: ["/male_4_6_1.jpg"],
      qr: "https://example.com/male-toddler",
    },
    "(8-12)": {
      images: ["/male_8_12_1.jpg"],
      qr: "https://example.com/male-preteen",
    },
    "(15-20)": {
      images: ["/male_15_20_1.jpg", "/male_15_20_2.jpg"],
      qr: "https://example.com/male-teen",
    },
    "(25-32)": {
      images: ["/male_25_32_1.mp4","/male_25_32_1.jpg", "/male_25_32_2.jpg"],
      qr: "https://example.com/male-young-adult",
    },
    "(38-43)": {
      images: ["/male_38_43_1.jpg"],
      qr: "https://example.com/male-mid-adult",
    },
  },
  Female: {
    "(0-2)": {
      images: ["/female_0_2_1.jpg"],
      qr: "https://example.com/female-baby",
    },
    "(4-6)": {
      images: ["/female_4_6_1.jpg"],
      qr: "https://example.com/female-toddler",
    },
    "(8-12)": {
      images: ["/female_8_12_1.jpg"],
      qr: "https://example.com/female-preteen",
    },
    "(15-20)": {
      images: ["/female_15_20_1.jpg", "/female_15_20_2.jpg", "/female_15_20_3.jpg"],
      qr: "https://example.com/female-teen",
    },
    "(25-32)": {
      images: ["/female_25_32_1.mp4","/female_25_32_1.jpg", "/female_25_32_2.jpg", "/female_25_32_3.jpg"],
      qr: "https://example.com/female-young-adult",
    },
    "(38-43)": {
      images: ["/female_38_43_1.mp4","/female_38_43_1.jpg"],
      qr: "https://example.com/female-mid-adult",
    },
  },
};

const defaultAds = {
  images: ["/general1.jpg", "/general2.jpg", "/general3.jpg"],
  qr: "#",
  text: "Welcome! Scan to explore.",
};

const AdScreen = () => {
  const [adData, setAdData] = useState({
  src: defaultAds.images,
  qrLink: defaultAds.qr,
  productText: defaultAds.text,
  gender: "",
  ageGroup: "",
});
const previousPerson = useRef({ gender: null, age_group: null });


  // Start the camera once when UI mounts
// useEffect(() => {
//   const startCam = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/start_camera");
//       console.log(res.data);
//     } catch (err) {
//       console.error("Camera start failed:", err);
//     }
//   };

//   startCam();
// }, []); // empty deps: ensures only 1 call



  useEffect(() => {
    const fetchPersonDetails = () => {
  axios
    .get("http://127.0.0.1:8000/get_person_details")
    .then((res) => {
      const { gender, age_group } = res.data;

      // Only update if gender or age group has changed
      if (
        gender !== previousPerson.current.gender ||
        age_group !== previousPerson.current.age_group
      ) {
        previousPerson.current = { gender, age_group }; // update tracker

        if (adLibrary[gender] && adLibrary[gender][age_group]) {
          const matched = adLibrary[gender][age_group];
          setAdData({
            src: matched.images,
            qrLink: matched.qr,
            productText: `Scan to shop! (${gender}, ${age_group})`,
          });
        } else {
          setAdData({
            src: defaultAds.images,
            qrLink: defaultAds.qr,
            productText: defaultAds.text,
          });
        }
      }
      // Else: do nothing (keeps carousel as-is)
    })
    .catch((err) => {
      console.error("Error fetching person details:", err);
      setAdData({
        src: defaultAds.images,
        qrLink: defaultAds.qr,
        productText: defaultAds.text,
      });
    });
};

    // const fetchPersonDetails = () => {
    //   axios
    //     .get("http://127.0.0.1:8000/get_person_details")
    //     .then((res) => {
    //       const { gender, age_group } = res.data;

    //       if (
    //         adLibrary[gender] &&
    //         adLibrary[gender][age_group]
    //       ) {
    //         const matched = adLibrary[gender][age_group];
    //         setAdData({
    //           src: matched.images,
    //           qrLink: matched.qr,
    //           productText: "Scan to shop!",
    //           gender: gender,
    //           ageGroup: age_group,
    //         });
    //       } else {
    //         setAdData({
    //           src: defaultAds.images,
    //           qrLink: defaultAds.qr,
    //           productText: defaultAds.text,
    //           gender: "",
    //           ageGroup: "",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.error("Error fetching person details:", err);
    //       setAdData({
    //         src: defaultAds.images,
    //         qrLink: defaultAds.qr,
    //         productText: defaultAds.text,
    //       });
    //     });
    // };

    fetchPersonDetails(); // first call
    const interval = setInterval(fetchPersonDetails, 5000); // every 10s

    return () => clearInterval(interval);
  }, []);

  return (
  
    <div className="app-container">
      <div className="ad-container">
      <AdDisplay src={adData.src} />
    </div>
    <QRSection qrLink={adData.qrLink} productText={adData.productText} gender={adData.gender} ageGroup={adData.ageGroup} />

  
</div>

  );
};

export default AdScreen;
