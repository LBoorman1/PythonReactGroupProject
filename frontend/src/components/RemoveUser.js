import React, { useState } from 'react';
import UserCard from './UserCard';
import SearchUser from './SearchUser';
import boolToStr from './BoolToStringNice';

// Should be changed to toggle user activity

const RemoveUser = () => {
    const [userData, setUserData] = useState([]);
    
    const generateResults = responseData => {
        setUserData(responseData);
    }

    return (
        <div className="add_admin sec__one">
            <h1>Toggle User Activity</h1>
            <SearchUser handleUpdate={generateResults}/>
            {userData.map(user => (
                <UserCard 
                    id={user.id}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    businessArea={user.profile.business_area.name}
                    active={boolToStr(user.is_active)}
                    mentee={boolToStr(user.profile.is_mentee)}
                    mentor={boolToStr(user.profile.is_mentor)}
                    admin={boolToStr(user.profile.is_admin)}
                    topicsOfInterest={user.profile.topics_of_interest.map(topic => topic.skill.name)}
                    topicsOfExpertise={user.profile.topics_of_expertise.map(topic => topic.skill.name)}
                    type="toggleInactive"
                />
            ))}
        </div>
    )
}

export default RemoveUser;
