import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ExceptionService } from 'src/common/exception.service';

@Injectable()
export class UserService extends ExceptionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async register(registerDto: CreateUserDto): Promise<User> {
    const userToSave = this.userRepository.create({
      ...registerDto,
    });
    console.log('user after create:', userToSave);
    const user = await this.userRepository.save(userToSave);
    delete user.password;

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const options = {
      expiresIn: this.configService.get('jwtLoginExpiredIn'),
      jwtid: user.id,
      secret: this.configService.get('jwtSecret'),
    };

    const token = this.jwtService.sign(loginUserDto, options);

    return token;
  }

  async validateUserToken(accessToken: string) {
    try {
      const options = {
        expiresIn: this.configService.get('jwtLoginExpiredIn'),
        secret: this.configService.get('jwtSecret'),
      };
      const idUser = this.jwtService.verify(accessToken, options);

      if (!idUser) throw new UnauthorizedException();

      return idUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
