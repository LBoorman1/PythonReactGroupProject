import React from 'react';
import UserCard from './UserCard';

const BusinessAreaChangeRequest = () => {
    return (
        <div className=" sec__one">
            <h1>User Business Area Change Requests</h1>
            <UserCard 
              id="12345" 
              firstName="John" 
              lastName="Smith" 
              email="johnsmith@gmail.com" 
              businessArea="Business Area 1"
              inactive="False"
              mentee="True"
              mentor="False"
              admin="False"
              topicsOfInterest={["Topic 4", "Topic 2", "Topic 3"]}
              topicsOfExpertise={[]}
              type="changeBusinessArea"
              newBusinessArea="Business Area 2"
            />
        </div>
    )
}

export default BusinessAreaChangeRequest;