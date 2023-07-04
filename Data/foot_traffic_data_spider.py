import psycopg2
import requests
import time


google_maps_api_key = "AIzaSyANAczSNSv36Bz2sURZ1kRxjBbPj9ui7oU"
best_time_private_api_key = "pri_77fe2f90b1c249a69d95b85d961cbcec"
postgresql_database = "newyorkbusy"
postgresql_user = "db4comp47360"
postgresql_password = "researchpracticum"
postgresql_host = "newyorkbusy.cmbwzu1bhkey.us-east-1.rds.amazonaws.com"
postgresql_port = "5432"


def get_address(lat, lng, api_key):
    # use Google Maps API to get accurate names and addresses
    response = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={api_key}")
    response_json = response.json()

    if response_json['status'] != 'OK':
        return None, None

    # get name and address
    result = response_json['results'][0]['address_components']
    street_number = ''
    route = ''
    administrative_area_level_1 = ''
    place_name = ''
    for component in result:
        if "street_number" in component['types']:
            street_number = component['long_name']
        if "route" in component['types']:
            route = component['long_name']
        if "administrative_area_level_1" in component['types']:
            administrative_area_level_1 = component['long_name']
        if "route" in component['types']:
            place_name = component['long_name']
        if "neighborhood" in component['types']:
            place_name = component['long_name']
        if "premise" in component['types']:
            place_name = component['long_name']
        if "natural_feature" in component['types']:
            place_name = component['long_name']
        if "airport" in component['types']:
            place_name = component['long_name']
        if "park" in component['types']:
            place_name = component['long_name']
        if "point_of_interest" in component['types']:
            place_name = component['long_name']
    address = street_number + ' ' + route + ' ' + administrative_area_level_1
    return place_name, address


def main():
    # connect to PostgreSQL database
    conn = psycopg2.connect(database=postgresql_database, user=postgresql_user, password=postgresql_password,
                            host=postgresql_host, port=postgresql_port)
    cur = conn.cursor()

    # create a table to store foot traffic data if we don't have
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE  table_schema = 'public'
            AND    table_name   = 'foot_traffic_forecast'
        )
    """)
    table_exists = cur.fetchone()[0]
    if not table_exists:
        cur.execute("""
            CREATE TABLE foot_traffic_forecast (
                id BIGINT,
                lat DOUBLE PRECISION,
                lng DOUBLE PRECISION,
                place_name TEXT,
                address TEXT,
                day_int INTEGER,
                day_rank_max INTEGER,
                day_rank_mean INTEGER,
                busyness_hour_6 INTEGER,
                busyness_hour_7 INTEGER,
                busyness_hour_8 INTEGER,
                busyness_hour_9 INTEGER,
                busyness_hour_10 INTEGER,
                busyness_hour_11 INTEGER,
                busyness_hour_12 INTEGER,
                busyness_hour_13 INTEGER,
                busyness_hour_14 INTEGER,
                busyness_hour_15 INTEGER,
                busyness_hour_16 INTEGER,
                busyness_hour_17 INTEGER,
                busyness_hour_18 INTEGER,
                busyness_hour_19 INTEGER,
                busyness_hour_20 INTEGER,
                busyness_hour_21 INTEGER,
                busyness_hour_22 INTEGER,
                busyness_hour_23 INTEGER,
                busyness_hour_0 INTEGER,
                busyness_hour_1 INTEGER,
                busyness_hour_2 INTEGER,
                busyness_hour_3 INTEGER,
                busyness_hour_4 INTEGER,
                busyness_hour_5 INTEGER,
                update_time TEXT
            )
        """)
        conn.commit()

    # find the data in table "poi"
    cur.execute("SELECT id, latitude, longitude FROM nybusy_poi")
    poi_data = cur.fetchall()

    # get the time we scrap the data
    localtime = time.asctime(time.localtime(time.time()))

    # traverse every poi
    result_data = []

    for poi in poi_data:
        id, lat, lon = poi

        # use Google Maps API to get accurate names and addresses
        place_name, address = get_address(lat, lon, google_maps_api_key)

        # use the name and address from Google Maps API to get busyness data from Best_time_app
        url = "https://besttime.app/api/v1/forecasts"
        params = {
            'api_key_private': best_time_private_api_key,
            'venue_name': place_name,
            'venue_address': address
        }
        response = requests.request("POST", url, params=params)
        response_json = response.json()

        if response_json['status'] != 'OK':
            continue

        # insert data in foot_traffic_forecast table
        for day in range(0, 7):
            change_hours = response_json['analysis'][day]['surge_hours']
            day_info = response_json['analysis'][day]['day_info']
            hour_analysis = response_json['analysis'][day]['hour_analysis']

            hour_analysis_values = []
            # Iterating over all the hours in the day
            for i in range(24):
                intensity_nr = hour_analysis[i]["intensity_nr"]

                # Checking if the intensity_nr is an integer, if not assign it a default value of 999
                if not isinstance(intensity_nr, int):
                    intensity_nr = 999

                hour_analysis_values.append(intensity_nr)

            cur.execute("""
                INSERT INTO foot_traffic_forecast (
                    id,
                    lat,
                    lng,
                    place_name,
                    address,
                    day_int,
                    day_rank_max,
                    day_rank_mean,
                    busyness_hour_6,
                    busyness_hour_7,
                    busyness_hour_8,
                    busyness_hour_9,
                    busyness_hour_10,
                    busyness_hour_11,
                    busyness_hour_12,
                    busyness_hour_13,
                    busyness_hour_14,
                    busyness_hour_15,
                    busyness_hour_16,
                    busyness_hour_17,
                    busyness_hour_18,
                    busyness_hour_19,
                    busyness_hour_20,
                    busyness_hour_21,
                    busyness_hour_22,
                    busyness_hour_23,
                    busyness_hour_0,
                    busyness_hour_1,
                    busyness_hour_2,
                    busyness_hour_3,
                    busyness_hour_4,
                    busyness_hour_5,
                    update_time)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                id,
                lat,
                lon,
                place_name,
                address,
                day_info["day_int"],
                day_info["day_rank_max"],
                day_info["day_rank_mean"],
                *hour_analysis_values,  # Unpack the intensity_nr values for all hours
                localtime
            ))
            conn.commit()
        print('ID:' + str(id) + ' finished')

    # close connection to database
    cur.close()
    conn.close()


if __name__ == "__main__":
    main()

