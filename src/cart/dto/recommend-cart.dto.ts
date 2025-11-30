import { ApiProperty } from "@nestjs/swagger";

export class RecommendCartDto {
    @ApiProperty({ example: ["SP000007", "SP000013"] })
    cart_items: string[];
    @ApiProperty({ example: 5 })
    top_k: number;
}
