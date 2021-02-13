import { IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationQueryDto {
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    limit?: number;

    @Type(() => Number)
    @IsOptional()
    @Min(0)
    offset?: number;
}
