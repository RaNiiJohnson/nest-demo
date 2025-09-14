import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found');
      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
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
