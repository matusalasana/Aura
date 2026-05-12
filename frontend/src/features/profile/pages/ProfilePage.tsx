import { useGetMe } from "../hooks/useGetMe";
import LogoutButton from "../components/LogoutButton"
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
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
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;