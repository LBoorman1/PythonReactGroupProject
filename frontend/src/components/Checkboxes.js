import React, { useState } from "react";
import { Button, Card, CardBody, CardText, Input, Label } from 'reactstrap';

const Checkboxes = poa => {
  const [checked, setChecked] = useState(poa.completed);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
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
        <p>Plan of action created with: {poa.firstName} {poa.lastName}</p>
        <div className="list-container">
          {poa.checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              {item}
            </div>
          ))}
        </div>
      <p> Completed milestones: {checkedItems} </p>
      
    </div>
    </CardText>
    </CardBody>
    </Card>
  );
}
export default Checkboxes