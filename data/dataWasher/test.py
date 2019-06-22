import json

buildingData = json.loads(open("building.json").read())

#initialize "rooms" key for each building
for building in buildingData:
	print(buildingData[building]["img"])