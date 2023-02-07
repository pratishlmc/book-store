import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import Image from "next/image";

export default function User() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();

  if (!user){
      return (
          <div onClick={() => route.push(`/api/auth/login`)}>
              <FaUserCircle className="profile" />
              <h3>Login</h3>
          </div>
      );
  }
  if (route.query.uid !== user.sub){
      return (
          <Profile onClick={() => route.push(`/user/${user.sub}/`)}>
              <Image src={user.picture} width={45} height={45} alt={user.name} />
          </Profile>
      );
  }

}

const Profile = styled.div`
  img {
    border-radius: 50%;
  }
`;
