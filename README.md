# Zigment FrontEnd Task
# Dynamic Form Generator Challenge

# To Run the project Locally

1) Clone the project using git clone
2) Go to the root directory of the Project
3) `npm install`
4) `npm start`

# TestCases are Implemented using PlayWright
# To Run the test cases:
1) Go the root directory of the project
2) In the terminal, run `npm test`

# Tasks Implemented 
Left side: JSON editor
    - Syntax highlighting for JSON
    - Real-time JSON validation
    - Error messages for invalid JSON
Right side: Generated form preview
    - Updates in real-time as JSON is edited
    - Responsive form layout
    - Proper error states and validation

- Used TypeScript for type safety
- Created proper interfaces for the JSON schema
- Handled JSON validation gracefully
- Real-time form generation and validation
- Proper error boundaries for both editor and form
- Mobile-responsive layout.

 # As per Assumption I had to write test cases either in Jest or PlayWright [Used PlayWright in this Case]
 # Implemented TestCases:
- Test JSON validation
- Test real-time form generation
- Test form validation and submission
- Test responsive layout
- Test error scenarios

# Worked according to the sample JSON in the test file.
# Example:
{
"formTitle": "Project Requirements Survey",
"formDescription": "Please fill out this survey about your project needs",
"fields": [
{
"id": "name",
"type": "text",
"label": "Full Name",
"required": true,
"placeholder": "Enter your full name"
},
{
"id": "email",
"type": "email",
"label": "Email Address",
"required": true,
"placeholder": "you@example.com",
"validation": {
"pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
"message": "Please enter a valid email address"
}
},
{
"id": "companySize",
"type": "select",
"label": "Company Size",
"required": true,
"options": [
{ "value": "1-50", "label": "1-50 employees" },
{ "value": "51-200", "label": "51-200 employees" },
{ "value": "201-1000", "label": "201-1000 employees" },
{ "value": "1000+", "label": "1000+ employees" }
]
},
{
"id": "industry",
"type": "radio",
"label": "Industry",
"required": true,
"options": [
{ "value": "tech", "label": "Technology" },
{ "value": "healthcare", "label": "Healthcare" },
{ "value": "finance", "label": "Finance" },
{ "value": "retail", "label": "Retail" },
{ "value": "other", "label": "Other" }
]
},
{
"id": "timeline",
"type": "select",
"label": "Project Timeline",
"required": true,
"options": [
{ "value": "immediate", "label": "Immediate (within 1 month)" },
{ "value": "short", "label": "Short-term (1-3 months)" },
{ "value": "medium", "label": "Medium-term (3-6 months)" },
{ "value": "long", "label": "Long-term (6+ months)" }
]
},
{
"id": "comments",
"type": "textarea",
"label": "Additional Comments",
"required": false,
"placeholder": "Any other details you'd like to share..."
}
]
}

# Implemented all the features mentioned in the task file.

# Deployed in Vercel: https://zigment-task-fvjs.vercel.app/