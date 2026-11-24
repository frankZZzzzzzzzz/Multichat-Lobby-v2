export type AuthContextType = {
  userID: string | null;
  setUserID: (userId: string) => void;
  refreshUser: () => void;
  logout: () => void;
};
export type AuthenticationResult = AuthenticationSuccess | AuthenticationFailure
export type AuthenticationSuccess = {
  success: true;
  sessionToken: string;
}
export type AuthenticationFailure = {
  success: false;
  error: "Invalid" | "Authentication Error";
}
export type SessionValidationResult = {
  valid: true;
  userID: string;
} | {
  valid: false;
}