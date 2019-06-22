import json

obj = json.loads(open("data.json").read())

recordDeleted = 0

for index,_ in enumerate(obj["courses"]):
    c = obj["courses"][index]
    for innnerIndex,_ in enumerate(c["sections"]):
        building = c["sections"][innnerIndex]["building"]
        blacklist = ["CURRIE", "EVO420", "NOROOM", "MACSTW", "MCC", "CENTEN", "BRON", "MN", "SH68", "1745", "158"]
        if building in blacklist:
            del c["sections"][innnerIndex]
            recordDeleted += 1

print(recordDeleted)

open("data.json", "w").write(json.dumps(obj))