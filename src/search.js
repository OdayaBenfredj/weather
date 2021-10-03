import React, { useEffect, useState } from 'react';
import './user.css'
import WeatherItem from './weatherItem'
import { addToHistory } from './redux/actions'
import { useDispatch } from 'react-redux';


export default function Search() {


    const [searchText, setSearchText] = useState('');
    const [searchRes, setSearchRes] = useState(undefined);
    const [currentCity, setCurrentCity] = useState(undefined);
    const [errorMessages, setErrorMessages] = useState('');

    const dispatch = useDispatch();

    function searchCity() {
        setCurrentCity(searchText);
        const base = 'http://localhost:3000/api/v1.0';
        fetch(`${base}/search/${searchText}`, { credentials: 'include' })
            .then(r => r.json().then((data) => ({ status: r.status, body: data })))
            .then((obj) => {
                if (obj.status == 200) {
                    setSearchRes(obj.body);
                    dispatch(addToHistory(obj.body));
                    setSearchText('');
                }
                else {
                    setErrorMessages(obj.body.message)
                    setSearchRes()

                }
            })
        //    node: 
        /***
         * הולך לאתר ומביא נתונים 
         * שומר במונגו עבור היוזר בהיסטוריה את החיפוש
         * מחזיר את הנתונים 
         */
    }
    return (
        <div className="main-w3layouts wrapper">
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form action="#" method="post">
                        <div>
                            <input className="search text" value={searchText}
                                type="text"
                                onChange={(e) => { setSearchText(e.target.value); setErrorMessages('') }}
                                name="CityName" required=""
                                placeholder="enter city" />
                            <input className="search" type="button" value="CHECK WEATHER" onClick={searchCity} />
                        </div>
                        <label className='descraption'>{errorMessages}</label>

                        {searchRes && <WeatherItem {...searchRes} date='' city=''></WeatherItem>}

                    </form>
                </div></div></div>
    );
}

