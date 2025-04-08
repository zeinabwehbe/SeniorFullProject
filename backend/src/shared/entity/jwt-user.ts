/**
 * Interface representing the structure of a JWT-authenticated user.
 *
 * The `JwtUser` interface defines the properties that are extracted from
 * a JSON Web Token (JWT) and used to represent the authenticated user
 * within the application.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JwtUser {
  id: number;
  phoneNumber: string;
  permissions: string[];
}
