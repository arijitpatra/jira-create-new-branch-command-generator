# jira-create-new-branch-command-generator

Jira - Create New Branch Command Generator is a Google Chrome extension which helps you to get the ticket ID and ticket title from a Jira ticket which is opened on your browser's current tab.

Then it generates the command to create a new branch for developers with the branch name having the format "TICKET-ID-the-ticket-title".

The entire command generated is "git checkout -b TICKET-ID-the-ticket-title" which is a good productivity hack for developers when they want to create a new branch on GitHub for the ticket they are working on.

There is also a copy button which copies the entire command. The generated command is also editable if the developer wants to edit it.

If the current opened tab is not a Jira ticket then this command won't be generated.

Screenshots:

![alt text](<screenshot 1.jpg>)

![alt text](<screenshot 2.jpg>)

![alt text](<screenshot 3.jpg>)

NOTE: This is not an Atlassian owned product/extension or in any way related to Atlassian company. It is an independently built developer productivity tool.
