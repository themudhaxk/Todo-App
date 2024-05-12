import { useUpdateProfileMutation } from "../redux/api/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

const Profile = () => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    // Clear password fields whenever userInfo changes
    setPassword("");
    setConfirmPassword("");
  }, [userInfo]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await updateProfile({ name: profile.name, email: profile.email });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User successfully updated");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  // Additional function to handle onFocus event on password fields
  const handlePasswordFocus = (e) => {
    // Prevents the browser from suggesting autofill
    e.target.removeAttribute("readonly");
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="form-input p-4 rounded-sm w-full border border-black"
                id="name"
                placeholder="Enter name..."
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="form-input p-4 rounded-sm w-full border border-black"
                id="email"
                placeholder="Enter email..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                className="form-input p-4 rounded-sm w-full border border-black"
                id="password"
                placeholder="Enter password..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                // Initially set the input as readonly to prevent autofill
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                className="form-input p-4 rounded-sm w-full border border-black"
                id="confirmPassword"
                placeholder="Confirm password..."
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                // Initially set the input as readonly to prevent autofill
                readOnly
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        {isUpdating && <Spinner />}
      </div>
    </div>
  );
};

export default Profile;
