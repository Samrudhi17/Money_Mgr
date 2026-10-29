from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import crud
from schemas import ExpenseCreate, ExpenseResponse

app = FastAPI(title="Money Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/expenses/", response_model=ExpenseResponse, status_code=201)
def create_expense(expense: ExpenseCreate):
    try:
        return crud.create_expense(expense)
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail=str(e)

        )