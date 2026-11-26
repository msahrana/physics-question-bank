export interface ICredentialRegister {
    name: string;
    email: string;
    password: string;
    class: 'SSC' | 'HSC';
    student: {
        contactNumber: string;
    };
}

export interface ICredentialLogin {
    email: string;
    password: string;
}

export interface ICredentialVerifyOTP {
    email: string;
    otp: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
}

export interface IAuthResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IUser;
}
