# Refactoring Plan: Split Services into Public and Admin Versions

The backend refactor requires dividing services into public and admin versions to ensure better separation of concerns and security. This plan covers all relevant services in the project.

## General Strategy
For each service identified as having mixed public and administrative functionality, we will:
1.  Create a `*PublicService` for read-only or user-facing operations.
2.  Create a `*AdminService` (or `*ManagementService`) for administrative operations (create, update, delete, moderate).
3.  Update the original service to be deprecated or removed, or refactor it to delegate to the new services if necessary.

## Services to Refactor

### 1. Monument Service (`projects/shared/src/lib/core/services/monument/`)
**Current:** `MonumentService`
**New:**
*   `MonumentPublicService`: `getMonuments`, `searchMonuments`, `getMonumentById`, `getAllForMap`, `findByPolygon`, `filterByCity`, `filterByDivision`, `getPopularMonuments`, `getLatestMonuments`, `countMonuments`, `getDetailedMonuments`.
*   `MonumentAdminService`: `createMonument`, `updateMonument`, `deleteMonument`, `uploadPhoto`, `getDetailedMonumentsManagement`, `importMonumentsFromGeoJson`.

### 2. Mark Service (`projects/shared/src/lib/core/services/mark/`)
**Current:** `MarkService`
**New:**
*   `MarkPublicService`: `getMarks`, `getDetailedMarks`, `searchMarks`, `searchByImage`, `getMark`.
*   `MarkAdminService`: `getDetailedMarksManagement`, `createMark`, `updateMark`, `deleteMark`, `uploadPhoto`.

**Current:** `MarkOccurrenceService`
**New:**
*   `MarkOccurrencePublicService`: `getAll`, `getById`, `getByMarkId`, `getByMarkIdForMap`, `getByMonumentId`, `filterByMarkAndMonument`, `getLatestOccurrences`, `countByMarkId`, `countByMonumentId`, `countMonumentsByMarkId`, `getAvailableMarksByMonument`, `getAvailableMonumentsByMark`.
*   `MarkOccurrenceAdminService`: `findAllManagement`, `create`, `update`, `delete`, `uploadPhoto`.

### 3. User Service (`projects/shared/src/lib/core/services/user/`)
**Current:** `AdminUserService`
**New:**
*   `UserPublicService`: `publicGetById`.
*   `UserAdminService`: `getAll`, `getById`, `update`, `updateRole`, `deleteById`.

### 4. Proposal Service (`projects/shared/src/lib/core/services/proposal/`)
**Current:** `MarkOccurrenceProposalService`
**New:**
*   `MarkOccurrenceProposalPublicService`: `findByUser`, `getUserStats`, `findDetailedByUser`, `findById`.
*   `MarkOccurrenceProposalAdminService`: (None, as `MarkOccurrenceProposalModerationService` handles admin).

**Current:** `MarkOccurrenceProposalModerationService`
*   This service is already purely administrative. We can rename it to `MarkOccurrenceProposalAdminService` for consistency, or leave it as is. *Decision: Leave as is for now to minimize disruption, or rename if strict consistency is required.*

### 5. Administrative Division Service (`projects/shared/src/lib/core/services/administrative-division/`)
**Current:** `AdministrativeDivisionService`
**New:**
*   `AdministrativeDivisionPublicService`: `getById`, `getDistricts`, `getMunicipalities`, `getParishes`, `getMunicipalitiesByDistrict`, `getParishesByMunicipality`, `getDistrictByMunicipality`, `getMunicipalityByParish`, `getDivisionsByCoordinates`.
*   `AdministrativeDivisionAdminService`: `importDivisionsFromPbf`.

### 6. Contact Service (`projects/shared/src/lib/core/services/contact/`)
**Current:** `ContactRequestService`
**New:**
*   `ContactPublicService`: `create` (submit contact request).
*   `ContactAdminService`: `getAll`, `getById`, `updateStatus`, `delete`.

**Current:** `UserContactService`
*   This seems to be for users managing their own contacts. It is likely "Public" (User-facing) but authenticated. No Admin split needed unless admins manage user contacts. *Decision: No split needed.*

### 7. Report Service (`projects/shared/src/lib/core/services/report/`)
**Current:** `ReportService`
**New:**
*   `ReportPublicService`: `createReport`.
*   `ReportAdminService`: `getAllReports`, `updateStatus`.

### 8. Language Service (`projects/shared/src/lib/core/services/language/`)
**Current:** `LanguageService`
*   This service is purely frontend logic (cookies, translate service). No backend split required. *Decision: No split needed.*

## Execution Steps
1.  **Monument Service**: Split `MonumentService` into `MonumentPublicService` and `MonumentAdminService`.
2.  **Mark Service**: Split `MarkService` into `MarkPublicService` and `MarkAdminService`.
3.  **Mark Occurrence Service**: Split `MarkOccurrenceService` into `MarkOccurrencePublicService` and `MarkOccurrenceAdminService`.
4.  **User Service**: Split `AdminUserService` into `UserPublicService` and `UserAdminService`.
5.  **Administrative Division Service**: Split `AdministrativeDivisionService` into `AdministrativeDivisionPublicService` and `AdministrativeDivisionAdminService`.
6.  **Contact Service**: Split `ContactRequestService` into `ContactPublicService` and `ContactAdminService`.
7.  **Report Service**: Split `ReportService` into `ReportPublicService` and `ReportAdminService`.
8.  **Proposal Service**: Rename `MarkOccurrenceProposalService` to `MarkOccurrenceProposalPublicService` (optional but good for consistency). `MarkOccurrenceProposalModerationService` is already Admin.

## Detailed Breakdown by Service

### MonumentService
- **Public:** `getMonuments`, `getDetailedMonuments`, `getAllForMap`, `searchMonuments`, `findByPolygon`, `filterByCity`, `filterByDivision`, `getPopularMonuments`, `getLatestMonuments`, `countMonuments`, `getMonumentById`.
- **Admin:** `createMonument`, `updateMonument`, `deleteMonument`, `uploadPhoto`, `getDetailedMonumentsManagement`, `importMonumentsFromGeoJson`.

### MarkService
- **Public:** `getMarks`, `getDetailedMarks`, `searchMarks`, `searchByImage`, `getMark`.
- **Admin:** `getDetailedMarksManagement`, `createMark`, `updateMark`, `deleteMark`, `uploadPhoto`.

### MarkOccurrenceService
- **Public:** `getAll`, `getById`, `getByMarkId`, `getByMarkIdForMap`, `getByMonumentId`, `filterByMarkAndMonument`, `getLatestOccurrences`, `countByMarkId`, `countByMonumentId`, `countMonumentsByMarkId`, `getAvailableMarksByMonument`, `getAvailableMonumentsByMark`.
- **Admin:** `findAllManagement`, `create`, `update`, `delete`, `uploadPhoto`.

### AdminUserService
- **Public:** `publicGetById`.
- **Admin:** `getAll`, `getById`, `update`, `updateRole`, `deleteById`.

### AdministrativeDivisionService
- **Public:** `getById`, `getDistricts`, `getMunicipalities`, `getParishes`, `getMunicipalitiesByDistrict`, `getParishesByMunicipality`, `getDistrictByMunicipality`, `getMunicipalityByParish`, `getDivisionsByCoordinates`.
- **Admin:** `importDivisionsFromPbf`.

### ContactRequestService
- **Public:** `create`.
- **Admin:** `getAll`, `getById`, `updateStatus`, `delete`.

### ReportService
- **Public:** `createReport`.
- **Admin:** `getAllReports`, `updateStatus`.
