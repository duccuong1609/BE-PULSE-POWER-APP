import { Injectable, NotFoundException } from '@nestjs/common';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';
import MODEL_ROOT from '../utils/model.root.config.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity.js';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dto/customer-dto.js';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async recommendProductForCustomer(
    customerId: string,
    top_k: number,
  ): Promise<RecommendProductInfo> {
    const url = `${process.env.MODEL_URL}${MODEL_ROOT.CUSTOMER_SERVICE.RECOMMEND_PRODUCT_FOR_CUSTOMER}`;

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

  async recommendProductForCustomerNeuMF(
    customerId: string,
    top_k: number,
  ): Promise<RecommendProductInfo> {
    const url = `${process.env.MODEL_URL}${MODEL_ROOT.CUSTOMER_SERVICE.RECOMMEND_PRODUCT_FOR_CUSTOMER_NEUMF}`;

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

  async getAllCustomer() {
    return await this.customerRepository.find();
  }

  async getCustomerById(id: number) {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async createCustomer(customer: CustomerDTO) {
    return await this.customerRepository.save(customer);
  }

  async updateCustomer(id: number, customer: Customer) {
    return await this.customerRepository.update(id, customer);
  }

  async deleteCustomer(id: number) {
    return await this.customerRepository.delete(id);
  }

  async getCustomerByReferanceId(referanceId: string) {
    return await this.customerRepository.findOne({ where: { referanceId } });
  }
}
