import { Entity, PrimaryKey, Property,OneToMany, ManyToMany ,Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/BaseEntity"; 
import { Newcategory } from "./Newscategory.Entity";

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  Nombre!: string;
  
  @Property({ nullable: false })
  Apellido!: string;

  @Property({ nullable: false })
  Mail!: string;

  @Property({ nullable: false })
  Clave!: string;
  
  @ManyToMany (() => Newcategory, (newcategory) => newcategory.users, {owner: true,})
  newscategories = new Collection <Newcategory> (this);
  
}