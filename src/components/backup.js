// <Swiper
//   className="store-locator-store-listing"
//   spaceBetween={50}
//   slidesPerView={3}
// >
//   {filteredStores.map((store) => {
//     let imageURL = store.image.split(',')[0];
//     return (
//       <SwiperSlide
//         key={store.hs_id}
//         className="store-list-item rounded-card-inner"
//         onClick={() => handleSelectStore(store)}
//         style={{
//           backgroundImage: `url("${imageURL}")`,
//           cursor: 'pointer',
//         }}
//       >
//         <div className="overlay rounded-card-inner"></div>
//         <h4>{store.name}</h4>
//         <p>{store.address}</p>
//       </SwiperSlide>
//     );
//   })}
// </Swiper>
