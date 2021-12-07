-- Query 1 Full Outer Join between hospital nad workingat to see who works at where
SELECT * FROM WorkingAt
LEFT JOIN Hospital ON WorkingAt.address = Hospital.address
WHERE EXISTS(SELECT address, workerLicence FROM WorkingAt)
UNION 
SELECT * FROM WorkingAt
RIGHT JOIN Hospital ON WorkingAt.address = Hospital.address
GROUP BY workerLicence, WorkingAt.address
 ;


-- Query 2 selects all hotspots in a city
SELECT outbreakDistrict, numPeople, numCases, numResolved, numRecovered
FROM Hotspot
WHERE UNLOCode = (SELECT UNLOCode FROM City WHERE cityName='Elk Point ');


-- Query 3 SImple function find covid variant delta
SELECT * FROM CovidVarient
WHERE varientName='delta';

-- Query 4 Find all clinics with a greater than average worker count
SELECT address, clinicName, vaccineAdministrators, 
clinicStaffTotal-(SELECT AVG(clinicStaffTotal) FROM VaccineClinic) AS cStaffDif
FROM VaccineClinic
WHERE clinicStaffTotal >(SELECT AVG(clinicStaffTotal) FROM VaccineClinic);

-- Query 5 multi table join
SELECT p.healthCardID, p.personName, v.vaccineName, c.clinicName
FROM Person p, VaccineShot v, VaccineClinic c
WHERE p.healthCardID = v.healthCardID AND p.healthCardID= c.healthCardID 
ORDER BY p.healthCardID, p.personName, c.clinicName, v.vaccineName;


-- Query 6 find all the vaccinated people in a city
SELECT cityName ,population-(SELECT COUNT(healthCardID)
FROM Person
WHERE doseNumber = 0 AND UNLOCode =(SELECT UNLOCode FROM City WHERE cityName='Elk Point ')) AS healthyPop
FROM City
WHERE cityName='Elk Point ';


-- Query 7 find infomation about people hospitalized in a specific hospital
SELECT * 
FROM Person
WHERE healthCardID IN 
(SELECT healthCardID FROM Hospitalized WHERE address= (SELECT address FROM Hospital WHERE hospitalName= 'Peterborough Regional Health Centre'));

