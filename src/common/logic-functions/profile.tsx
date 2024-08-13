import axios from "axios"
import { user_profile, user_profile_update } from "../api/api"
import { config } from "../api/token"
import { ProfileDataTypes } from "../../types/profile"

export const getUserData = async (setUserData: (val: ProfileDataTypes) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    try {
        const { data } = await axios.get(user_profile, config);
        if (data.success) {
            setUserData(data.body);
            setIsLoading(false)
        } else setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        console.log(error);

    }
}

export const updateUserData = async (userData: ProfileDataTypes, attachmentId: number, setUserData: (val: ProfileDataTypes) => void, setIsLoading: (val: boolean) => void) => {
    const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        fileId: attachmentId,
        street: userData.street,
        districtId: userData.districtId
    }
    setIsLoading(true)
    try {
        const { data } = await axios.put(user_profile_update, payload, config);
        if (data.success) {
            getUserData(setUserData, setIsLoading);
        } else setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        console.log(error);
    }
}