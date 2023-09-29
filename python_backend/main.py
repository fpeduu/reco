from pydantic import BaseModel
import socketio

class Session(BaseModel):
    email: str

class Notification(BaseModel):
    type: str
    email: str
    message: str
    tenantName: str
    condominiumName: str

sio = socketio.AsyncServer(async_mode='asgi',
                           cors_allowed_origins=[])
app = socketio.ASGIApp(sio)

connections: dict[str, str] = dict()
messages_queue: dict[str, Notification] = dict()

@sio.event
def connect(sid: str, environ: dict):
    raise ConnectionRefusedError('authentication failed')

@sio.event
async def connect(sid: str, environ: dict, auth: Session):
    if auth:
        session = Session(email=auth["email"])
        await sio.save_session(sid, session)
        connections[session.email] = sid

        if session.email in messages_queue:
            for message in messages_queue[session.email]:
                await sio.emit('notification', message, to=sid)
            del messages_queue[session.email]

@sio.on('notificate')
async def notification_handler(sid: str, data: Notification):
    validated_data = Notification(**data)
    if validated_data.email in connections:
        del data["email"]
        user_sid = connections[validated_data.email]
        await sio.emit('notification', data, to=user_sid)
    elif validated_data.email in messages_queue:
        messages_queue[validated_data.email].append(data)
    else:
        messages_queue[validated_data.email] = [data]

@sio.event
async def disconnect(sid: str):
    print('disconnect ', sid)
    session: Session = await sio.get_session(sid)
    if session: connections.pop(session.email, None)
    
