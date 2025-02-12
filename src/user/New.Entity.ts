import { Entity, PrimaryKey, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/BaseEntity"; 
import { Newcategory } from "./Newscategory.Entity";
import { Editorial } from "./Editorial.Entity";


@Entity()
export class New extends BaseEntity {

  @Property({ nullable: false, unique: true })
  titulo!: string; 

  @Property({nullable: false})
  contenido!: string;

  @Property({nullable: false})
  fechaPublicacion!: string;

  @Property({nullable: false})
  fechaCreacion!: string;

  @ManyToOne(() => Newcategory, {nullable: true})
  category !: Rel<Newcategory>;

  @ManyToOne (() => Editorial, {nullable: true})
  editorial !: Rel<Editorial>;


}

