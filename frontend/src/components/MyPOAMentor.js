import axios from "axios";
import React, {useEffect, useState} from 'react';
import Checkboxes from './Checkboxes';


const MyPOAMentor= () => {
    const [poas, setPoas] = useState([]);

    useEffect(() => {
        get_poas();
      }, []);

    const get_poas = () =>{
        const user_profile_id = JSON.parse(localStorage.getItem("user")).id;
        var url = "http://127.0.0.1:8000/POA/?profile_id="+user_profile_id+"&m_value=m2";
        axios
        .get(url)
        .then(response => {
        const data = response.data;

        const poas_data = data.map(d => ({
            "poa_title" : d.poa.title, /*index 2 is the title*/
            "mentee_first" : d.mentee.first_name,
            "mentee_last" : d.mentee.last_name,
            "completed_targets" : d.poatarget_completed_list.map(c => (
                c.title
            )),
            "targets" : d.poatarget_incomplete_list.map(t =>({
                "target_id" : t.id,
                "target_title" : t.title,
                "target_completed_status" : t.completed_status
            }))
        }))
        setPoas(poas_data);
        console.log(poas_data);
        })
    }

    return (
        <div className="my_poa_mentor sec__one">
            <h1> My POA Mentor </h1>

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

export default MyPOAMentor
