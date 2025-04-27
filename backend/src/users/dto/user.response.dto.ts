/**
 * Data Transfer Object (DTO) for the `User` model.
 *
 * This class is used to define the structure and validation rules for
 * transferring user data between the client and server. It ensures
 * that the data adheres to the expected format and contains the necessary
 * fields for representing a user's details.
 */

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  bio?: string;
  profilePic?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  phone?: string;
  address?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}
