import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardText, Input, Label } from "reactstrap";

const UserCard = props => {
  const [admin, setAdmin] = useState(props.admin);
  const [active, setActive] = useState(props.active);

  const toggleAdmin = async () => {
    try {
      // Make request
      const response = await axios({
        method: "PATCH",
        url: "http://localhost:8000/toggleadmin/" + props.id + "/",
        headers: {
          "Content-Type": "application/json"
        }
      });
      // Update frontend if request is successful
      if (admin == "True") {
        setAdmin("False");
      } else {
        setAdmin("True");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleActive = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "http://localhost:8000/toggleactive/" + props.id + "/",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (active == "True") {
        setActive("False");
      } else {
        setActive("True");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user_card sec__one">
      <Card>
        <CardBody>
          <CardText>
            <strong>Name</strong>: {props.firstName} {props.lastName}
            &emsp; &emsp;
            <strong>Email</strong>: {props.email}
            &emsp; &emsp;
            <strong>Business Area</strong>: {props.businessArea}
            &emsp; &emsp;
            <strong>Active</strong>: {active}
          </CardText>
          <CardText>
            <strong>Mentee</strong>: {props.mentee}
            &emsp; &emsp;
            <strong>Mentor</strong>: {props.mentor}
            &emsp; &emsp;
            <strong>Admin</strong>: {admin}
          </CardText>
          {props.mentee == "True" &&
            <CardText>
              <strong>Topics of Interest</strong>: {props.topicsOfInterest.map(topic => topic + ", ")}
            </CardText>
          }
          {props.mentor == "True" && props.type != "makeMentor" &&
            <CardText>
              <strong>Topics of Expertise</strong>: {props.topicsOfExpertise.map(topic => topic + ", ")}
            </CardText>
          }
          {props.type == "toggleAdmin" &&
            <Button
              color="primary"
              onClick={e => {
                e.preventDefault();
                toggleAdmin();
              }}
            >
              Toggle Admin
            </Button>
          }
          {props.type == "toggleInactive" &&
            <Button 
              color="primary"
              onClick={e => {
                e.preventDefault();
                toggleActive();
              }}
            >
              Toggle Inactivity Status
            </Button>
          }
          {props.type == "makeMentor" &&
            <div>
              <br />
              <CardText>
                <strong>Proposed Topics of Expertise</strong>: {props.topicsOfExpertise.map(topic => topic + ", ")}
              </CardText>
              <Button 
                color="success"
                onClick={() => props.onAccept(props.id, props.requestId)}
              >
                Make Mentor
              </Button>
              &emsp;
              <Button 
                color="danger"
                onClick={() => props.onDeny(props.id, props.requestId)}
              >
                Deny Request
              </Button>
            </div>
          }
          {props.type == "changeBusinessArea" &&
            <div>
              <br />
              <CardText>
                <strong>New Business Area</strong>: {props.newBusinessAreaName}
              </CardText>
              <Button 
                color="success"
                onClick={() => props.onAccept(props.id, props.newBusinessAreaId, props.requestId)}
              >
                Change Business Area
              </Button>
              &emsp;
              <Button 
                color="danger"
                onClick={() => props.onDeny(props.requestId)}
              >
                Deny Request
              </Button>
            </div>
          }
        </CardBody>
      </Card>
    </div>
  )
}


/*
If we ever want to just arbitrarily change a user's business area...

<Label for="businessAreaSelect"><strong>Change Business Area</strong>:</Label>
<Input 
id="businessAreaSelect" 
name="businessArea" 
type="select"
>
<option>1</option>
<option>2</option>
<option>3</option>
</Input>
<br/>
*/
export default UserCard;