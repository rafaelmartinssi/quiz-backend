import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type GeneratedJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(userId: number): Promise<GeneratedJwtProps> {
    const accessToken = await this.jwtService.signAsync({
      id: userId,
    });
    return { accessToken };
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
