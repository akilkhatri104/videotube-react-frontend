import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Protected from "@/components/shared/Protected";
import { Button } from "@/components/ui/button";
import { login } from "@/store/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import api from "@/api/api";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Verify() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [emailSent, setEmailSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [otp, setOTP] = useState("");

    const emailSendHandler = async (e) => {
        try {
            e.preventDefault();
            setSendingEmail(true);
            const res = await api.post("/users/send-email-otp");
            if (res.status < 400) {
                setEmailSent(true);
                toast("Email sent succesfully");
            } else {
                toast(res.data.message);
            }
        } catch (error) {
            toast(error.message);
        } finally {
            setSendingEmail(false);
        }
    };

    const otpVerificationHandler = async (e) => {
        try {
            e.preventDefault()
            setIsVerifying(true);
            const res = await api.post("/users/verify-email-otp", {
                otp: otp,
            });
            if (res.status < 400) {
                toast("Email verifed successfully");

                const res = await api.get("users/current-user");
                if (res.status === 200 && res.data?.data) {
                    dispatch(
                        login({
                            user: {
                                id: res.data.data._id,
                                fullName: res.data.data.fullName,
                                username: res.data.data.username,
                                profilePic: res.data.data.avatar,
                                coverPic: res.data.data.CoverImage,
                                email: res.data.data.email,
                            },
                            isEmailVerified: res.data.data.isEmailVerified,
                            authStatus: true,
                        })
                    );
                    navigate('/')
                }
            }
        } catch (error) {
            toast(error.message);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <Protected authentication={true}>
            {!emailSent ? (
                <div className="flex justify-center items-center mx-auto m-4 border-1 rounded-2xl h-[50%] w-[50%]">
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={emailSendHandler}
                    >
                        <h1 className="text-2xl text-center">
                            We will send an OTP to your{" "}
                            <strong>{user.user.email}</strong> for verification
                        </h1>
                        <Button
                            type="submit"
                            className="w-[50%] mx-auto"
                            variant="secondary"
                            disabled={sendingEmail}
                        >
                            Send Verification Email
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="flex justify-center items-center mx-auto m-4 border-1 rounded-2xl h-[50%] w-[50%] text-center">
                    <form
                        className="flex flex-col justify-center items-center gap-5"
                        onSubmit={otpVerificationHandler}
                    >
                        <h1 className="text-2xl text-center">
                            We have sent an OTP to your{" "}
                            <strong>{user.user.email}</strong> for verification
                        </h1>
                        <p>
                            If you can't find it please check your{" "}
                            <strong>Spam Folder</strong>
                        </p>
                        <InputOTP
                            value={otp}
                            onChange={(otp) => setOTP(otp)}
                            maxLength={6}
                            
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button
                            type="submit"
                            disabled={isVerifying}
                            className="w-[50%] mx-auto"
                            variant="secondary"
                        >
                            Verify OTP
                        </Button>
                    </form>
                </div>
            )}
        </Protected>
    );
}
