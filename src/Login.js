import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase-config";

const auth = getAuth();
function signIn(e) {
  e.preventDefault();
  signInWithEmailAndPassword(auth, e.target.email.value, e.target.pass.value)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

const Login = () => {
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
              />
              <label htmlFor="" className="ml-2 text-sm text-gray-600">
                Remember Me
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
