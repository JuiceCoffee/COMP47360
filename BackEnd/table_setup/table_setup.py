import psycopg2

connection = None
cursor = None

try:
    # Establish a connection to the database
    connection = psycopg2.connect(
        user="postgres",
        password="******",
        host="localhost",
        port="5432",
        database="Summer_project"
    )

    cursor = connection.cursor()

    # Define the CREATE TABLE statements
    create_users_table = """
    CREATE TABLE Users (
        UserID SERIAL PRIMARY KEY,
        Username VARCHAR(255) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) UNIQUE NOT NULL,
        Preference JSONB
    );
    """

    create_pois_table = """
    CREATE TABLE POIs (
        POIID SERIAL PRIMARY KEY,
        POIName VARCHAR(255) NOT NULL,
        Description TEXT,
        Latitude FLOAT NOT NULL,
        Longitude FLOAT NOT NULL
    );
    """

    create_userpois_table = """
    CREATE TABLE UserPOIs (
        UserPOIID SERIAL PRIMARY KEY,
        UserID INT REFERENCES Users(UserID),
        POIID INT REFERENCES POIs(POIID),
        StartDate DATE,
        EndDate DATE
    );
    """

    create_bucketlist_table = """
    CREATE TABLE Bucketlist (
        BucketlistID SERIAL PRIMARY KEY,
        UserID INT REFERENCES Users(UserID),
        POIID INT REFERENCES POIs(POIID)
    );
    """

    # Execute the CREATE TABLE statements
    cursor.execute(create_users_table)
    cursor.execute(create_pois_table)
    cursor.execute(create_userpois_table)
    cursor.execute(create_bucketlist_table)

    # Commit the transaction
    connection.commit()

    print("Tables created successfully")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    # Close the database connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()
    print("PostgreSQL connection is closed")
