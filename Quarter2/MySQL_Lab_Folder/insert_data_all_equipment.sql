DROP TABLE IF EXISTS all_equipment;

CREATE TABLE all_equipment (
    e_id INTEGER PRIMARY KEY,
    e_name TEXT NOT NULL
);

INSERT INTO all_equipment 
(e_id, e_name)
VALUES
(0, "Shield");

INSERT INTO all_equipment 
(e_id, e_name)
VALUES
(1, "Ring"),
(2, "Cloak"),
(3, "Sword"),
(4, "Potion");