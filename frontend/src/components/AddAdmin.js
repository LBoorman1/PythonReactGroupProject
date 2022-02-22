import React from 'react';
import SearchUser from './SearchUser';
import UserCard from './UserCard';

const AddAdmin = () => {
    return (
        <div className="add_admin sec__one">
            <h1> Add Admin </h1>
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
              type="toggleAdmin"
            />
        </div>
    )
}

export default AddAdmin;
