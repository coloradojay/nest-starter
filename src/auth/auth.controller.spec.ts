import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import LoginResponseDTO from './dto/loginResponse.dto';
import RegisterRequestDto from './dto/registerRequest.dto';
import RegisterResponseDto from './dto/registerResponse.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a login response if successful', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      const mockLoginResponse: LoginResponseDTO = {
        access_token: 'testtoken',
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const result = await controller.login({ user: mockUser });

      expect(result).toEqual(mockLoginResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should throw a BadRequestException on failure', async () => {
      mockAuthService.login.mockImplementation(() => {
        throw new BadRequestException('Invalid credentials');
      });

      await expect(controller.login({ user: null })).rejects.toThrow(
        BadRequestException,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(null);
    });
  });

  describe('register', () => {
    it('should return a register response if successful', async () => {
      const mockRegisterBody: RegisterRequestDto = {
        email: 'me@me.com',
        password: 'newpassword',
      };
      const mockRegisterResponse: RegisterResponseDto = {
        access_token: 'somejwt.asdf',
      };

      mockAuthService.register.mockResolvedValue(mockRegisterResponse);

      const result = await controller.register(mockRegisterBody);

      expect(result).toEqual(mockRegisterResponse);
      expect(mockAuthService.register).toHaveBeenCalledWith(mockRegisterBody);
    });

    it('should throw a BadRequestException on failure', async () => {
      const mockRegisterBody: RegisterRequestDto = {
        email: 'me@me.com',
        password: 'newpassword',
      };

      mockAuthService.register.mockImplementation(() => {
        throw new BadRequestException('Registration failed');
      });

      await expect(controller.register(mockRegisterBody)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockAuthService.register).toHaveBeenCalledWith(mockRegisterBody);
    });
  });
});
