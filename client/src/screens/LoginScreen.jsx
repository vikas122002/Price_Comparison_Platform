import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {useLoginMutation} from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useForgotPasswordMutation } from "../slices/userApiSlice"
export default function LoginScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, { isLoading }] = useLoginMutation()
    const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation()
    const handleLogin = async e => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate("/")
            toast.success("Login Successful")
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
            //toast.error("invalid login")
        }
    }
    const handleForgotPassword = async () => {
        if (!email) alert("Please enter your email")
        else {
            try {
                const res = await forgotPassword({ email }).unwrap()
                toast.success(res.message)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }


  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100')]
    ">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                        />
                </div>
                <p className="mt-1">
                    Forgot Password?{' '}
                    <span className="text-blue-500 cursor-pointer" 
                    onClick={handleForgotPassword}>
                        Click here
                    </span>
                </p>
                {isLoadingPassword && <Spinner />}
                <button
                    type='submit'
                    className="bg-gray-500 w-40 text-white px-4 py-2 rounded-md mt-4 hover:bg-pink-500"
                    onClick={handleLogin}
                    disabled={isLoading}
                    >
                    Login
                    </button>
                {/* <button
                    type='button'
                    className="bg-pink-500 text-white px-4 py-2 rounded-md mt-4 ml-3 hover:bg-gray-500"
                    >
                    Sign in with Google
                </button> */}
                {isLoading && <Spinner />}
                </form>
            <p className="mt-4">
                Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
            </p>
        </div>
  )
}
