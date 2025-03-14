export interface AuthResponse {
  user: {
    Id: number;
    Name: string;
    Email: string;
    Role: number;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} 