import { test, expect } from "@jest/globals"
import { FirestoreDefinable } from "../src/classes/FirestoreDefinable"
import { DefinableDefinition } from "definable"

class Country extends FirestoreDefinable {
  name: string = ""
  code: string = ""

  definition({ prop }: DefinableDefinition): void {
    prop("name")
      .useDeserializer<string>((data) => this.name = data ?? "")
      .useSerializer<string>(() => this.name)
    prop("code")
      .useDeserializer<string>((data) => this.code = data ?? "")
      .useSerializer<string>(() => this.code)
  }
}

test("basic deserialize", async () => {
  const firestoreTestdoc = {
    data() {
      return {
        name: "Germany",
        code: "DE"
      }
    },
    exists: true,
    id: "test"
  }
  const country = new Country().deserializeDoc(firestoreTestdoc)
  expect(country!.name).toBe("Germany")
  expect(country!.code).toBe("DE")
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