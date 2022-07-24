import React, { useEffect, useState } from 'react';
import axios from 'axios';

//images
import cloudyrain from '../../images/cloudyrain.jpg';
import sunycloud from '../../images/sunnycloud.jpg';
import './Card.css';

/**
 * @component Card,
 * @param {cityData} param0,  props containing city data and location key
 * @param {error} param1,  error information
 */
function Card({cityData, error}) {

    /*state */
    const [data, setData] = useState();
    console.log(data);

    /*dynamically fetched city temperature through city key. And further mounted its state once.  */
    useEffect(()=>{
        if(cityData){
    axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData?.Key}?apikey=FTRfao3svuZpwcX0XnHU4XHjaA0VcJVq`)
        .then((response)=>{
            setData(response.data)
        })
        }
    },[cityData])

    return (
        <>
            {error? <small className='error'>{error}</small>
            :data && (
                <div className="card">
                    {/* city name */}
                    <h1 className='city'>
                        {cityData.EnglishName} 
                        <sup className='countryid'>{cityData.Country.ID}</sup>
                    </h1>
                    <div className='degreeInfo'>
                        {/* degree information */}
                        <h3>
                            It is currently {data.DailyForecasts[0].Temperature.Maximum.Value}
                            <sup>&deg;{data.DailyForecasts[0].Temperature.Maximum.Unit}</sup>. {data.DailyForecasts[0].Day.IconPhrase} in {cityData.EnglishName}
                        </h3>
                    </div>
                    {/* conditions for rain and sunny display in card */}
                    {data.DailyForecasts[0].Day.HasPrecipitation===true&&<img className='img' src={cloudyrain} alt='rainy'/>}
                    {data.DailyForecasts[0].Day.HasPrecipitation===false&&<img className='img' src={sunycloud} alt='sunny'/>}
                </div>
                
            )}
        </>
    );
}

export default Card;