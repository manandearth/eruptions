import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Smithsonian from './smithsonian.json';
import * as serviceWorker from './serviceWorker';
import WorldMap from './WorldMap';
import { dateRange, numberRange } from './dates';



// Globals vars and functions:
const dates = [].concat.apply([], dateRange);
const length = dates.length;
function prettifyDate (date) {
    return (
        date[6] + date[7] + "/" + date[4] + date[5] + "/" + date[0] + date[1] + date[2] + date[3]
    )
}


class App extends React.Component  {
    render() {
        return (
            <div>
            <div className="title">
              <h1>Eruptions from 1960 to 2019, an exercise.</h1>
              <h2>scroll using the slider or the keyboard arrows</h2>
            </div>

              <div>
                <State  />
              </div>
              <div className="notes">
                <p>1. Explosivity index based on peak. In the case of continuous eruption the value is not representative.
                </p>
              </div>
            </div>
        );
    }
}

class State extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "19600101",
            index: 0
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        
    }
    
        handleDateChange(newDate) {
            this.setState({
                date: dates[newDate],
                index: newDate});
    }
    
    render() {
        return(
            <div>
              <div className='map'>
              <WorldMap
                date={this.state.date}
            onDateChange={this.handleDateChange}/>
            </div>
              <TimeSlider
                date={this.state.date}
                index ={this.state.index}
                onDateChange={this.handleDateChange}/>
              <EruptionList
                date={this.state.date}
                onDateChange={this.handleDateChange}/>
            
            </div>
        );
    }
}

class EruptionList extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render () {
        const eruptions = Smithsonian.features;
        const date = this.props.date
        return (<table className="fixed">
            <thead>
              <th>Name</th>
              <th>Started on</th>
              <th>Ended on</th>
              <th>Explosivity¹</th>
            </thead>
            <tbody>
            {eruptions.map((eruption) =>
                (   eruption['properties']['StartDate'] <= date &&
                    eruption['properties']['EndDate'] >= date)
                    ? 
                    <tr>
                   <td>{eruption['properties']['VolcanoName']}</td>
                      <td>{prettifyDate(eruption['properties']['StartDate'])}</td>
                      <td>{prettifyDate(eruption['properties']['EndDate'])}</td>
                      <td>{eruption['properties']['ExplosivityIndexMax']}</td>
                    </tr>
                    :
                null)}
            </tbody>
            </table>
        )
        
    }

}

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        // const dates = [].concat.apply([], dateRange);
        
    }

    handleDateChange(event){
        this.props.onDateChange(event.target.value);
    }

    render () {
        const now = "" + this.props.date;

        return(
            <div>
              <label className="label">Time</label>
              <input className="slider"
                     type="range"
                     name="timeSlider"
                     id="timeSlider"
                     min="0"
                     max={length - 1}
                     value={this.props.index}
                     onChange={this.handleDateChange}
              />
              <h2 className="current">
                {("Volcanoes erupting On " +  prettifyDate(now))}</h2>
            </div>
        );
    }
}




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
