export default function styleLines (feature) {
  return {
    color: getColor(feature.properties.Traveltime),
    weight: 5,
    opacity: 0.8
  }
}

function getColor (d) {
  switch (true) {
    case (d < 75):
      return '#8CC63F'
    case (d >= 75 && d < 250):
      return '#F7931E'
    case (d >= 250):
      return '#F04925'
  }
}
