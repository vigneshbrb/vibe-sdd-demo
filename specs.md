Campus Event Registration System — Specification

1. Problem Statement

Students need a simple web-based system to register for campus events.

The system should allow students to:
	•	Register for an event
	•	View all registrations
	•	Cancel a registration

This is a frontend-only application using JavaScript.

⸻

2. Registration Data Model

Each registration must contain:
	•	id → unique number (auto-increment)
	•	name → string (minimum 3 characters)
	•	email → string (must contain “@”)
	•	eventName → string (cannot be empty)
	•	status → either "registered" or "cancelled"

⸻

3. Functional Requirements

3.1 Register Student

The system must allow a student to register by providing:
	•	Name
	•	Email
	•	Event Name

On successful registration:
	•	A new registration object is created
	•	Status is set to "registered"
	•	The registration appears in the list

⸻

3.2 View Registrations

The system must:
	•	Display all registrations
	•	Show name, email, eventName, and status
	•	Update UI immediately after changes

⸻

3.3 Cancel Registration

The system must:
	•	Allow cancelling by clicking a Cancel button
	•	Change status to "cancelled"
	•	Not delete the record
	•	Prevent errors if Cancel is clicked multiple times

⸻

4. Validation Rules

The system must enforce:
	•	Name must be at least 3 characters
	•	Email must include “@”
	•	Event name must not be empty
	•	Same email cannot register twice for the same event
	•	Duplicate registration attempt must show error message

⸻

5. Error Handling

The system must:
	•	Show clear error messages in the UI
	•	Not crash on invalid inputs
	•	Not allow undefined values
	•	Not allow status other than "registered" or "cancelled"

⸻

6. Acceptance Criteria

The feature is complete only if:
	•	All validation rules are enforced
	•	Duplicate prevention works
	•	Cancelling twice does not break system
	•	UI updates correctly after every action
	•	No console errors occur during normal usage

⸻

7. Non-Functional Requirements
	•	Must run in browser
	•	Must not require backend
	•	Must use plain JavaScript (no frameworks)
	•	Must be readable and modular
	•	Must not use external libraries

⸻

8. Out of Scope

The following are NOT required:
	•	Database
	•	Authentication
	•	Payment integration
	•	Admin dashboard
	•	Event capacity limits
	•	Email verification