import React from 'react'

const colorMap = {
    42: "#ebde34",
    0: "transparent",
    1: "#80B900",
    2: "#0080B9",
    3: "#FF0000",
}

function HighlightedSpan(props: {
    text: string, score: string | number 
}) {
  return (
        <span style={{backgroundColor: colorMap[props.score], borderRadius: '0.3rem', padding: '0.2rem'}}>{props.text}</span>
  )
}

export default HighlightedSpan