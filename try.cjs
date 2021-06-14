const StorageShim = require('node-storage-shim');

// eslint-disable-next-line import/no-extraneous-dependencies
const PetShop = require('pet-shop');

const namespace = 'test-3';

const storage = new StorageShim();

const store = PetShop({ namespace, storage });

delete store.namespace;

store.namespace = 'overwrite';
