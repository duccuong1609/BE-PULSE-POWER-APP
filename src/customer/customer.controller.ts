import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecommendProductDto } from './dto/recommend-dto.js';
import { CustomerService } from './customer.service.js';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';

@Controller('customer')
@ApiBearerAuth('JWT-auth')
@ApiTags('Customer Service')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('recommend')
  @ApiBody({ type: RecommendProductDto })
  @ApiOperation({ summary: 'Get recommend product for customer' })
  async getRecommendProductForCustomer(
    @Body() recommendDto: RecommendProductDto,
  ): Promise<RecommendProductInfo> {
    return await this.customerService.recommendProductForCustomer(
      recommendDto.user_id,
      recommendDto.top_k,
    );
  }
}
