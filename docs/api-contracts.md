# Ticket QR Code Generator Worker — API Contracts

## 1. API Overview

The Ticket QR Code Generator Worker exposes REST APIs for managing tickets, generating QR codes, and recording audit events.

Base URL:

```text
/api
```

All API responses use JSON.

---

## 2. Standard Response Format

### Successful response

```json
{
  "success": true,
  "data": {}
}
```

### Error response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data"
  }
}
```

---

# 3. Ticket APIs

## POST /tickets

Creates a new ticket.

### Request

```json
{
  "title": "Customer Support Ticket",
  "description": "Ticket description"
}
```

### Required fields

* `title`

### Optional fields

* `description`

### Success

**HTTP 201 Created**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "ticketNo": "TKT-10001",
    "title": "Customer Support Ticket",
    "description": "Ticket description",
    "status": "OPEN",
    "createdAt": "2026-09-26T10:00:00Z"
  }
}
```

### Validation failure

**HTTP 400 Bad Request**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required"
  }
}
```

---

# 4. Get Tickets

## GET /tickets

Returns available tickets.

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "ticketNo": "TKT-10001",
      "title": "Customer Support Ticket",
      "status": "OPEN"
    }
  ]
}
```

### Empty result

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [],
  "message": "No data found"
}
```

The frontend must display a user-friendly empty state rather than a blank screen.

---

# 5. Get Single Ticket

## GET /tickets/:id

Returns details for a specific ticket.

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "ticketNo": "TKT-10001",
    "title": "Customer Support Ticket",
    "description": "Ticket description",
    "status": "OPEN"
  }
}
```

### Ticket not found

**HTTP 404 Not Found**

```json
{
  "success": false,
  "error": {
    "code": "TICKET_NOT_FOUND",
    "message": "Ticket not found"
  }
}
```

---

# 6. Update Ticket

## PATCH /tickets/:id

Updates ticket information.

### Request

```json
{
  "title": "Updated Ticket Title",
  "description": "Updated description",
  "status": "PROCESSING"
}
```

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "ticketNo": "TKT-10001",
    "title": "Updated Ticket Title",
    "status": "PROCESSING",
    "updatedAt": "2026-09-26T10:30:00Z"
  }
}
```

### Invalid status

**HTTP 400 Bad Request**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATUS",
    "message": "Invalid ticket status"
  }
}
```

---

# 7. Generate QR Code

## POST /tickets/:id/qr

Generates a QR code for an existing ticket.

### Request

```json
{
  "expiresAt": "2026-10-26T10:00:00Z"
}
```

`expiresAt` is optional.

### Success

**HTTP 201 Created**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "ticketId": "uuid",
    "payload": "TKT-10001",
    "status": "ACTIVE",
    "generatedAt": "2026-09-26T10:00:00Z",
    "expiresAt": "2026-10-26T10:00:00Z"
  }
}
```

The server is responsible for generating the structured QR payload.

---

# 8. Get Ticket QR Codes

## GET /tickets/:id/qr

Returns QR codes associated with a ticket.

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "status": "ACTIVE",
      "generatedAt": "2026-09-26T10:00:00Z",
      "expiresAt": null
    }
  ]
}
```

### No QR codes

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [],
  "message": "No data found"
}
```

---

# 9. Revoke QR Code

## DELETE /tickets/:ticketId/qr/:qrId

Revokes an active QR code.

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "REVOKED"
  }
}
```

### QR code not found

**HTTP 404 Not Found**

```json
{
  "success": false,
  "error": {
    "code": "QR_NOT_FOUND",
    "message": "QR code not found"
  }
}
```

---

# 10. Audit Events

## GET /tickets/:id/audit-events

Returns audit events associated with a ticket.

### Success

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "eventType": "QR_GENERATED",
      "createdAt": "2026-09-26T10:00:00Z"
    }
  ]
}
```

### Empty result

```json
{
  "success": true,
  "data": [],
  "message": "No data found"
}
```

---

# 11. HTTP Status Codes

| Status | Meaning                         |
| ------ | ------------------------------- |
| 200    | Request successful              |
| 201    | Resource successfully created   |
| 400    | Invalid request                 |
| 401    | Authentication required         |
| 403    | Insufficient permissions        |
| 404    | Resource not found              |
| 409    | Resource conflict               |
| 429    | Too many requests               |
| 500    | Internal server error           |
| 503    | Service temporarily unavailable |

---

# 12. Validation Rules

The API must reject:

* Empty ticket titles
* Excessively long titles
* Malformed identifiers
* Invalid ticket statuses
* Invalid QR expiration dates
* Unexpected fields where strict validation is enabled

Text received from clients must be validated and sanitized before being persisted.

---

# 13. Security Requirements

The implementation must:

1. Validate all incoming request data.
2. Sanitize user-controlled text.
3. Never store API keys or secrets in source code.
4. Authenticate protected endpoints.
5. Enforce authorization based on user role.
6. Avoid exposing unnecessary personal information in QR payloads.
7. Apply rate limiting to sensitive endpoints.
8. Return safe error messages without exposing internal implementation details.

---

# 14. Connectivity and Failure Handling

The frontend must handle asynchronous API failures gracefully.

For slow connections:

```text
User action
    ↓
Loading indicator
    ↓
API request
    ↓
Success ──────→ Update UI
    │
    └──────────→ Display actionable error
```

The interface must never appear frozen during an asynchronous operation.

For temporary service failure:

```json
{
  "success": false,
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "The service is temporarily unavailable. Please try again."
  }
}
```

---

# 15. Telemetry

Whenever a primary action is successfully completed, the frontend must simulate an analytics event:

```text
[Analytics] User interacted with Ticket QR Code Generator Worker
```

The implementation should not expose sensitive ticket information through console telemetry.

---

# 16. API Design Principles

The API follows these principles:

* REST-style resource naming
* JSON request/response bodies
* Consistent error structure
* Explicit HTTP status codes
* Server-side validation
* Secure handling of user-controlled data
* Clear separation between tickets and QR-code resources
* Support for empty states
* Support for future authentication and authorization
* Auditability of important operations
