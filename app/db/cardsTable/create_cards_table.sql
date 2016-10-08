CREATE TABLE IF NOT EXISTS cards (
                id serial primary key,
                title text,
                description text,
                timestamp timestamptz);
