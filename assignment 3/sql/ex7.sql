CREATE VIEW LockDownHotspot
	AS SELECT *
    FROM HOTSPOT
    WHERE numCases > 100;
    
CREATE VIEW ComplicatedVaccines
	AS SELECT UNLOCODE, latestVaccinatedDate, administedVaccineType, vaccineComplications
    FROM Person
    WHERE vaccineComplications = 'Yes';
    
CREATE VIEW NonVaccinatedPerson
	AS SELECT *
    FROM Person
    WHERE vaccinedStatus = 'Not Vaccinated';