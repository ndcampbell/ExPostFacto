CREATE TABLE IF NOT EXISTS cards (
                id serial primary key,
                title text,
                description text,
                votes int,
                timestamp timestamptz default current_timestamp);
