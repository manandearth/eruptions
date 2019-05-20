// src/components/WorldMap.js

import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import Smithsonian from './smithsonian.json'

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      worldData: [],
    }
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  componentDidMount() {
    fetch('/world-110m.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
            return
        }
        response.json().then(worldData => {
          this.setState({
            worldData: feature(worldData, worldData.objects.countries).features
          })
        })
      })
  }
    render() {
        const eruptions = Smithsonian.features;
        return (
            <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
              <g className="countries">
                {
                    this.state.worldData.map((d,i) => (
                        <path
                          key={ `path-${ i }` }
                          d={ geoPath().projection(this.projection())(d) }
                          className="country"
                          fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                          stroke="#FFFFFF"
                          strokeWidth={ 0.5 }
                        />
                    ))
                }
              </g>
              <g className="markers">
                {eruptions.map((eruption) =>
                (<circle
                   cx={this.projection() (eruption['geometry']['coordinates'])[0]}  
                   cy={this.projection() (eruption['geometry']['coordinates'])[1]}
                   r={eruption['properties']['ExplosivityIndexMax']}
                  fill="#E91E63"
                  className="marker"
                 />))}
              </g>
            </svg>
        )
    }
}

export default WorldMap
