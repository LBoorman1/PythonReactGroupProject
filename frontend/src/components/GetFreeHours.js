import axios from 'axios';

// Gets free hours for the user with the given user ID
const fetchFreeHours = async (userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `http://localhost:8000/freehours?user_id=${userId}`,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default fetchFreeHours;