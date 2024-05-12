import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { RiUserAddLine } from "react-icons/ri";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/todos");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/todos");
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

    // Additional function to handle onFocus event on password fields
    const handlePasswordFocus = (e) => {
      // Prevents the browser from suggesting autofill
      e.target.removeAttribute("readonly");
    };

  return (
    <div className="container mx-auto p-4 pt-6 pb-8 flex flex-col mt-[7rem]">
      <h2 className="text-2xl text-black font-bold  2xl:ml-[40rem] xl:ml-[35rem] lg:ml-[25rem] md:ml-[20rem] sm:ml-[18rem] min-[0px]:ml-[15rem]">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-between py-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 m-2 border border-sm solid border-black"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 m-2 border border-sm solid border-black"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 m-2 border border-sm solid border-black"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-[50%] p-2 pl-10 text-sm text-gray-700 mb-4 border border-sm solid border-black"
          onFocus={handlePasswordFocus}
          // Initially set the input as readonly to prevent autofill
          readOnly
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <RiUserAddLine className="font-bold" /> Register
        </button>
      </form>
    </div>
  );
};

export default Register;
