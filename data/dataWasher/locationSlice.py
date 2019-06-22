import json

obj = json.loads(open("data.json").read())

recordDeleted = 0

for index,_ in enumerate(obj["courses"]):
    c = obj["courses"][index]
    for innnerIndex,_ in enumerate(c["sections"]):
        location = c["sections"][innnerIndex]["location"]
        spaceIndex = location.find(" ")
        building = location[:spaceIndex]
        room = location[spaceIndex+1:]
        c["sections"][innnerIndex]["building"] = building
        c["sections"][innnerIndex]["room"] = room
        del c["sections"][innnerIndex]["location"]
        recordDeleted += 1

print(recordDeleted)

open("locationSliced.json", "w").write(json.dumps(obj))