import requests

# Your Facebook app ID and app secret
app_id = '3165172737110023'
app_secret = 'cb1979e8b93992667283aab726320bb7'

# Construct the URL
url = f"https://graph.facebook.com/oauth/access_token?client_id={app_id}&client_secret={app_secret}&grant_type=client_credentials"

# Send HTTP GET request
response = requests.get(url)

# Parse the returned JSON data
data = response.json()

# Print out the access token
print(data['access_token'])

user_id = '976467323694454'  # This needs to be your Facebook user ID
access_token = '3165172737110023|ayGc7VEaVA3Fkmm7HjnSJ_MCMSc'  # Replace with the access token obtained in the previous step

url = f"https://graph.facebook.com/v11.0/{user_id}?fields=instagram_business_account&access_token={access_token}"

response = requests.get(url)

data = response.json()

# Print the Instagram business account ID
print(data)
