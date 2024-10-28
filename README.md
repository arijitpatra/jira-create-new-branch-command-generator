# jira-create-new-branch-command-generator

**Jira - Create New Branch Command Generator**

This extension helps you to get the project ID, ticket ID and ticket title in an alphanumeric and hyphenated format from a Jira ticket which is opened on your browser's current tab. It supports both the on-premise and cloud offerings of Jira.

It generates the command to create a new git branch, with the branch name having the format - "PROJECTNAME-TICKETID-the-ticket-title".

The entire command generated is like "git checkout -b PROJECTNAME-TICKETID-the-ticket-title". There is also a copy button which copies the entire command. The generated command is also editable if the developer wants to edit it. All these make it a good productivity hack for developers when they want to create a new branch on git for the Jira ticket they are working on.

If the current opened tab is not a Jira ticket then this command won't be generated.

**NOTE:** This is not an Atlassian owned product/extension or in any way related to Atlassian company. It is an independently built developer productivity tool. Supports both cloud and on-premise (tested with Jira v9.12.14) offerings of Jira.

**Screenshots:**

![alt text](<screenshot 1.jpg>)

![alt text](<screenshot 2.jpg>)

![alt text](<screenshot 3.jpg>)
