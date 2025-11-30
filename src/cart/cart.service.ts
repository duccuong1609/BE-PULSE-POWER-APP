import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RecommendCartDto } from './dto/recommend-cart.dto.js';
import { ModelName } from './dto/model-name.dto.js';

@Injectable()
export class CartService {

  async recommend(modelName: ModelName, body: RecommendCartDto) {
    const baseUrl = process.env.MODEL_URL;
    const endpoint = '/api/v1/recommend';
    const queryParams = `?model_name=${modelName.toLowerCase()}`;
    const url = `${baseUrl}${endpoint}${queryParams}`;
    const payload = {
      cart_items: body.cart_items,
      top_k: body.top_k || 5,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 404) {
        throw new NotFoundException(`Model server error: ${JSON.stringify(data)}`);
      }

      if (!response.ok) {
        throw new BadRequestException(`Model request failed: ${JSON.stringify(data)}`);
      }
      return data;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('Recommend Service Error:', error);
      throw new InternalServerErrorException('Failed to connect to recommendation service');
    }
  }
}
