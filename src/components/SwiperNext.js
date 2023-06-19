import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperNext = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slideNext()} className="swiper-button-next">
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 19L10.5 10L1.5 1"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default SwiperNext;
