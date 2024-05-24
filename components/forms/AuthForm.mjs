
import { MDBInput } from 'mdb-react-ui-kit';

const AuthForm =({
   handleSubmit, 
   name,setName, 
   email,setEmail,
   password,setPassword,
   secret,setSecret, 
   loading, 
   page, 
   username,setUsername, 
   about,setAbout,  
   profileUpdate,

})=>(  
    
    <form onSubmit={handleSubmit}>  
    
    {profileUpdate && ( 
      
      
    <MDBInput wrapperClass='mb-4'  id='formControlLg' type='text' size="lg"
    value={username}
            onChange={ (e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Enter username"
   
   />

    
    
)}

    {profileUpdate && (     <MDBInput wrapperClass='mb-4'  id='formControlLg' type='text' size="lg"
    value={about}
            onChange={ (e) => setAbout(e.target.value)}
            className="form-control"
            placeholder="Write about yourself..."
   
   />
   

)}


    {page !== "login" && ( 

                  
    <MDBInput wrapperClass='mb-4'  id='formControlLg' type='text' size="lg"
    value={name}
    onChange={ (e) => setName(e.target.value)}
    className="form-control form-control-lg"
    placeholder="Enter name"
   />



)} 

    

    <MDBInput wrapperClass='mb-4'  id='formControlLg' type='email' size="lg"
    value={email}
    onChange={ (e) => setEmail(e.target.value)}
  className="form-control" 
  
  placeholder="Enter email"
   disabled={profileUpdate} 
   />


<MDBInput wrapperClass='mb-4'  id='formControlLg' type='password' size="lg" 
value={password}
onChange={ (e) => setPassword(e.target.value)}
className="form-control" 

placeholder="Enter password"/>



    {page !=="login" && 
        <> 

       
        
            <select className="form-control form-control-lg" id="formControlLg" size="lg" >
            <option >What is your dream vacation destination?</option>
  <option >If you could time travel, which era would you visit first?</option>
  <option >What fictional character do you most identify with?</option>
  <option>If you could possess any superpower, what would it be?</option>
 
  <option >What was the first concert you ever attended?</option>
</select>
<label className="form-text text-muted" size="sm">
  In case you forget your password, you can utilize this option to reset it.
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
    }
    <div className={`form-group p-2 ${profileUpdate ? 'd-flex justify-content-center' : ''}`}>
    <button 
  className="mb-0 px-5"
  size='md' 
  disabled={ 
    profileUpdate ? loading : 
    page === "login" 
      ? !email || !password || loading
      : !name || !email || !password || !secret || loading 
  }
  style={{ 
    width: '180px', 
    height:'40px',
    backgroundColor: '#F50057', // Primary Color
    color: 'white', // Text color
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow
  }} 
  data-mdb-ripple-init
>
  Submit 
</button> 
</div>

      

  </form>  
  
) 
export default AuthForm ;