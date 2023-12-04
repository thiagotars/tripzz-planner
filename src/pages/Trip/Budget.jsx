import { FaPlus } from "react-icons/fa";
import ExpenseTypeDropdown from "../../components/ExpenseTypeDropdown";
import { data } from "../../data/data";

const Budget = () => {
  const budgetData = data[0].trip.budget;
  const expenses = budgetData.expenses;

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.value, 0);

  const expensesItems = expenses.map((expense) => {
    return (
      <div key={expense.id} className="flex w-full">
        <div className="min-w-[2.5rem] h-[2.5rem] rounded-full bg-medium-grey"></div>
        <div className="flex flex-col w-full ml-4">
          <div className="flex w-full justify-between text-[.875em]">
            <p>{expense.name}</p>
            <p>{`$ ${expense.value.toFixed(2)}`}</p>
          </div>
          <p className="text-[.75em] text-dark-grey">July 25th - Activities</p>
        </div>
      </div>
    );
  });

  return (
    <main className="w-[50rem]">
      <div className="px-10">
        <div className="w-full flex">
          <div className="w-1/2 pr-8">
            <h2 className="text-[1.25em] font-bold mb-4">Budget</h2>
            <div className="flex flex-col gap-6 p-6 justify-center w-full max-h-[12.5rem] rounded-[1.25rem] border">
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875rem]">Total Spent</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {totalSpent.toFixed(2)}
                </h1>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875rem]">Your Limit</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {budgetData.limit.toFixed(2)}
                </h1>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875rem]">Remaining</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {(budgetData.limit - totalSpent).toFixed(2)}
                </h1>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <input
                className="rounded-full bg-light-grey px-6 py-2 w-[7.5rem] text-[.875em] focus: outline-none"
                type="text"
                name=""
                id=""
                placeholder="0,00"
              />
              <button className="bg-black text-[.875rem] h-[2.5rem] font-bold text-white px-6 rounded-full ml-4">
                Set Limit
              </button>
            </div>
          </div>
          <div className="w-1/2 border-l pl-8">
            <h2 className="mb-2 pb-4 font-bold">Your Expenses</h2>
            <div className="flex flex-col gap-4 max-h-[20rem] pr-6 overflow-scroll">
              {expensesItems}
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="flex items-center">
            <FaPlus className="w-[.625rem]" />
            <h5 className="mx-4 font-bold">Add New Expense</h5>
          </div>
          <div className="flex gap-2 mt-6 px-6 h-10">
            <input
              className="rounded-full text-[.875em] w-1/2 bg-light-grey px-6 py-2 focus: outline-none"
              type="text"
              name=""
              id=""
              placeholder="e.g. 'Lunch at Bacoa'"
            />
            <ExpenseTypeDropdown />
            <input
              className="rounded-full text-[.875em] w-1/4 bg-light-grey px-6 py-2 focus: outline-none"
              type="text"
              name=""
              id=""
              placeholder="0,00"
            />
          </div>
          <div className="flex justify-end px-6 mt-6">
            <button className="bg-black h-[2.5rem] font-bold text-[.875em] text-white px-6 rounded-full">
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Budget;
