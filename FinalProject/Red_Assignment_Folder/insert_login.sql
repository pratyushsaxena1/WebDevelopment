DROP TABLE IF EXISTS login_info;

CREATE TABLE login_info (
    email TEXT PRIMARY KEY,
    pw PASSWORD NOT NULL
);