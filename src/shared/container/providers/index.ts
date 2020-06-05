import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorogeProvider from './StorageProvider/models/IStorageProvider';
// import IMailProvider from './MailProvider/models/IMailProovider'

container.registerSingleton<IStorogeProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
