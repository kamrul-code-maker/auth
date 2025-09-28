import { UserInfo } from "@/components/auth/user-info";


// ✅ Dummy user data
const DUMMY_USER = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
  isTwoFactorEnabled: true,
};

const ServerPage = () => {
  return (
    <UserInfo
      label="💻 Server component (dummy)"
      user={DUMMY_USER}
    />
  );
}

export default ServerPage;
