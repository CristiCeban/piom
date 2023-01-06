export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserReturnData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    role: 'teacher' | 'student';
  };
}
