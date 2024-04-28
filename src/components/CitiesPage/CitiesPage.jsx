import React, { useEffect, useReducer} from 'react';
import { initialValue, reducer } from '../../reducer';
import axios from 'axios';
import {GET_DATA, SELECT_CITY } from './actionType';
import './CitiPage.scss'

function CitiesPage() {
    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        axios('http://localhost:3000/cities')
            .then(res => {
                dispatch({
                    type: GET_DATA,
                    payload: res.data
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openAboutPage = (id) => {
        const city = state.data.find(city => city.id === id);
        dispatch({ type: SELECT_CITY, payload: city });
    }
    const closeAboutPage = () => {
        dispatch({ type: SELECT_CITY, payload: null });
    }

    return (
        <div className='CityPage'>
            {
                state.data.map(elem => {
                    return (
                        <div className='CitiPage__Content' key={elem.id}>
                            <img src={elem.image} alt="" />
                            <div className="CitiPage__Content-text">
                                <h1>{elem.name}</h1>
                                <p>{elem.properties} Properties</p>
                                <button onClick={() => openAboutPage(elem.id)}>About City</button>
                            </div>
                            

                        </div>
                    )
                })
            }
            {
             state.selectedCity && (
                 <div className="about-page">
                    <span><i onClick={closeAboutPage} className="bi bi-x-circle"></i></span>
                   <h2>{state.selectedCity.name}</h2>
                   <p>{state.selectedCity.about}</p>
                 </div>
                 
                    
                ) 
            }
            
        </div>
    );
}

export default CitiesPage;
