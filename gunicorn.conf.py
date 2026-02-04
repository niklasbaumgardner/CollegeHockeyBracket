import os

port = os.environ.get("PORT", "3000")
bind = f"[::]:{port}"

worker_class = "gevent"
workers = 33
worker_connections = 1000

timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 50
