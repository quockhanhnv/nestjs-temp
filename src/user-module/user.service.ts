import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
public users: User[] = [];

    getUsers(): User[] {
        return this.users;
    }

    async getUser(email: string): Promise<User> {
        console.log(email);
        
        const userData = this.users.filter(user => user.email === email);
        
        if(userData && Array.isArray(userData) && userData.length > 0) {
            return Promise.resolve(userData[0]);
        }
        throw new NotFoundException();
    }

    addUser(user: User): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }

    deleteUser(email: string): User[] {
        const remainingUser = this.users.filter(user => user.email !== email);
        this.users = remainingUser;

        return remainingUser;
    }
}