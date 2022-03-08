import React from 'react';
import {Card,Button} from 'reactstrap';


const RadioButtons = (props) => {
    const changeRadio   = () => {


        {/*Request this business department*/}

    }
    return (
        <div className="Business_area_buttons">
            <Card>
            <h3> Request business area: </h3>
                <br></br>

                <p>Please click the radio button to request joining the appropriate business area:</p>

                <div>
                {props.array.map(item => ( 
                    <div>
                     
                     <input id="buttons"  type="radio" /> 
                       {item}
                     </div>
                 ))}

                 <Button onClick={changeRadio}>Submit </Button>
                 </div>
                 </Card>
            
            </div>
            

    )
}
export default RadioButtons
