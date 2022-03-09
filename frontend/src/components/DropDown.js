import {React, useState} from 'react';



const DropDown = (props) => {
    const [skill ,setSkill] = useState("");
    const accept = (e) =>{
        setSkill(e.target.value)
    }
    
    let list = props.array.map((item, i) => <option value={item}>{item}</option>);
    return (
        

        <div>
            <h3>Select a skill to focus the session on: {skill}</h3>
            <select onChange={accept} value={skill}>{list}</select>
        </div>


    )    
}
export default DropDown
