import { Document, FilterQuery, Types } from 'mongoose';
import speakerModel, { ISpeaker } from '../models/speaker.model';
import ApiError from '../helpers/ApiError';

class SpeakerService {
  async create(speaker: Omit<ISpeaker, '_id'>): Promise<ISpeaker & Document> {
    try {
      const newSpeaker = await speakerModel.create(speaker);
      return newSpeaker;
    } catch (error) {
      console.error('Error creating speaker:', error);
      throw error;
    }
  }
  async get(filter: FilterQuery<ISpeaker>): Promise<ISpeaker[]> {
    try {
      const speakers = await speakerModel.find(filter);
      return speakers;
    } catch (error) {
      console.error('Error fetching speakers:', error);
      throw error;
    }
  }
  async update(
    speakerId: string | Types.ObjectId,
    speaker: Omit<ISpeaker, '_id'>
  ): Promise<ISpeaker> {
    try {
      const updatedSpeaker = await speakerModel.findByIdAndUpdate(speakerId, {
        $set: speaker
      });
      if (!updatedSpeaker) {
        throw ApiError.notFound('Speaker not found');
      }
      return updatedSpeaker.toObject();
    } catch (error) {
      console.error('Error updating speaker:', error);
      throw error;
    }
  }
}

const speakerService = new SpeakerService();
export default speakerService;
