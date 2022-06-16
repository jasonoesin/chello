import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
const auth = getAuth();

const Register = () => {
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.pass.value
    )
      .then((cred) => {
        // Signed in
        console.log(e.target.email.value);
        addDoc(collection(db, "user"), {
          email: e.target.email.value,
          uid: cred.user.uid,
        });
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-3xl">Sign-up</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" onSubmit={signUp} className="space-y-6">
          <div className="">
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="">
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              id="password"
              name="pass"
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
