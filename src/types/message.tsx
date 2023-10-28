interface whom {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}


interface MessageType {
  answer: string;
  show: false;
  _id: string;
  title: string;
  message: string;
  whom: whom;
  user: string;
}

export default MessageType;