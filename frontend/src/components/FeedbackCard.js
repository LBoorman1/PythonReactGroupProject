import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const FeedbackCard = props => {
    return (
        <div className="feedback_card sec__one">
          <Card>
            <CardBody>
               <CardText>
                 {props.text}
               </CardText>
            </CardBody>
          </Card>
        </div>
    )
}

export default FeedbackCard;