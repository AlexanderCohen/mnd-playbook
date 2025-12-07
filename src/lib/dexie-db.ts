import Dexie, { type Table } from 'dexie';
import { Assessment, StageNote } from '@/types';

export interface DexieDB extends Dexie {
  assessments: Table<Assessment>;
  stageNotes: Table<StageNote>;
}

export const db = new Dexie('MNDPlaybook') as DexieDB;

db.version(1).stores({
  assessments: '++id, date',
  stageNotes: '++id, stageId',
});
