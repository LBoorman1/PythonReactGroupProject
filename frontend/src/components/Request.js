import React from 'react';
import {Button} from 'reactstrap';

const Requests = (props) => {
    const accept   = () => {


        {/*Request this business department*/}

    }
    return (
        <div className="request">
            <br></br>
            <h3>{props.request}</h3>
            <h4>Request type: {props.type}</h4>
            <Button onClick={accept} >Accept Request</Button>
            <br></br>


            

        </div>
    )
}

export default Requests
