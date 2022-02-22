import React from 'react';
import UserCard from './UserCard';
import SearchUser from './SearchUser';

// Should be changed to make user inactive

const RemoveUser = () => {
    return (
        <div className="remove_user sec__one">
            <h1> Remove User </h1>
            <SearchUser />
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
              type="toggleInactive"
            />
        </div>
    )
}

export default RemoveUser;
