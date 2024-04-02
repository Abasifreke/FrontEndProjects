import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const useBudgets = () => {
    return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                //TODO: add error
                alert("same buget already exists");
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        });
    }

    function deleteBudget(budgetId) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== budgetId) return expense;

                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        });
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