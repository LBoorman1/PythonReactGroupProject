import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardText, Input, Label } from 'reactstrap';
import axios from 'axios';


const Checkboxes = poa => {
  const [checked, setChecked] = useState(poa.completed);
  const [value, onChange] = useState(new Date());

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    var completed_status = false
    if (event.target.checked) {
      completed_status = true
      updatedList = [...checked, event.target.value];
    } else {
      completed_status = false
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    const poatarget_data = {
      "poatarget_id": event.target.id,
      "completed_status" : completed_status
    }
    axios
    .post("http://127.0.0.1:8000/POATargetUpdate/", poatarget_data)
    .then(response => {
      console.log(response);
    });
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <Card>
      <CardBody>
      <CardText>
      <div className="milestoneList">
        <strong>{poa.title}</strong>
        <p>Created with: {poa.firstName} {poa.lastName}</p>
        <div className="list-container">
          {poa.checkList.map(target => (
            <div>
              <input value={target.target_title} id={target.target_id} type="checkbox" onChange={handleCheck} />
              {target.target_title}
            </div>
          ))}
          
        </div>
      <p> Completed milestones: {checkedItems.length > 0? checkedItems : "None"} </p>
      
    </div>
    </CardText>
    </CardBody>
    </Card>
  );
}
export default Checkboxes