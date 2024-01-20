import { Definable, DeserializeOptions } from "definable"
import { FirestoreData } from "../interfaces/FirestoreData"

export abstract class FirestoreDefinable extends Definable {
  documentID: string = ""

  deserializeDoc(doc: FirestoreData, options?: DeserializeOptions) {
    if (typeof doc.id != "string") {
      throw new Error("provide firestore document data for deserializeFromDoc")
    }
    if (typeof doc.data != "function" && typeof doc.data != "object") {
      throw new Error("provide firestore document data for deserializeFromDoc")
    }
    if (typeof doc.exists != "boolean" && typeof doc.exists != "function") {
      throw new Error("provide firestore document data for deserializeFromDoc")
    }
    if ((typeof doc.exists == "boolean" && !doc.exists) || (typeof doc.exists == "function" && !doc.exists())) {
      return null
    }
    this.documentID = doc.id
    let data = {}
    if (typeof doc.data == "function") {
      data = doc.data() ?? {}
    } else {
      data = doc.data ?? {}
    }
    this.deserialize(data, options)
    return this
  }
}