
#Method 1: Inserting row while supplying data for all columns

#This inserts a row into VaccineShot
INSERT INTO CovidVarient VALUES
(
	"Delta",
    "India",
	1,
    99
);

SELECT * FROM CovidVarient;

#Method 2: INSERT using defaults. Insert a new row into staff table supporting data for all mandatory columns. 

#This inserts a row into City. Will be needed to insert a row into hotspot due to FK.
INSERT INTO City VALUES
(
	"CALON",
    "London",
    400000
);

SELECT * FROM City;

#Inserts a row into hotspot using only mandatory values. Values not mentioned have a default value so a user does not need to set values.
INSERT INTO Hotspot 
(
	outbreakDistrict,
    UNLOCode
)
VALUES
(
	"London",
    "CALON"
);

SELECT * FROM Hotspot;

#Method 3: INSERT...SELECT . Allows multiple rows to be copied from one or more tables to another.

#Inserts a row into Person. Needed to fill Infection
INSERT INTO Person VALUES
(
	"3645217",
    "Eric Strong",
    "2001-10-05",
    "M",
    "N",
    TRUE,
    "CALON",
    2,
    TRUE,
    "Pfizer",
    "2021-08-16",
    "345 Cherry lane"
);

#Inserts data into Infection table using data from Person, Hotspot, CovidVariant
INSERT INTO Infection
(
	SELECT healthCardID, outbreakDistrict, varientName
    FROM Person, Hotspot, CovidVarient
);

SELECT * FROM Infection;


