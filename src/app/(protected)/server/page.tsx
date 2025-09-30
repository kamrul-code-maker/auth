import { UserInfo } from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";


// ✅ Dummy user data
const DUMMY_USER = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
  isTwoFactorEnabled: true,
};

const ServerPage =   async() => {
    const user = await currentUser();
  
  return (
    <UserInfo
      label="💻 Server component"
      user={user}
    />
  );
}

export default ServerPage;
