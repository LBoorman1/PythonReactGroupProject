import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import BulletPoints from "./BulletPoints";
import { Button, Card, CardBody} from 'reactstrap';
import Calendar from "react-select-date";
import axios from 'axios';
import { format } from "date-fns";
import Select from "react-select";
 

const CreatePOAMentor= () => {
    const [userData, setUserData] = useState([]);
    const [fname, setFname] = useState("");
    const [title, setTitle] = useState("");
    const [items, setItems]= useState([]);
    const [date, setDate]= useState(new Date());
    const[mentee_options, setMenteeOptions] = useState([]);
    const[mentee, setMentee] = useState(0);

    useEffect(() => {
        get_mentee_options();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          getInput(e);
        }
      }

    const handleChange = e => {
      setFname(e.target.value);
    }

    const getInput = e => {
        
        setItems([...items,fname]);
        
        e.preventDefault();
    }

    const handle_mentee = e => {
        console.log(e.value)
        setMentee(e.value);
      }

    const get_mentee_options = () => {
        axios
        .get("http://127.0.0.1:8000/menteeOptions/?mentor_id=26")
        .then(response => {
          const data = response.data;
    
          const options = data.map(d => ({
            "value" : d.id,
            "label" : d.user.first_name + ' ' + d.user.last_name
          }))
    
          setMenteeOptions(options);
        })
      }

    const add_targets = poa_id => {
        const target_data = {
            "poa_id" : poa_id,
            "target_list" : items
        }
        axios
        .post("http://127.0.0.1:8000/POATargetCreate/", target_data)
        .then(response =>{
            console.log("targets added");
        });
    }

    const handleSubmit = () => {
        const poa_data = {
            "profile_id" : JSON.parse(localStorage.getItem("user")).id,
            "is_mentee" : false,
            "is_mentor" : true,
            "target_profile_id" : mentee,
            "title" : title,
            "finish_date" : date
        }
        axios
        .post("http://127.0.0.1:8000/POA/", poa_data)
        .then(response =>{
            const poa_id = response.data
            add_targets(poa_id);
        });
    }
    return (
        <div className="create_poa_mentor sec__one">
            <h1>Create POA Mentor </h1>
            <Card>
            <CardBody>
            <form>
            <label>
                Add Title: {" "}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> 
                </label>
                </form>
                <br></br>

                <label> Select a mentee </label>
                <Select style="max-width:40%;" options={mentee_options} onChange={handle_mentee}/>
                <br></br>
                
                <Calendar 
                onSelect={(d) => setDate(d)}
            />
                <br></br>

                <Card>
                <form>
                <br></br>
                <label>
                Add milestone:{" "}
                <input type="text" value={fname} onChange={handleChange} onKeyDown={handleKeyDown} />
                <Button onClick={getInput} type="button">Add new milestone </Button>
            </label>
            </form>
            
            <h2>Plan of Action: {title}</h2>
            <BulletPoints
            array={items}
                />
            </Card>
            </CardBody>
            </Card>
            <Button onClick = {handleSubmit} type = "button">Save and Create</Button>
        </div>
    )
}

export default CreatePOAMentor
