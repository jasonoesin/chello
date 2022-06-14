import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { app } from "../firebase-config";

const auth = getAuth();

function showPass() {
  var box = document.getElementById("password");
  if (box.type === "password") box.type = "text";
  else box.type = "password";
}

const Login = () => {
  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, e.target.email.value, e.target.pass.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("OK");
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
        <div className="text-center font-medium text-3xl">Log-in</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" onSubmit={signIn} className="space-y-6">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="h-4 w-4 text-blue-300 rounded"
                onClick={showPass}
              />
              <label htmlFor="" className="ml-2 text-sm text-gray-600">
                Show Password
              </label>
            </div>
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

export default Login;
