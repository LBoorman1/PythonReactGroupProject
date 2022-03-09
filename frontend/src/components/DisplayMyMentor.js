import {React} from 'react';
import UserCard from './UserCard';
import Card from 'reactstrap';
import RequestMentor from './RequestMentor';

const DisplayMyMentor = () => {
    return (
        <div className="display_my_mentor sec__one">
            <h1>My Mentor</h1>
            <UserCard 
              id="12345" 
              firstName="John" 
              lastName="Smith" 
              email="johnsmith@gmail.com" 
              businessArea="Business Area 1"
              active="True"
              mentee="True"
              mentor="False"
              admin="False"
              topicsOfInterest={["Topic 4", "Topic 2", "Topic 3"]}
              topicsOfExpertise={[]}
              type=""
            />

            <RequestMentor array={["user 1", "user 2"]}/>

        </div>
    )
}

export default DisplayMyMentor;
