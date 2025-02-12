import { Entity, PrimaryKey, Property,OneToMany, ManyToMany ,Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/BaseEntity"; 
import { User } from "./User.Entity";
import { New } from "./New.Entity";


@Entity()
export class Newcategory extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @OneToMany(()=> New, (news) => news.category , { orphanRemoval: true, cascade: [Cascade.ALL] })
  news = new Collection<New> (this)

  @ManyToMany (() => User, (user) => user.newscategory, { cascade: [Cascade.PERSIST, Cascade.MERGE] })
  users = new Collection <User> (this)
}

