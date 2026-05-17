import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    about: user.about,
    gender: user.gender,
    photoUrl: user.photoUrl,
  });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch();

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "photoUrl", label: "Photo Url", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "about", label: "About", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
  ];

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { ...userData },
        { withCredentials: true },
      );
      
      dispatch(addUser(res?.data?.data));
      setShowToast(true)
      setTimeout(()=>{
         setShowToast(false)
      },3000)
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                {fields.map((field) => (
                  <fieldset className="fieldset" key={field.name}>
                    <legend className="fieldset-legend">{field.label}:</legend>
                    <input
                      type={field.type}
                      value={userData[field.name]}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [field.name]: e.target.value,
                        })
                      }
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                ))}
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button onClick={saveProfile} className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ ...userData }} />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
