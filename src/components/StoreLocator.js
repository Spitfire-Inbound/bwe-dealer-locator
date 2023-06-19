import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CountryList from './CountryList';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from '@react-google-maps/api';
import MapStyles from './MapStyles';
import dealers from './dealers.json';
import StoresList from './StoresList';
import StoreInfo from './StoreInfo';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Update these to center over the area you want initially
const defaultCenter = {
  lat: -30.5595,
  lng: 22.9375,
};

const options = {
  styles: MapStyles, // Optional: style your map
  disableDefaultUI: true,
  zoomControl: true,
};

const StoreLocator = ({ moduleData }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyANXqfdp0NSpOVfKb1X6aAtbOrdwPTqhUY', // Your Google Maps API Key
    libraries,
  });

  const [selectedStore, setSelectedStore] = useState(null);
  const [center, setCenter] = useState({
    lat: parseFloat(moduleData.default_center.split(',')[0]),
    lng: parseFloat(moduleData.default_center.split(',')[1]),
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoom, setZoom] = useState(moduleData.default_zoom);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get(
          'https://27042894.hs-sites-eu1.com/_hcms/api/dealers?portalid=27042894',
        );
        const formattedData = response.data.map((item) => ({
          hs_id: item.id,
          hs_path: item.path,
          hs_created_at: item.createdAt,
          hs_name: item.name,
          hs_child_table_id: item.childTableId,
          hs_updated_at: item.updatedAt,
          country: item.values.country,
          city: item.values.city,
          name: item.values.name,
          address: item.values.address,
          monday_hours: item.values.monday_hours,
          tuesday_hours: item.values.tuesday_hours,
          wednesday_hours: item.values.wednesday_hours,
          thursday_hours: item.values.thursday_hours,
          friday_hours: item.values.friday_hours,
          saturday_hours: item.values.saturday_hours,
          sunday_hours: item.values.sunday_hours,
          contact_number: item.values.contact_number,
          location: `${item.values.location.lat},${item.values.location.long}`,
          image: `${item.values.image?.url},${item.values.image?.width},${item.values.image?.height}`,
        }));
        setStores(formattedData);
      } catch (error) {
        console.error(`Error fetching dealers: ${error}`);
      }
    };

    fetchDealers();
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <h2 className="store-locator-header">Find a dealer near me</h2>
      <SearchBar setCenter={setCenter} setZoom={setZoom} />
      <CountryList
        setCenter={setCenter}
        setZoom={setZoom}
        setSelectedCountry={setSelectedCountry}
        countries={[...new Set(dealers.map((store) => store.country.trim()))]}
        setSelectedStore={setSelectedStore}
      />
      <div className="store-locator-wrapper">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          options={options}
        >
          {stores.map((store) => {
            return (
              <Marker
                key={store.hs_id}
                position={{
                  lat: parseFloat(store.location.split(',')[0]),
                  lng: parseFloat(store.location.split(',')[1]),
                }}
                onClick={() => {
                  setSelectedStore(store);
                }}
              />
            );
          })}

          {selectedStore && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedStore.location.split(',')[0]),
                lng: parseFloat(selectedStore.location.split(',')[1]),
              }}
              onCloseClick={() => {
                setSelectedStore(null);
              }}
            >
              <div>
                <h4>{selectedStore.name}</h4>
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
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <StoresList
        setCenter={setCenter}
        setZoom={setZoom}
        stores={stores}
        selectedCountry={selectedCountry}
        setSelectedStore={setSelectedStore}
      />
      {selectedStore && <StoreInfo selectedStore={selectedStore} />}
    </div>
  );
};

export default StoreLocator;
