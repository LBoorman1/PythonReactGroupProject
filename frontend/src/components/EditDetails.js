import React from 'react';
import {useState} from 'react';


const EditDetails = props => {
    const [item,setItem]= useState(null);
    return (
        <div className="edit_details sec__one">
            <h1> Edit Details </h1>
            <h3>Forename: {props.forename}</h3>
            <h3>Surname: {props.surname}</h3>
            <h3>Department: {props.department}</h3>

            <input value={item} type="checkbox"/>

            <input value={item} type="checkbox"/>
            <input value={item} type="checkbox"/>


           
            
        </div>
    )
}

export default EditDetails
