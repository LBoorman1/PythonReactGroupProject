import axios from "axios";
import React, { useEffect, useState } from 'react';
import Checkboxes from './Checkboxes';

const MyPOAMentor = () => {
    const [poas, setPoas] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'))
    const profileId = user.id;

    useEffect(() => {
        get_poas();
    }, []);

    const get_poas = () => {
        var url = `http://localhost:8000/POA/?profile_id=${profileId}&m_value=m2`;
        axios
            .get(url)
            .then(response => {
                const data = response.data;

                const poas_data = data.map(d => ({
                    "poa_title": d.poa.title,
                    "mentee_first": d.mentee.first_name,
                    "mentee_last": d.mentee.last_name,
                    "completed_targets": d.poatarget_completed_list.map(c => (
                        c.title
                    )),
                    "targets": d.poatarget_incomplete_list.map(t => ({
                        "target_id": t.id,
                        "target_title": t.title,
                        "target_completed_status": t.completed_status
                    }))
                }))
                setPoas(poas_data);
            })
    }

    return (
        <div className="my_poa_mentor sec__one">
            <h1>My Mentees' POAs</h1>

            {poas.map(poa => (
                <Checkboxes
                    title={poa.poa_title}
                    firstName={poa.mentee_first}
                    lastName={poa.mentee_last}
                    checkList={poa.targets}
                    completed={poa.completed_targets}
                />
            ))}
        </div>
    )
}

export default MyPOAMentor;
