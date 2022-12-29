import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../api/authRequest';
import "./Register.css"

const Register = () => {
  const [form, setForm] = useState({ username: "", password: ""})

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value , id } = e.target
    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const onSubmit = () => {
    console.log(form)
    const submitSignup = async () => {
      try {
        const { data } = await signUp(form);
        console.log(data)
        navigate('/login')
      } catch (error) {
        console.log(error);
      }
    }
    submitSignup()

  }

  return (

      <div>
      <h2>
        Register Account
      </h2>
      <form className="register-form" onSubmit={e => e.preventDefault()}>
        <input
          id="username"
          type="text"
          placeholder='Username'
          className='username'
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder='Password'
          className='password'
          onChange={handleChange}
        />
        <button className="register-button" onClick={onSubmit}>
          Sign up
        </button>
        <h4 >
          Already have an account?&nbsp;
          <Link to="/login" >
            Login
          </Link>
          </h4>
      </form>
    </div>
  )
}

export default Register