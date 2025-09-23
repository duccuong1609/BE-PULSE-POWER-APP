import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login-dto'
import { RegisterDto } from './dto/register-dto'
import { LoginResponseDto } from './dto/login-response-dto'
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard'
import { RefreshResponseDto } from './dto/refresh-response-dto'

@ApiTags('Authentication Services')
@Controller('auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login và lấy JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: LoginResponseDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @UseGuards(JwtAuthGuard)
  async logout(@Param('userId') userId: number) {
    return this.authService.logout(userId)
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: RefreshResponseDto })
  async refresh(@Param('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken)
  }

}
