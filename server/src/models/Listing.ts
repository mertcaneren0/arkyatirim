import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  title: string;
  type: 'Daire' | 'İşyeri' | 'Arsa' | 'Tarla' | 'Çiftlik' | 'Fabrika';
  price: number;
  area: number;
  description: string;
  city: string;
  district: string;
  address: string;
  images: string[];
  features: {
    floor?: number;
    heatingType?: string;
    kitchenType?: string;
    hasParking?: boolean;
    isFurnished?: boolean;
    isInComplex?: boolean;
    blockNo?: string;
    parcelNo?: string;
    sheetNo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Daire', 'İşyeri', 'Arsa', 'Tarla', 'Çiftlik', 'Fabrika'],
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    features: {
      floor: Number,
      heatingType: String,
      kitchenType: String,
      hasParking: Boolean,
      isFurnished: Boolean,
      isInComplex: Boolean,
      blockNo: String,
      parcelNo: String,
      sheetNo: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Listing = mongoose.model<IListing>('Listing', listingSchema); 