import React from 'react';
import { Card, CardBody, Button, Form } from 'reactstrap';


const RadioButtons = props => {
    return (
        <div className="Business_area_buttons">
            <Form onSubmit={props.onRequest}>
                {props.businessAreas.map(businessArea => (
                    <div>
                        <input name="businessArea" value={businessArea.id} id="buttons" type="radio" />
                        &emsp;{businessArea.name}
                    </div>
                ))}
                <br />
                <Button color="primary">Submit </Button>
            </Form>
        </div>
    )
}

export default RadioButtons;
