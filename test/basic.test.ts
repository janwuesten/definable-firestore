import { test, expect } from "@jest/globals"
import { FirestoreDefinable } from "../src/classes/FirestoreDefinable"
import { convertFirestoreDate } from "../src/helpers/convertFirestoreDate"
import { DefinableDefinition } from "definable"

class Country extends FirestoreDefinable {
  name: string = ""
  code: string = ""
  timestamp: Date = new Date()

  definition({ prop }: DefinableDefinition): void {
    prop("name")
      .useDeserializer<string>((data) => this.name = data ?? "")
      .useSerializer<string>(() => this.name)
    prop("code")
      .useDeserializer<string>((data) => this.code = data ?? "")
      .useSerializer<string>(() => this.code)
    prop("timestamp")
      .useDeserializer<Date>((data) => this.timestamp = convertFirestoreDate(data) ?? new Date())
      .useSerializer<Date>(() => this.timestamp)
  }
}

test("basic deserialize", async () => {
  const timestamp = new Date()
  const firestoreTestdoc = {
    data() {
      return {
        name: "Germany",
        code: "DE",
        timestamp: timestamp
      }
    },
    exists: true,
    id: "test"
  }
  const country = new Country().deserializeDoc(firestoreTestdoc)
  expect(country!.name).toBe("Germany")
  expect(country!.code).toBe("DE")
  expect(country!.timestamp.getTime()).toBe(timestamp.getTime())
})
test("basic deserialize non existing", async () => {
  const firestoreTestDoc = {
    data() {
      return undefined
    },
    exists: false,
    id: "test"
  }
  const country = new Country().deserializeDoc(firestoreTestDoc)
  expect(country).toBe(null)
})