import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interface for better typing with MongoDB
export interface SandwichDocument extends Sandwich, Document {
  id: string; // Mongoose creates an 'id' getter that returns _id as a string
}

@Schema({
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  toJSON: {
    virtuals: true,
    transform: (_: any, ret: Partial<{ _id: unknown; __v: number; id: string }>) => {
      ret.id = ret._id as string; // Modify to correct the id error
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Sandwich {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ingredients: string;

  // Additional fields can be added as necessary
}

export const SandwichSchema = SchemaFactory.createForClass(Sandwich);

// Adding a virtual 'id' for easier access to _id as a string
SandwichSchema.virtual('id').get(function () {
  return this._id.toHexString();
});