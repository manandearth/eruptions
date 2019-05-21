// src/components/WorldMap.js

import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
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
    fetch('./world-110m.json')
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
        const date = this.props.date
        return (
            <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
              <rect x="85" y="0" width="630" height="450"
                    style={{fill: '#9cd', strokeWidth: 1}} />
              <g className="countries">
                {
                    this.state.worldData.map((d,i) => (
                        <path
                          key={ `path-${ i }` }
                          d={ geoPath().projection(this.projection())(d) }
                          className="country"
                          fill="#e1e1e1"
                          stroke="#999"
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
                   r={eruption['properties']['ExplosivityIndexMax'] + 1}
                   fill="Yellow"
                   opacity={0.5}
                   stroke= "orange"
                   strokeWidth={1}
                  className="marker"
                 />))}
              </g>
                          {eruptions.map((eruption) =>
        (   eruption['properties']['StartDate'] < parseInt(date) &&
            eruption['properties']['EndDate'] > parseInt(date)) 
         ? 
           
                              <g fill="orange" opacity={0.5} stroke="red" strokeWidth="1">
                  <circle cx={this.projection() (eruption['geometry']['coordinates'])[0]}
                          cy={this.projection() (eruption['geometry']['coordinates'])[1]}
                          r={(eruption['properties']['ExplosivityIndexMax'] * 3)} />
            </g>
            :
            null
              
            )}
            </svg>
        )
    }
}




export default WorldMap
