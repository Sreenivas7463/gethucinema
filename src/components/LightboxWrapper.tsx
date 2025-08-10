'use client';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface LightboxWrapperProps {
  images: { src: string; alt?: string }[];
  open: boolean;
  close: () => void;
  startIndex?: number;
}

export default function LightboxWrapper({
  images,
  open,
  close,
  startIndex = 0,
}: LightboxWrapperProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      slides={images}
      plugins={[Zoom]}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ finite: true }}
      index={startIndex}
    />
  );
}