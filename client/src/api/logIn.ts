import axiosInstance from "./axiosInstance";
import { HttpRes, UserProfile } from "../types/types";

export const logIn = async (userData: UserProfile): Promise<HttpRes> => {
    try {
        const response = await axiosInstance.post("/login", userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}