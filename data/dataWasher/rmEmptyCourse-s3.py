import json

obj = json.loads(open("data.json").read())

recordDeleted = 0

for index,_ in enumerate(obj["courses"]):
    c = obj["courses"][index]
    if len(c["sections"]) == 0:
        recordDeleted += 1
        del obj["courses"][index]

print(recordDeleted)

open("data.json", "w").write(json.dumps(obj))