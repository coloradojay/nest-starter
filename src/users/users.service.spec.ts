import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    id: randomUUID(),
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findOneByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    it('should return null if no user is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOneByEmail('notfound@example.com');

      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'notfound@example.com',
      });
    });
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const newUser = {
        email: 'new@example.com',
        password: 'newpassword',
      } as User;
      const id = randomUUID();
      mockRepository.create.mockReturnValue(newUser);
      mockRepository.save.mockResolvedValue({ ...newUser, id });

      const result = await service.create(newUser);

      expect(result).toEqual({ ...newUser });
      expect(mockRepository.create).toHaveBeenCalledWith(newUser);
      expect(mockRepository.save).toHaveBeenCalledWith(newUser);
    });
  });
});
