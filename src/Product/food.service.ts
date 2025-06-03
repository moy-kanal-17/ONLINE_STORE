import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';import { InjectModel } from '@nestjs/sequelize';import { Product } from './entities/food.entity';import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FileService } from 'src/file/file.service';
import { Exception } from 'handlebars';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Product)
    private foodModel: typeof Product,
    private fileservice: FileService
  ) {}

  async findAll(): Promise<Product[]> {
    return this.foodModel.findAll();
  }

  async remove(id: number): Promise<{ message: string }> {
    const food = await this.foodModel.findByPk(id);
    if (!food) {
      throw new Exception("Ovqat topilmadi");
    }

    await food.destroy();
    return { message: "Ovqat o‘chirildi" };
  }

  async findone(id) {
    return this.foodModel.findByPk(id);
  }

  async findOne(id:number) {
    return this.foodModel.findOne({
      where: { seller_id: +id },
    });
  }

  async create(createPatientDto: CreateFoodDto, image: any) {
    const fileName = await this.fileservice.saveImage(image.buffer);
    console.log(fileName);

    return this.foodModel.create({ ...createPatientDto, image: fileName });
  }
  async update(id: number, update: UpdateFoodDto) {
    console.log(`Updating food with ID: ${id}`, update);
    if (!update || Object.keys(update).length === 0) {
      throw new BadRequestException("No data provided for update");
    }
    const result = await this.foodModel.update(update, { where: { id } });
    if (result[0] === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return result;
  }
}
