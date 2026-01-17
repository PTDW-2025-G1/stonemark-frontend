/**
 * Utility functions for handling Spring Boot pagination sort parameters
 */
export class SortUtils {
  /**
   * Builds a Spring Boot sort string from field and order
   * @param sortField - The field to sort by
   * @param sortOrder - 1 for ascending, -1 for descending
   * @returns Sort string in format "field,direction" (e.g., "name,asc" or "id,desc")
   */
  static buildSortString(sortField?: string, sortOrder?: number): string | undefined {
    if (!sortField || sortOrder === undefined) {
      return undefined;
    }

    const direction = sortOrder === 1 ? 'asc' : 'desc';
    return `${sortField},${direction}`;
  }
}
