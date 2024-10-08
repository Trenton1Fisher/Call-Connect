-- Tickets that users can create in the call-connect web app
DROP TABLE IF EXISTS call_connect_ticket;
CREATE TABLE call_connect_ticket (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    premium BOOLEAN NOT NULL,
    room_category INTEGER NOT NULL CHECK(room_category IN (1,2)),
    room_id TEXT NOT NULL,
    room_full BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Track account permissions and free account usages
DROP TABLE IF EXISTS call_connect_account;
CREATE TABLE call_connect_account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,      
    account_id TEXT NOT NULL,                  
    premium BOOLEAN NOT NULL,  
    tickets_created INTEGER NOT NULL DEFAULT 0,                
    messages_sent INTEGER NOT NULL DEFAULT 0,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

