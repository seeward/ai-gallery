import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type Props = {
  cid: string;
};

const QrCode = (props: Props) => {
  const ref = useRef(null);
  useEffect(() => {
    
    qrCode.append(ref.current as any);
  }, []);

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: props.cid,
    image: "/liminil.svg",
    dotsOptions: {
      color: "#8FDF4C",
      type: "dots",
    },
    cornersSquareOptions:{
      type: "extra-rounded",
      color: "#000000"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
      imageSize: .5
    },
  });

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default QrCode;
