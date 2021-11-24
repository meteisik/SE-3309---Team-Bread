
CREATE TABLE City(
UNLOCode CHAR(7) NOT NULL,
cityName VARCHAR(100),
population INT,

PRIMARY KEY (UNLOCode)
);

CREATE TABLE Person(
healthCardId CHAR(11) NOT NULL,
personName VARCHAR(30) NOT NULL,
birthDate DATE NOT NULL,
gender CHAR(1) NOT NULL DEFAULT("U") ,
vaccineComplications CHAR(1),
vaccinedStatus BOOL NOT NULL DEFAULT("FALSE"),
UNLOCode CHAR(7) NOT NULL,
doseNumber INT NOT NULL DEFAULT (0), 
immunity BOOL NOT NULL DEFAULT("False"),
administedVaccineType VARCHAR(30),
latestVaccinatedDate VARCHAR(15),
address VARCHAR(30) NOT NULL,
PRIMARY KEY (healthCardId),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE HealthCareCentre(
address VARCHAR(30) NOT NULL,
UNLOCode CHAR(7) NOT NULL,
numOfWorkers INT DEFAULT(0),

PRIMARY KEY (address),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE Hospital(
address VARCHAR(30),
hospitalName VARCHAR(15),
bedsAvailable INT NOT NULL DEFAULT(0),
hospitalStaffTotal INT NOT NULL DEFAULT(0),
numOfCovidCases INT DEFAULT(0),
PRIMARY KEY (address),
FOREIGN KEY (address)REFERENCES HealthCareCentre(address)

);

CREATE TABLE CovidVarient(
	varientName VARCHAR(15) NOT NULL,
    origin VARCHAR(20),
    mortalityRate INT,
    recoveryRate INT,
    PRIMARY KEY(varientName)
    
    );
        
    CREATE TABLE Hotspot(
    outbreakDistrict VARCHAR(30) NOT NULL,
    numPeople INT NOT NULL DEFAULT(0),
    numCases INT NOT NULL DEFAULT(0),
    numResolved INT NOT NULL DEFAULT(0),
    numRecovered INT NOT NULL DEFAULT(0),
    UNLOCode CHAR(7) NOT NULL ,
    PRIMARY KEY(outbreakDistrict),
    FOREIGN KEY(UNLOCode) REFERENCES City (UNLOCode)
    );
    

    
    CREATE TABLE HealthCareWorker(
		workerLicence CHAR(9) NOT NULL,
        workerName VARCHAR(15) NOT NULL,
        occupation VARCHAR(15) NOT NULL,
        PRIMARY KEY(workerLicence)
    );
    
    CREATE TABLE WorkingAt (
		address VARCHAR(15) NOT NULL,
        workerLicence VARCHAR(15)NOT NULL,
        PRIMARY KEY(address, workerLicence),
        FOREIGN KEY(address) REFERENCES HealthCareCentre(address),
        FOREIGN KEY(workerLicence) REFERENCES HealthCareWorker(workerLicence)
    );
    
    CREATE TABLE Infection(
		healthCardId CHAR(11) NOT NULL,
        outbreakDistrict VARCHAR(30) NOT NULL,
        infectionName VARCHAR(15) NOT NULL,
        
        PRIMARY KEY(healthCardId, outbreakDistrict),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(outbreakDistrict) REFERENCES Hotspot(outbreakDistrict),
        FOREIGN KEY(infectionName) REFERENCES CovidVarient(varientName)
    );
    
    CREATE TABLE Hospitalized (
		healthCardId CHAR(11) NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(healthCardId, address),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(address) REFERENCES Hospital(address)
    );
    
    CREATE TABLE VaccineType(
		vaccineName VARCHAR(15) NOT NULL,
        doseAmount VARCHAR(15) NOT NULL,
        sideEffect VARCHAR(50) NOT NULL,
        PRIMARY KEY(vaccineName)
    );
    
    CREATE TABLE VaccineClinic(
		address VARCHAR(15) NOT NULL,
        clinicName VARCHAR(30) NOT NULL,
        clinicStaffTotal INT NOT NULL,
        vaccineAdministrators VARCHAR(15) NOT NULL,
        healthCardId CHAR(11) NOT NULL,
        PRIMARY KEY(address),
        FOREIGN KEY(address) REFERENCES HealthCareCentre(address),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId)
    );
        
    CREATE TABLE VaccineAppointment(
		injectionDate DATE NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(injectionDate),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
    );
    
    
    CREATE TABLE Registration(
		healthCardId CHAR(11)  NOT NULL,
        registrationDate  DATE NOT NULL,
        PRIMARY KEY(healthCardId, registrationDate),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(registrationDate) REFERENCES VaccineAppointment(injectionDate)
    );
    
    CREATE TABLE VaccineShot(
		lotNumber VARCHAR(10) NOT NULL,
        expiryDate DATE NOT NULL,
        vaccineName VARCHAR(15) NOT NULL,
        healthCardId CHAR(11) NOT NULL,
        
       
        PRIMARY KEY(lotNumber),
		FOREIGN KEY(vaccineName) REFERENCES VaccineType (vaccineName),
		FOREIGN KEY(healthCardId) REFERENCES Person (healthCardId)
        
    );
    
        CREATE TABLE Injection(
		lotNumber VARCHAR(10) NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(lotNumber,address),
        FOREIGN KEY(lotNumber) REFERENCES VaccineShot (lotNumber),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
        
	);
    