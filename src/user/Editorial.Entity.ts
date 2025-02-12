import { Entity, PrimaryKey, OneToMany,Cascade, Property, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/BaseEntity";
import { New } from "./New.Entity";


@Entity()
export class Editorial extends BaseEntity {

  @Property({ nullable: false, unique: true })
  nombreFantasia!: string; 

  @Property({nullable: false})
  cuil!: string;

  @Property({nullable: false})
  razonSocial!: string;

  @OneToMany (()=> New, (news) => news.editorial, { orphanRemoval: true })
  news = new Collection <New> (this);

}

