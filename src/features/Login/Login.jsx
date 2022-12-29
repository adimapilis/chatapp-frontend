import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContext';
import { logIn } from '../../api/authRequest';
import { getUser } from '../../api/userRequest';
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: ""})

  
  const { setAccessToken, setCurrUser,} = useContext(MainContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value , id } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = () => {
    const submitLogin = async () => {
      console.log(formData)
      try {
        const { data } = await logIn(formData);
        console.log(data)
        localStorage.setItem('accessToken', data.accessToken)
        setAccessToken(data.accessToken)
        const User = await getUser(data.userId,data.accessToken)
        setCurrUser(User.data)
        navigate('/content')
      } catch (error) {
        console.log(error);
      }
    }
    submitLogin()
  }

  return (

      <div>
      <h2 className = "login-header">
        Login Account
      </h2>
      <form className = "login-form" onSubmit={e => e.preventDefault()}>
        <input
          id="username"
          type="text"
          className="username"
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          className="password"
          placeholder='Password'
          onChange={handleChange}
        />
        <button className="login-button" onClick={handleSubmit}>
          Login
        </button>
        <h4 >
          Don't have an account?&nbsp;
          <Link to="/register" >
            Signup
          </Link>
          </h4>
      </form>
    </div>
  )
}

export default Login