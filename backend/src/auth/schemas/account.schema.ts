/* eslint-disable prettier/prettier */



import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";





@Schema({
    timestamps:true,
})
export class Account{
    @Prop()
    name:string
    @Prop({unique:[true,'Duplicate email entered']})
    email:string

    @Prop()
    password:string;



}

export const AccountSchema=SchemaFactory.createForClass(Account);