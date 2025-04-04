// src/shared/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the current user from the request object.
 *
 * The `CurrentUser` decorator can be used in a controller to easily access
 * the authenticated user object that was added to the request by the JWT
 * authentication process.
 *
 * Usage example:
 *
 * @Controller('some-route')
 * export class SomeController {
 *
 *   @Get()
 *   someMethod(@CurrentUser() user: any) {
 *     console.log(user);
 * ...
 */
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
