import { NextFunction, Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { Editorial } from './Editorial.Entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { New } from './New.Entity';


export default class EditorialController {

    private em: EntityManager;
  
    constructor(em: EntityManager) {
      this.em = em;
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        try {
          const editoriales = await this.em.find(Editorial, {}, {populate:['news']});
          res.json ({message: 'found all editorials' ,editoriales});
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching editorials' });
        }
      };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const editorial = await this.em.findOne(Editorial, { _id: objectId }, { populate: ['news'] });
      if (!editorial) {
        res.status(404).json({ message: 'Editorial not found' });
        return;
      }
      res.status(200).json({ message: 'Found editorial', data: editorial });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };


  public create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { news, ...editorialData } = req.body;
    const editorial = this.em.create(Editorial, editorialData);
    if (news && Array.isArray(news)) {
      for (const newsId of news) {
        const objectId = new ObjectId(newsId);
        const existingNew = await this.em.findOne(New, { _id: objectId });
        if (!existingNew) {
          res.status(404).json({ message: `News with ID ${newsId} not found` });
          return;
        }
        existingNew.editorial = editorial;
        editorial.news.add(existingNew); 
      }
    }
    await this.em.persistAndFlush(editorial); // Guardar en la DB
    res.status(201).json({ message: 'Editorial created', data: editorial });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

  public update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const editorial = await this.em.findOne(Editorial, { _id: objectId });
    if (!editorial) {
      res.status(404).json({ message: 'Editorial not found' });
      return;
    }
    if (req.body.news && Array.isArray(req.body.news)) {
      for (const newsId of req.body.news) {
        const newsObjectId = new ObjectId(newsId);
        const existingNew = await this.em.findOne(New, { _id: newsObjectId });
        if (!existingNew) {
          res.status(404).json({ message: `News with ID ${newsId} not found` });
          return;
        }
        existingNew.editorial = editorial;
        editorial.news.add(existingNew);
      }
    }
    this.em.assign(editorial, req.body);
    await this.em.flush();
    res.status(200).json({ message: 'Editorial updated', data: editorial });
    
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


  public delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const editorial = await this.em.findOne(Editorial, { _id: objectId });
    if (!editorial) {
      res.status(404).json({ message: 'Editorial not found' });
      return;
    }
    await this.em.removeAndFlush(editorial);
    res.status(200).json({ message: 'Editorial deleted successfully', data: editorial });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


}


/*public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const editorial = await this.em.findOne(Editorial, { id }, { populate: ['news'] });

      if (!editorial) {
        res.status(404).json({ message: 'Editorial not found' });
        return;
      }
      res.status(200).json({ message: 'found editorial', data: editorial });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id; 
  
      const editorial = await this.em.findOne( Editorial, { id });
  
      if (!editorial) {
        res.status(404).json({ message: 'editorial not found' });
        return;
      }
      await this.em.removeAndFlush(editorial);
  
      res.status(200).json({ message: 'editorial deleted successfully', data: editorial });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }; */