import { UserServices } from '../../../src/core/services/UserServices';
import { UserRepository } from '../../../src/core/repositories/UserRepository';
import { CreateError } from '../../../src/shared/errors/CreateError';
import { NotFoundError } from '../../../src/shared/errors/NotFoundError';
import { expect, jest } from '@jest/globals';

describe('UserService', () => {
  let userService: UserServices;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      getAll: jest.fn(),
      create: jest.fn(),
      getByEmail: jest.fn(),
      delete: jest.fn(),
      getById: jest.fn(),
      updateUser: jest.fn(),
      update: jest.fn(),
    };

    userService = new UserServices(mockUserRepository);
  });

  describe('createUser', () => {
    const mockUser = {
      Id: 1,
      Name: 'Test User',
      Email: 'test@test.com',
      Password: '123456',
      Role: 1,
      DeletionDate: null,
      ModifiedDate: new Date().toISOString(),
      CreationDate: new Date().toISOString(),
    };

    it('deve criar um usuário com sucesso', async () => {
      mockUserRepository.getByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue({ ...mockUser, Id: 1 });

      const result = await userService.createUser(mockUser);

      expect(result).toHaveProperty('Id', 1);
      expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        Name: mockUser.Name,
        Email: mockUser.Email,
      }));
    });

    it('deve lançar erro se email já existe', async () => {
      mockUserRepository.getByEmail.mockResolvedValue(mockUser);

      await expect(userService.createUser(mockUser))
        .rejects
        .toThrow(CreateError);
    });
  });
});