import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Smithsonian from './smithsonian.json';
import * as serviceWorker from './serviceWorker';

class App extends React.Component  {
    render() {
        return (
            <div>
              <h1>Boom!</h1>
              <div>
                <TimeSlider />
                <table>
                  <EruptionList />
                </table>      
              </div>
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

    }
}
class TimeSlider extends React.Component {
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
                       value= "20000101" />
                      
            </div>
        );
    }
}









ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
