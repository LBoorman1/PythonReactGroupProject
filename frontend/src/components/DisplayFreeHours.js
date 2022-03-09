import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const DisplayFreeHours = props => {
  return (
    <div className="feedback_card sec__one">
      <Card>
        <CardBody>
          <CardText>
            Time: {props.startTime}
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default DisplayFreeHours;