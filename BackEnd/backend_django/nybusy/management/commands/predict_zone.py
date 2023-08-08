import pandas as pd
from datetime import datetime
import time as time_module
import logging
from django.core.management.base import BaseCommand
from nybusy.models import WeatherData, PredictZone, TaxiZone
from pycaret.regression import load_model


# Configure logging
logging.basicConfig(filename=r'zone_prediction.log', level=logging.INFO, format='%(asctime)s - %(message)s')


class Command(BaseCommand):
    help = 'Predict the weather'

    def get_features(self, zones):
        logging.info("Fetching features...")
        # get data from database
        data = WeatherData.objects.all().values('time')

        df = pd.DataFrame.from_records(data)

        # convert time column to datetime
        df['time'] = pd.to_datetime(df['time'])
        df['month'] = df['time'].dt.month
        df['dayofweek'] = df['time'].dt.weekday
        df['hour'] = df['time'].dt.hour

        x_features = []
        LocationID = []
        times = []

        for index, row in df.iterrows():
            for zone in zones:
                row_data = row.values.tolist()
                row_data.append(zone)  # Add the DOLocationID to the feature data
                x_features.append(row_data)
                LocationID.append(zone)
                times.append(row['time'])  # Append the time to the times list

        logging.info("Finished fetching features.")

        # Create the new DataFrame
        df_x_features = pd.DataFrame(x_features, columns=df.columns.tolist() + ['LocationID'])

        # Reorder the columns
        df_x_features = df_x_features[['LocationID', 'time', 'month', 'dayofweek', 'hour']]

        return df_x_features, LocationID, times

    def handle(self, *args, **kwargs):
        while True:
            logging.info("Starting prediction cycle...")

            # Delete all existing predictions in the database
            logging.info("Deleting existing predictions...")
            PredictZone.objects.all().delete()

            # Load the model
            logging.info("Loading the model...")

            model = load_model(r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\final_decision_tree_model')

            # Define zones
            taxi_zones = [4, 13, 50, 68, 137, 140, 158, 170, 211, 224, 233, 262, 12, 194, 128, 120, 103, 24, 41, 42, 43, 45, 48, 74, 75, 79, 87, 88, 90, 100, 107, 113, 114, 116, 125, 127, 141,
                          142, 143, 144, 148, 151, 152, 153, 161, 162, 163, 164, 166, 186, 202, 209, 229, 230,
                          231, 232, 234, 236, 237, 238, 239, 243, 244, 246, 249, 261, 263]

            # Get the data
            df, Locations, times = self.get_features(taxi_zones)

            # Make the prediction
            predictions = model.predict(df)

            # Save the predictions
            logging.info("Saving predictions...")
            for idx in range(len(predictions)):
                i = predictions[idx]
                location = Locations[idx]
                time = times[idx]
                print(i)
                prediction_data = PredictZone()  # Create a new instance in each loop
                prediction_data.time = time
                prediction_data.time_index = time.hour + 1  # Extract the hour from the datetime and add 1
                prediction_data.busylevel = i
                prediction_data.location_id = TaxiZone.objects.get(
                    location_id=location)  # Get the TaxiZone instance with the given location_id
                prediction_data.save()

            logging.info("Prediction cycle completed.")

            # Sleep for 24 hours
            logging.info("Sleeping for 24 hours...")
            time_module.sleep(24 * 60 * 60)


