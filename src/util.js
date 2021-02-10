import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

// const casesTypeColors = {
//   cases: {
//     hex: "#CC1034",
//     rgb: "rgb(204, 16, 52)",
//     half_op: "rgba(204, 16, 52, 0.5)",
//     multiplier: 400,
//   },
//   recovered: {
//     hex: "#7dd71d",
//     rgb: "rgb(125, 215, 29)",
//     half_op: "rgba(125, 215, 29, 0.5)",
//     multiplier: 600,
//   },
//   deaths: {
//     hex: "#fb4443",
//     rgb: "rgb(251, 68, 67)",
//     half_op: "rgba(251, 68, 67, 0.5)",
//     multiplier: 1000,
//   },
// };

const casesTypeColors = {
  cases: {
    multiplier: 400,
    option: { color: "#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 600,
    option: { color: "#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 1000,
    option: { color: "#ff6c47", fillColor: "#ff6c47" },
  },
};

export const showDataOnMap = (data, casesType) => {
  return data.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        // color={casesTypeColors[casesType].hex}
        // fillColor={casesTypeColors[casesType].hex}
        pathOptions={casesTypeColors[casesType].option}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};

export const prettyPrintStats = (number) => {
  return number ? `+${numeral(number).format("0.0a")}` : "Nil";
};
