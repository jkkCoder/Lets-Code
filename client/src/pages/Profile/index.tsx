import React, { useEffect, useState } from "react";
import { API, ProfileDataInterface } from "../../utils/API";
import { useAppSelector } from "../../redux/storeHook";
import UserData from "./components/UserData";
import UserStatistics from "./components/UserStatistics";
import SolvedQuestions from "./components/SolvedQuestions";
import {
  capitalizeFirstLetter,
  deleteToastMessage,
} from "../../utils/constants";
import { useParams } from "react-router-dom";
import BookMarks from "./components/BookMark";
import { ToastContainer } from "react-toastify";
import { MdEdit } from "react-icons/md";
import EditProfileModal from "./components/EditProfileModal";

const Profile = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.user);

  const [userData, setUserData] = useState<ProfileDataInterface>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    if (!params?.id) {
      return;
    }
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await API.get("/user/profile/" + params?.id);
        setUserData(res?.data);
      } catch (err) {
        deleteToastMessage(err?.response?.data?.message || "SERVER ERROR");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [params]);

  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className=" mt-10 flex-row md:flex h-screen"
    >
      <div className="w-[100%] md:w-1/2">
        <div className="mx-0 md:mx-5 lg:mx-20 h-1/2">
          <div className="flex flex-row">
            <p className="font-bold text-lg">
              {capitalizeFirstLetter(userData?.userData?.fullName || "")}{" "}
              Details
            </p>
            <div
              className="flex ml-2 items-center cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              <MdEdit />
            </div>
          </div>
          <UserData
            isLoading={isLoading}
            userName={userData?.userData?.userName}
            fullName={userData?.userData?.fullName}
            emailId={userData?.userData?.email}
          />
        </div>
        <div className="mx-0 md:mx-5 lg:mx-20 ">
          <UserStatistics
            isLoading={isLoading}
            solvedStatistics={userData?.solvedStatistics}
          />
        </div>
      </div>
      <div className="w-[100%] md:w-1/2">
        <div className="h-1/2">
          <SolvedQuestions
            isLoading={isLoading}
            solvedQuestions={userData?.solved}
          />
        </div>
        {params.id === user._id && (
          <div className="h-1/2  mb-5 md:mb-0">
            <BookMarks />
          </div>
        )}
      </div>
      {showProfileModal && (
        <EditProfileModal
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </div>
  );
};

export default Profile;
