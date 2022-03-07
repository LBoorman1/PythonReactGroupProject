import axios from 'axios';

export const fetchBusinessAreas = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/BusinessAreaView",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const fetchTopics = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/SkillView",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
};