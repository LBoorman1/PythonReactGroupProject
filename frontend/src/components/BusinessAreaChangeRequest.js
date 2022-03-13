import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import boolToStr from './BoolToStringNice';

const BusinessAreaChangeRequest = () => {
    const [businessAreaChangeRequestData, setBusinessAreaChangeRequestData] = useState([]);
    const [fetch, setFetch] = useState(false);

    const fetchBusinessAreaChangeRequests = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:8000/businessareachangerequests",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setBusinessAreaChangeRequestData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => fetchBusinessAreaChangeRequests(), [fetch]);

    const handleAccept = (userId, newBusinessAreaId, requestId) => {
        // Change a user's business area and check off the request
        changeBusinessArea(userId, newBusinessAreaId);
        checkOffRequest(requestId);
        setFetch(fetch => !fetch);
    }

    const handleDeny = requestId => {
        // Simply check off the request and do nothing else
        checkOffRequest(requestId);
        setFetch(fetch => !fetch);
    }

    const changeBusinessArea = async (userId, newBusinessAreaId) => {
        try {
            await axios({
                method: "PATCH",
                url: `http://localhost:8000/setbusinessarea/${userId}/`,
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
                url: `http://localhost:8000/checkoffbusinessareachangerequest/${requestId}/`,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" sec__one">
            <h1>Business Area Change Requests</h1>
            {businessAreaChangeRequestData.map(request => (
                <UserCard
                    id={request.profile.user.id}
                    firstName={request.profile.user.first_name}
                    lastName={request.profile.user.last_name}
                    email={request.profile.user.email}
                    businessArea={request.profile.business_area.name}
                    active={boolToStr(request.profile.user.is_active)}
                    mentee={boolToStr(request.profile.is_mentee)}
                    mentor={boolToStr(request.profile.is_mentor)}
                    admin={boolToStr(request.profile.is_admin)}
                    topicsOfInterest={request.profile.topics_of_interest.map(topic => topic.skill.name)}
                    topicsOfExpertise={request.profile.topics_of_expertise.map(topic => topic.skill.name)}
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