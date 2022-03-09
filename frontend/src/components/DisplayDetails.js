import React from 'react';
import { Card } from 'reactstrap';
import DisplayMyMentees from './DisplayMyMentees';
import DisplayMyMentor from './DisplayMyMentor';
import './DisplayDetails.css';

const DisplayDetails = props => {
    return (
        <div className="my_details sec__one">
            <Card>
                <table>
                    <tr>
                        <th>First Name:</th>
                        <td>{props.firstname}</td>
                    </tr>
                    <tr>
                        <th>Surname:</th>
                        <td>{props.surname}</td>
                    </tr>
                    <tr>
                        <th>Business Area:</th>
                        <td>{props.business_area}</td>
                    </tr>
                    <tr>
                        <th>Mentor:</th>
                        <td>{props.is_mentor}</td>
                    </tr>
                    <tr>
                        <th>Mentee:</th>
                        <td>{props.is_mentee}</td>
                    </tr>
                    <tr>
                        <th>Admin:</th>
                        <td>{props.is_admin}</td>
                    </tr>
                </table>
            </Card>
        </div>
    )
}

export default DisplayDetails;