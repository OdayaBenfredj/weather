import React from 'react';
import './weather.css';
import WeatherItem from './weatherItem';
import { useSelector, useEffect } from 'react-redux'
import { useDispatch } from 'react-redux';

export default function History(props) {
    const dispatch = useDispatch()
    const history = useSelector((state) => state.weathers.weathers);
    return (
        <div className=' scrollbar1'>
            {history && history.map((h, i) => {
                return (
                    <WeatherItem averaged={h.averaged}
                        min={h.min} max={h.max}
                        iconCode={h.iconCode}
                        descraption={h.descraption}
                        city={h.city}
                        date={h.date}
                    >
                    </WeatherItem>)
            })}
        </div >
    )
}
