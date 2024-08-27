# Trie Dictionary

A TypeScript implementation of a Trie (prefix tree) data structure, allowing efficient insertion, deletion, lookup, and traversal of words. This package is suitable for various applications such as autocomplete systems, spell checkers, and more.

## Features

- **Insert Words**: Insert words with optional associated data.
- **Find Words**: Search for words and retrieve associated data.
- **Delete Words**: Remove words from the Trie.
- **Traverse**: Traverse and retrieve all words stored in the Trie along with their associated data.
- **Autocomplete**: Get autocomplete suggestions based on a given prefix.

## Installation

Install the package via npm:

```bash
npm install trie-dictionary
```

## Usage

Here’s how you can use the `trie-dictionary` in your TypeScript project:

```typescript
import initTrie from 'trie-dictionary';

interface MyDataType {
  someProperty: string;
}

const trie = initTrie<MyDataType>({ isAppend: false });

// Insert words
trie.insert('hello', { someProperty: 'world' });
trie.insert('hell', { someProperty: 'fire' });

// Find words
const foundHello = trie.find('hello');
console.log(foundHello); // { exists: true, data: { someProperty: 'world' } }

const foundHeaven = trie.find('heaven');
console.log(foundHeaven); // { exists: false }

// Delete words
const deleted = trie.delete('hell');
console.log(deleted); // true

// Traverse the Trie
const allWords = trie.traverse();
console.log(allWords); // [{ key: 'hello', data: { someProperty: 'world' } }]

// Autocomplete suggestions
const suggestions = trie.complete('he');
console.log(suggestions); // [{ key: 'hello', data: { someProperty: 'world' } }, { key: 'hell', data: { someProperty: 'fire' } }]
```

## API

### `initTrie<Type>(options: TrieInitOptions): Trie<Type>`

Initializes a new Trie instance.

- `options`: An object with the following property:
  - `isAppend`: A boolean indicating whether to overwrite data for existing words or append new data. Default is `false`.

Returns an instance of `Trie`.

### `Trie<Type>`

#### `insert(key: string, data?: Type): boolean`

Inserts a word into the Trie with optional associated data.

- `key`: The word to insert.
- `data`: Optional data associated with the word.

Returns `true` if the word was successfully inserted, otherwise `false`.

#### `find(key: string): FindOutput<Type>`

Finds a word in the Trie.

- `key`: The word to find.

Returns an object with `exists` set to `true` if the word exists, and `data` containing the associated data if it exists.

#### `delete(key: string): boolean`

Deletes a word from the Trie.

- `key`: The word to delete.

Returns `true` if the word was successfully deleted, otherwise `false`.

#### `traverse(): TraverseOutput<Type>`

Traverses the Trie and returns an array of objects containing all stored words along with their associated data.

#### `complete(prefix: string): CompleteOutput<Type>`

Gets autocomplete suggestions based on a given prefix.

- `prefix`: The prefix to search for autocomplete suggestions.

Returns :  An array of objects, where each object contains a `key` (suggested word) and its associated `data`.

## Use Cases

The Trie data structure can be used in various applications, including but not limited to:

- **Autocomplete Systems**: Provide real-time suggestions as users type.
- **Spell Checkers**: Efficiently check the validity of words and offer corrections.
- **Search Engine Indexing**: Quickly retrieve relevant data based on prefixes.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

- Vipul Goel - [GitHub Profile](https://github.com/vipulgoel30)

## Bugs

If you find any issues, please report them [here](https://github.com/vipulgoel30/trie-dictionary/issues).
