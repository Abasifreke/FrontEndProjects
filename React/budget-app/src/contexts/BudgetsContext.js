import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();


export const useBudgets = () => {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([]);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                //TODO: add error
                return alert("same buget already exists");
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        });
    }

    function deleteBudget(budgetId) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== budgetId);
        });
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        });
    }

    function deleteExpense(expenseId) {
        // TODO: deal with uncategorized expenses
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== expenseId);
        });
    }


    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget,
    }}>
        {children}
    </BudgetsContext.Provider>
}