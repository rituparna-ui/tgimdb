import requests
from bs4 import BeautifulSoup as bs
import json
import sys
param = sys.argv[1]
url = "https://www.imdb.com/search/title/?title={0}&title_type=feature&sort=user_rating,desc".format(param)
r = requests.get(url)
soup = bs(r.content,features="html.parser")
p = soup.findAll("img",{"class":"loadlate"})
plen = len(p[0:])
data=[]
iurl=[]
for i in range(plen):
    data.append(p[i].get("data-tconst"))
    iurl.append(p[i].get("loadlate"))

resp = {
            "Response":"<200>",
            "Message":"Hello form Python",
            "Data":data,
            "Iurl":iurl
        }
print(json.dumps(resp))
sys.stdout.flush()
