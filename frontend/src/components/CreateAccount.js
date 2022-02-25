import React from 'react';
import {Button} from 'reactstrap';

const CreateAccount = () => {
      return (
        <div className="create_account sec__one">
          <h1> Create Account </h1>
          <form method="post" >
          <label>
                <h4>First Name: </h4> 
                <input type="text" name="name" />
                <br></br>
                <h4>Second Name: </h4>
                <input type="text" name="name" />
            </label>

            <br></br>

            <table>
              <tr>
                <td>&nbsp;</td>
                <td><input type="submit" value="Log in"/></td>
              </tr>                
            </table>
          </form>
        </div>
      )
}

export default CreateAccount
