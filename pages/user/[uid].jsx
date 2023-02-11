import { useRouter } from "next/router";
import { withPageAuthRequired, getSession, useUser } from "@auth0/nextjs-auth0";
import Links from "../../components/Links";
import {useQuery} from "urql";
import {GET_SELLERS_QUERY} from "../../lib/query";
import React, {useEffect, useState} from "react";
import CreateSeller from "../../components/CreateSeller";
import Image from "next/image";
import Head from "next/head";
import {Box, color, Divider, Heading, Text} from "@chakra-ui/react";
import { ColorExtractor } from 'react-color-extractor'
import Loading from "../../components/Loading";

export default function Profile() {
    const {user, isLoading} = useUser();
    const [cover, setCover] = useState()

    const {query} = useRouter();
    // const route = useRouter();

    const [results] = useQuery({
        query: GET_SELLERS_QUERY,
        variables: {uid: query.uid},
    });
    const {data, fetching, error } = results;
    const res = data?.sellers.data[0];
    const activeProfile = res?.attributes

    console.log(cover)

    if (fetching || isLoading ) return (
        <>
            <Loading/>
        </>
    );
    if (error) return <p>Oh no... {error.message}</p>;

    if(!activeProfile){
        return (
            <Box display={'center'} justifyContent={'center'} mt={30}>
                <Heading>Sorry, The seller does not exist.</Heading>
            </Box>
        )
    }
        return (
            <>
                <Head>
                    <title>Profile - {activeProfile.name}</title>
                </Head>
                {!cover && !activeProfile && <Loading/>}
                <Box>
                <ColorExtractor
                    src={activeProfile.picture}
                    getColors={colors => setCover([colors[0], colors[1]])
                    }/>
                <Box h={'200px'}>
                    <Box shadow={'lg'} borderRadius={10} w={'full'} h={'75%'}
                         style={{ backgroundImage:  `linear-gradient(90deg, ${cover?.[0]}, ${cover?.[1]})`}}>
                    </Box>
                    <Box mt={-65}
                         shadow={'lg'}
                         borderRadius={'full'}
                         h={'fit-content'}
                         w={'fit-content'}
                         ml={5}>
                        <Image
                            width={100}
                            height={100}
                            style={{
                                borderRadius: '50%',
                            }}
                            src={activeProfile.picture}
                            alt={activeProfile.email} />
                    </Box>
                    </Box>

                    <Text fontWeight={600}
                          mt={2}
                          fontSize={22}
                    >{activeProfile.name}</Text>
                <Text
                      color={"gray.600"}
                      fontSize={14}>
                    {activeProfile.email}
                </Text>

                <Text color={"gray.500"} fontSize={14}>{activeProfile.address}, {activeProfile.country}</Text>
                <Text color={"gray.500"} fontSize={12}>
                    {activeProfile.phone}
                </Text>

            </Box>
                <Divider mt={2} mb={2} h={2} color={'black'}/>
                <CreateSeller isUser={activeProfile.uid === user.sub} data={res}/>
                <Links isUser={activeProfile.uid === user.sub} data={res}/>
            </>

        )

}