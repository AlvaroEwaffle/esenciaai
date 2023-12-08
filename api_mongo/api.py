from fastapi import FastAPI
from api_mongo.classes import *
from pymongo.mongo_client import MongoClient
from bson import json_util
from datetime import datetime, date
from dotenv import load_dotenv
import osapi_mongo
import json
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="api_mongo/templates")
app = FastAPI()

#mongodb connection
load_dotenv()
user = os.environ.get("USER")
pwd = os.environ.get("PASSWORD")
uri = f"mongodb+srv://{user}:{pwd}@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["essenciaIA_app"]

#post methods -----------------------
@app.post("/daily_survey/alt")
async def add_daily_survey(survey:dailySurvey):
        try:
            db["survey_data"].update_one(filter={
                "team_id": survey.team_id
            }, update={
        "$push": {
        "daily_survey": {
          "user_id": survey.user_id,
          "date": str(date.today()),
          "sprint": survey.sprint,
          "question1": survey.question1,
          "question2": survey.question2,
          "question3": survey.question3,
          "question4": survey.question4,
          "comment": survey.comment
        }
      }, 
      "$inc":{"daily_survey_count": 1, 
              "self_satisfaction": survey.question1,
              "work_engagement": survey.question2,
              "team_collaboration": survey.question3,
              "workspace": survey.question4},
      "$set":{"retro_count":0, "reports_count":0}
    }, upsert=True)
            return {"status":200}
        except Exception as e:
            return {"status":422, "error":e }

@app.post("/daily_survey")
async def add_daily_survey(survey:dailySurvey):
        current_date = str(date.today())
        #current_date = "2023-12-07"
        try:
            db["survey_data"].update_one(filter={
                "team_id": survey.team_id
            }, update={
      "$push":{
            f"daily_survey.{current_date}.survey": {
             "user_id": survey.user_id,
             "sprint": survey.sprint,
             "question1": survey.question1,
             "question2": survey.question2,
             "question3": survey.question3,
             "question4": survey.question4,
             "comment": survey.comment}
              }, 
      "$inc":{"daily_survey_count": 1, 
              "self_satisfaction_general": survey.question1,
              "work_engagement_general": survey.question2,
              "team_collaboration_general": survey.question3,
              "workspace_general": survey.question4,
              f"daily_survey.{current_date}.self_satisfaction": survey.question1,
              f"daily_survey.{current_date}.work_engagement": survey.question2,
              f"daily_survey.{current_date}.team_collaboration": survey.question3,
              f"daily_survey.{current_date}.workspace": survey.question4
              },
      "$set":{"retro_count":0, "reports_count":0}
    }, upsert=True)
            return {"status":200}
        except Exception as e:
            return {"status":422, "error":e }


@app.post("/retro")
async def retro_survey(retro:RetroItem):
        try:
            c1_serialized = [comment.model_dump() for comment in retro.c1]
            c2_serialized = [comment.model_dump() for comment in retro.c2]
            c3_serialized = [comment.model_dump() for comment in retro.c3]
            c4_serialized = [comment.model_dump() for comment in retro.c4]
            db["survey_data"].update_one(filter={
                "team_id": retro.team_id
            }, update={
                "$push": {
                    "retro": {
                    "sprint": retro.sprint,
                    "date": datetime.now(),
                    "c1": c1_serialized,
                    "c2": c2_serialized,
                    "c3": c3_serialized,
                    "c4": c4_serialized
                    }
                },"$inc":{"retro_count":1}
            }, upsert=True)
            return True
        except Exception as e:
            print(str(e))
            return False

#get methods -----------------------
@app.get("/")
def welcome():
    return {"status":200, "msg": "welcome to esencia"}

@app.get("/daily_survey/getallTeam")
async def get_daily_survey(team_id):
        result = json_util.dumps(db["survey_data"].find({"team_id": team_id},{
            "daily_survey":1,
            "_id":0}))
        return(json.loads(result))

@app.get("/retro/get")
async def get_retro(team_id):
        result = json_util.dumps(db["survey_data"].find({"team_id": team_id},{
            "retro":1}))
        return(json.loads(result))

@app.get("/dashboard/getall_data")
async def getall_dash_data(team_id):
        result = json_util.dumps(db["survey_data"].find({"team_id": team_id},
                                                        {"daily_survey_count":1,
                                                         "reports_count":1,
                                                         "retro_count":1,
                                                         "daily_survey":1}))
        return(json.loads(result))

@app.get("/reports/generate")
async def get_reports():
        pass

@app.get("/dashboard", response_class=HTMLResponse)
#async def get_dash(team_id):
#        result = json_util.dumps(db["survey_data"].find({"team_id": team_id},{
#            "daily_survey":1,
#            "_id":0}))
        
async def get_dash(team_id):
        return templates.TemplateResponse("index.html", {"request":{"status":200}})



