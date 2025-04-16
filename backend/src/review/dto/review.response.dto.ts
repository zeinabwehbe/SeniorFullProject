/**
 * Data Transfer Object (DTO) for the `Review` model.
 *
 * This class defines the structure of the data sent back to the client
 * when retrieving review information. It ensures consistent and clean
 * data formatting for reviews created by users.
 */

export class ReviewResponseDto {
  id: number;
  userId: number;
  rating?: number;
  comment: string;
  createdAt: string;
  userName?: string;
  userTitle?: string;
}
