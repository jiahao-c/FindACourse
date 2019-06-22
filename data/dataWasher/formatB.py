import json

obj = json.loads(open("building.json").read())

for key in obj.keys():
    fullName = obj[key]  
    obj[key] = {"full": fullName, "address":"", "image":""}


open("buildingFormatted.json", "w").write(json.dumps(obj))