import React from 'react'
import MapContent from '../map';
import MarkerHolder from '../UI/marker-holder';

function ProfileComp(props) {

  const geojson = {
    type: "FeatureCollection",
    features: props.concerns.map(con => {
      return {
        type: "Feature",
        properties: {
          message: "fafafa",
          type: con.type,
          iconSize: [30, 45],
        },
        geometry: {
          type: "Point",
          coordinates: [con.lng, con.lat],
        },
        onClick: () => {
          MarkerHolder({
            // icon: "success",
            title: "John Doe",
            content: "Urgently Need Help!",
            timer: 2000,
          });
        },
      };
    }),
    
  };

  return <MapContent geojson={geojson} isClickable={true} />;
}

export default ProfileComp