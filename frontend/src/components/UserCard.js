import React from 'react'
import { Button, Card, CardBody, CardText, Input, Label } from 'reactstrap';

const UserCard = props => {
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
                 <strong>Inactive</strong>: {props.inactive}
               </CardText>
               <CardText>
                 <strong>Mentee</strong>: {props.mentee}
                 &emsp; &emsp;
                 <strong>Mentor</strong>: {props.mentor}
                 &emsp; &emsp;
                 <strong>Admin</strong>: {props.admin}
               </CardText>
               {props.mentee == "True" && 
                 <CardText>
                   <strong>Topics of Interest</strong>: {props.topicsOfInterest.map(topic => topic + ", ")}
                 </CardText>
               }
               {props.mentor == "True" &&
                 <CardText>
                   <strong>Topics of Expertise</strong>: {props.topicsOfExpertise.map(topic => topic + ", ")}
                 </CardText>
               }
               {props.type == "toggleAdmin" &&
                 <Button color="primary">Toggle Admin</Button>
               }
               {props.type == "toggleInactive" &&
                 <Button color="primary">Toggle Inactivity Status</Button>
               }
               {props.type == "makeMentor" &&
                 <div>
                   <br />
                   <CardText>
                     <strong>Proposed Topics of Expertise</strong>: {props.proposedTopics.map(topic => topic + ", ")}
                   </CardText>
                   <Button color="primary">Make Mentor</Button>
                   &emsp;
                   <Button color="primary">Deny Request</Button>
                 </div>
               }
               {props.type == "changeBusinessArea" &&
                 <div>
                  <br />
                  <CardText>
                    <strong>New Business Area</strong>: {props.newBusinessArea}
                  </CardText>
                  <Button color="primary">Change Business Area</Button>
                  &emsp;
                  <Button color="primary">Deny Request</Button>
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