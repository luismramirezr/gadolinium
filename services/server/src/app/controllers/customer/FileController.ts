import { Request, Response } from 'express';
import File from 'collections/File';

class FileController {
  async create(req: Request, res: Response): Promise<Response> {
    const files = req.files as Array<any>;
    await Promise.all(files.map(async (file) => File.createFile(file)));
    return res.json(files);
  }
}

export default new FileController();
