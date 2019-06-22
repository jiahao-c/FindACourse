import json

courseData = json.loads(open("data.json").read())
buildingData = json.loads(open("building.json").read())

passed = 0
failed = 0

for index,_ in enumerate(courseData["courses"]):
    c = courseData["courses"][index]
    for innnerIndex,_ in enumerate(c["sections"]):
        building = c["sections"][innnerIndex]["building"]
        if building in buildingData:
            passed += 1
        else:
            print(building)
            failed += 1

print(passed)
print(failed)