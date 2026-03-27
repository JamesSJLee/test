from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Agenda(BaseModel):
    id: int
    title: str
    status: str  # Pending, Approved, Conditional, Re-discuss
    description: Optional[str] = None
    reviewer: Optional[str] = None
    time_ago: Optional[str] = None

# Mock data
agendas = [
    Agenda(id=1, title="2024년 상반기 예산안", status="Approved", description="상정 안건 4건 등록 완료", time_ago="10 mins ago"),
    Agenda(id=2, title="신규 프로젝트 투자 검토", status="Pending", description="안건 2번에 대한 예산 재검토 의견 제출", reviewer="전략기획본부장", time_ago="10 mins ago"),
    Agenda(id=3, title="글로벌 시장 진출 전략안", status="Pending", description="로컬 파트너십 선정 기준 명확화 필요", time_ago="Active"),
]

class MeetingStatus(BaseModel):
    elapsed_time: str
    current_agenda_id: int
    attendance_count: int

current_status = MeetingStatus(elapsed_time="15:00", current_agenda_id=3, attendance_count=11)

@app.get("/api/agendas", response_model=List[Agenda])
def get_agendas():
    return agendas

@app.post("/api/agendas")
def create_agenda(agenda_data: dict):
    new_id = max([a.id for a in agendas]) + 1 if agendas else 1
    new_agenda = Agenda(
        id=new_id,
        title=agenda_data.get("title", "No Title"),
        status="Pending",
        description=agenda_data.get("description"),
        reviewer=agenda_data.get("department"),
        time_ago="Just now"
    )
    agendas.append(new_agenda)
    return new_agenda

@app.get("/api/status", response_model=MeetingStatus)
def get_status():
    return current_status

@app.post("/api/agendas/{agenda_id}/status")
def update_agenda_status(agenda_id: int, status: str):
    for agenda in agendas:
        if agenda.id == agenda_id:
            agenda.status = status
            return {"message": f"Agenda {agenda_id} updated to {status}"}
    raise HTTPException(status_code=404, detail="Agenda not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
