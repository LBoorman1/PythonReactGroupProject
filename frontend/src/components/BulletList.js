import React, { useState } from "react";
import BulletPoints from "./BulletPoints";

import { Button, Card, CardBody, CardText, Input, Label } from 'reactstrap';
import Calendar from "react-select-date";


const BulletList = () =>  {
    const [fname, setFname] = useState("");
    const [title, setTitle] = useState("");
    const [items, setItems]= useState([]);
    const [date, setDate]= useState(new Date());

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

    const handleTitle = e =>{
        setTitle(e.target.value);
    }

    return (
      <div className="user_card sec__one">
          <Card>
          <CardBody>
          <form>
          <label>
            Add Title: {" "}
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> 
            </label>
            </form>
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
      </div>
    ) 
}
export default BulletList;