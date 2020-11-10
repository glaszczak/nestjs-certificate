import { IsString } from "class-validator";

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({each: true}) //expected value it's the array of strings
  readonly flavors: string[];
}
