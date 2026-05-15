import { useGetMe } from "../hooks/useGetMe";
import LogoutButton from "../components/LogoutButton"

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useGetMe();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !user) {
    return <p>Error man</p>;
  }

  return (
    <div>
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;