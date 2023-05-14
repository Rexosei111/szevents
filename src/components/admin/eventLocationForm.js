import React, { useContext, useMemo, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Skeleton, Stack } from "@mui/material";
import LocationSearchInput from "./locationSearchInput";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { newEventContext } from "@/components/pages/admin/events/new";
import { LoadingButton } from "@mui/lab";

export default function EventLocationForm() {
  const { setNewEventForm } = useContext(newEventContext);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(5.6468427);
  const [lng, setLng] = useState(-0.1867952);
  const [saved, setSaved] = useState(true);
  const libraries = useMemo(() => ["places"], []);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(false);

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });
  if (!isLoaded) {
    return (
      <Stack flexDirection={"column"} gap={1} width={"100%"}>
        <Skeleton variant="rectangular" width={"70%"} height={20} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
      </Stack>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description !== null) {
      setNewEventForm((prevState) => ({
        ...prevState,
        location: {
          address: description,
          latitude: lat.toString(),
          longitude: lng.toString(),
        },
      }));
      setError(false);
      setSaved(true);
    } else {
      setError(true);
      setSaved(false);
    }
  };

  return (
    <Stack
      flexDirection={"column"}
      gap={1}
      component={"form"}
      action="#"
      method="POST"
      id="location-form"
      onSubmit={handleSubmit}
    >
      <LocationSearchInput
        error={error}
        onAddressSelect={(address) => {
          setDescription(address?.description);
          setSaved(false);
          getGeocode({ address: address?.description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);

            setLat(lat);
            setLng(lng);
          });
        }}
      />
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "600px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>
      <LoadingButton
        loading={loading}
        variant="contained"
        size="small"
        disableElevation
        disabled={saved}
        sx={{ ml: "auto" }}
        type="submit"
      >
        save{saved && "d"}
      </LoadingButton>
    </Stack>
  );
}
