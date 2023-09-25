# Task requirement
Create a small web application using the following frameworks:

## Technical stack
Backend: Node.js + NestJS
Frontend: Angular
Database: MySQL

## Requirement
- The form should have the following fields:
  * Event name: text input
  * Start time: time input
  * End time: time input
  * Create button
- The data from the form should be stored into a database.
- The grid should show all the fields (name, start time, end time).
- The last column for the grid should be an action column with "Edit"
  and "Cancel" if the event is not started, or "Stop" if the event has
  already started.
- On "Edit", the user should be able to change the name, start and end
  time but only if the event has not already started
- On "Cancel", the event will be cancelled (not deleted)
- On "Stop", the currently running event should be stopped
- The row should change color according to the event status in real-
  time (not started, running, stopped, cancelled, completed).

## Nice to have
- If the status is changed in another browser window (or from another
  machine), it should reflect the change in all the open windows in
  real time.
- The event row should show the progress via a colored row bottom
  border.
