export interface TrieInitOptions {
  isAppend: boolean;
}

export interface FindOutput<Type> {
  exists: boolean;
  data?: Type;
}

export interface TraverseOutputItem<Type> {
  key: string;
  data?: Type;
}

export interface TraverseOutput<Type> extends Array<TraverseOutputItem<Type>> {}

/**
 * Class representing a node in the Trie.
 */
class TrieNode<Type = any> {
  childs: { [key: string]: TrieNode<Type> };
  data?: Type;
  isWord: boolean;

  constructor(isWord: boolean = false, data?: Type) {
    this.data = data;
    this.isWord = isWord;
    this.childs = {}; // Initialize an empty object for child nodes
  }
}

/**
 * Class representing the Trie data structure.
 */
class Trie<Type> {
  private root: TrieNode<Type>;

  constructor(private readonly isAppend: boolean = false) {
    this.root = new TrieNode(false); // Initialize the root node
  }

  /**
   * Recursive helper function to insert a word into the Trie.
   */
  #insert(key: string, index: number, root: TrieNode<Type>, data?: Type): boolean {
    const char: string = key[index];
    const node: TrieNode<Type> | undefined = root.childs[char];
    const isLastChar: boolean = index === key.length - 1;

    // If the node doesn't exist, create it
    if (!node) {
      root.childs[char] = new TrieNode<Type>(isLastChar, data);
      if (isLastChar) return true;
    } else if (isLastChar) {
      // If it's the last character and node is not a word or append mode is enabled
      if (!node.isWord || this.isAppend) {
        node.isWord = true;
        node.data = data;
        return true;
      } else return false; // Word already exists and append mode is off
    }

    // Recursively insert the remaining characters
    return this.#insert(key, index + 1, root.childs[char], data);
  }

  /**
   * Insert a word into the Trie.
   * @param key - The word to insert.
   * @param data - Optional data associated with the word.
   * @returns True if the word was successfully inserted, otherwise false.
   */
  insert(key: string, data?: Type): boolean {
    if (key.length === 0) return false; // Cannot insert an empty string
    return this.#insert(key, 0, this.root, data);
  }

  /**
   * Recursive helper function to traverse and print the words in the Trie.
   */
  #traverse(root: TrieNode<Type>, word: string, result: TraverseOutput<Type>) {
    if (root.isWord) result.push({ key: word, ...(root.data && { data: root.data }) }); // Print the word if it is marked as a complete word

    // Recursively traverse each child node
    Object.entries(root.childs).forEach(([char, value]: [string, TrieNode<Type>]) => {
      this.#traverse(value, word + char, result);
    });
  }

  /**
   * Traverse and print all words in the Trie.
   */
  traverse(): TraverseOutput<Type> {
    const result: TraverseOutput<Type> = [];
    this.#traverse(this.root, "", result);
    return result;
  }

  /**
   * Recursive helper function to delete a word from the Trie.
   */
  #delete(key: string, index: number, root: TrieNode<Type>): boolean {
    const char: string = key[index];

    if (!root.childs[char]) return false; // Word doesn't exist

    if (index === key.length - 1) {
      const isWord: boolean = root.childs[char].isWord;
      // Delete the node if it's the end of the word and it doesn't contain any child
      if (`${root.childs[char].childs}` === "{}") {
        delete root.childs[char];
      } else {
        root.childs[char].isWord = false;
        root.childs[char].data = undefined;
      }
      return isWord;
    }

    // Recursively delete the remaining characters
    return this.#delete(key, index + 1, root.childs[char]);
  }

  /**
   * Delete a word from the Trie.
   * @param key - The word to delete.
   * @returns True if the word was successfully deleted, otherwise false.
   */
  delete(key: string): boolean {
    return this.#delete(key, 0, this.root);
  }

  /**
   * Recursive helper function to find a word in the Trie.
   */
  #find(key: string, index: number, root: TrieNode<Type>): FindOutput<Type> {
    const char: string = key[index];

    if (!root.childs[char]) return { exists: false }; // Word doesn't exist

    if (index === key.length - 1) {
      return { exists: root.childs[char].isWord, ...(root.childs[char].data && { data: root.childs[char].data }) }; // Word does exist
    }

    // Recursively search for the remaining characters
    return this.#find(key, index + 1, root.childs[char]);
  }

  /**
   * Find a word in the Trie.
   * @param key - The word to find.
   * @returns True if the word exists, otherwise false.
   */
  find(key: string): FindOutput<Type> {
    return this.#find(key, 0, this.root);
  }
}

/**
 * Initialize a new Trie instance with the given options.
 * @param options - Options to configure the Trie.
 * @returns A new Trie instance.
 */
export default function initTrie<Type>(options: TrieInitOptions): Trie<Type> {
  return new Trie<Type>(options.isAppend);
}
