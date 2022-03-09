import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const ToggleAdminButton = props => {
    const toggleAdmin = async () => {
        try {
            const response = await axios({
                method: "PATCH",
                url: "http://localhost:8000/REPLACETHIS/" + props.id.toString(),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create_poa_mentor sec__one">
            {props.type == "toggleAdmin" &&
                <Button
                    color="primary"
                    onClick={e => {
                        e.preventDefault();
                        toggleAdmin();
                    }}
                >
                    Toggle Admin
                </Button>
            }
            {props.type == "toggleInactive" &&
                <Button color="primary">Toggle Inactivity Status</Button>
            }
        </div>
    )
}

export default ToggleAdminButton