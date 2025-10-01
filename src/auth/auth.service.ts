import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { Auth } from './entities/auth.entity.js';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login-dto.js';
import { RegisterDto } from './dto/register-dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  private generateTokens(payload: any) {
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    return { access_token, refresh_token, duration: 3600 };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async saveRefreshToken(user: User, refreshToken: string) {
    await this.revokeRefreshTokens(user.id);
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const auth = this.authRepository.create({
      user,
      refresh_token: refreshToken,
      status: 'active',
      createdAt: now,
      expiredAt,
    });
    return this.authRepository.save(auth);
  }

  async revokeRefreshTokens(userId: number) {
    const auths = await this.authRepository.find({
      where: {
        user: { id: userId },
        status: 'active',
      },
    });

    if (auths.length > 0) {
      for (const auth of auths) {
        auth.status = 'revoked';
      }
      return this.authRepository.save(auths);
    }

    return [];
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const { access_token, refresh_token } = this.generateTokens(payload);

    await this.saveRefreshToken(user, refresh_token);

    const { password, ...userWithoutPassword } = user;
    return {
      access_token,
      refresh_token,
      user: userWithoutPassword,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };

    const { access_token, refresh_token } = this.generateTokens(payload);

    await this.saveRefreshToken(user, refresh_token);

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    return this.revokeRefreshTokens(userId);
  }

  async refresh(refreshToken: string) {
    const auth = await this.authRepository.findOne({
      where: { refresh_token: refreshToken },
      relations: ['user'],
    });
    if (!auth) throw new UnauthorizedException('Invalid refresh token');

    const payload = { sub: auth.user.id, email: auth.user.email, role: auth.user.role };

    const { access_token, duration } = this.generateTokens(payload);

    return {
      access_token,
      refreshToken,
      duration,
    };
  }
}
