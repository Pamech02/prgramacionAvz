import { setHabits } from "./habitSlice";
import { loginStart, loginSuccess, loginFailure, logout } from "./userSlice";

export const getHabits = (token) => {
  return async (dispatch) => {
      try {
          const resp = await fetch('http://localhost:5000/api/habits', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });

          const data = await resp.json();
          dispatch(setHabits(data));
      } catch (error) {
          console.error("Error fetching habits data:", error);
          dispatch(setFormsError("Failed to fetch habits data."));
      }
  };
};

export const loginUser = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username":username,
            "password":password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }
  
      const data = await response.json();
      dispatch(loginSuccess(data)); 
  
      localStorage.setItem("token", data.token);
  
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  export const registerUser = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username":username,
            "password":password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }
  
      const data = await response.json();
      dispatch(loginSuccess(data)); 
  
      localStorage.setItem("token", data.token);
  
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  export const loadTokenFromStorage = () => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess({ token }));
    }
  };

  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token'); 
    dispatch(logout());
  };