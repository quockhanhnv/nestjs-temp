import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Request, Response } from 'express';
import { CreateCustomerDTO } from '../dto/customer.dto';

@Controller('customers')
export class AppController {
  constructor(private readonly customerService: CustomerService) {}

    @Get()
    async getAllCustomers(@Res() res: Response) {
        try {
            const data = await this.customerService.listCustomer();
            res.status(HttpStatus.OK).json(data)
        } catch(err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    }

    @Post()
    async createCustomer(@Res() res: Response, @Body() customerParam: CreateCustomerDTO) {
        try {
            const data = await this.customerService.createCustomer(customerParam);
            res.status(HttpStatus.OK).json(data)
        } catch(err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    }

    @Get(':customerId')
    async getCustomerById(@Res() res: Response, @Param('id') id: string) {
        const data = await this.customerService.getCustomer(id);
        res.status(HttpStatus.OK).json(data)
    }

    @Delete()
    async deleteCustomerById(@Res() res: Response, @Query('customerid') id: string) {
        const data = await this.customerService.getCustomer(id);
        res.status(HttpStatus.OK).json({
            message: 'customer deleted succesfully',
            data
        })
    }

    @Put()
    async updateCustomerById(@Res() res: Response, @Req() req: Request, @Query('customerid') id: string) {
        const data = await this.customerService.updateCustomer(id, req.body);
        res.status(HttpStatus.OK).json(data)
    }
}
