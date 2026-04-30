import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getColleges = (search = "") =>
  API.get(`/colleges?search=${search}`);

export const getCollegeById = (id) =>
  API.get(`/colleges/${id}`);   