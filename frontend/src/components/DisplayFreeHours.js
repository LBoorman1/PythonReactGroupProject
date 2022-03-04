import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const DisplayFreeHours = props => {
    return (
        <div className="feedback_card sec__one">
          <Card>
            <CardBody>
               <CardText>
                <h3>Start time: {props.startTime}</h3>
                 
                <h3>End time: {props.endTime}</h3>
                 
                 
               </CardText>
            </CardBody>
          </Card>
        </div>
    )
}

export default DisplayFreeHours;