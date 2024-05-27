import axiosInstance from "./axiosInstance";
import { HttpRes, UserProfile } from "../types/types";
export const signUp = async (userData: UserProfile): Promise<HttpRes> => {
    try {
        const response = await axiosInstance.post("/signup", userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}