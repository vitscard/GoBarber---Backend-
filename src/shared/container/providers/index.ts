import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorogeProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorogeProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
