# Ticket QR Code Generator Worker — ERD

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ TICKETS : creates
    USERS ||--o{ QR_CODES : generates
    USERS ||--o{ AUDIT_EVENTS : performs

    TICKETS ||--o{ QR_CODES : has
    TICKETS ||--o{ AUDIT_EVENTS : records

    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar role
        timestamp created_at
        timestamp updated_at
    }

    TICKETS {
        uuid id PK
        varchar ticket_no UK
        varchar title
        text description
        varchar status
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }

    QR_CODES {
        uuid id PK
        uuid ticket_id FK
        text payload
        varchar status
        uuid generated_by FK
        timestamp generated_at
        timestamp expires_at
    }

    AUDIT_EVENTS {
        uuid id PK
        uuid user_id FK
        uuid ticket_id FK
        varchar event_type
        json metadata
        timestamp created_at
    }