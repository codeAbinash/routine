import { type Routine } from '../../lib/dateMethods';

export type BackupType = {
   routines: Routine[];
   subscriptions: string[];
   notes: string[];
};
