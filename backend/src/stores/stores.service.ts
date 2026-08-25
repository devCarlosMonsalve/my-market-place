import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.store.findMany({
      include: { owner: { select: { id: true, name: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.store.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true } },
        offers: true,
      },
    });
  }

  create(dto: CreateStoreDto, userId: number) {
    return this.prisma.store.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async update(id: number, dto: Partial<CreateStoreDto>, userId: number) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.store.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.store.delete({ where: { id } });
  }
}
