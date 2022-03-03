import React from 'react';
import {Card} from 'reactstrap';
import DisplayMyMentee from './DisplayMyMentor';
import DisplayMyMentor from './DisplayMyMentee';
import './DisplayDetails.css';
const DisplayDetails = props => {
    return (
        <div className="my_details sec__one">
            <Card>
            <table>
                <tr>
                    <th>First name:</th>
                    <td>{props.firstname}</td>
                </tr>
                <tr>
                     <th>Surname:</th>
                    <td>{props.surname}</td>
                </tr>
                <tr>
                    <th>Company Department:</th>
                    <td>{props.department}</td>
                </tr>
                <tr>
                    <th>Mentor permissions:</th>
                    <td>{props.mentor}</td>
                </tr>
                <tr>
                    <th>Mentee permissions:</th>
                    <td>{props.mentee}</td>
                </tr>
                <tr>
                    <th>Admin permissions:</th>
                    <td>{props.mentee}</td>
                </tr>


            </table>
            
            <br></br>
            <DisplayMyMentor />
            <br></br>
            <DisplayMyMentee />


            </Card>
        </div>
    )
}
export default DisplayDetails