import React, { useState } from 'react';
import UserCard from './UserCard';
import SearchUser from './SearchUser';

// Should be changed to toggle user activity

const RemoveUser = () => {
    const [userData, setUserData] = useState([]);
    
    const generateResults = responseData => {
        setUserData(responseData);
    }

    return (
        <div className="add_admin sec__one">
            <h1> Add Admin </h1>
            <SearchUser handleUpdate={generateResults}/>
            {userData.map(user => (
                <UserCard 
                    id={userData.id}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    businessArea={user.profile.business_area.name}
                    active={user.is_active}
                    mentee={user.profile.is_mentee}
                    mentor={user.profile.is_mentor}
                    admin={user.profile.is_admin}
                    topicsOfInterest={user.profile.topics_of_interest}
                    topicsOfExpertise={user.profile.topics_of_expertise}
                    type="toggleInactive"
                />
            ))}
        </div>
        /*<div className="remove_user sec__one">
            <h1> Remove User </h1>
            <SearchUser />
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
              type="toggleInactive"
            />
        </div>*/
    )
}

export default RemoveUser;
