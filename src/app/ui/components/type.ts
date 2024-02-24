interface ImageLayoutProps {
  children: React.ReactNode;
  width: number | string;
  height: number | string;
  onClick?: () => void;
}
interface ImageUploadProps {
  image: string;
  setImage: (image: string) => void;
  setCardImage?: (image: string) => void;
  defaultImage: string;
  width: number | string;
  height: number | string;
  size: number;
}

interface Item {
  key: string;
  label: string;
  condition: boolean;
  id: string;
}

export type { ImageLayoutProps, ImageUploadProps, Item };
