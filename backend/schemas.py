from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)
    category: str
    date: date
    note: Optional[str] = None

class ExpenseResponse(BaseModel):
    id: str
    amount: float
    category: str
    date: date
    note: Optional[str] = None




