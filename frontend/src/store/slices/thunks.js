import { setHabits } from "./habitSlice";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";

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

export const loginUser = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        // credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username":username,
            "password":password
        })
      });
  
      if (!response.ok) {
        // Si el status no está en el rango 200-299, lanza error
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }
  
      const data = await response.json();
      dispatch(loginSuccess(data)); // { message, token }
  
      // Si quieres guardar el token en localStorage:
      localStorage.setItem("token", data.token);
  
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };