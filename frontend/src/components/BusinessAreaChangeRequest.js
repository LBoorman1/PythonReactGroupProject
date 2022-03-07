import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';

const BusinessAreaChangeRequest = () => {
    const [businessAreaChangeRequestData, setBusinessAreaChangeRequestData] = useState(fetchBusinessAreaChangeRequests)

    const fetchBusinessAreaChangeRequests = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:8000/BusinessAreaChangeRequestUserView",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccept = (userId, newBusinessAreaId, requestId) => {
        changeBusinessArea(userId, newBusinessAreaId);
        checkOffRequest(requestId);
        refreshRequests();
    }

    const handleDeny = requestId => {
        checkOffRequest(requestId);
        refreshRequests();
    }


    const changeBusinessArea = async (userId, newBusinessAreaId) => {
        try {
            await axios({
                method: "PATCH",
                url: "http://localhost:8000/REPLACETHIS/" + userId,
                data: {
                    business_area: newBusinessAreaId
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const checkOffRequest = async (requestId) => {
        try {
            await axios({
                method: "PATCH",
                url: "http://localhost:8000/REPLACETHIS/" + requestId,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const refreshRequests = () => {
        newRequests = fetchBusinessAreaChangeRequests;
        setBusinessAreaChangeRequestData(newRequests);
    }

    return (
        <div className=" sec__one">
            <h1>User Business Area Change Requests</h1>
            {businessAreaChangeRequestData.map(request => (
                <UserCard
                    id={request.profile.user.id}
                    firstName={request.profile.user.first_name}
                    lastName={request.profile.user.last_name}
                    email={request.profile.user.email}
                    businessArea={request.profile.business_area.name}
                    active={request.profile.user.is_active}
                    mentee={request.profile.is_mentee}
                    mentor={request.profile.is_mentor}
                    admin={request.profile.is_admin}
                    topicsOfInterest={request.profile.topics_of_interest}
                    topicsOfExpertise={request.profile.topics_of_expertise}
                    type="changeBusinessArea"
                    requestId={request.id}
                    newBusinessAreaId={request.new_business_area.id}
                    newBusinessAreaName={request.new_business_area.name}
                    onAccept={handleAccept}
                    onDeny={handleDeny}
                />
            ))}
        </div>
    )
}

export default BusinessAreaChangeRequest;