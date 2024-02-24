import Image from "next/image";
import React, { FC, useRef } from "react";
import { ImageUploadProps } from "./type";

const ImageUpload: FC<ImageUploadProps> = ({
  image,
  setImage,
  defaultImage,
  setCardImage,
  width,
  height,
  size,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageLayoutClick = (event: React.MouseEvent<HTMLDivElement>) => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImage(newImage);
      if (setCardImage) {
        setCardImage(newImage); // Update the image for the specific card
      }
    }
  };

  const imageContainerStyle: React.CSSProperties = {
    height: height,
    width: width,
    alignSelf: "center",
    position: "relative",
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <div onClick={handleImageLayoutClick} style={imageContainerStyle}>
        <Image src={image} alt="Selected" layout="fill" objectFit="cover" />
      </div>
    </>
  );
};

export default React.memo(ImageUpload);
