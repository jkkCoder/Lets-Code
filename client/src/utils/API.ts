import axios from "axios";
import { UserSlice } from "../redux/userSlice";
import { QuestionSlice } from "../redux/questionSlice";

const API_DEV_ENDPOINT = "http://127.0.0.1:5000";
const API_SOCKET_PROD_ENPOINT = 'https://letscode-4kez.onrender.com'
const API_PROD_ENDPOINT = 'https://letscode.adaptable.app';

export const ENDPOINT =
  process.env.NODE_ENV === "development" ? API_DEV_ENDPOINT : API_PROD_ENDPOINT;

export const SOCKET_ENDPOINT =
  process.env.NODE_ENV === "development" ? API_DEV_ENDPOINT : API_SOCKET_PROD_ENPOINT;

export const API = axios.create({
  baseURL: ENDPOINT,
  timeout: 30000,
});

export const APIH = axios.create({
  baseURL: ENDPOINT,
  timeout: 30000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

export const setAPIHAuthorization = (token: string) => {
  APIH.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export interface searchSuggestionAPI {
  profile: UserSlice[];
  questions: QuestionSlice[];
}
export interface ProfileDataInterface {
  success: boolean;
  solvedStatistics: {
    easySolved: number;
    hardSolved: number;
    mediumSolved: number;
    totalEasy: number;
    totalHard: number;
    totalMedium: number;
    unSolved: number;
  };
  userData: {
    userName: string;
    email: string;
    fullName: string;
  };
  solved: {
    easy: {
      _id: string;
      question: QuestionSlice;
    }[];
    medium: {
      _id: string;
      question: QuestionSlice;
    }[];
    hard: {
      _id: string;
      question: QuestionSlice;
    }[];
  };
}

export interface BookMarkDataInterface {
  success: boolean;
  bookmarks: {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
  }[];
}
