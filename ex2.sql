

CREATE TABLE City(
UNLOCode CHAR(8) NOT NULL,
cityName VARCHAR(100),
population INT,

PRIMARY KEY (UNLOCode)
);

CREATE TABLE Person(
healthCardId CHAR(9) NOT NULL,
personName VARCHAR(30) NOT NULL,
birthDate DATE NOT NULL,
gender CHAR(1) NOT NULL DEFAULT("U") ,
vaccineComplications VARCHAR(3),
vaccinedStatus VARCHAR(15) NOT NULL DEFAULT("Not Vaccinated"),
UNLOCode CHAR(8) NOT NULL,
doseNumber INT NOT NULL DEFAULT (0), 
immunity VARCHAR(3) NOT NULL DEFAULT("No"),
administedVaccineType VARCHAR(30),
latestVaccinatedDate VARCHAR(15),
address VARCHAR(100) NOT NULL,
PRIMARY KEY (healthCardId),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE HealthCareCentre(
address VARCHAR(100) NOT NULL,
UNLOCode CHAR(8) NOT NULL,
numOfWorkers INT DEFAULT(0),

PRIMARY KEY (address),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE Hospital(
address VARCHAR(100) NOT NULL,
hospitalName VARCHAR(50) NOT NULL,
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
    UNLOCode CHAR(8) NOT NULL ,
    PRIMARY KEY(outbreakDistrict),
    FOREIGN KEY(UNLOCode) REFERENCES City (UNLOCode)
    );
    

    
    CREATE TABLE HealthCareWorker(
		workerLicence CHAR(9) NOT NULL,
        workerName VARCHAR(30) NOT NULL,
        occupation VARCHAR(15) NOT NULL,
        PRIMARY KEY(workerLicence)
    );
    
    CREATE TABLE WorkingAt (
		address VARCHAR(100) NOT NULL,
        workerLicence VARCHAR(15)NOT NULL,
        PRIMARY KEY(address, workerLicence),
        FOREIGN KEY(address) REFERENCES HealthCareCentre(address),
        FOREIGN KEY(workerLicence) REFERENCES HealthCareWorker(workerLicence)
    );
    
    CREATE TABLE Infection(
		healthCardId CHAR(9) NOT NULL,
        outbreakDistrict VARCHAR(30) NOT NULL,
        infectionName VARCHAR(15) NOT NULL,
        
        PRIMARY KEY(healthCardId, outbreakDistrict),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(outbreakDistrict) REFERENCES Hotspot(outbreakDistrict),
        FOREIGN KEY(infectionName) REFERENCES CovidVarient(varientName)
    );
    
    CREATE TABLE Hospitalized (
		healthCardId CHAR(9) NOT NULL,
        address VARCHAR(100) NOT NULL,
        PRIMARY KEY(healthCardId, address),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(address) REFERENCES Hospital(address)
    );
    
    CREATE TABLE VaccineType(
		vaccineName VARCHAR(30) NOT NULL,
        doseAmount VARCHAR(15) NOT NULL,
        sideEffect VARCHAR(50) NOT NULL,
        PRIMARY KEY(vaccineName)
    );
    
    CREATE TABLE VaccineClinic(
		address VARCHAR(100) NOT NULL,
        clinicName VARCHAR(100) NOT NULL,
        clinicStaffTotal INT NOT NULL,
        vaccineAdministrators VARCHAR(15) NOT NULL,
        healthCardId CHAR(9) NOT NULL,
        PRIMARY KEY(address),
        FOREIGN KEY(address) REFERENCES HealthCareCentre(address),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId)
    );
        
    CREATE TABLE VaccineAppointment(
		injectionDate DATE NOT NULL,
        address VARCHAR(100) NOT NULL,
        PRIMARY KEY(injectionDate),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
    );
    
    CREATE TABLE Registration(
		healthCardId CHAR(9)  NOT NULL,
        registrationDate  DATE NOT NULL,
        PRIMARY KEY(healthCardId, registrationDate),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(registrationDate) REFERENCES VaccineAppointment(injectionDate)
    );
    
    CREATE TABLE VaccineShot(
		lotNumber CHAR(10) NOT NULL,
        expiryDate DATE NOT NULL,
        vaccineName VARCHAR(30) NOT NULL,
        healthCardId CHAR(9) NOT NULL,
        
       
        PRIMARY KEY(lotNumber),
		FOREIGN KEY(vaccineName) REFERENCES VaccineType (vaccineName),
		FOREIGN KEY(healthCardId) REFERENCES Person (healthCardId)
        
    );
    
        CREATE TABLE Injection(
		lotNumber CHAR(10) NOT NULL,
        address VARCHAR(100) NOT NULL,
        PRIMARY KEY(lotNumber,address),
        FOREIGN KEY(lotNumber) REFERENCES VaccineShot (lotNumber),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
        
	);
    