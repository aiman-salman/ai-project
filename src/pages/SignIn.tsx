import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import bicyclego_icon from '../assets/bicyclego_icon.svg'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Signed in successfully ✅", {
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

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signed in with Google ✅", {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-[#1f1f1f] px-4">
      <div className="flex flex-row justify-center gap-3 items-center mb-6">
        <img src={bicyclego_icon} alt="Bicycle Go logo" className="h-16 w-auto mb-2" />
        <h1 className="text-3xl font-bold text-sky-300">BicycleGo</h1>
      </div>
      <div className="w-full max-w-md border-2 border-gray-500 p-6 rounded-lg shadow-lg">
        <ToastContainer />
        <h2 className="text-sky-300 font-bold text-2xl text-center mb-6">Sign In</h2>
        <form onSubmit={signInUser}>
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
            Sign In
          </button>
        </form>

        <button
          onClick={signInWithGoogle}
          className="mt-4 w-full py-2 border border-sky-300 text-gray-300 rounded-full hover:bg-gray-300 hover:text-[#2a2a2a] font-semibold transition duration-200"
        >
          Sign in with Google
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-sky-300 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn


// import { useState } from "react"
// import { useNavigate } from 'react-router-dom'
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { app } from '../firebase'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const allowedEmail = "misha3@gmail.com"
// const allowedPassword = "misha123"
// const allowedGoogleEmail = "mukhtarmisha5@gmail.com"

// const SignIn = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const signInWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     if (email !== allowedEmail || password !== allowedPassword) {
//       toast.error("Access denied: Only authorized user can login ❌", {
//         position: "top-right",
//         autoClose: 3000,
//       })
//       return
//     }

//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         toast.success("Signed in successfully ✅", {
//           position: "top-right",
//           autoClose: 2000,
//         })
//         setTimeout(() => navigate('/dashboard'), 2000)
//       })
//       .catch((err) => {
//         toast.error(`Error: ${err.message}`, {
//           position: "top-right",
//           autoClose: 3000,
//         })
//       })
//     }

//   const signInWithGoogle = () => {
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         const user = result.user
//         if (user.email === allowedGoogleEmail) {
//           toast.success("Signed in with Google ✅", {
//             position: "top-right",
//             autoClose: 2000,
//           })
//           setTimeout(() => navigate('/dashboard'), 2000)
//         } else {
//           auth.signOut()
//           toast.error("Access denied: Only authorized user can login ❌", {
//             position: "top-right",
//             autoClose: 3000,
//           })
//         }
//       })
//       .catch((err) => {
//         toast.error(`Error: ${err.message}`, {
//           position: "top-right",
//           autoClose: 3000,
//         })
//       })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
//       <div className="w-full max-w-md border-2 border-gray-500 p-6 rounded-lg shadow-lg">
//         <ToastContainer />
//         <h2 className="text-cyan-200 font-bold text-2xl text-center mb-6">Sign In</h2>

//         <form onSubmit={signInWithEmail}>
//           <div className="mb-4">
//             <label className="text-gray-300 block mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-500 rounded-full bg-[#2a2a2a] text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="text-gray-300 block mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-500 rounded-full bg-[#2a2a2a] text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-cyan-200 hover:bg-cyan-300 text-[#2a2a2a] font-semibold rounded-full transition duration-200"
//           >
//             Sign In with Email
//           </button>
//         </form>

//         <button
//           onClick={signInWithGoogle}
//           className="mt-4 w-full py-2 border border-cyan-200 text-gray-300 rounded-full hover:bg-white hover:text-black transition duration-200"
//         >
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   )
// }

// export default SignIn

