import { model, Schema } from "mongoose";
import { TMember } from "./interfaces/member.interface";

const memberSchema = new Schema<TMember>({
    name:{type:String, required:true},
    designation:{type:String, required:true},
    bio:{type:String, required:true},
    avatar:{type:String},
})

export const MemberModel = model<TMember>('Member', memberSchema);