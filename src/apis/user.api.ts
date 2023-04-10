import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface BodyUpdateType extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
    password?: string;
    newPassword?: string;
}

const userApi = {
    getProfile() {
        return http.get<SuccessResponse<User>>('me');
    },
    updateProfile(body: BodyUpdateType) {
        return http.put('user', body);
    },
    uploadAvatar(body: FormData) {
        return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
            headers: {
                'Content-Type': 'multipart/form-data', //s p post?
            },
        });
    },
};

export default userApi;
