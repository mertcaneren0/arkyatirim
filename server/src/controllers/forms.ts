import { Request, Response } from 'express';
import { ListingForm, CareerForm } from '../models/Form';

export const submitListingForm = async (req: Request, res: Response) => {
  try {
    const form = new ListingForm(req.body);
    await form.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error submitting form' });
  }
};

export const submitCareerForm = async (req: Request, res: Response) => {
  try {
    const form = new CareerForm(req.body);
    await form.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error submitting form' });
  }
};

export const getListingForms = async (req: Request, res: Response) => {
  try {
    const forms = await ListingForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forms' });
  }
};

export const getCareerForms = async (req: Request, res: Response) => {
  try {
    const forms = await CareerForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forms' });
  }
}; 