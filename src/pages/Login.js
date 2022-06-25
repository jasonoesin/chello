import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { app } from "../firebase-config";
import { toast } from "react-toastify";
const auth = getAuth();

function showPass() {
  var box = document.getElementById("pass");
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
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Wrong email or password !", {
          position: "bottom-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <div className="flex">
      <div className="!RIGHT relative grow bg-gradient-to-l from-gray-50 to-gray-300 shadow-xl flex justify-center items-center">
        <form
          onSubmit={signIn}
          className="w-[75rem]  px-72 text-xl font-bold py-32 text-gray-700 flex flex-col space-y-5"
        >
          <p className="text-3xl"> Login with CHello account</p>
          <input
            name="email"
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            type="text "
            placeholder="Email Address"
          />
          <input
            id="pass"
            name="pass"
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            type="password"
            placeholder="Password"
          />
          <button className="px-6 py-2 bg-blue-500 rounded-md w-1/3 text-sm font-semi-bold text-white">
            Log-in
          </button>
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
          <div className="bg-gray-400 w-full h-0.5 rounded"></div>

          <p className="text-sm flex flex-row text-gray-400">
            Don't have an account ?
            <Link
              to={"/register"}
              className="ml-1 text-blue-600 cursor-pointer "
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <div className="!LEFT bg-[url('../public/bg.jpg')] w-1/4 h-screen bg-cover"></div>

      {/* <div className="">
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
      </div> */}
    </div>
  );
};

export default Login;
