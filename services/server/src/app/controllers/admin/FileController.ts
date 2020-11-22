import { Request, Response } from 'express';
import File from 'collections/File';

class FileController {
  async create(req: Request, res: Response): Promise<Response> {
    const files = req.files as Array<any>;
    await Promise.all(files.map(async (file) => File.createFile(file)));
    return res.json(files);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { fileId } = req.params;
    const file = await File.getFile(fileId);
    return res.json(file);
  }
}

export default new FileController();
