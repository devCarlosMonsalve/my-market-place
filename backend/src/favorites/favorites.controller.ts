import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Request() req) {
    return this.favoritesService.findAll(req.user.id);
  }

  @Post(':offerId')
  add(@Param('offerId') offerId: string, @Request() req) {
    return this.favoritesService.add(req.user.id, +offerId);
  }

  @Delete(':offerId')
  remove(@Param('offerId') offerId: string, @Request() req) {
    return this.favoritesService.remove(req.user.id, +offerId);
  }
}
