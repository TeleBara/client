interface UserResponseDTO {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}

export const userApi = {
    async getUserInfo(): Promise<UserResponseDTO> {
        return {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            created_at: new Date()
        };
    },
};
