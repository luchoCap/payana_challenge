import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ErrorResponse } from '../common/response/error.response';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOkResponse({ description: ' Register was succesfully' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: ' Bad Request' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'registerUser',
    description: 'This endpoint register a user',
  })
  async register(@Body() user: CreateUserDto) {
    return await this.userService.register(user);
  }

  @Post('login')
  @ApiOkResponse({ description: ' Login was succesfully' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: ' Bad Request' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'registerUser',
    description: 'This endpoint register a user',
  })
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint login a user',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
