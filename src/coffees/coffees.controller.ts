import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){}

  @Get()
  findAll(@Query() paginationQuery ) {
    // const {limit, offset} = paginationQuery
    return this.coffeesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id)
  }
  // // same as above but with transform string into number
  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.coffeesService.findOne('' + id)
  // }

  @Post()
  // @HttpCode(HttpStatus.GONE) 
  // create(@Body('name') body){ // will return only name; 
  create(@Body() createCoffeeDto: CreateCoffeeDto){ // will return whole body
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
    return this.coffeesService.update(id, updateCoffeeDto)
  }
    
  @Delete(':id')
  remove(@Param('id') id: string){
    return this.coffeesService.remove(id)
  }
}