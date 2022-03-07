import React, { useState } from 'react';
import SearchUser from './SearchUser';
import UserCard from './UserCard';

const AddAdmin = () => {
    const [userData, setUserData] = useState([]);
    
    const generateResults = responseData => {
        console.log(responseData);
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

export default AddAdmin;
