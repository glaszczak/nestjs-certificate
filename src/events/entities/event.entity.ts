import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name', 'type']) // decorator to add index for specified fields
@Entity()
export class Event{
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  type: string

  // @Index() // decorator to add index for this specified field
  @Column()
  name: string

  @Column('json')
  payload: Record<string, any>
}

