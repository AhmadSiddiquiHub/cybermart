/* eslint-disable prettier/prettier */
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { BadRequestException } from '@nestjs/common/exceptions';

function validateConfig<T extends object>(
  config: Record<string, unknown>,

  envVariablesClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new BadRequestException(
      errors.toString() + 'please define it in .env File',
      { cause: new Error() },
    );
  }

  return validatedConfig;
}

export default validateConfig;
