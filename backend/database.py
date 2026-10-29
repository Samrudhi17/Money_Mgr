from pymongo import MongoClient


MONGO_URI = "mongodb+srv://samrudhipawar15_db_user:HelloWorld2530@cluster0.koomqy.mongodb.net"
client = MongoClient(MONGO_URI)

# Database name
db = client["money_manager_db"]

# Collections
expense_collection = db["expenses"]