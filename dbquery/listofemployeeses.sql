SELECT json_agg(json_build_object(
    'name', name,
    'skills', skills
)) AS result
FROM (
    SELECT 
        e.name,
        array_agg(s.name ORDER BY s.name) AS skills
    FROM employee AS e
    JOIN have h ON e.email = h.emailEmployee
    JOIN skills s ON h.idSkills = s.idSkills
    JOIN partof pf ON pf.emailemployee = e.email
    JOIN team t ON pf.idTeam = t.idTeam
    JOIN job j ON t.idTeam = j.assingedTeam
    WHERE j.idjob = 1 -- job 1 to be replaced with a variable
    GROUP BY e.name
) AS subquery;
