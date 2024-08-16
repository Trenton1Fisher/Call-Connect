-- FK support is off by defualt for SQLite
PRAGMA foreign_keys = ON;

-- Tickets that users can create in call-connect web app
DROP TABLE IF EXISTS call_connect_ticket;
CREATE TABLE call_connect_ticket (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    room_category INTEGER NOT NULL CHECK(room_category IN (1,2)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Keywords that will help with search filtering
DROP TABLE IF EXISTS call_connect_keywords;
CREATE TABLE call_connect_keywords (
    keyword_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,           
    name TEXT NOT NULL,                  
    FOREIGN KEY (ticket_id) REFERENCES call_connect_ticket(ticket_id) ON DELETE CASCADE
);

-- Track account permissions and free account usages
DROP TABLE IF EXISTS call_connect_account;
CREATE TABLE call_connect_account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,      
    account_id TEXT NOT NULL,                  
    premium BOOLEAN NOT NULL,  
    tickets_created INTEGER NOT NULL DEFAULT 0,                
    messages_sent INTEGER NOT NULL DEFAULT 0,   
    num_video_calls INTEGER NOT NULL DEFAULT 0 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

