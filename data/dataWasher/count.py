import json

courseData = json.loads(open("data.json").read())
buildingData = json.loads(open("building.json").read())


""" for index,_ in enumerate(courseData["courses"]):
    c = courseData["courses"][index]
    for innnerIndex,_ in enumerate(c["sections"]):
        building = c["sections"][innnerIndex]["building"]
        buildingData[building]["count"] = 0
 """

open("building.json", "w").write(json.dumps(buildingData))