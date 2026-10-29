from schemas import ExpenseCreate
from database import expense_collection

def create_expense(expense: ExpenseCreate):
    expense_data = expense.model_dump(mode = "json")
    result = expense_collection.insert_one(expense_data)

    return{
        "id": str(result.inserted_id),
        **expense_data,
    }



