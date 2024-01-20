# Definable for Firestore

## Introduction

This is a extension for [Definable](https://github.com/janwuesten/definable) - a class structure library for serializing and deserializing JSON data into TypeScript classes.

## Installation

To install Definable simple use the Node package manager of your choice to install the `definable-firestore` package as well as the main `definable` package.

`npm i definable definable-typescript`

## Documentation

You can find the documentation here: https://janwuesten.github.io/definable/docs/category/firestore-extension

## Usage example

```ts
class Country extends FirestoreDefinable {
  name: string = ""
  countryCode: string = ""

  definition({ useProp }: DefinableDefinition): void {
    useProp("name")
      .useDeserializer<string>((data) => this.name = data ?? "")
      .useSerializer<string>(() => this.name)
    useProp("countryCode")
      .useDeserializer<string>((data) => this.countryCode = data ?? "")
      .useSerializer<string>(() => this.countryCode)
  }
}

const docRef = doc(collection(getFirestore(), "country"), "DE")
const country = new Country().deserializeDoc(await getDoc(docRef))
if (!country) {
  console.log("Country does not exist!")
  return
}
console.log(`Country ${country.name} found!`)
```