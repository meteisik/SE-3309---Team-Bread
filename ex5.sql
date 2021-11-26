SELECT * FROM WorkingAt
LEFT JOIN Hospital ON WorkingAt.address = Hospital.address 
UNION 
SELECT * FROM WorkingAt
RIGHT JOIN Hospital ON WorkingAt.address = Hospital.address;



SELECT outbreakDistrict, numPeople, numCases, numResolved, numRecovered
FROM Hotspot
WHERE UNLOCode = (SELECT UNLOCode FROM City WHERE cityName='London');

SELECT * FROM CovidVarient
WHERE varientName='delta';


SELECT address, clinicName, vaccineAdministrators, 
clinicStaffTotal-(SELECT AVG(clinicStaffTotal) FROM VaccineClinic) AS cStaffDif
FROM VaccineClinic
WHERE clinicStaffTotal >(SELECT AVG(clinicStaffTotal) FROM VaccineClinic);


SELECT p.healthCardID, p.personName, v.vaccineName, c.clinicName
FROM Person p, VaccineShot v, VaccineClinic c
WHERE p.healthCardID = v.healthCardID AND p.healthCardID= c.healthCardID 
ORDER BY p.healthCardID, p.personName, c.clinicName, v.vaccineName;

SELECT cityName ,population-(SELECT COUNT(healthCardID)
FROM Person
WHERE doseNumber = 0 AND UNLOCode =(SELECT UNLOCode FROM City WHERE cityName='Elk Point ')) AS healthyPop
FROM City
WHERE cityName='Elk Point ';

SELECT * 
FROM Person
WHERE healthCardID IN 
(SELECT healthCardID FROM Hospitalized WHERE address= (SELECT address FROM Hospital WHERE hospitalName= 'Peterborough Regional Health Centre'));

