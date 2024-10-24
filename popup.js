document.addEventListener("DOMContentLoaded", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        try {
            let ticketId = document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]');
            let ticketTitle = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');

            let breadcrumb = '';
            let allIssueLinksInBreadcrumb = '';
            let issueLink = '';
            let branchName = '';

            const formatBranchName = (input) => {
                let formattedBranchName = input.toLowerCase().split(' ').join('-'); // make the string lowercase and replace spaces with hyphens
                
                formattedBranchName = formattedBranchName.replace(/'/g, ''); // Remove apostrophes
                formattedBranchName = formattedBranchName.replace(/[^a-z0-9]+/g, '-'); // Replace all non-alphanumeric characters (except apostrophes) with hyphens
                formattedBranchName = formattedBranchName.replace(/([a-z])([0-9])/g, '$1-$2'); // Insert hyphen between letter and number
                formattedBranchName = formattedBranchName.replace(/([0-9])([a-z])/g, '$1-$2'); // Insert hyphen between number and letter
                formattedBranchName = formattedBranchName.replace(/-+/g, '-'); // Replace multiple consecutive hyphens with a single hyphen
                formattedBranchName = formattedBranchName.replace(/^-+|-+$/g, ''); // Remove any leading or trailing hyphens
            
                return formattedBranchName;
            }

            // Handling for Jira On-Premise here, default implementation is for Jira Cloud
            if(!!ticketId === false && !!ticketTitle === false) {
                breadcrumb = document.getElementsByClassName('aui-nav-breadcrumbs')[0];
                allIssueLinksInBreadcrumb = breadcrumb.querySelectorAll('.issue-link');
                issueLink = allIssueLinksInBreadcrumb[allIssueLinksInBreadcrumb.length - 1]; // select the last issue among classes having .issue-link
                ticketId = issueLink.getAttribute('data-issue-key');
                ticketTitle = document.getElementById('summary-val');
                branchName = `${ticketId}-${formatBranchName(ticketTitle.textContent)}`;
            } else {
                branchName = `${ticketId.textContent}-${formatBranchName(ticketTitle.textContent)}`;
            }

            chrome.runtime.sendMessage({ branchName: branchName });
        } catch(e) {
            chrome.runtime.sendMessage( {error: "Nothing to generate. Make sure your current tab is a supported Jira ticket." });
        }
      },
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.branchName) {
            document.getElementById("default").style.display = "none";
            document.getElementById("failure").style.display = "none";
            document.getElementById("success").style.display = "flex";
            document.getElementById("createNewBranchCode").textContent = `git checkout -b ${message.branchName}`;
        } else if (message.error) {
            document.getElementById("default").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("failure").style.display = "flex";
            document.getElementById("error").textContent = message.error;
        }
    });

    const copyCta = document.getElementById('copyCta');

    copyCta.addEventListener('click', function() {
        const copyText = document.getElementById("createNewBranchCode").textContent;

        navigator.clipboard.writeText(copyText);

        document.getElementById("notify").style.display = "flex";
        setTimeout(() => {
            document.getElementById("notify").style.display = "none";
        }, 2500);
    });
 });
