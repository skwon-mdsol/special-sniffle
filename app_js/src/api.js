import low from 'lowdb';
import path from 'path';
import fileSync from 'lowdb/lib/storages/file-sync';

export function denormalizeData(data, idName, entities, key) {
  return data.map(item => {
    const addedProperty = {};
    addedProperty[key] = entities[item[idName]]
    return Object.assign({}, item, addedProperty);
  });
};

export default low(path.resolve(__dirname, './db.json'), { storage: fileSync });
