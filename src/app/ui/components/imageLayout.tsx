import { ImageLayoutProps } from "./type";

const ImageLayout = ({
  children,
  width,
  height,
  onClick,
}: ImageLayoutProps) => {
  return (
    <div
      className="flex bg-gray-300 p-2 w-full border-dashed border-1 border-[#AEAEAE] justify-center items-center rounded-3xl"
      style={{ height, width }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ImageLayout;
