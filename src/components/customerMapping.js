for (let key in customerData) {
  customerData[key].map((m) => {
    return (
      <Marker
        position={{
          lat: m.lat,
          lng: m.lng,
        }}
      />
    );
  });
}
