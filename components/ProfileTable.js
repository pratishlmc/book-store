import React, {useState} from 'react';
import styled from 'styled-components';
import {useUser} from "@auth0/nextjs-auth0";
import {AiOutlineCheck, AiOutlineContacts, AiOutlineDelete} from "react-icons/ai";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

const ProfileTable = ({data, activeProfile}) => {
    const [platform, setPlatform] = useState('')
    const [url, setUrl] = useState('')
    const { user, isLoading } = useUser();
    const [links, setLinks] = useState(data?.attributes.table);
    const [changed, setChanged] = useState(false)

    const route = useRouter();
    const handleAdd = (e) => {
        e.preventDefault();
        if(platform && url !== "") {
            const uuid = (Math.random() + 1).toString(36).substring(2);
            setLinks([...links, {id: uuid, platform: platform, link: url}]);
            setPlatform('');
            setUrl('');
            setChanged(true);
        }
    };
    const handleDelete = (id) => {
        for(let i = 0; i < links.length; i++) {
            if(links[i].id === id) {
                links.splice(i, 1);
                break;
            }
        }
        setLinks([...links]);
        setChanged(true);
    }

    const notify = () => {
        toast.loading(
            "Saving....",
            {
                duration: 500
            }
        );
        setTimeout(function (){
            setChanged(false);
            toast.success('Successfully Published!');
        }, 500)
    };

    const handleSubmit = async () => {
        const json_obj = {
            "data": {
                "table": links
            }
        }
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_obj),
        }).then((res)=> {
            if(res.ok){
                notify();
            }else{
                toast.error("Couldn't submit request.")
                setTimeout(function (){
                    toast((t) => (
                        <span>
                            Please <b>Refresh</b> the page and try again
                            <button style={{backgroundColor: "#0071e3",
                                padding: 10,
                                border: "none",
                                borderRadius: 5,
                                color: "white"
                            }} onClick={() => route.reload()}>
                              Refresh
                            </button>
                          </span>
                    ));
                }, 1000)

            }
        })
    }

    const RequestButton = () => {
        if(changed){
            return <SubmitBtn onClick={handleSubmit}><AiOutlineCheck size={16} color={'white'}/> Save</SubmitBtn>
        }else {
            return <SubmitBtn style={{
                backgroundColor: "gray",
                cursor: 'not-allowed'
            }}>
                <AiOutlineCheck size={16} color={'white'}/> Save</SubmitBtn>
        }
    }

    if(data?.attributes){
        return (
        <>
            <h1 style={{display: 'flex', gap: 7, alignItems: 'center'}}>Contact <AiOutlineContacts/></h1>
                <TableContainer>
                {activeProfile === user && RequestButton()}
                <form onSubmit={handleAdd}>
                    <Table>
                        <thead>
                            <TableHeader>Platform</TableHeader>
                            <TableHeader>Link, Username, Phone</TableHeader>
                        </thead>
                        <tbody>
                        <TableRow>
                            <TableData>
                                <PlatformText>
                                    Phone
                                </PlatformText>
                            </TableData>
                            <TableData>
                                <LinkText>
                                    {data?.attributes.phone}
                                </LinkText>
                            </TableData>
                        </TableRow>
                        {links?.map((link, index) => (
                            <TableRow key={index}>
                                <TableData>
                                    <PlatformText>
                                        { activeProfile === user &&
                                            <AiOutlineDelete
                                                onClick={()=> handleDelete(link.id)}
                                                size={20}
                                                color={'red'}
                                                style={{
                                                    position: "absolute",
                                                    cursor: 'pointer',
                                                    left: 0
                                                }}/>
                                        }
                                        {link.platform}
                                    </PlatformText>
                                </TableData>
                                <TableData>
                                    <LinkText href={link.link}>
                                        {link.link}
                                    </LinkText>
                                </TableData>
                            </TableRow>

                        ))}
                        {
                            activeProfile === user && links?.length < 5 &&
                                <TableRow>
                                    <TableData>
                                        <InputField placeholder={'example'} value={platform} onChange={(e)=> setPlatform(e.target.value)} type={'text'}></InputField>
                                    </TableData>
                                    <TableData>
                                        <InputField placeholder={'www.example.com'}
                                                    value={url} onChange={(e)=> setUrl(e.target.value)}
                                                    type={'text' } maxLength={100}></InputField>
                                    </TableData>
                                </TableRow>
                        }
                        </tbody>
                    </Table>
                    {
                        activeProfile === user && links?.length < 5 &&
                            <AddButton type={'submit'}>Add</AddButton>
                    }
                </form>
            </TableContainer>
    </>
             );
    }
};

export default ProfileTable;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.9em;
  font-family: sans-serif;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #86868b;
  background-color: #f5f5f5;
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:last-of-type {
    border-bottom: 2px solid #1d1d1f ;
  }
`;

const TableHeader = styled.th`
  background-color: #000;
  color: #fff;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-weight: normal;
  padding: 15px;
  border-bottom: 2px solid #1d1d1f;
`;

const TableData = styled.td`
  height: 40px;
  overflow: clip;
`;

const AddButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  width: 100%;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  width: fit-content;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
  font-size: medium;
  background-color: transparent;
`;

const PlatformText = styled.span`
margin: 10px;
  display: flex;
  position: relative;
  padding-left: 30px;
`;
const LinkText = styled.a`
  margin: 10px;
  color: #0071e3;
  
`;