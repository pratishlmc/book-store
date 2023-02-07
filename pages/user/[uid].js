import { useRouter } from "next/router";
import { withPageAuthRequired, getSession, useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import ProfileTable from "../../components/ProfileTable";
import {useQuery} from "urql";
import {GET_SELLERS_QUERY} from "../../lib/query";
import React, {useState} from "react";
import CreateSeller from "../../components/CreateSeller";
import Image from "next/image";
import Head from "next/head";

export default function Profile() {
    const {user, isLoading} = useUser();
    const [activeProfile, setActiveProfile] = useState({});
    const {query} = useRouter();
    const route = useRouter();
    const [results] = useQuery({
        query: GET_SELLERS_QUERY,
        variables: {uid: query.uid},
    });
    const {data, fetching, error} = results;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    //Extract Data
    const res = data.sellers.data[0];

    setTimeout(function () {
        if (query.uid === user?.sub) {
            setActiveProfile(user)
        } else {
            setActiveProfile(res?.attributes)
        }
    })

    if(!activeProfile){
        return (
            <div style={{
                display: "flex",
                justifyContent: "center"

            }}>
                <h1>Sorry, The seller does not exist.</h1>
            </div>
        )
    }

    if(activeProfile){
        return (
            <>
                <Head>
                    <title>Profile - {activeProfile.name}</title>
                </Head>
                <ProfileContainer>
                {
                    activeProfile === user &&
                    <LogoutButton onClick={() => route.push("/api/auth/logout")}>Log out</LogoutButton>
                }
                <Image
                    width={80}
                    height={80}
                    style={{
                        marginTop: 20,
                        borderRadius: '50%',
                        marginBottom: 10
                    }}
                    src={activeProfile.picture}
                    alt={activeProfile.email} />
                <ProfileName>{activeProfile.name}</ProfileName>
                <ProfileBio>
                    {activeProfile.email}
                </ProfileBio>
                <CreateSeller data={res} activeProfile={activeProfile}/>
                <ProfileTable data={res} queryId={query.uid} activeProfile={activeProfile}/>
            </ProfileContainer>
            </>

        )
    }
}

const LogoutButton = styled.button`
  background-color: #ff7c7c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  align-self: flex-end;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 15px 20px rgba(0,0,0,0.2);
    transform: translateY(-1px);
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: max-content;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 50px;
`;

const ProfileName = styled.h2`
  margin-bottom: 0px;
`;

const ProfileBio = styled.p`
  text-align: center;
`;
