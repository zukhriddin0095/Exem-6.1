import PhotoType from "./photo";
import User from "./user";

interface ProtfoliosType {
  name: string;
  url: string;
  description: string;
  _id: string;
  photo: PhotoType;
  user: User;
}

export default ProtfoliosType;


 