import { Entity } from 'typeorm';

@Entity()
export class Orders {
  id: string;
  transactionId: string;
  code: string;
  
}
