import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }

    // http://localhost:3000/coffees/incorrectString => returns { "statusCode": 400, "message": "Validation failed. \"NaN\" is not an integer.", "error": "Bad Request" }
    return val;
  }
}
