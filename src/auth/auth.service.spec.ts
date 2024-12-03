import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw BadRequestException if email already exists', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue({
        id: randomUUID(),
        email: 'test@example.com',
      } as User);

      await expect(
        service.register({
          email: 'test@example.com',
          password: 'password123',
        } as CreateUserDto),
      ).rejects.toThrow(BadRequestException);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should hash the password and create a new user', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        id: randomUUID(),
        email: 'test@example.com',
      } as User);
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedpassword');
      mockJwtService.sign.mockReturnValue('token123');

      const result = await service.register({
        email: 'new@example.com',
        password: 'password123',
      } as CreateUserDto);

      expect(result).toEqual({ access_token: 'token123' });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'new@example.com',
      );
      expect(argon2.hash).toHaveBeenCalledWith('password123');
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'hashedpassword',
      });
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const id = randomUUID();
      const user: User = { id, email: 'test@example.com' } as User;
      mockJwtService.sign.mockReturnValue('token123');

      const result = await service.login(user);

      expect(result).toEqual({ access_token: 'token123' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        id,
        email: 'test@example.com',
      });
    });
  });

  describe('validateUser', () => {
    it('should throw BadRequestException if user is not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(
        service.validateUser('notfound@example.com', 'password123'),
      ).rejects.toThrow(BadRequestException);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'notfound@example.com',
      );
    });

    it('should throw BadRequestException if password does not match', async () => {
      const user: User = {
        id: randomUUID(),
        email: 'test@example.com',
        password: 'hashedpassword',
      } as User;
      mockUsersService.findOneByEmail.mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(BadRequestException);
      expect(argon2.verify).toHaveBeenCalledWith(
        'hashedpassword',
        'wrongpassword',
      );
    });

    it('should return the user if validation passes', async () => {
      const user: User = {
        id: randomUUID(),
        email: 'test@example.com',
        password: 'hashedpassword',
      } as User;
      mockUsersService.findOneByEmail.mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual(user);
      expect(argon2.verify).toHaveBeenCalledWith(
        'hashedpassword',
        'password123',
      );
    });
  });
});
