import { RiLoginBoxLine } from "react-icons/ri";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { search } = useLocation();
  // const sp = new URLSearchParams(search);
  // const redirect = sp.get("redirect") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setEmail("");
      setPassword("");
      console.log(res);
      navigate("/"); // Navigate to the redirect page after successful login
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  if (isError) {
    toast.error("");
  }

  if (isLoading) {
    return <Spinner />;
  }

  // Additional function to handle onFocus event on password fields
  const handlePasswordFocus = (e) => {
    // Prevents the browser from suggesting autofill
    e.target.removeAttribute("readonly");
  };

  return (
    <div className="flex flex-col mt-[7rem] container mx-auto p-4 pt-6 pb-8 rounded">
      <h2 className="text-2xl text-black font-bold 2xl:ml-[40rem] xl:ml-[35rem] lg:ml-[25rem] md:ml-[20rem] sm:ml-[18rem] min-[0px]:ml-[15rem]">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-between py-2"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 mb-4 border rounded-lg border-black"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 mb-4 border border-black  rounded-lg"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <button
          type="submit"
          disabled={isLoading && <Spinner />}
          className="flex items-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <RiLoginBoxLine size={24} /> Login
        </button>
      </form>
      <span className="flex justify-center items-center text-xl font-semibold">
        <p className="text-black">New Customer?</p>
        <button>
          <Link to={"/register"} className="ml-2 text-pink-500 hover:underline">
            Register
          </Link>
        </button>
      </span>
    </div>
  );
};

export default Login;
