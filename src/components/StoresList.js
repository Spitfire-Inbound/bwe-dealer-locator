import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import SwiperNext from './SwiperNext';
// import SwiperPrev from './SwiperPrev';

const StoresList = ({
  stores,
  selectedCountry,
  setCenter,
  setZoom,
  setSelectedStore,
}) => {
  const filteredStores = selectedCountry
    ? stores.filter(
        (store) =>
          store.country.trim().toLowerCase() === selectedCountry.toLowerCase(),
      )
    : [];

  const handleSelectStore = async (store) => {
    setCenter({
      lat: parseFloat(store.location.split(',')[0]),
      lng: parseFloat(store.location.split(',')[1]),
    });
    setSelectedStore(store);
    setZoom(14);
  };

  return (
    <Swiper
      className="store-locator-store-listing"
      spaceBetween={20}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {filteredStores.map((store) => {
        let imageURL = store.image.split(',')[0];
        return (
          <SwiperSlide
            key={store.hs_id}
            className="store-list-item rounded-card-inner"
            onClick={() => handleSelectStore(store)}
            style={{
              backgroundImage: `url("${imageURL}")`,
              cursor: 'pointer',
            }}
          >
            <div className="overlay rounded-card-inner"></div>
            <h4>{store.name}</h4>
            <p>{store.address}</p>
          </SwiperSlide>
        );
      })}
      {/* {selectedCountry && <SwiperPrev />}
      {selectedCountry && <SwiperNext />} */}
    </Swiper>
  );
};

export default StoresList;
