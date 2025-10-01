import { Injectable } from '@nestjs/common';
import { RecommendProductInfo } from './dto/recommend-response-dto.js';
import MODEL_ROOT from '../utils/model.root.config.js';

@Injectable()
export class CustomerService {
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
    console.log(data);
    return data as RecommendProductInfo;
  }
}
