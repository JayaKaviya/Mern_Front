import {SyncOutlined} from "@ant-design/icons"
import ProfileUpdate from "../../pages/user/profile/update.mjs"
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBSelect,MDBText } from 'mdb-react-ui-kit';


const ForgotPasswordForm =({
   handleSubmit, 
  
   email,setEmail,
   newPassword,setNewPassword,
   secret,setSecret, 
   loading, 
   page, 
   username,setUsername, 
   about,setAbout,  
   profileUpdate,

})=>( 
    <form onSubmit={handleSubmit}>  
    



    <MDBInput wrapperClass='mb-4'  id='formControlLg' type='email' size="lg"
    value={email}
    onChange={ (e) => setEmail(e.target.value)}
  className="form-control" 
  
  placeholder="Enter email"
   disabled={profileUpdate} 
   />
<MDBInput wrapperClass='mb-4'  id='formControlLg' type='password' size="lg" 
value={newPassword}
onChange={ (e) => setNewPassword(e.target.value)}
className="form-control" 

placeholder="Enter new password"/>

        <>
        <select className="form-control form-control-lg" id="formControlLg" size="lg" >
            <option >What is your dream vacation destination?</option>
  <option >If you could time travel, which era would you visit first?</option>
  <option >What fictional character do you most identify with?</option>
  <option>If you could possess any superpower, what would it be?</option>
 
  <option >What was the first concert you ever attended?</option>
</select>
<label className="form-text text-muted" size="sm">
Please choose the same secret question you selected during account creation and provide the same answer to reset the password.
</label>
      
        <div> 
            {" "}
            <br/>
        </div> 

        <MDBInput wrapperClass='mb-4'  id='formControlLg' type='text' size="lg" 
 value={secret}
 onChange={ (e) => setSecret(e.target.value)}

className="form-control" 
placeholder="Write your answer here"/>
    </> 
    
    
    <button className="mb-0 px-5"
    disabled={!email || !newPassword || !secret || loading
    } 
    style={{ 
      width: '180px', 
      height:'40px',
      backgroundColor: '#F50057', // Primary Color
      color: 'white', // Text color
      border: 'none', // No border
      borderRadius: '5px', // Rounded corners
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow
    }} data-mdb-ripple-init
    >
      {/* Submit */} 
      {loading ? <SyncOutlined spin className="py-1"/> : "Submit"}
      </button>
     
  </form> 
) 
export default ForgotPasswordForm;