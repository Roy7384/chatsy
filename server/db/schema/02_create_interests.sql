DROP TABLE IF EXISTS interests CASCADE;

CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL UNIQUE
);