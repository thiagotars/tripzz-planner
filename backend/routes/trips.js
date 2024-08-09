const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  getSingleTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripsController");

const {
  createDay,
  getAllDays,
  getSingleDay,
  updateDay,
} = require("../controllers/daysController");

const { getBudget, updateBudget } = require("../controllers/budgetsController");

const {
  getAllLists,
  getSingleList,
  createList,
  deleteList,
  updateList,
} = require("../controllers/listsController");

const {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expensesController");

const {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEventsOfDay,
  // getSingleEvent,
} = require("../controllers/eventsController");

router.route("/").get(getAllTrips).post(createTrip);

router
  .route("/:tripId")
  .get(getSingleTrip)
  .patch(updateTrip)
  .delete(deleteTrip);

router.route("/:tripId/days").get(getAllDays).post(createDay);

router.route("/:tripId/days/:dayId").get(getSingleDay).patch(updateDay);

router.route("/:tripId/events").post(createEvent);
router.route("/:tripId/events/:dayId").get(fetchEventsOfDay);
router
  .route("/:tripId/events/:eventId")
  // .get(getSingleEvent)
  .patch(updateEvent)
  .delete(deleteEvent);

router.route("/:tripId/budget").get(getBudget).patch(updateBudget);

router
  .route("/:tripId/budget/:budgetId/expenses")
  .get(getAllExpenses)
  .post(createExpense);

router
  .route("/:tripId/budget/:budgetId/expenses/:expenseId")
  .patch(updateExpense)
  .delete(deleteExpense);

router.route("/:tripId/lists").get(getAllLists).post(createList);

router
  .route("/:tripId/lists/:listId")
  .patch(updateList)
  .delete(deleteList)
  .get(getSingleList);

module.exports = router;
