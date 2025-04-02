interface UserResponseDTO {
    id: number;
    username: string;
    email: string;
}

export const userApi = {
    async getUserInfo(): Promise<UserResponseDTO> {
        return {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
    },
};
