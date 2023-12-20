<h1 align="center"> Esenciaai </h1>

<h2>Architecture</h2>
<p align="center"><img src="img\esencia_architecture2.png" width=800 height="auto"></p>

<h2>Database</h2>
<p>Mongodb database hosted in Mongodb Atlas on a serverless cluster, the schema is "Embedded Documetes",
it has one collection for each team with all the information in it.</p>

<pre>
# fields
_id
team_id (str)
daily_survey (dict)
daily_survey_count (int)
retro_count (int)
self_satisfaction_general (int)
team_collaboration_general (int)
work_engagement_general (int)
workspace_general (int)
short_recommendation (dict)
retro (array)
recommendation (dict)
</pre>

<h2>API Rest</h2>
It is a serverless http rest api hosted in gcp, using cloud functions.

[you can find the endpoints here.](api_mongo/cloud_functions_endpoints.md)


<h2>Tech Stack</h2>

<h3>Data</h3>
<p><img src='img/gcp.jpg' width=20 height=20> &nbsp Google Cloud</p>
<p><img src='img/mongodb.png' width=20 height=20> &nbsp MongoDB</p>
<p><img src='img/openia.jpg' width=40 height=20> &nbsp OpenIA</p>

<h3>BackEnd</h3>


<h3>FrontEnd</h3>

