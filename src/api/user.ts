import { UserDTO } from '../store/userStore';

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
    async getCurrentUser(accessToken: string): Promise<UserDTO> {
        // Здесь будет реальный API запрос
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            id: 1,
            email: 'user@example.com',
            username: 'user',
            created_at: new Date()
        };
    }
};
