import { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("food");
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const todayStr = new Date().toLocaleDateString("en-CA");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExpense = {
            amount: parseFloat(amount),
            category,
            date,
            note: note.trim() ? note.trim() : null,
        };

        try {
            setLoading(true);

            const response = await fetch(
                "http://127.0.0.1:8000/expenses/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newExpense),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.detail || "Failed to add expense."
                );
            }

            await response.json();

            alert("Expense added successfully!");

            setAmount("");
            setCategory("food");
            setDate(new Date().toLocaleDateString("en-CA"));
            setNote("");
        } catch (err) {
            console.error("Error adding expense:", err);
            alert("Failed to add expense: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="expense-page">
            <section className="expense-form-container">

                <header className="expense-header">
                    <div className="expense-icon">₹</div>

                    <div>
                        <h1>Add New Expense</h1>
                        <p>
                            Record and organize your daily expenses.
                        </p>
                    </div>
                </header>

                <div className="expense-divider"></div>

                <form onSubmit={handleSubmit} className="expense-form">

                    <div className="form-group">
                        <label htmlFor="amount">
                            Amount <span className="required">*</span>
                        </label>

                        <div className="amount-input-wrapper">
                            <span className="currency-symbol">₹</span>

                            <input
                                id="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <small>Enter the amount you spent.</small>
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="category">
                                Category <span className="required">*</span>
                            </label>

                            <select
                                id="category"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                required
                            >
                                <option value="food">Food & Drinks</option>
                                <option value="travel">Travel</option>
                                <option value="shopping">Shopping</option>
                                <option value="bills">Bills & Utilities</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">
                                Date <span className="required">*</span>
                            </label>

                            <input
                                id="date"
                                type="date"
                                value={date}
                                max={todayStr}
                                onChange={(e) =>
                                    setDate(e.target.value)
                                }
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="note">
                            Description
                            <span className="optional">Optional</span>
                        </label>

                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) =>
                                setNote(e.target.value)
                            }
                            placeholder="What did you spend money on?"
                            rows="3"
                            maxLength="250"
                        />

                        <small>
                            Add a short note to remember this expense.
                        </small>
                    </div>

                    <div className="expense-divider"></div>

                    <button
                        type="submit"
                        className="expense-submit-button"
                        disabled={loading}
                    >
                        {loading ? "Saving Expense..." : "Add Expense"}
                        {!loading && <span aria-hidden="true"> →</span>}
                    </button>

                    <p className="form-footer">
                        Your expense will be saved to your account database.
                    </p>

                </form>
            </section>
        </main>
    );
}