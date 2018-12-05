export default function styleLines (feature) {
  return {
    color: getColor(feature.properties.Traveltime),
    weight: 5,
    opacity: 0.8
  }
}

function getColor (d) {
  switch (true) {
    case (d < 50):
      return '#72ff00'
    case (d >= 50 && d < 150):
      return '#ffdd00'
    case (d >= 150 && d < 250):
      return '#ff8300'
    case (d >= 250):
      return '#ff0000'
  }
}
