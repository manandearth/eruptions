import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Smithsonian from './smithsonian.json';
import * as serviceWorker from './serviceWorker';
import WorldMap from './WorldMap'
class App extends React.Component  {
    render() {
        return (
            <div>
              <h1>Boom!</h1>
              <div>
                <State />
                <table>
                  <EruptionList />
                </table>      
              </div>
            </div>
        );
    }
}

class State extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: ""
        };
        this.handleDateChange = this.handleDateChange.bind(this); 
    }
    
    handleDateChange(newDate) {
        this.setState({date: newDate});
    }
    
    render() {
        return(
            <div>
              <WorldMap
                date={this.state.date}
                onDateChange={this.handleDateChange}/>
              {/* <Stage */}
              {/*   date={this.state.date} /> */}
              <TimeSlider
                date={this.state.date}
                onDateChange={this.handleDateChange}/>
            </div>
        );
    }
}

class EruptionList extends React.Component {
    render () {
        const eruptions = Smithsonian.features;
        return (
            eruptions.map((eruption) =>
                (<tr>
                   <td>{eruption['properties']['VolcanoName']}</td>
                   <td>{eruption['properties']['StartDate']}</td>
                   <td>{eruption['properties']['EndDate']}</td>
                 </tr>)
            )
        );
    }

}

class Map extends React.Component {
    render () {
        return null;
    }
}

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(event){
        this.props.onDateChange(event.target.value);
    }
    
    render () {
        return(
            <div>
              <label className="label">Time</label>
              <input className="slider"
                     type="range"
                     name="timeSlider"
                     id="timeSlider"
                     min="19340202"
                     max="20190517"
                     value={this.props.date}
                     onChange={this.handleDateChange}
              />
                      
            </div>
        );
    }
}




class Stage extends React.Component {

    
    render() {
        const eruptions = Smithsonian.features;
        const date = this.props.date;
        const width = "1200px";
        const height = "700px";
        const xFit = 0.35;
        const xBias = 470;
        const yFit = 0.27;
        const yBias = -460;
        
        return(
            <svg
              x="10%"
              width={width}
              height={height}>
              <g>
                {eruptions.map((eruption) => 
                    <g fill="yellow" stroke="yellow" strokeWidth="1">
                      <circle cx={eruption['properties']['LongitudeDecimal'] / xFit + xBias} cy={(eruption['properties']['LatitudeDecimal'] / yFit + yBias) * -1} r="3px" />
                    </g>)}
              </g>
            {eruptions.map((eruption) =>
        (   eruption['properties']['StartDate'] < parseInt(date) &&
            eruption['properties']['EndDate'] > parseInt(date)) 
         ? 
           
                <g fill="red" stroke="red" strokeWidth="0.1">
                  <circle cx={eruption['properties']['LongitudeDecimal'] / xFit + xBias} cy={(eruption['properties']['LatitudeDecimal'] / yFit + yBias) * -1} r={(eruption['properties']['ExplosivityIndexMax'] * 3)} />
            </g>
            :
            null
              
            )}
              
            </svg>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
