import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ApplicationFeedbackCard = props => {
    return (
        <div className="feedback_card sec__one">
          <Card>
            <CardBody>
               <CardText>
                 {props.feedback}                 
               </CardText>
            </CardBody>
          </Card>
        </div>
    )
}

export default ApplicationFeedbackCard;