import React, { useState} from 'react';
import {
    AiOutlineMore,
    AiOutlineContacts,
    AiOutlineInfoCircle,
    AiOutlinePlus,
    AiOutlineDelete,
    AiOutlineCheck
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input, Modal,
    ModalBody,
    ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay,
    Text, useDisclosure, SimpleGrid, Image, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import Link from "next/link"


interface Props {
    isUser: boolean,
    data: SellerData
}

const Links = ({data, isUser}: Props) => {
    const [platform, setPlatform] = useState('')
    const [url, setUrl] = useState('')
    const [changed, setChanged] = useState(false)
    const [links, setLinks] = useState<TableData[]>(data?.attributes.table)
    // const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const route = useRouter();

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(platform && url !== "") {
            const uuid = (Math.random() + 1).toString(36).substring(2);
            const newLink = {id: uuid, platform: platform, url: url}
            setLinks((prevState) => [...prevState, newLink])
            setPlatform('');
            setUrl('');
            setChanged(true);
            onClose();
        }else {
            toast.error("Either of the fields cannot be empty.")
        }
    }

    const handleDelete = (id: string) => {
        for(let i = 0; i < links.length; i++) {
            if(links[i].id === id) {
                links.splice(i, 1);
                break;
            }
        }
        setLinks(prevState => [...prevState]);
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
            setPlatform('');
            setUrl('');
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json_obj),
            }).then((res) => {
                if (res.ok) {
                    notify();
                } else {
                    toast.error("Couldn't submit request.")
                    setTimeout(function () {
                        toast(() => (
                            <span>
                            Please <b>Refresh</b> the page and try again
                            <button style={{
                                backgroundColor: "#0071e3",
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
            return <Button colorScheme='linkedin' onClick={handleSubmit} >
                <Text display={'flex'} alignItems={'center'}>
                    <AiOutlineCheck
                        size={16}
                        color={'white'}
                        style={{marginRight: 5}}/> Save
                </Text>

            </Button>
        }else {
            return <Button colorScheme='gray' onClick={()=> toast.error("No changes made.")}>
                <Text display={'flex'} alignItems={'center'}>
                    <AiOutlineCheck
                        size={16}
                        color={'black'}
                        style={{marginRight: 5}}/> Save
                </Text>
            </Button>
        }
    }

        return (
        <>
            <Box  mt={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Heading display={'flex'} alignItems={'center'} gap={2}>
                    Contact <AiOutlineContacts/>
                </Heading>
                {isUser && RequestButton()}
            </Box>

            <SimpleGrid mt={5} columns={[1, 2, 3, 4]} gap={2}>
            {links?.map((d: TableData)=>
                (
                    <div key={d.id}>
                        <Button
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            width={'full'}
                            backgroundColor={"brand.600"}
                            color={"black"}
                            shadow={'sm'}
                            border={"2px solid #eaeaea"}
                            transition={'250ms ease-in-out'}
                            _hover={{ border: "2px solid black", color: "gray.900" }}
                            h={"48px"}
                            fontWeight={"normal"}
                            type={'submit'}>

                        <Box w={'full'}>
                            <Link href={`${d.url}`} target={"_blank"}>
                                <Box display={"flex"} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                                    <Text>{d.platform}</Text>
                                    <Image
                                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${d.url}&size=16` || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Chain_link_icon_slanted.png/800px-Chain_link_icon_slanted.png"} alt={d.platform}/>
                                </Box>
                            </Link>

                        </Box>
                            {isUser &&
                                <Box ml={2}>
                                    <Menu>
                                        <MenuButton borderRadius={5} p={1.5} backgroundColor={"#dadada"}>
                                            <AiOutlineMore size={18}/>
                                        </MenuButton>
                                        <MenuList padding={0}>
                                            <MenuItem onClick={()=> handleDelete(d.id)} padding={3} justifyContent={'space-between'}>
                                                <Text>Remove</Text>
                                                <AiOutlineDelete color={'red'}/>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Box>
                            }

                        </Button>
                    </div>

                )
            )}
            </SimpleGrid>
            {
                isUser && links?.length >= 5 &&
                <Box display={'flex'} alignItems={'center'} gap={1} my={3}>
                    <AiOutlineInfoCircle size={20} />
                    <Text color={"gray.600"}><b>Max quantity of Links reached.</b></Text>
                </Box>
            }
            {
                isUser && links?.length < 5 &&
                <Button
                    onClick={onOpen}
                    mt={4}
                    border={"1px solid black"}
                    width={'full'}
                    backgroundColor={"black"}
                    color={"white"}
                    _hover={{ backgroundColor: "white", color: "gray.900" }}
                    h={"48px"}
                    fontWeight={"normal"}
                    type={'submit'}
                display={'flex'}
                    justifyContent={'space-between'}
                >
                    Add Link
                    <AiOutlinePlus/>
                </Button>
            }

            <Box marginX={3}>
                <Modal
                   size={['full', 'sm', 'md', 'lg']}
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleAdd}>
                            <ModalHeader>
                                <Heading fontSize={24}>
                                    Add a link
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>
                                        <Text>Platform</Text>
                                    </FormLabel>
                                    <Input value={platform} onChange={(e)=> setPlatform(e.target.value)} ref={initialRef} placeholder='Title' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <Text>URL</Text>
                                    <Input type={'url'} value={url} onChange={(e)=> setUrl(e.target.value)} placeholder='https://www.example.com/' />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} type={'submit'}>
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
        </>
             );
};

export default Links;