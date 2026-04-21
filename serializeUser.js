export function serializeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    rollNumber: user.rollNumber,
    department: user.department,
    role: user.role,
  };
}
