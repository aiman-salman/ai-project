import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const auth = getAuth(app)

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Account created successfully ✅", {
          position: "top-right",
          autoClose: 2000,
        })
        setTimeout(() => navigate('/dashboard'), 2000)
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
        })
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#1f1f1f] px-4">
      <div className="w-full max-w-md border-2 border-gray-500 p-6 rounded-lg shadow-lg">
        <ToastContainer />
        <h2 className="text-cyan-200 font-bold text-2xl text-center mb-6">Sign Up</h2>
        <form onSubmit={createUser}>
          <div className="mb-4">
            <label className="text-gray-300 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-500 rounded-full bg-[#2a2a2a] text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-300 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-500 rounded-full bg-[#2a2a2a] text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-sky-300 hover:bg-sky-400 text-[#2a2a2a] font-semibold rounded-full transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-sky-300 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp



