import React from 'react'

const handleSubmit = async() => {
  alert("hello");
}

const CreateAccount = () => {
      return (
        <div className="create_account sec__one">
          <h1> Create Account </h1>
          <form method="post" onSubmit={handleSubmit}>
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
