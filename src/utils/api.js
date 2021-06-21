import axios from 'axios';
import { getAuthHeader } from './auth';

let server = "http://localhost:9000/api/";
if (process.env.NODE_ENV === 'production') {
   server = "http://localhost:9000/api/";
}

const SERVER_URL = server;

export const userNameExists = (userName) => axios.get(
  `${SERVER_URL}user/user-exists/${userName}`
);

export const signUpUser = (userName, password) => axios.post(
  `${SERVER_URL}user/sign-up`,
  { userName, password }
);

export const checkAuth = () => axios.get(
  `${SERVER_URL}user/check-auth`,
  getAuthHeader()
);

export const signInUser = (userName, password) => axios.post(
  `${SERVER_URL}user/sign-in`,
  { userName, password }
);

export const dataPreview = (dataSchema, size) => axios.post(
  `${SERVER_URL}generated-data/preview`,
  { dataSchema, size },
  getAuthHeader()
);

export const generateCSV = (dataSchema, size, filename) => axios.post(
  `${SERVER_URL}generated-data/generate-csv`,
  { dataSchema, size, filename },
  getAuthHeader()
);

export const generateJSON = (dataSchema, size, filename) => axios.post(
  `${SERVER_URL}generated-data/generate-json`,
  { dataSchema, size, filename },
  getAuthHeader()
);

export const saveDataSchema = (dataSchema, name) => axios.post(
  `${SERVER_URL}data-schema/save`,
  { dataSchema, name },
  getAuthHeader()
);