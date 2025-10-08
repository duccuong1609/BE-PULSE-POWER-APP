import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';
import MODEL_ROOT from '../utils/model.root.config.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productExist = await this.findByReferanceId(createProductDto.referanceId);
    if (productExist) {
      throw new Error('Product already exist');
    }
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    return product;
  }

  async findByReferanceId(referanceId: string) {
    return await this.productRepository.findOne({ where: { referanceId } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExist = await this.findOne(id);

    if (!productExist) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }

  async recommendProductForProductNeuMF(
    customerId: string,
    top_k: number,
  ): Promise<RecommendProductInfo> {
    const url = `${process.env.MODEL_URL}${MODEL_ROOT.PRODUCT_SERVICE.RECOMMEND_PRODUCT_FOR_PRODUCT_NEUMF}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: customerId, top_k: top_k }),
    });

    const data = await response.json();

    if (response.status === 404) throw new NotFoundException(JSON.stringify(data));
    if (!response.ok) throw new Error(JSON.stringify(data));

    return data as RecommendProductInfo;
  }
}
