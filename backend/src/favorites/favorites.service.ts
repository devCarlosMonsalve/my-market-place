import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        offer: {
          include: {
            store: { select: { id: true, name: true } },
          },
        },
      },
    });
  }

  async add(userId: number, offerId: number) {
    const offer = await this.prisma.offer.findUnique({ where: { id: offerId } });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    return this.prisma.favorite.upsert({
      where: { userId_offerId: { userId, offerId } },
      create: { userId, offerId },
      update: {},
    });
  }

  async remove(userId: number, offerId: number) {
    return this.prisma.favorite.deleteMany({
      where: { userId, offerId },
    });
  }
}
