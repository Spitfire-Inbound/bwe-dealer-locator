import React from 'react';

const StoreInfo = ({ selectedStore }) => {
  return (
    <div>
      <h3>{selectedStore.name}</h3>
      <p>Address: {selectedStore.address}</p>
      <p>Contact: {selectedStore.contact_number}</p>
      <p>Operating Hours:</p>
      <p>Monday: {selectedStore.monday_hours}</p>
      <p>Tuesday: {selectedStore.tuesday_hours}</p>
      <p>Wednesday: {selectedStore.wednesday_hours}</p>
      <p>Thursday: {selectedStore.thursday_hours}</p>
      <p>Friday: {selectedStore.friday_hours}</p>
      <p>Saturday: {selectedStore.saturday_hours}</p>
      <p>Sunday: {selectedStore.sunday_hours}</p>
    </div>
  );
};

export default StoreInfo;
