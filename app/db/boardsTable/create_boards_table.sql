CREATE TABLE IF NOT EXISTS boards (
                id serial primary key,
                name text,
                groupid text,
                timestamp timestamptz default current_timestamp);
