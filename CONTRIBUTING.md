# Contributing to Memorial

I value you -- taking the time to read this, contributing to this project, and helping make a meaningful impact to those who've experienced immeasurable loss.

## Getting Started

### Non-Tech Contributors START HERE

1. Design work is done with PenPot: https://penpot.app/ (It doesn't have a design file limit, and I don't want to impose contributors having to pay for the more popular tool Figma in order to contribute)
2. Go ahead and create a github account: https://github.com/signup
3. Fork the repository: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository
4. Read the below...

---

You need to know how to use simple commands:
1. Mac: `ls`; Windows: `dir`  ==  List files and directories
2. `mkdir <directory-name>` ==  Makes a folder/"directory" within your current folder/directory.
3. `cd <directory>` (e.g. `cd Desktop`) == Changes directory to specified directory (`..` is the previous directory, so if in `Desktop/memorial` `cd ..` takes you to `Desktop`)

You need to download [git](https://git-scm.com/downloads) and know the following git commands:
1. `git status`: Review status of files (changed, deleted, created)
2. `git add <path/filename>` (e.g. `git add .` adds all files in current PWD)
3. `git commit -m 'DESCRIBE YOUR CHANGES HERE'`: This essentially says "I have made a change that I am happy with". It's a necessary step.
4. `git push` and `git push --set-upstream origin main`: The first one pushes your changes. The first time you do this, you need to run the second command (the one with `--set-upstream` in it). You can ignore the "why" and just acknowledge it's a hoop you have to jump through once.

---

5. Now that you've read this, follow the next steps:
6. Open your terminal.
    a. If you're on mac, press `cmd+space` and search `terminal` and press `enter`.
    b. If you're on windows, `Windows key + X`, and then selecting `Windows Terminal (Admin)`
7. Mac: `cd ~`; Windows: `cd %HOMEPATH%`
8. `mkdir -p Desktop/memorial` -- or wherever you want this project to live on your computer. 
9. `cd Desktop/memorial` -- or wherever you chose
10. clone your repository `git clone https://github.com/YOUR-USERNAME/memorial .` (the `.` at the end will create it in the current folder instead of creating a new one for it): https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository
11. If you cloned without the dot, `cd memorial`. If you cloned with it, then just proceed. **Do not close your terminal.** If you did, no worries, just repeat steps 5-8 & 10 again before you complete step 14.
12. Import the file from this location into penpot: https://help.penpot.app/user-guide/import-export/#files-import
13. Make your changes in penpot
14. Export your changes from penpot into that file and overwrite the existing file with your exported file: https://help.penpot.app/user-guide/import-export/#files-export
15. `git status` to confirm your changed file has been changed.
16. `git add .` to add the changed file
17. `git commit -m 'Succinct message which describes your change'`
18. `git push --set-upstream origin main`: only necessary the first time. Every subsequent time just run `git push` to push your changes
19. Repeat steps 7 to 12 until your design is how you want it to be
20. Export the root object as an image ![2025-01-04@13 02 58 January-04@2x](https://github.com/user-attachments/assets/f9bbc14c-6262-4289-949f-82995dfc8b0e) and save it to the design folder for it (same location as `.penpot` file). In the below example, this was saved to `memorial/designs/components/Remembered_Souls/Remembered Soul.png`
21. Open a Pull Request (PR) from your fork: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork
22. We'll review your proposed changes. If approved it'll be flagged for QA. This means I or another "Core" mainainter will review it as well -- this is done for every pull request.
23. If QA is passed then we'll just merge it in and your changes will have been approved! What happens next? The "Core" maintainer will likely create a new issue which requests development work to be done to implement your changes. From here-on just practice patience until your new design changes have been developed and released. 

### Tech Contributors can START HERE, All Contributors MUST FOLLOW

1. **Fork the Repository**  
   Create a fork of this repository to make your changes.

2. **Clone the Repository**  
   Clone your forked repository to your local machine using:
   ```bash
   git clone https://github.com/[your-username]/memorial.git
   ```

3. **Install Dependencies**  
   Navigate to the project folder and install dependencies:
   ```bash
   cd memorial
   nvm use
   pnpm install
   ```

4. **Set Up Your Environment**  
   Follow the instructions in the `README.md` to set up your development environment.

5. **Sync with Main**
   - Before starting work, ensure your branch is up to date with the main branch:
     ```bash
     git checkout main
     git pull origin main
     ```

## How to Contribute

### Glossary

1. Remembered Souls - Cards which contain an image, name, cause of death, and brief description of a life lost.
2. Our Mission of Remembrance - The root page of the project which describes the project and its mission.
3. In Memoriam - The page showing the list of Remembered Souls
4. Profile Page - Standard profile page for those who have created their account (required to post lost loved ones)
5. Your Submissions Page - The page in which registered users can view their postings of lost loved ones.
6. A Life Remembered - The page in which stories and greater details of a lost loved one can be shared.

### Reporting Issues

- Check the [existing issues](https://github.com/lcpichette/healthcare-memorial/issues) to ensure your issue hasn’t already been reported.
- If new, create a detailed issue, providing all necessary context, screenshots, or error messages.

### Working on Issues

1. **Find an Issue**
   - Browse the [issues list](https://github.com/[org-name]/[project-name]/issues) for an issue to work on.
   - Look for issues labeled `good first issue` if you’re a beginner.

2. **Assign Yourself**
   - Assign yourself to the issue so others know it’s being worked on.

3. **Label as In-Progress**
   - Add the `in-progress` label to indicate that work has started on the issue.

4. **Work on Your Feature or Bugfix**
   - Create a new branch for your changes:
     ```bash
     git checkout -b feature/issue-title
     ```
   - Commit your changes with meaningful messages:
     ```bash
     git commit -m "Fix: [short description of fix]"
     ```

5. **Testing Your Changes**
   - Ensure your code is thoroughly tested.
   - Run existing tests and add new ones as required.

6. **Pull in Latest Changes**
   - Regularly pull in changes from the main branch to avoid merge conflicts:
     ```bash
     git pull origin main
     ```

7. **Submit a Pull Request**
   - Push your changes to your fork:
     ```bash
     git push origin feature/issue-title
     ```
   - Open a pull request (PR) to the main repository.
   - Link your PR to the issue it addresses.

### Reviewing Pull Requests

- Reviewers should:
  - Check the code for clarity, functionality, and adherence to coding standards.
  - Test the changes if applicable.
  - Provide constructive feedback and request changes if needed.

- Contributors should:
  - Address all feedback promptly.
  - Ensure the PR passes all CI checks before re-submitting for review.

### Dropping an Issue

- If you decide to stop working on an issue:
  1. Unassign yourself from the issue.
  2. Remove the `in-progress` label.

### QA Review

- Once your pull request is ready:
  1. Change the label from `in-progress` to `QA`.
  2. Wait for maintainers or other contributors to review your PR.

---

## Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful and considerate in all interactions.

