import { DefinableData } from "definable";

export interface FirestoreData {
  id: string
  data: (DefinableData | undefined) | (() => DefinableData | undefined)
  exists: boolean | (() => boolean)
}