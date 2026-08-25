import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.offer.findMany({
      include: { store: { select: { id: true, name: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.offer.findUnique({
      where: { id },
      include: { store: true },
    });
  }

  async create(dto: CreateOfferDto, userId: number) {
    const store = await this.prisma.store.findUnique({
      where: { id: dto.storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenException('You can only add offers to your stores');
    }

    return this.prisma.offer.create({ data: dto });
  }

  async update(id: number, dto: Partial<CreateOfferDto>, userId: number) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.store.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.offer.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.store.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.offer.delete({ where: { id } });
  }
}
