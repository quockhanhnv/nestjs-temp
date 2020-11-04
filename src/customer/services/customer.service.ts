import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Customer } from '../interface/customer.interface';
import { CreateCustomerDTO } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
    
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>){}
    
    public async listCustomer(): Promise<Customer[]> {
        return await this.customerModel.find({});
    }

    public async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = await this.customerModel(customer);
        return newCustomer.save();
        // return await this.customerModel.save(customer);
    }

    public async updateCustomer(id, customerDTO: CreateCustomerDTO): Promise<Customer> {
        return await this.customerModel.findByIdAndUpdate(id, customerDTO, { new: true });
    }

    public async getCustomer(id: string): Promise<Customer> {
        const customer = this.customerModel.findById(id).exec();

        if(!customer) {
            throw new NotFoundException('Customer not found');
        }

        return customer;
    }

    public async removeCustomer(id: string): Promise<Customer> {
        try {
            return await this.customerModel.findByIdAndRemove(id);
        } catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

}