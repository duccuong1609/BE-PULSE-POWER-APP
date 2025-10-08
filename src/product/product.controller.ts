import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service.js';
import { ProductResponse } from './dto/product-response.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { JwtAuthGuard } from '../utils/jwt-auth.guard.js';
import { RecommendProductDto } from './dto/recommend-dto.js';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';

@Controller('product')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@ApiTags('Product Services')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo product mới' })
  @ApiResponse({ status: 201, type: ProductResponse })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy ds product' })
  @ApiResponse({ status: 201, type: ProductResponse, isArray: true })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy product' })
  @ApiResponse({ status: 201, type: ProductResponse })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('recommend_neuMF')
  @ApiBody({ type: RecommendProductDto })
  @ApiOperation({ summary: 'Get recommend product for product' })
  async getRecommendProductForCustomerNeuMF(
    @Body() recommendDto: RecommendProductDto,
  ): Promise<RecommendProductInfo> {
    return await this.productService.recommendProductForProductNeuMF(
      recommendDto.product_id,
      recommendDto.top_k,
    );
  }
}
