# AI-Assisted Engineering Prompt Log

**Project:** Ticket QR Code Generator Worker
**Primary Owner:** Nishant Sharma

---

## Purpose

This document records the prompts used during the AI-assisted engineering workflow for the Ticket QR Code Generator Worker.

The project follows the required workflow of:

1. Understanding the Technical Requirements Document.
2. Designing the database schema.
3. Creating the ERD.
4. Defining API contracts.
5. Defining acceptance and TDD requirements.
6. Implementing the solution only after the architecture and tests are established.
7. Verifying the implementation against the happy and unhappy paths.

---

## Prompt 1 — Requirements Analysis

> Analyze the provided Technical Requirements Document for Ticket QR Code Generator Worker. Identify the functional requirements, unhappy-path requirements, non-functional requirements, security requirements, accessibility requirements, telemetry requirements, technical constraints, and Definition of Done. Do not write feature code yet. Create an implementation plan that follows the requirements exactly.

### Result

The requirements were divided into:

* Happy-path functionality
* Empty-state handling
* Loading-state handling
* Invalid-input handling
* Connectivity failure handling
* Accessibility
* Telemetry
* XSS/input sanitization
* Database architecture
* API architecture
* TDD workflow

---

## Prompt 2 — Database Schema Design

> Design a definitive relational database schema for the Ticket QR Code Generator Worker. The schema must support users, tickets, QR codes, and audit events. Define primary keys, foreign keys, constraints, statuses, timestamps, and relationships. Keep the design simple enough for a small enterprise application while allowing future expansion. Do not write application code.

### Result

The database design was defined around:

* `users`
* `tickets`
* `qr_codes`
* `audit_events`

The relationships and constraints were documented in:

```text
docs/database-schema.md
```

---

## Prompt 3 — ERD Design

> Create an Entity Relationship Diagram for the finalized Ticket QR Code Generator Worker database schema. Show all entities, primary keys, foreign keys, and relationships. Use Mermaid ERD syntax so the diagram can be version-controlled and rendered by GitHub.

### Result

The ERD was documented in:

```text
docs/erd.md
```

A PNG representation was also added:

```text
docs/erd.png
```

---

## Prompt 4 — API Contract Design

> Based on the finalized database schema and Ticket QR Code Generator Worker requirements, define REST API contracts. Include HTTP methods, endpoints, request bodies, successful responses, validation errors, not-found errors, status codes, empty responses, connectivity failures, and security considerations. Do not implement the API yet.

### Result

The API contracts were documented in:

```text
docs/api-contracts.md
```

The API design covers:

* Ticket creation
* Ticket retrieval
* Ticket updates
* QR generation
* QR retrieval
* QR revocation
* Audit-event retrieval
* Validation and error handling

---

## Prompt 5 — TDD Acceptance Criteria

> Convert the Technical Requirements Document into testable acceptance criteria before implementation. Cover valid ticket creation, invalid input, empty states, loading indicators, connectivity failures, QR generation, duplicate submissions, XSS protection, telemetry, accessibility, keyboard navigation, and unexpected API responses. Do not implement the application yet.

### Result

The acceptance criteria were documented in:

```text
tests/acceptance-criteria.md
```

The specification currently contains 20 test scenarios covering the project's main requirements.

---

## Prompt 6 — Implementation Constraint

> Before implementation, keep the project architecture simple and avoid unnecessary technologies. Do not introduce React, TypeScript, Vite, or other frameworks unless a requirement specifically requires them. Prefer a straightforward implementation that can satisfy the documented database, API, accessibility, security, telemetry, and testing requirements.

### Result

The implementation direction was simplified to avoid unnecessary complexity.

---
### Prompt 7 — TDD Implementation

Implemented the acceptance criteria incrementally, starting with validation,
sanitization, QR payload generation, and duplicate QR prevention.

### Prompt 8 — API Implementation

Implemented the Express API for ticket creation and QR generation, including
validation errors, unknown-ticket handling, duplicate prevention, and QR image
generation.

### Prompt 9 — Worker UI

Implemented a responsive vanilla HTML/CSS/JavaScript interface with:

- ticket creation form
- loading state
- empty state
- error handling
- QR preview
- keyboard navigation
- ARIA labels
- invalid-field highlighting
- telemetry logging

### Prompt 10 — Quality Verification

Configured ESLint for Node, browser, and Jest environments and verified:

- zero ESLint errors
- zero ESLint warnings
- 21 automated tests passing

## Workflow Rule

The AI assistant must not replace engineering verification.

Generated work must be:

1. Reviewed against the Technical Requirements Document.
2. Checked against the acceptance criteria.
3. Tested locally.
4. Checked for linting errors.
5. Checked for accessibility issues.
6. Checked for security issues.
7. Verified manually in the browser.
8. Committed only after successful verification.

---

## Error-Recovery Prompt

If an AI-generated implementation introduces a regression or unexpected error, use:

> That approach caused an error. Let's revert and try a different method. First identify the cause of the failure, then propose the smallest safe change without rewriting unrelated working functionality.

---

## Final Verification Prompt

Before delivery:

> Review the complete Ticket QR Code Generator Worker against the original Technical Requirements Document and Definition of Done. Identify any missing acceptance criteria, accessibility issues, security issues, loading or empty-state problems, telemetry issues, lint errors, build errors, or undocumented architectural decisions. Do not modify code until the issues are identified.

---

## Prompt Traceability Principle

All significant AI-assisted engineering decisions should be reflected in this document so that the development process remains understandable, reproducible, and reviewable.
