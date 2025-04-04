/**
 * A generic class representing a response that contains a list of items and a count.
 *
 * The `GetListResponse` class is used to encapsulate a list of objects along with
 * the total count of items. This is useful for returning paginated results or any
 * response where both the list of items and the total count are needed.
 *
 */
export class GetListResponse<T> {
  list: T[];
  totalRecords: number;
}
