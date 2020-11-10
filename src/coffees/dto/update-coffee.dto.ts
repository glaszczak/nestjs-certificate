import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){} // returns types of the class: CreateCoffeeDto with the all properties (name, brand, flavors) set to optional!!!
