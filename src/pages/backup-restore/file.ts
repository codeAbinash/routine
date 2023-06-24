import { Routine } from "../../lib/dateMethods"

export type Backup = {
   routines : Routine[],
   subscriptions : string[],
}