import { useSelector, useDispatch } from "react-redux";
import type { UserState } from "@/types";
import Protected from "@/components/shared/Protected";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "@/api/api";

export default function Verify() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user: UserState = useSelector((state) => state.user);
    const [otp, setOTP] = useState("");

    useEffect(() => {
        if(user.isEmailVerified){
            toast('Email already verified')
            navigate('/')
        } else {
            (async () => {
            try {
                const res = await api.post('users//send-email-otp')
                if(res.status >= 400){
                    console.log(res.data)
                    throw new Error(res.data.message)
                }
            } catch (error) {
                toast(error.message,{
                    
                })
            }
        })()
        }
    },[navigate,user.isEmailVerified])

    const otpHandler = async () => {
        try {
            const res = await api.post('/user/verify-email-otp',{
                otp: otp
            })

            if(res.status >= 400 || res.data.success === false){
                throw new Error(res.data.message)
            }else {
                user.isEmailVerified = true
                navigate('/')
            }
        } catch (error) {
            toast(error.message)
        }
    }

    return (
        <Protected authentication={true}>
            <div className="container md:w-[50%] mx-auto">
                <div className="flex justify-center items-center flex-col border-2 gap-5">
                    <div className="text-2xl">
                        <h1>
                            We have sent an OTP at your{" "}
                            <strong>{user.user?.email}</strong> email
                        </h1>
                    </div>
                    <div className="p-3">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                setOTP(value)
                                if(value.length == 6)
                                    otpHandler()
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="text-center text-sm">
                            {otp === "" ? (
                                <>Enter your one-time password.</>
                            ) : (
                                <>You entered: {otp}</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    );
}
