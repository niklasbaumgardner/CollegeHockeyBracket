from appsignal import Appsignal
import os

appsignal = Appsignal(
    name="NB Bracket Challenge",
    environment="production",
    push_api_key=os.environ.get("APPSIGNAL_PUSH_API_KEY"),
    active=True,
    revision="nbbracketchallenge@3.0.0",
)
