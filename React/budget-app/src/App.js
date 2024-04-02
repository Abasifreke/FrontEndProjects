import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack";
import Button from 'react-bootstrap/Button';
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  // const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }

  return <>
    <Container className="my-4">
      <Stack direction="horizontal" gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}> Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}> Add Expense</Button>
      </Stack>
      <div className="mb-4" >
        <TotalBudgetCard />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", alignItems: "flex-start" }} >
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
          return <BudgetCard
            key={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
          />;
        })}
        <UncategorizedBudgetCard onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
      </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
    <ViewExpensesModal budgetId={viewExpenseModalBudgetId} handleClose={() => setViewExpenseModalBudgetId()} />
  </>
}

export default App;
