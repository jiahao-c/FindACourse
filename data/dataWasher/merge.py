import json

courseData = json.loads(open("data.json").read())
buildingData = json.loads(open("building.json").read())

# initialize "rooms" key for each building
for keys in buildingData:
	buildingData[keys]["rooms"] = {}

# initialize each room number
for index, _ in enumerate(courseData["courses"]):
	c = courseData["courses"][index]
	# all sections of a course
	for innnerIndex, _ in enumerate(c["sections"]):
		building = c["sections"][innnerIndex]["building"]
		room = c["sections"][innnerIndex]["room"]
		buildingData[building]["rooms"][room] = []

#write courseData into buildingData
for index, _ in enumerate(courseData["courses"]):
	c = courseData["courses"][index]
	# data of a course
	subj = c["subj"]
	number = c["number"]
	title = c["title"]
	for innnerIndex, _ in enumerate(c["sections"]):
		#data of a section
		building = c["sections"][innnerIndex]["building"]
		room = c["sections"][innnerIndex]["room"]
		days = c["sections"][innnerIndex]["days"]
		time = c["sections"][innnerIndex]["time"]
		prof = c["sections"][innnerIndex]["prof"]

		#construct a section dict
		section = {"subj":subj, "number":number, "title":title, "days":days, "time":time, "prof":prof }

		buildingData[building]["rooms"][room].append(section)


open("merge.json", "w").write(json.dumps(buildingData))
