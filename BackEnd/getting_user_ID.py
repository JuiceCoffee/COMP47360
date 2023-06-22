import requests

# 你的 Facebook 应用 ID 和应用密钥
app_id = '3165172737110023'
app_secret = 'cb1979e8b93992667283aab726320bb7'

# 构造 URL
url = f"https://graph.facebook.com/oauth/access_token?client_id={app_id}&client_secret={app_secret}&grant_type=client_credentials"

# 发送 HTTP GET 请求
response = requests.get(url)

# 解析返回的 JSON 数据
data = response.json()

# 打印出 access token
print(data['access_token'])

user_id = '976467323694454'  # 这里需要是你 Facebook 的用户 ID
access_token = '3165172737110023|ayGc7VEaVA3Fkmm7HjnSJ_MCMSc'  # 替换为上一步获取到的 access token

url = f"https://graph.facebook.com/v11.0/{user_id}?fields=instagram_business_account&access_token={access_token}"

response = requests.get(url)

data = response.json()

# 打印 Instagram 业务账号 ID
print(data)
