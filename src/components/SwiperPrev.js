import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperPrev = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()} className="swiper-button-prev">
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 1L1.5 10L10.5 19"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default SwiperPrev;
