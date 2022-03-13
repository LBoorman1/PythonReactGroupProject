import axios from "axios"

const endRelationship = async (menteeId, relationshipId) => {
    try {
        const response = await axios({
            method: "PATCH",
            url: `http://localhost:8000/endmentoringrelationship/`,
            data: {
                "mentee_id": menteeId,
                "relationship_id": relationshipId,
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default endRelationship;