import axios from "axios"

const endRelationship = async (relationshipId) => {
    try {
        const response = await axios({
            method: "PATCH",
            url: `http://localhost:8000/endmentoringrelationship/`,
            data: {
                "id": relationshipId,
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