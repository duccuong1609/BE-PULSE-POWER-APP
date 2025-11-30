import { Body, Controller, HttpCode, HttpStatus, ParseEnumPipe, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { ModelName } from './dto/model-name.dto.js';
import { RecommendCartDto } from './dto/recommend-cart.dto.js';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('recommend')
  @HttpCode(HttpStatus.OK)
  async recommend(
    @Query('model_name', new ParseEnumPipe(ModelName)) modelName: ModelName,
    @Body() recommendCartDto: RecommendCartDto,
  ) {
    return this.cartService.recommend(modelName, recommendCartDto);
  }

}
