import React, { useState } from 'react';
import SearchUser from './SearchUser';
import UserCard from './UserCard';
import boolToStr from './BoolToStringNice';

const ToggleAdmin = () => {
    const [userData, setUserData] = useState([]);
    
    const generateResults = responseData => {
        console.log(responseData);
        setUserData(responseData);
    }

    return (
        <div className="add_admin sec__one">
            <h1>Toggle Admin Status</h1>
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
                    // This is a bit clunky - each topic is returned wrapped in a 'skill' object
                    topicsOfInterest={user.profile.topics_of_interest.map(topic => topic.skill.name)}
                    topicsOfExpertise={user.profile.topics_of_expertise.map(topic => topic.skill.name)}
                    type="toggleAdmin"
                    //onClick={(e) => {
                        //e.preventDefault();
                        //handleSubmit();
                //}}
                />
            ))}
        </div>
    )
}

export default ToggleAdmin;
