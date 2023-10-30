interface User {
  role: string;
  fields: string[];
  client: boolean;
  _id: string;
  firstName: string;
  photo: string;
  lastName: string;
  username: string;
  password: string;
  createdAt: string;
}

export default User;
