import React from 'react';
import {Button,Card} from 'reactstrap';


const SkillsButtons = (props) => {
    const changeSkils   = () => {


        {/*Request this business department*/}

    }
    return (
        <div className="Business_area_buttons">
            <Card>
               <br></br>

                <p>Please Select skills:</p>

                <div>
                {props.array.map(item => ( 
                    <div>
                     <input id="buttons"  type="checkbox" /> 
                       {item}
                     </div>
                 ))}

                 <Button onClick={changeSkils}>Submit </Button>
                 </div>
                 </Card>
            </div>
            

    )
}
export default SkillsButtons
