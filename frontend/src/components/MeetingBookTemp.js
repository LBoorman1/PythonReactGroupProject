import axios from 'axios';

const bookMeeting = async (e) => {
    try {
        const response = await axios ({
            method: "POST",
            url: "http://localhost/meetings/",
            data : {
                date_time: e.target.date_time.value,
                attendance_status: 'going_ahead',
                title: e.target.title.value,
                notes: e.target.notes.value,
                relationship_id: props.relationshipId
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
}