import { PrismaService } from '@/prisma/service/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserRole } from '@/common/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isEmailVerified: true,
        role: true,
        _count: {
          select: { cvs: true, coverLetters: true, matchScores: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!user) throw new NotFoundException('No user have been created yet!');
    return user;
  }

  async findOneUSer(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        profilePicture: true,
        createdAt: true,
        profile: true,
        _count: {
          select: { cvs: true, coverLetters: true, matchScores: true },
        },
      },
    });
    if (!user)
      throw new NotFoundException(`No user with this id: ${id} found!`);
    return user;
  }

  async getMe(userId: string) {
    return await this.findOneUSer(userId);
  }

  async updateMe(userId: string, updateDto: UpdateUserDto) {
    const { firstName, lastName, ...profileFields } = updateDto;

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        profile: {
          upsert: {
            create: profileFields,
            update: profileFields,
          },
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
        profile: true,
      },
    });
  }

  async updateUserRole(
    targetId: string,
    role: UserRole,
    requesterId: string,
    requesterRole: UserRole,
  ) {
    // Only admins can change roles
    if (requesterRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update user roles');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent admin from demoting themselves
    if (requesterId === targetId && role === UserRole.USER) {
      throw new ForbiddenException('You cannot demote yourself');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: targetId },
      data: {
        role,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
      },
    });

    return {
      message:
        role === UserRole.ADMIN
          ? 'User promoted to admin successfully'
          : 'Admin demoted to user successfully',
      user: updatedUser,
    };
  }

  async deleteUser(
    targetId: string,
    requesterId: string,
    requesterRole: string,
  ) {
    if (requesterId !== targetId) {
      if (requesterRole !== UserRole.ADMIN) {
        throw new ForbiddenException();
      }
    }

    const target = await this.prisma.user.findUnique({
      where: { id: targetId },
    });
    if (!target) throw new NotFoundException('User not found.');
    if (target.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot delete another admin');
    }
    await this.prisma.user.delete({ where: { id: targetId } });
    return { message: 'User deleted successfully' };
  }
}
