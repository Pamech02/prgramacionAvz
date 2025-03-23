import { setHabits } from "./habitSlice";

export const getHabits = () => {
    return async (dispatch) => {
        try {
            const resp = await fetch('http://localhost:5000/api/habits');
            const data = await resp.json()
            console.log('data', data)
            dispatch(setHabits(data))
        } catch (error) {
            console.error("Error fetching forms data:", error);
            // dispatch(setFormsError("Failed to fetch forms data."));
        }
    };
};