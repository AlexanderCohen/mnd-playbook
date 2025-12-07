import Dexie, { Table } from 'dexie';
import { Assessment, UserPosition } from '@/types';

export class MNDDatabase extends Dexie {
  assessments!: Table<Assessment>;
  userPosition!: Table<UserPosition>;

  constructor() {
    super('mnd-playbook');
    this.version(1).stores({
      assessments: '++id, date',
      userPosition: 'currentStageId'
    });
  }
}

export const db = new MNDDatabase();
