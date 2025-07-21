SELECT json_agg(json_build_object(
    'name', task,
    'language', skill,
    'weight', weight
)) AS result FROM(


SELECT t.name as task, s.name AS skill, t.weight
FROM task t
JOIN skills s ON t.require = s.idSkills
JOIN job j ON t.job = j.idJob
WHERE job = 1) as subquery; -- job 1 to be replaced with a variable