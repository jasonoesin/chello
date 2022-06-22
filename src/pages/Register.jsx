import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { app, db } from "../firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const auth = getAuth();

const color = () => {
  return [
    {
      name: "",
      color: "bg-green-400",
    },
    {
      name: "",
      color: "bg-yellow-400",
    },
    {
      name: "",
      color: "bg-orange-400",
    },
    {
      name: "",
      color: "bg-red-400",
    },
    {
      name: "",
      color: "bg-blue-400",
    },
  ];
};

const Register = () => {
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    if (
      e.target.name.value.length === 0 ||
      e.target.email.value.length === 0 ||
      e.target.pass.value.length === 0 ||
      e.target.conf.value.length === 0
    )
      return;

    if (e.target.pass.value !== e.target.conf.value) return;

    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.pass.value
    )
      .then((cred) => {
        // Signed in
        console.log(e.target.email.value);
        setDoc(doc(db, "user", cred.user.uid), {
          email: e.target.email.value,
          id: cred.user.uid,
          name: e.target.name.value,
          labels: color(),
        });
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="flex">
      <div className="!LEFT bg-[url('../public/bg.jpg')] w-1/4 h-screen bg-cover"></div>
      <div className="!RIGHT relative grow bg-gradient-to-r from-gray-50 to-gray-300 shadow-xl flex justify-center items-center">
        <form
          onSubmit={signUp}
          className="w-[75rem]  px-72 text-xl font-bold py-32 text-gray-700 flex flex-col space-y-5"
        >
          <p className="text-3xl"> Set up your CHello account</p>
          <input
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            name="name"
            type="text "
            placeholder="Name"
          />
          <input
            name="email"
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            type="text "
            placeholder="Email Address"
          />
          <input
            name="pass"
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            type="password"
            placeholder="Password"
          />
          <input
            name="conf"
            className="text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="px-6 py-2 bg-blue-500 rounded-md w-1/3 text-sm font-semi-bold text-white">
            Register
          </button>
          <div className="bg-gray-400 w-full h-0.5 rounded"></div>
          <p className="text-sm flex flex-row text-gray-400">
            Already have an account ?
            <Link to={"/"} className="ml-1 text-blue-600 cursor-pointer ">
              Login
            </Link>
          </p>
        </form>
      </div>
      {/* <div className="max-w-md w-full mx-auto">
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
      </div> */}
    </div>
  );
};

export default Register;
