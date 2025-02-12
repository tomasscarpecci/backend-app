import { NextFunction, Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { New } from './New.Entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { Newcategory } from './Newscategory.Entity';
import { Editorial } from './Editorial.Entity';


export default class NewController {
  
      private em: EntityManager;
    
      constructor(em: EntityManager) {
        this.em = em;
      }

  public getAll = async (req: Request, res: Response): Promise<void> => {
          try {
            const news = await this.em.find(New, {}, {populate: ['category','editorial']}); 
            res.json ({message: 'found all news' ,news});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching news' });
          }
        };

  
  public getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
     res.status(400).json({ message: 'Invalid ID format' });
    }
    const noti = await this.em.findOne(New, { _id: new ObjectId(id) }, { populate: ['category', 'editorial'] });
    if (!noti) {
     res.status(404).json({ message: 'New not found' });
    }
    res.status(200).json({ message: 'Found New', data: noti });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

  public create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, editorial, ...newData } = req.body;
    const newNoti = this.em.create(New, newData);
    if (category) {
      const categoryObjectId = new ObjectId(category);
      const categoryEntity = await this.em.findOne(Newcategory, { _id: categoryObjectId });
      if (!categoryEntity) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      newNoti.category = categoryEntity;
    }
    if (editorial) {
      const editorialObjectId = new ObjectId(editorial);
      const editorialEntity = await this.em.findOne(Editorial, { _id: editorialObjectId });
      if (!editorialEntity) {
        res.status(404).json({ message: 'Editorial not found' });
        return ;
      }
      newNoti.editorial = editorialEntity;
    }
    await this.em.persistAndFlush(newNoti);
    res.status(201).json({ message: 'New created', data: newNoti });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

  public update = async (req: Request, res: Response): Promise<void> => {
  try { 
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid ID format' });
      return;
    }
    const objectId = new ObjectId(id);
    const noti = await this.em.findOne(New, { _id: objectId });
    if (!noti) {
      res.status(404).json({ message: 'New not found' });
      return;
    }
    const { category, editorial, ...updateData } = req.body;
    this.em.assign(noti, updateData);
    if (category && ObjectId.isValid(category)) {
      const categoryObjectId = new ObjectId(category);
      const categoryEntity = await this.em.findOne(Newcategory, { _id: categoryObjectId });
      if (!categoryEntity) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      noti.category = categoryEntity;
    }
    if (editorial && ObjectId.isValid(editorial)) {
      const editorialObjectId = new ObjectId(editorial);
      const editorialEntity = await this.em.findOne(Editorial, { _id: editorialObjectId });
      if (!editorialEntity) {
        res.status(404).json({ message: 'Editorial not found' });
        return;
      }
      noti.editorial = editorialEntity;
    }
    await this.em.flush();
    res.status(200).json({ message: 'New updated', data: noti });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


  public delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid ID format' });
      return;
    }
    const objectId = new ObjectId(id);
    const noti = await this.em.findOne(New, { _id: objectId }, { populate: ['category.news', 'editorial.news'] });
    if (!noti) {
      res.status(404).json({ message: 'New not found' });
      return;
    }
    if (noti.category) {
      noti.category.news.remove(noti);
    }
    if (noti.editorial) {
      noti.editorial.news.remove(noti);
    }
    await this.em.flush(); 
    await this.em.removeAndFlush(noti); 
    res.status(200).json({ message: 'New deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



}


/*public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const noti = await this.em.findOne(New, { id }, { populate: ['category', 'editorial'] });
      res.status(200).json({ message: 'found New', data: noti });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };if (!noti) {
        res.status(404).json({ message: 'New not found' });
        return;
      }
        
  public delete = async (req: Request, res: Response): Promise<void> => {
      try {
        const id = req.params.id; 
    
        const noti = await this.em.findOne( New, { id });
    
        if (!noti) {
          res.status(404).json({ message: 'New not found' });
          return;
        }
        await this.em.removeAndFlush(noti);
    
        res.status(200).json({ message: 'New deleted successfully', data: noti });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
    };*/