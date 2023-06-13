import { Skeleton, Stack } from "@mui/material";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";

export default function LocationMap({ lat, lng }) {
  const mapCenter = useMemo(() => ({ lat: +lat, lng: +lng }), [lat, lng]);
  const libraries = useMemo(() => ["places"], []);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
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

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "100%", height: "320px" }}
      onLoad={() => console.log("Map Component Loaded...")}
    >
      <MarkerF
        position={mapCenter}
        onLoad={() => console.log("Marker Loaded")}
      />
    </GoogleMap>
  );
}
