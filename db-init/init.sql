GRANT ALL PRIVILEGES ON DATABASE devel_task TO develtask_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO develtask_user;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO develtask_user;

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    cost VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    date VARCHAR(50),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE SET NULL
);
