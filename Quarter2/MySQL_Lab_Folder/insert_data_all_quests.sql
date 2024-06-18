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
(1, "Defeat 5 people"),
(2, "Find 5 apples"),
(3, "Get a piece of equipment"),
(4, "Play the game for 5 hours");