import { openDB } from 'idb';

const initdb = async () =>
  openDB('textdb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textdb')) {
        console.log('textdb database already exists');
        return;
      }
      db.createObjectStore('textdb', { keyPath: 'id', autoIncrement: true });
      console.log('textdb database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const textDb = await openDB('textdb', 1);
  const tx = textDb.transaction('textdb', 'readwrite');
  const store = tx.objectStore('textdb');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('textdb', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('textdb', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('textdb');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
}

initdb();
