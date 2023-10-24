import axios from "axios";
import { QuestionSlice } from "../redux/questionSlice";

const API_DEV_ENDPOINT = 'http://127.0.0.1:5000'
const API_PROD_ENDPOINT = ''

export const ENDPOINT = process.env.NODE_ENV === 'development' ? API_DEV_ENDPOINT: API_PROD_ENDPOINT

export const API = axios.create({
    baseURL: ENDPOINT,
    timeout: 30000,
})

export const APIH = axios.create({
    baseURL: ENDPOINT,
    timeout: 30000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
    },

})

export interface ProfileDataInterface {
    success: boolean;
    solvedStatistics : {
      easySolved: number;
      hardSolved: number;
      mediumSolved: number;
      totalEasy: number;
      totalHard: number;
      totalMedium: number;
      unSolved: number;
    }
    userData: {
        userName: string
        email: string    
        fullName: string
    };
    solved: {
       easy: QuestionSlice[];
       medium: QuestionSlice[];
       hard: QuestionSlice[];
    }
  }