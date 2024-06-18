DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
    c_id INTEGER PRIMARY KEY,
    c_name TEXT NOT NULL
);

INSERT INTO characters 
(c_id, c_name)
VALUES
(0, "Archibald");

INSERT INTO characters 
(c_id, c_name)
VALUES
(1, "Henrik"),
(2, "Isadore"),
(3, "Lucinda"),
(4, "Dominic");