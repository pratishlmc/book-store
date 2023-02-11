import React, {useEffect, useState} from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";
import {Box, Button, Heading, Input, InputGroup, InputLeftAddon, Select} from "@chakra-ui/react";
import {AiOutlineSwap} from "react-icons/ai";
export default function CreateSeller({data, isUser}) {
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [countriesInfo, setSountriesInfo] = useState()
    const dialCode = countriesInfo?.filter((fi)=> fi.name === country).map((d)=> d.dial_code)
    const route = useRouter();
    const {user} = useUser();

    const getCountriesInfo = async () => {
        await fetch('https://pratishlmc.github.io/useful-json-data/countriesInfo.json')
            .then(response => {
                return response.json();
            }).then(data => {
                setSountriesInfo(data);
            }).catch((e) => {
                console.log(e.message);
            });
    }
    useEffect(() => {
        getCountriesInfo()
    },[])

    const notify = () => {
        toast.loading(
            "Saving....",
            {
                duration: 500
            }
        );
        setTimeout(function () {
            toast.success('Successfully Published!');
        }, 500)
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        const json_obj = {
            "data": {
                "table": [],
                "uid": user.sub,
                "name": user.name,
                "email": user.email,
                "picture": user.picture,
                "phone": `${dialCode} ${phone}`,
                "country": country,
                "address": city

            }
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_obj),
        }).then((res)=> {
            if(res.ok){
                notify();
                setTimeout(function () {
                    route.reload();
                }, 1000);
            }else{
                toast.error("Couldn't submit request.")
                setTimeout(function (){
                    toast(
                        "1. Please check your phone number and try again.\n\n 2. A seller with the same email or phone number already exists.",
                        {
                            duration: 6000,
                        }
                    );
                }, 1000)

            }
        })

    }

if(isUser && !data?.attributes){
    return (
            <Box my={5}>
                <Heading>Start Selling?</Heading>
                <form onSubmit={handleCreate}>
                    <Box mt={3} display={'flex'} flexDir={'column'} gap={1.5}>
                        <Select
                            w={'full'}
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                        >
                            <option hidden={true}>-- Select your country --</option>
                            {
                                countriesInfo?.map((info)=>
                                    (
                                        <>
                                            <option value={info.name}>
                                                {info.name}
                                            </option>
                                        </>
                                    ))
                            }
                        </Select>
                        <Input
                            w={'full'}
                            type={'text'}
                            max={30}
                            placeholder={'City'}
                            value={city}
                            onChange={(e)=> setCity(e.target.value)}
                        ></Input>
                        <InputGroup>
                            {
                                dialCode > 0 && <InputLeftAddon children={dialCode} />
                            }
                            <Input
                                w={'full'}
                                type={'number'}
                                placeholder={'Phone number'}
                                value={phone}
                                onChange={(e)=> setPhone(e.target.value)}
                            ></Input>
                        </InputGroup>

                        <Button
                            mt={2}
                            border={"1px solid black"}
                            width={'full'}
                            backgroundColor={"black"}
                            color={"white"}
                            _hover={{ backgroundColor: "white", color: "gray.900" }}
                            h={"48px"}
                            fontWeight={"normal"}
                            type={'submit'}>
                            Switch to selling account
                            <Box padding={1}></Box>
                            <AiOutlineSwap/>
                        </Button>
                    </Box>
                </form>
            </Box>
    );
}

}