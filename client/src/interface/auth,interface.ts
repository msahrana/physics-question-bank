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
