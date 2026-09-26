# Ticket QR Code Generator Worker

A digital worker application designed to simplify ticket QR-code generation while providing reliable validation, accessibility, security, error handling, and automated test coverage.

## Overview

The project replaces manual ticket and QR-code workflows with a structured digital system.

The application currently provides:

- Ticket creation
- QR-code generation
- Input validation
- Input sanitization
- Empty-state handling
- Loading-state handling
- API error handling
- Duplicate QR-generation prevention
- Responsive interface
- Keyboard accessibility
- ARIA-based status feedback
- Simulated telemetry
- Automated testing
- ESLint verification

The database architecture and API contracts are documented separately.

## Current Project Stage

The architecture and planning phase has been completed, and the core worker application has been implemented.

### Completed

- Database schema
- Entity Relationship Diagram
- ERD PNG
- REST API contracts
- TDD acceptance criteria
- AI-assisted engineering prompt log
- Ticket validation
- Input sanitization
- Ticket creation API
- QR payload generation
- QR image generation
- Duplicate QR-generation prevention
- Empty-state UI
- Loading-state UI
- Error handling
- Responsive UI
- Keyboard navigation
- Accessible form labels
- ARIA status feedback
- Simulated telemetry
- Jest automated tests
- ESLint configuration and verification

### Current Storage

The current demo uses in-memory storage for tickets and generated QR codes.

The persistent database structure has been designed and documented for a future database implementation.

## Project Structure

The project is organized into documentation, frontend, backend, and testing layers.

- docs/
  - database-schema.md
  - erd.md
  - erd.png
  - api-contracts.md
- public/
  - index.html
  - app.js
  - styles.css
- src/
  - app.js
  - qrGenerator.js
  - qrService.js
  - sanitizeInput.js
  - ticketValidator.js
- tests/
  - acceptance-criteria.test.md
  - api.test.js
  - ticket-generator.test.js
- PROMPTS.md
- eslint.config.js
- package.json
- package-lock.json
- server.js
- README.md

## Architecture

The planned persistent data model contains four primary entities.

### Users

Stores application users and their roles.

### Tickets

Stores ticket information, status, and ownership.

### QR Codes

Stores QR-code payloads and lifecycle information associated with tickets.

### Audit Events

Records important system actions for traceability.

## Database ERD

The visual Entity Relationship Diagram is available at:

docs/erd.png

The editable Mermaid version is available at:

docs/erd.md

The database design contains the following relationships:

- One user can create many tickets.
- One user can generate many QR codes.
- One user can perform many audit events.
- One ticket can have multiple QR codes.
- One ticket can have multiple audit events.

## API

The currently implemented worker provides the following API endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/tickets | Create a ticket |
| GET | /api/tickets | Retrieve tickets |
| POST | /api/tickets/:id/qr | Generate a QR code |

The architecture also defines future operations for:

- Updating tickets
- Retrieving QR-code history
- Revoking QR codes
- Retrieving audit events

Detailed API contracts are documented in:

docs/api-contracts.md

## QR Code Generation

The worker generates a QR payload from the ticket identifier and converts the payload into a QR-code image.

The QR image is generated on demand rather than storing image data in the database.

The payload follows this format:

ticket:<ticket-id>

Duplicate QR generation for the same ticket is prevented by the QR service.

## Validation and Security

The application includes both client-side and server-side validation.

Security-related protections include:

- Required field validation
- Malformed input rejection
- User-controlled text sanitization
- Removal of potentially dangerous HTML content
- Safe text rendering without executable HTML injection
- Duplicate QR submission prevention
- No hardcoded API keys
- No sensitive information in telemetry

Client-side validation improves the user experience, while server-side validation ensures that the API does not rely solely on browser validation.

## Accessibility

The interface is designed to support the requirement of a 100% Lighthouse accessibility target.

Implemented accessibility features include:

- Semantic HTML
- Accessible form labels
- ARIA attributes
- Accessible control names
- aria-invalid validation state
- aria-live status messages
- Keyboard navigation
- Visible keyboard focus
- Accessible loading feedback
- Accessible error feedback
- Responsive layout
- Reduced-motion support

## Error Handling

The worker handles common failure scenarios without crashing the interface.

Supported scenarios include:

- Empty ticket title
- Invalid ticket input
- Unknown ticket
- Duplicate QR generation
- Invalid JSON requests
- QR-generation failures
- Network/API failures
- Empty ticket collections

The frontend displays user-friendly status messages while the API returns structured JSON error responses.

## Loading and Empty States

The application provides clear feedback during asynchronous operations.

### Empty State

When no QR code has been generated, the interface displays:

No data found

Create a ticket to generate its QR code.

### Loading State

During asynchronous QR generation, the interface displays:

Generating QR code...

The loading and empty states are mutually exclusive so that users receive clear feedback about the current application state.

## Telemetry

The application includes a simulated analytics event for the primary action.

The console message is:

[Analytics] User interacted with Ticket QR Code Generator Worker

The telemetry event does not contain ticket titles, descriptions, ticket identifiers, or other sensitive user-controlled information.

## Testing Strategy

The project follows a test-driven development workflow.

Acceptance criteria were documented before implementation, and automated tests were then created around the core ticket and QR-generation behavior.

Automated tests cover:

- Valid ticket validation
- Missing title validation
- Empty title validation
- Malformed input
- HTML sanitization
- Dangerous attribute sanitization
- QR payload generation
- Invalid QR input
- Duplicate QR prevention
- Ticket creation API
- API validation errors
- QR API generation
- Unknown ticket handling
- Duplicate QR API requests

### Current Test Result

Test Suites: 2 passed, 2 total

Tests: 21 passed, 21 total

## Code Quality

ESLint is configured for:

- Node.js backend code
- Browser frontend code
- Jest test files

The project currently passes ESLint with:

- 0 errors
- 0 warnings

## Development

Install project dependencies using:

npm install

Run the automated tests using:

npm test

Run ESLint using:

npm run lint

Start the application using:

npm start

The application runs locally at:

http://localhost:3000

For development with Node watch mode, use:

npm run dev

## AI-Assisted Development

This project follows an AI-assisted engineering workflow.

AI was used to assist with:

- Requirements analysis
- Architecture planning
- Database design
- ERD design
- API contract design
- Test planning
- Implementation
- Debugging
- Code-quality configuration
- Error recovery
- Final verification

The significant prompts and development sequence are documented in:

PROMPTS.md

## Documentation

The project contains the following supporting documentation:

| Document | Purpose |
|---|---|
| docs/database-schema.md | Database entities, fields, keys, and constraints |
| docs/erd.md | Editable Mermaid ERD |
| docs/erd.png | Visual ERD |
| docs/api-contracts.md | REST API request and response contracts |
| tests/acceptance-criteria.test.md | TDD acceptance criteria |
| PROMPTS.md | AI-assisted development prompt log |

## Development Status

Core worker implementation completed.

The current version provides a working ticket creation and QR-code generation workflow with:

- Validation
- Input sanitization
- QR generation
- Duplicate prevention
- Loading states
- Empty states
- Error handling
- Accessibility support
- Responsive UI
- Simulated telemetry
- Automated tests
- ESLint verification

The persistent database implementation and additional lifecycle and audit APIs remain architectural extensions documented in the project design.

## Future Improvements

Possible future implementation work includes:

- Persistent database integration
- User authentication
- Role-based authorization
- Ticket status management
- QR-code expiration
- QR-code revocation
- Audit-event persistence
- Additional API endpoints
- Production telemetry integration
- Automated accessibility testing
- Production deployment with persistent storage

## License

This project is intended for educational and professional development purposes.