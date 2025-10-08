import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecommendCustomerDto } from './dto/recommend-dto.js';
import { CustomerService } from './customer.service.js';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';
import { CustomerDTO } from './dto/customer-dto.js';
import { CustomerProps } from './dto/customer-response.dto.js';
import { JwtAuthGuard } from '../utils/jwt-auth.guard.js';

@Controller('customer')
@ApiBearerAuth('JWT-auth')
@ApiTags('Customer Services')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('recommend')
  @ApiBody({ type: RecommendCustomerDto })
  @ApiOperation({ summary: 'Get recommend product for customer' })
  async getRecommendProductForCustomer(
    @Body() recommendDto: RecommendCustomerDto,
  ): Promise<RecommendProductInfo> {
    return await this.customerService.recommendProductForCustomer(
      recommendDto.user_id,
      recommendDto.top_k,
    );
  }

  @Post('recommend_neuMF')
  @ApiBody({ type: RecommendCustomerDto })
  @ApiOperation({ summary: 'Get recommend product for customer' })
  async getRecommendProductForCustomerNeuMF(
    @Body() recommendDto: RecommendCustomerDto,
  ): Promise<RecommendProductInfo> {
    return await this.customerService.recommendProductForCustomerNeuMF(
      recommendDto.user_id,
      recommendDto.top_k,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all customer' })
  async getAllCustomer() {
    return await this.customerService.getAllCustomer();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({ status: 200, type: CustomerProps })
  async getCustomerById(@Param('id') id: number) {
    return await this.customerService.getCustomerById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 200, type: CustomerProps })
  @ApiBody({ type: CustomerDTO })
  async createCustomer(@Body() customer: CustomerDTO) {
    return await this.customerService.createCustomer(customer);
  }

  @Get('referanceId/:referanceId')
  @ApiOperation({ summary: 'Get customer by referanceId' })
  @ApiResponse({ status: 200, type: CustomerProps })
  async getCustomerByReferanceId(@Param('referanceId') referanceId: string) {
    return await this.customerService.getCustomerByReferanceId(referanceId);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update customer' })
  @ApiResponse({ status: 200, type: CustomerDTO })
  async updateCustomer(@Body() customer: CustomerProps) {
    return await this.customerService.updateCustomer(customer.id, customer);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete customer' })
  async deleteCustomer(@Param('id') id: number) {
    return await this.customerService.deleteCustomer(id);
  }
}
