


CREATE TABLE City(
UNLOCode CHAR(5) NOT NULL,
cityName VARCHAR(100),
population VARCHAR(10),

PRIMARY KEY (UNLOCode)
);

CREATE TABLE Person(
healthCardId CHAR(11) NOT NULL,
personName VARCHAR(30) NOT NULL,
birthDate varchar (15) NOT NULL,
gender CHAR(1) NOT NULL DEFAULT("U"),
doseNumber INT NOT NUll,
immunity BOOL NOT NULL DEFAULT("FALSE"),
vaccineComplications CHAR(1),
vaccinedStatus BOOL DEFAULT("FALSE"),
administeredVaccineType VARCHAR(15),
latestVaccineDate VARCHAR(15),
UNLOCode CHAR(5) ,
PRIMARY KEY (healthCardId),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE HealthCareCentre(
address VARCHAR(30),
UNLOCode CHAR(5),

PRIMARY KEY (address),
FOREIGN KEY (UNLOCode) REFERENCES City(UNLOCode)
);

CREATE TABLE Hospital(
address VARCHAR(30),
hospitalName VARCHAR(15),
bedsAvailable INT,
hospitalStaffTotal INT,
numOfCovidCases INT,
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
    UNLOCode VARCHAR(5) NOT NULL ,
    PRIMARY KEY(outbreakDistrict),
    FOREIGN KEY(UNLOCode) REFERENCES City (UNLOCode)
    );
    
    CREATE TABLE HotspotRecovered(
    numPeople INT NOT NULL DEFAULT(0),
    numCases INT NOT NULL DEFAULT(0),
    numResolved INT NOT NULL DEFAULT(0),
    numRecovered INT NOT NULL DEFAULT(0)
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
        FOREIGN KEY(outbreakDistrict) REFERENCES Hotspot(outbreakDistrict)
    );
    
    CREATE TABLE Hospitalized (
		healthCardId CHAR(11) NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(healthCardId, address),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(address) REFERENCES Hospital(address)
    );
    
    CREATE TABLE VaccineComplications(
		administeredVaccineType VARCHAR(15) NOT NULL,
        vaccineComplications VARCHAR(100) NOT NULL,
        PRIMARY KEY(administeredVaccineType)
    );
    
    
    
    CREATE TABLE PersonLocation(
		healthcardId CHAR(9) NOT NULL,
		address VARCHAR(15) NOT NULL,
        UNLOCode VARCHAR(15)  NOT NULL,
        PRIMARY KEY(healthCardId),
        FOREIGN KEY(UNLOCode) REFERENCES City(UNLOCode),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId)
        
        
    );
    
    CREATE TABLE VaccineType(
		vaccineName VARCHAR(15) NOT NULL,
        doseAmount VARCHAR(15) NOT NULL,
        sideEffects VARCHAR(15) NOT NULL,
        PRIMARY KEY(vaccineName)
    );
    
    CREATE TABLE VaccineClinic(
		address VARCHAR(15) NOT NULL,
        clinicName VARCHAR(30) NOT NULL,
        clinicStaffTotal INT NOT NULL,
        vaccineAdministrators VARCHAR(15) NOT NULL,
        PRIMARY KEY(address)
    );
    
    CREATE TABLE VaccineAppointment(
		injectionDate VARCHAR(15) NOT NULL,
        healthCardId CHAR(11)  NOT NULL,
        vaccineName VARCHAR(15) NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(injectionDate),
        FOREIGN KEY(healthCardId) REFERENCES Person (healthCardId),
        FOREIGN KEY(vaccineName) REFERENCES VaccineType (vaccineName),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
    );
    
    
    CREATE TABLE Registration(
		healthCardId CHAR(11)  NOT NULL,
        address VARCHAR(15) NOT NULL,
        appointmentDate VARCHAR(15) NOT NULL,
        PRIMARY KEY(healthCardId, address, appointmentDate),
        FOREIGN KEY(healthCardId) REFERENCES Person(healthCardId),
        FOREIGN KEY(address) REFERENCES HealthCareCentre(UNLOCode),
        FOREIGN KEY(appointmentDate) REFERENCES VaccineAppointment(injectionDate)
    );
    
    CREATE TABLE Injection(
		injectionDate VARCHAR(15) NOT NULL,
        address VARCHAR(15) NOT NULL,
        PRIMARY KEY(injectionDate,Address),
        FOREIGN KEY(injectionDate) REFERENCES VaccineAppointment (injectionDate),
        FOREIGN KEY(address) REFERENCES VaccineClinic (address)
        
	);
    
    CREATE TABLE VaccineExpiration(
		expiryDate VARCHAR(15) NOT NULL,
        vaccineName VARCHAR(15) NOT NULL,
        injectionDate VARCHAR(15) NOT NULL,
        PRIMARY KEY (injectionDate, vaccineName),
        FOREIGN KEY(injectionDate) REFERENCES VaccineAppointment (injectionDate),
        FOREIGN KEY(vaccineName) REFERENCES VaccineAppointment (vaccineName)
    );
    
    