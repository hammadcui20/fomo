import axios from 'axios';

// export const API_URL = 'http://192.168.100.108:8000/api'; // Replace with your backend URL
export const API_URL='http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api';
export const API_KEY='AIzaSyCcFx_90zwi6oVR8DDcuEG7Z0xSxyl-8Kg';
const stripePublishableKey='pk_test_51PPhmkLKze7NlucB5Pw3DlLbFYkw2vWOuNaSIenOwiZCoTBpCf3eZVFZsrbzfhaYJZ895Cja24BFFGuVi6mu3EDf00kgzSjaVn';
const stripeSecretKey='sk_test_51PPhmkLKze7NlucByKvDuBQFdez53Q4FJCsNLb6nZlsq2wWS6b1NVtt3wtW9uqABlGbrfdhvCdKInn0CjubMC4ig00pO5iPvIi';
export const androidId="1091146074355-6r2jkg4r73t3sc9ail3o3npcve5m8lt5.apps.googleusercontent.com";
export const iosId="1091146074355-ijp5oifauoqr06ou6c2ga5q0v8qeevfd.apps.googleusercontent.com";


export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const googleCreateUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/google/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const loginUser = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/user/user-login`,  userData);
      console.log(response.data);
      return response.data;

    } catch (error) {
      console.log(error);
      throw error.response.data;
  }
};
export const googleLoginUser = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/user/google/user-login`,  userData);
      // console.log(response.data);
      return response.data;

    } catch (error) {
      // console.log(error);
      throw error.response.data;
  }
};
export const checkUserProfileData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-profile`, {
      params: { userId }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const insertUserProfileData = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_URL}/user/insert-profile`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkUserLocationData = async (userId) => {
    console.log(userId);
    try{
      const response =await axios.get(`${API_URL}/user/check-location`, {
        params: { userId }
      });
      console.log(response.data);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
};
export const insertUserLocationData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user/insert-location`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const getUserData= async (userId) => {
  try{
    const response = await axios.get(`${API_URL}/user/data`, {
      params: { userId }
    });
    return response.data;
  }
  catch(error){
    throw error.response.data;
  }
};
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/user/add/event`, eventData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/event/all`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const joinEvent=async(data)=>
  {
    try {
      const response = await axios.post(`${API_URL}/user/event/join`, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }