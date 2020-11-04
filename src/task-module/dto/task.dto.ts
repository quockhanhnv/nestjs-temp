import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TaskDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;


    // completed: boolean;
    // description: string;
    // ownder: string;
    // duration: number;
}


export class TaskParamDto {

    // @IsUUID()
    @IsDefined()
    uuid: string; 
}

export class QueryParamDto {

    @IsDefined()
    @IsBoolean()
    @Transform(value => {
        if(value === 'true') return true;
        if(value === 'false') return false;
    })
    filter: boolean;

    
    @IsDefined()
    @IsString()
    name: string;
}