import { FirestoreDate } from "../interfaces/FirestoreDate"

export const convertFirestoreDate = (date: FirestoreDate | null): Date | null => {
  if (date == null) {
    return null
  }
  if (date instanceof Date) {
    return date
  }
  if (typeof date.toDate == "function") {
    return date.toDate()
  }
  return date as Date
}