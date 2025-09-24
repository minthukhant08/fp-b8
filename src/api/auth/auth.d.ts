type LoginInput = {
    email?: string,
    password?: string
}

type User = {
    id: number;
    name: string;
    email: string;
}

type UserResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
}

