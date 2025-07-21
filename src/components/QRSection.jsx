import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRSection = ({ qrLink, productText }) => (
  <div className="qr-section">
    <QRCodeSVG value={qrLink} size={100} />
    <p className="product-text">{productText}</p>
  </div>
);

export default QRSection;