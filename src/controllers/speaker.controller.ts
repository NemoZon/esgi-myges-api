import { Request, Response } from 'express';
import speakerService from '../services/speaker.service';

class SpeakerController {
  async getUserSpeaker(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const speakers = await speakerService.get({ user: userId });
      if (speakers.length === 0) {
        res.status(404).json({ message: 'No speakers found for this user' });
      }
      res.status(200).json(speakers[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching speakers' });
    }
  }
}

const speakerController = new SpeakerController();
export default speakerController;
