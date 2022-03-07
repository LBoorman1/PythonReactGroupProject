import React from 'react';
import UserCard from './UserCard';
import axios from 'axios';

const BecomeMentorRequest = () => {
    const [becomeMentorRequestData, setBecomeMentorRequestData] = useState(fetchBecomeMentorRequests)

    const fetchBecomeMentorRequests = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:8000/BecomeMentorUserView",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccept = (userId, requestId) => {
        setMentor(userId);
        checkOffRequest(requestId);
        refreshRequests();
    }

    const handleDeny = requestId => {
        checkOffRequest(requestId);
        refreshRequests();
    }


    const setMentor = async (userId) => {
        try {
            await axios({
                method: "PATCH",
                url: "http://localhost:8000/REPLACETHIS/" + userId,
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
        newRequests = fetchBecomeMentorRequests;
        setBecomeMentorRequestData(newRequests);
    }

    return (
        <div className=" sec__one">
            <h1>Mentor Requests</h1>
            {becomeMentorRequestData.map(request => (
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
                    type="makeMentor"
                    requestId={request.id}
                    onAccept={handleAccept}
                    onDeny={handleDeny}
                />
            ))}
        </div>
    )
}

export default BecomeMentorRequest;