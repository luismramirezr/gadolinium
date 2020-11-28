import { Request, Response } from 'express';
import File from 'collections/File';

class FileController {
  async show(req: Request, res: Response): Promise<void> {
    const { fileId } = req.params;
    const file = await File.getFile(fileId);
    return res.redirect(file.url);
  }
}

export default new FileController();
