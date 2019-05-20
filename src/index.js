import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Smithsonian from './smithsonian.json';
import * as serviceWorker from './serviceWorker';
import WorldMap from './WorldMap';
import { dateRange, numberRange } from './dates';


const dates = [].concat.apply([], dateRange);
const length = dates.length;

class App extends React.Component  {
    render() {
        return (
            <div>
              <h1>Eruptions from 1960 to 2019, an excercise.</h1>
              <h2>scroll using the slider or the keyboard arrows</h2>
              <div>
                <State />
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
              <WorldMap
                date={this.state.date}
                onDateChange={this.handleDateChange}/>
              {/* <Stage */}
              {/*   date={this.state.date} /> */}
              <TimeSlider
                date={this.state.date}
                index ={this.state.index}
                onDateChange={this.handleDateChange}/>
            <table>
              <EruptionList
                date={this.state.date}
                onDateChange={this.handleDateChange}/>
            </table>
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
        return (
            eruptions.map((eruption) =>
                (   eruption['properties']['StartDate'] <= date &&
                    eruption['properties']['EndDate'] >= date)
                    ? 
                    <tr>
                   <td>{eruption['properties']['VolcanoName']}</td>
                   <td>{eruption['properties']['StartDate']}</td>
                   <td>{eruption['properties']['EndDate']}</td>
                    </tr>
                    :
                null)
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
              <h2 className="current">{("On " +  now[6] + now[7] + "/" + now[4] + now[5] + "/" + now[0] + now[1] + now[2] + now[3])}</h2>
            </div>
        );
    }
}




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
