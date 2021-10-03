import React from 'react';
import './weather.css';
function compareDate(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return (today)
}

export default function WeatherItem(props) {
    const { averaged, min, max, iconCode, descraption, city, date } = props;
    const iconSrc = "http://openweathermap.org/img/w/" + iconCode + ".png"
    return (
        <div className="border-info flex-container  degreeDiv">
            {city && <h6 className='descraption' >{compareDate(date)}</h6>}
            {city && <h6 className='descraption' >{city}</h6>}
            <label className='averaged' >{averaged}&#176;</label>
            <img className='icon' src={iconSrc} />
            <h6 className='descraption' >{descraption}</h6>
            <label className=" minMax flex-item-left">min:&nbsp; {min}&#176;</label>
            <label className=" minMax flex-item-right" >&nbsp; &nbsp; &nbsp; &nbsp; max:&nbsp; {max}&#176;   </label>
        </div>
        //border-info flex-container
    )
}
