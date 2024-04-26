export interface AuthResponseDTO {
    accessToken: string;
    user: {
        id: number;
        email: string;
    }
}