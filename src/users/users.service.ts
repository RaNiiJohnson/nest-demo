import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Marc Leroy',
      email: 'marc.leroy@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Jean Durand',
      email: 'jean.durand@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Clara Moreau',
      email: 'clara.moreau@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user,
    );
    return this.findOne(id);
  }

  delete(id: number) {
    const userToDelete = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return userToDelete;
  }
}
