kill `lsof -t -i:3000`

export MONGO_URL="mongodb://192.168.2.16:27017/ourhomestay"
export ROOT_URL='http://localhost:3000'
export PORT=3000
echo "SERVER PORT: $PORT"
meteor --settings settings.json
#meteor
echo "server starting, visit $ROOT_URL"


