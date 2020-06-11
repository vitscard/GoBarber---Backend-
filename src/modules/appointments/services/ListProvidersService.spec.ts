import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com.br',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@teste.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@teste.com.br',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
