import {React} from 'react'
import UserCard from './UserCard';
import { Button, Card, CardBody, CardText, Input, Label } from 'reactstrap';

const SelectMentor= (props) => {
    const select   = () => {


        {/*Request this business department*/}

    }
    return (
        <div className="my_poa_mentee sec__one">
            <Card>
            <h1> Select a Mentor! </h1>

            {props.array.map(item => ( 
                    <div>
                     {/* array is a 2d array with each item being a mentor and the appropriate details being added*/}
                     <UserCard/>
                     <Button onClick={select}>Select user {item}</Button>
                     </div>
                 ))}



            </Card>




        </div>
    )
}

export default SelectMentor
