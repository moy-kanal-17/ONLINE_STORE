// admin.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  BadRequestException,
  Render,
  Res,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto, FilterAdminDto } from "./dto/admin.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { Admin } from "./model/admin.model";
import { AdminhGuard } from "src/common/guards/admin.guard";
import { CreatorhGuard } from "src/common/guards/creator.guard";
import { Response } from "express";
import { title } from "process";
import { SelfOrCreatorGuard } from "src/common/guards/selfOrCreater.guard";
import { SelfOrModeratorGuard } from "src/common/guards/SelfOrAdmin.guard";

@ApiTags("Admins")
@Controller("admins")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(CreatorhGuard)
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({
    status: 201,
    description: "Admin created successfully",
    type: Admin,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @UseGuards(CreatorhGuard)
  async find (){
    const admins = await this.adminService.findAll();
    if (!admins || admins.length === 0) {
      console.log("No admins found");
      return [];
    }
    console.log("Admins found:", admins);
    return admins;
  }
  // @Get()
  // @UseGuards(AdminhGuard)
  // @ApiOperation({ summary: "Get all admins with filters and sorting" })
  // @ApiResponse({ status: 200, description: "List of admins", type: [Admin] })
  // @ApiQuery({
  //   name: "email",
  //   required: false,
  //   description: "Filter by email (partial match)",
  // })
  // @ApiQuery({
  //   name: "is_active",
  //   required: false,
  //   type: Boolean,
  //   description: "Filter by active status",
  // })
  // @ApiQuery({
  //   name: "iscreator",
  //   required: false,
  //   type: Boolean,
  //   description: "Filter by creator status",
  // })
  // @ApiQuery({
  //   name: "sort_by",
  //   required: false,
  //   description: "Field to sort by (e.g., full_name, email)",
  // })
  // @ApiQuery({
  //   name: "sort_order",
  //   required: false,
  //   enum: ["ASC", "DESC"],
  //   description: "Sort order",
  // })
  // async findAll(@Query() filters: FilterAdminDto): Promise<Admin[]> {
  //   return this.adminService.findAll(filters);
  // }

  @Get("get/:id")
  @UseGuards(SelfOrCreatorGuard)
  @ApiOperation({ summary: "Get an admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin found", type: Admin })
  @ApiResponse({ status: 404, description: "Admin not found" })
  async findOne(@Param("id") id: string): Promise<Admin> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid admin ID:${id}`);
    }
    return this.adminService.findOne(parsedId);
  }

  @Put(":id")
  @UseGuards(SelfOrModeratorGuard)
  @ApiOperation({ summary: "Update an admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({
    status: 200,
    description: "Admin updated successfully",
    type: Admin,
  })
  @ApiResponse({ status: 404, description: "Admin not found" })
  async update(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<Admin> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      console.log("Invalid admin ID:", id);
      
      throw new BadRequestException(`Invalid admin ID:${id}`);
    }
    return this.adminService.update(parsedId, updateAdminDto);
  }

  @Get("creator")
  // @Render("creator")
  @UseGuards(CreatorhGuard)
  @ApiOperation({ summary: "Get all creators" })
  @ApiResponse({ status: 200, description: "List of creators", type: [Admin] })
  async findCreators(@Res() res:Response): Promise<void> {
    const admin= await  this.adminService.findAll();
    console.log("Adminlar:", admin);
    if (!admin || admin.length === 0) {
      console.log("No admins found");
      res.render('creator', { admins: "Admins not founds" });
      return;
    }
    
    res.render('creator', { admins: admin ,title: "Creators" });
  }

  @Post("delete/:id")
  @UseGuards(CreatorhGuard)
  @ApiOperation({ summary: "Delete an admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin deleted successfully" })
  @ApiResponse({ status: 404, description: "Admin not found" })
  async remove(@Param("id") id: string): Promise<void> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException("Invalid admin ID");
    }
    return this.adminService.remove(parsedId);
  }
}
