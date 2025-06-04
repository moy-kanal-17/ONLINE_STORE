import {  BadRequestException, Body,  Controller,  Delete,  Get,  InternalServerErrorException,  NotFoundException,  Param,  ParseIntPipe,  Patch,  Post,  Put,  Render,  Req,  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { JwtService } from "@nestjs/jwt";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/common/guards/auth.guard";
import { AdminhGuard } from "src/common/guards/admin.guard";
import { RoleRedirectGuard } from "src/common/guards/role.guard";
import { CustomerService } from "src/customer/customer.service";
import { SellerhGuard } from "src/common/guards/seller.guard";
import { RequestWithUser } from "src/common/types/request-with-user";
import { ActiveUserGuard } from "src/common/guards/ActiveUser.guard";

@Controller("foods")
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createPatientDto: CreateFoodDto, @UploadedFile() avatar: any) {
    return this.foodService.create(createPatientDto, avatar);
  }

  @Post("delete/:id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }

  @Post("update/:id")
  update(@Param("id") id: string, @Body() update: UpdateFoodDto) {
    return this.foodService.update(+id, update);
  }

  // @Get(":id")
  // async findOne(@Param("id") id: string) {
  //   console.log(`Finding product with ID: ${id}`);

  //   const parsedId = parseInt(id, 10);
  //   if (isNaN(parsedId)) {
  //     throw new BadRequestException(`Invalid product ID:${id}`);
  //   }
  //   const product = await this.foodService.findone(parsedId);
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }
  //   return product;
  // }

  @Get("foods/:id")
  async findone(@Param("id") id: string) {
    try {
      const product = await this.foodService.findone(+id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  @Get("product/:id")
  @Render("product")
  async findo(@Param("id") id: string, @Res() res: Response) {
    try {
      const product = await this.foodService.findone(+id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return res.render("product", {
        title: "Product Details",
        product: product,
      });
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  @Get()
  async getAllFood() {
    const foods = await this.foodService.findAll();
    return foods;
  }

  @Get("account")
  @Render("account")
  async getAccount(@Req() req: any, @Res() res: Response) {
    try {
      const token = req.cookies["access_token"];
      if (!token) {
        return res.redirect("/auth/login");
      }

      const decoded: any = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      });

      const userId = decoded.sub;
      const user = await this.customerService.findOne(userId);

      if (!user) {
        return res.redirect("/auth/login");
      }

      return {
        title: "Ovqatlar ro‘yxati",
        user,
      };
    } catch (error) {
      console.error("JWT verify error:", error.message);
      return res.redirect("/login");
    }
  }

  @Get("admin")
  @UseGuards(AdminhGuard)
  @Render("admin")
  async adminFoods(@Req() req: RequestWithUser) {
    try {
      const adminId = req.user?.sub;
      if (!adminId) {
        throw new UnauthorizedException("Admin ID not found");
      }

      const users = await this.customerService.findAll();
      const products = await this.foodService.findAll();

      console.log("Products🛎️:", products);

      return {
        title: "Admin paneli",
        users,
        products,
        admin: adminId,
      };
    } catch (error) {
      console.error("Error in adminFoods:", error);
      throw new InternalServerErrorException("Failed to load admin panel data");
    }
  }



  @UseGuards(RoleRedirectGuard)
  @Get("main")
  @Render("index")
  async getAllFoods() {
    const foods = await this.foodService.findAll();
    return {
      title: "Ovqatlar ro‘yxati",
      foods: foods,
    };
  }
}
