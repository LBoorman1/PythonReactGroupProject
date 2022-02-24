import React from 'react';
import {Button} from 'reactstrap';

const ToggleAdminButton= props => {
    return (
        <div className="create_poa_mentor sec__one">
            {props.type == "toggleAdmin" &&
                 <Button color="primary">Toggle Admin</Button>
               }
            {props.type == "toggleInactive" &&
                 <Button color="primary">Toggle Inactivity Status</Button>
            }
        </div>
    )
}

export default ToggleAdminButton