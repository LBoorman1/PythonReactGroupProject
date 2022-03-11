import axios from 'axios';

export const fetchBusinessAreas = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/businessareas",
            headers: {
                "Content-Type": "application/json"
            }
        })
        //console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchTopics = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/skills",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
};