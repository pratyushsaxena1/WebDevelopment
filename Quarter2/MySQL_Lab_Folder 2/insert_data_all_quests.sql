DROP TABLE IF EXISTS all_quests;

CREATE TABLE all_quests (
    q_id INTEGER PRIMARY KEY,
    q_name TEXT NOT NULL
);

INSERT INTO all_quests 
(q_id, q_name)
VALUES
(0, "Fight 10 people");

INSERT INTO all_quests 
(q_id, q_name)
VALUES
(1, "Find 5 people"),
(2, "Drink 2 potions"),
(3, "Earn 10 coins"),
(4, "Win 1 game");