# Git - Style Guide
## Branches
* Chose short and descripive branch names

```
# Good
git commit

# Bad
git commit -m "Quick fix"
```

* When several people are working on the same feature, it might be convenient to have personal feature branches and a team-wide feature branch. Use the following naming convention:

```
git checkout -b feature-a/master # team-wide branch
git checkout -b feature-a/maria  # Maria's personal branch
git checkout -b feature-a/nick   # Nick's personal branch
```

## Commits
* Each commit should be a single _logical change_. Don't make several _logical changes_ in one commit. For example, if a patch fixes a bug and optimizes the performance of a feature, split it into two separate commits.
* Commit early and often. Small, self-contained commits are easier to understand and revert when something goes wrong.

## Messages
* Use the editor, not the terminal, when writing a commit message.

```
# Good
git commit

# Bad
git commit -m "Quick fix"
```

Committing from the terminal encourages a mindset of having to fit everything in a single line which usually results in non-informative, ambiguous commit messages.


* The summary line (ie. the first line of the message) should be _descriptive_ yet _succinct_. Ideally, it should be no longer than _50 characters_. It should be capitalized and written in imperative present tense. It should not end with a period since it is effectively the commit _title_.

```
# Good - imperative present tense, capitalized, fewer than 50 characters
Mark huge records as obsolete when clearing hinting faults

# Bad
fixed ActiveModel::Errors deprecation messages failing when AR was used outside of Rails.
```



* After that should come a blank line followed by a more thorough description. It should be wrapped to _72 characters_ and explain _why_ the change is needed, _how_ it addresses the issue and what _side-effects_ it might have.

# Merging
* **Do not rewrite published history**. The repository's history is valuable in its own right and it is very important to be able to tell what actually happened. Altering published history is a common source of problems for anyone working on the project.

# Git - Common commands
## Local Changes
* List changed files in your working directory

```
git status
```

* List changes to tracked files

```
git diff
```

* Add all current changes to the next commit

```
git add . 

# Or
git add -A
```

## Branches
* List all existing branches

```
git branch -av
```
* Switch HEAD branch

```
git checkout <branch>
```
* Create a new branch based on your current HEAD

```
git branch <new-branch>
```
## Update & Publish

* Dowload all changes from <remote>, but dont integrate into HEAD

```
git fetsh <remote>
```
* Download changes and directrly merge/integrate into HEAD

```
git pull <remote> <branch>
```
* Publish local changes on a remote

```
git push <remote> <branch>
```

## Merge & Rebase

* Merge <branch> into your current HEAD

```
git merge <branch>
```
