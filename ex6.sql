
#Data modifications

#Method 1:  inserting the result of a query

#Creating custom new data for person
INSERT INTO Person VALUES
(
	"3214563",
    "Mikey Scut",
    "2002-10-05",
    "M",
    "N",
    TRUE,
    "CALON",
    2,
    TRUE,
    "Pfizer",
    "2021-08-16",
    "345 Dreamy lane"
);

#Creating custom new data for hotspot
INSERT INTO Hotspot VALUES
(
	"Grand Bend",
    300000,
    10000,
    10000,
    9500,
    "CALON"
);

#Creating custom new data for covid varient
INSERT INTO CovidVarient VALUES
(
	"Beta",
    "India",
    98,
    2
);

#Inserting result of a query
INSERT INTO Infection
(
	SELECT healthCardID, outbreakDistrict, varientName
    FROM Person, Hotspot, CovidVarient
    WHERE healthCardID = "3214563" AND outbreakDistrict = "Grand Bend" AND varientName = "Beta"
);

SELECT * FROM Infection;

SET SQL_SAFE_UPDATES = 0;

#Method 2: Updating several tuples at once
UPDATE Person
SET vaccinedStatus = "Vaccinated"
WHERE doseNumber > 0;

Select * FROM Person;

#Method 3: Deleting a set of tuples that is more than one but less than all the tuples in a relation
DELETE From Hotspot
WHERE numCases = numResolved;

Select * FROM Hotspot;

SET SQL_SAFE_UPDATES = 1;