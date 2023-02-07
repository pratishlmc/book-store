import React, {useState} from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";

export default function CreateSeller({data, activeProfile}) {
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("977")
    const route = useRouter();
    const {user, isLoading} = useUser();

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
                "phone": `+${country}-${phone}`
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
                        "Please check your phone number and try again.\n A seller with the same email or phone number already exists.",
                        {
                            duration: 6000,
                        }
                    );
                }, 1000)

            }
        })

    }

if(activeProfile === user && !data?.attributes){
    return (
        <>
            <div style={{
                marginTop: 40,
                marginBottom: 20
            }}>
                <p style={{
                    fontSize: 28,
                    fontWeight: "bold"
                }}>Start Selling?</p>
                <form onSubmit={handleCreate}>
                    <div style={{
                        display: "flex",
                        gap: 5,
                        marginTop: 3,
                    }}>
                        <select
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                            style={{
                                height: 48,
                                width: "fit-content",
                                borderWidth: 2,
                                borderRadius: 5,

                            }}
                        >
                            <option defaultValue value="977">Nepal (+977)</option>
                            <option value="91">India (+91)</option>
                            <option value="1">USA (+1)</option>
                            <option value="33">France (+33)</option>
                            <option value="81">Japan (+81)</option>
                            <option value="86">China (+86)</option>
                            <option value="44">UK (+44)</option>
                        </select>
                        <input type={'number'} placeholder={'Phone number'} minLength={10} maxLength={10} style={{
                            height: 48,
                            width: "100%",
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 10,
                            fontSize: 16
                        }}
                               value={phone}
                               onChange={(e)=> setPhone(e.target.value)}
                        ></input>
                    </div>
                    <AddButton style={{ height: '48px' }} type={'submit'}>Switch to selling account</AddButton>
                </form>
            </div>
        </>
    );
}

}


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