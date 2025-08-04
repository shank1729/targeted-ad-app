import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRSection = ({ qrLink, productText, gender, ageGroup }) => (
  <div className="qr-section">
    <QRCodeSVG value={qrLink} size={100} />
    <p className="product-text">{productText}{gender}{ageGroup}</p>
     
    {/* Display Gender and Age Group (for testing) */}
   
  </div>
  
);

export default QRSection;