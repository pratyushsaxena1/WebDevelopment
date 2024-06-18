import sqlite3

connection = sqlite3.connect('nfl.db')

cur = connection.cursor()

data = cur.execute("SELECT t_stadium FROM teams WHERE t_conference = 'NFC' ORDER BY t_stadium DESC LIMIT 1").fetchall()
print("Largest Capacity: " + str(data[0][0]))

data = cur.execute("SELECT p_first, p_last FROM players INNER JOIN teams WHERE p_position = 'QB' and t_conference = 'NFC' ORDER BY p_height DESC LIMIT 1").fetchall()
print("Tallest Quarterback: " + str(data[0][1]) + " " + str(data[0][0]))

data = cur.execute("SELECT p_first, p_last FROM players INNER JOIN teams WHERE p_position = 'K' and t_conference = 'AFC' and t_division = 'South' ORDER BY p_height LIMIT 1").fetchall()
print("Shortest Kicker: " + str(data[0][1]) + " " + str(data[0][0]))

oldest_franchise = cur.execute("SELECT t_name FROM teams where t_conference = 'NFC' and t_division = 'North' ORDER BY t_founded LIMIT 1").fetchall()

data = cur.execute("SELECT p_first, p_last FROM players INNER JOIN teams WHERE p_position = 'RB' and p_team = 'CHI'").fetchall()
print("Running Backs: " + str(data))

data = cur.execute("SELECT s_year FROM stadiums WHERE s_state = 'California' ORDER BY s_year LIMIT 1").fetchall()
print("Oldest Stadium: " + str(data[0][0]))

connection.close()