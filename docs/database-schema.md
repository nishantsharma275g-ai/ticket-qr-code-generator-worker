┌──────────────┐
│    USERS     │
├──────────────┤
│ id (PK)      │
│ name         │
│ email        │
│ role         │
│ created_at   │
│ updated_at   │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│   TICKETS    │
├──────────────┤
│ id (PK)      │
│ ticket_no    │
│ title        │
│ description  │
│ status       │
│ created_by   │ FK
│ created_at   │
│ updated_at   │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│   QR_CODES   │
├──────────────┤
│ id (PK)      │
│ ticket_id    │ FK
│ payload      │
│ status       │
│ generated_by │ FK
│ generated_at │
│ expires_at   │
└──────────────┘


┌──────────────┐
│ AUDIT_EVENTS │
├──────────────┤
│ id (PK)      │
│ user_id      │ FK
│ ticket_id    │ FK
│ event_type   │
│ metadata     │
│ created_at   │
└──────────────┘