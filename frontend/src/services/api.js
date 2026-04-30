import axios from "axios";

const API = axios.create({
  baseURL: "https://college-platform-4xz6.onrender.com/api"
});

export const getColleges = (search = "") =>
  API.get(`/colleges?search=${search}`);

export const getCollegeById = (id) =>
  API.get(`/colleges/${id}`);