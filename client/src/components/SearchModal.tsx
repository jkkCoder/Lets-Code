import React from "react";
import { Link } from "react-router-dom";
import { searchSuggestionAPI } from "../utils/API";

interface SearchResultsInterface {
    isOpen: boolean;
    onRequestClose : () => void;
    searchInput: string;
    searchResults: searchSuggestionAPI
    routeProfile: (id:string) => void;
    routeQuestion: (id:string) => void;
}

const SearchResultsModal = ({ isOpen, onRequestClose, searchInput, searchResults, routeProfile, routeQuestion }: SearchResultsInterface) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen  h-screen flex items-center justify-center z-50">
      <div className="w-screen h-screen bg-black opacity-50 absolute" onClick={onRequestClose} />
      <div className="absolute w-1/2 h-[80vh]">
        <div className="bg-white  h-[80vh] overflow-y-scroll rounded-lg border border-gray-300 shadow-lg ">
          <div className="modal-header p-5 border-b border-gray-300 flex flex-row items-center justify-between">
            <h2>Search Query: "{searchInput}"</h2>
            <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700 ">
              Close
            </button>
          </div>
          <div className="modal-body p-5 h-80vh">
            <ul>
              {searchResults.profile.map((profile) => (
                <li
                  key={profile._id}
                  onClick={() => routeProfile(profile._id)}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>{profile.fullName}</div>
                    <div className="bg-green-200 px-2 py-1 rounded-md">Profile</div>
                  </div>
                </li>
              ))}
              {searchResults.questions.map((question) => (
                <li
                  key={question._id}
                  onClick={() => routeQuestion(question._id)}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>{question.title}</div>
                    <div className="bg-blue-200 px-2 py-1 rounded-md">Question</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsModal;
