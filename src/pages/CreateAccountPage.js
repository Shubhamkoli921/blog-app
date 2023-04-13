import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
const CreateAccountPage = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword,SetConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const CreateAccount = async ()=>{
        try{
            if(password !== confirmpassword){
                setError('Password and Confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(),email, password);
            <h1>Hello ${setEmail}Account Successfully Created </h1>
            navigate('/articles');

        }
        catch(e){
            setError(e.message);
        }
    }
    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
              <input
            type="password"
            placeholder="Confirm Your password"
            value={confirmpassword}
            onChange={e => SetConfirmPassword(e.target.value)} />
        <button onClick={CreateAccount}>Create Account</button>
        <br></br>
        <Link to="/login">Already Have an account, login here</Link>
        </>
    );
}

export default CreateAccountPage;