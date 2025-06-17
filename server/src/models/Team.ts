import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  fullName: string;
  position: string;
  bio: string;
  specialties: string[];
  profileImage?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Ad soyad gerekli'],
      trim: true,
      maxlength: [100, 'Ad soyad 100 karakterden uzun olamaz']
    },
    position: {
      type: String,
      required: [true, 'Pozisyon gerekli'],
      trim: true,
      maxlength: [200, 'Pozisyon 200 karakterden uzun olamaz']
    },
    bio: {
      type: String,
      required: [true, 'Biyografi gerekli'],
      trim: true,
      maxlength: [2000, 'Biyografi 2000 karakterden uzun olamaz']
    },
    specialties: [{
      type: String,
      trim: true,
      maxlength: [100, 'Uzmanlık alanı 100 karakterden uzun olamaz']
    }],
    profileImage: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      default: 0,
      min: [0, 'Sıra numarası 0\'dan küçük olamaz']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Index for efficient ordering and filtering
TeamMemberSchema.index({ order: 1, isActive: 1 });

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema); 