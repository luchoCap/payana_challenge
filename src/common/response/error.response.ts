import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({
    oneOf: [
      {
        type: 'string',
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | string[];

  @ApiPropertyOptional()
  error?: string;
}
