import React, { useState } from 'react';
import axios from 'axios';

//components
import Button from './Components/Button/Button'
import Card from './Components/Card/Card';
import Nav from './Components/Nav/Nav';

import './App.css';


/**
 * @component App,
 */
function App() {

    /*states */
    const [citySearch, setCitySearch] = useState('');
    const [cityData, setCityData] = useState(null);
    const [error, setError] = useState(null);

    /**
     * @function fetchCity, when triggered, it fetches city with its associated key for temperature search.
     * @param {e}, parameter tied to preventDefault function, prventing page reloads on submissions. 
     */
    const fetchCity = (e) => {
        e.preventDefault();
        setError(null)

        if (citySearch==='') {
            setError('Please enter city name')
            return 
        }

        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=FTRfao3svuZpwcX0XnHU4XHjaA0VcJVq&q=${citySearch}`)
        .then((response)=> {
            if (response.data===null) {
                    setError('Please enter a proper city name')
                }            
            setCityData(response.data[0]);
        })
        .catch(err=> {
            setError("Some error occurred")
            console.log(err, 'no response');
        });
    }

    console.log(error);

    return (
        <div className="home">
            <Nav />

            {/* input section */}
            <h5>Please enter any city to see weather condition.</h5>
            <div className='inputSearch'>
                <form>
                <input 
                    className='input'
                    text='text'
                    placeholder='Enter city'
                    maxLength='50'
                    value={citySearch}
                    onChange={(e)=> setCitySearch(e.target.value)}
                />
                </form>
                {/* prop to Button component */}
                <Button fetchCity={fetchCity}/>
            </div>

            {/* props to Card component */}
                <div>
                    <Card cityData={cityData} error={error} />
                </div>

            {/* footer */}
            <footer> Created by Ilodigwe Udoka</footer>
        </div>
    );
}

export default App;


