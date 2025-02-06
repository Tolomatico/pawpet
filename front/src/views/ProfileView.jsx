import { useUser } from "../hooks/useUser";
import ProfileOwner from "../components/ui/ownerprofile/ProfileOwner";
import ProfileCaretaker from "../components/ui/caretakerprofile/ProfileCaretaker";

function ProfileView() {
  const { user } = useUser();
  const role=user?.role
  if (!user) return <p>Cargando...</p>;

  return (  
    <>
      {
        role==="owner" &&  <ProfileOwner user={user}/>  

      }
      {
        role==="caretaker" &&  <ProfileCaretaker user={user}/>  

      }


        </>
  );
}

export default ProfileView;