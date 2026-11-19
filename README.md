# Turf Cricket Scorer

A free, simple 6-over cricket scoring Progressive Web App (PWA). It works offline after the first successful load and saves the current innings in the browser on that device.

## Scoring rules in this version
- 0, 1, 2, 3, 4 and 6 each add that many runs and count as one legal ball.
- Wide adds 1 extra run and does not count as a legal ball.
- No Ball adds 1 extra run and does not count as a legal ball.
- Wicket adds one wicket and counts as one legal ball.
- The innings ends at 36 legal balls (6 overs) or 10 wickets.
- Undo reverses the last scoring action.
- Reset clears the innings after confirmation.

**Deliberate simplification:** Wide and No Ball buttons add one extra run only. This version does not add batter runs on the same delivery, distinguish dismissal types, or support byes/leg-byes.

## Publish free with GitHub Pages
1. Create or sign in to a free account at https://github.com/.
2. Create a new repository. Name it `turf-cricket-scorer`. Set it to **Public**.
3. Choose **Add file → Upload files**.
4. Unzip this download on your computer. Upload all the files inside the `turf-cricket-scorer` folder (not the outer ZIP).
5. Commit the uploaded files to the `main` branch.
6. Open the repository's **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch **main** and folder **/(root)**, then click **Save**.
9. Wait a minute or two. GitHub will show the website address, usually `https://YOUR-USERNAME.github.io/turf-cricket-scorer/`.
10. Open that address in Safari on iPhone or Chrome on Android. Use the browser's **Add to Home Screen** option.

## Important
- Keep the repository public to use GitHub Pages on the free GitHub plan.
- Scores are stored locally in the browser on the device used to score. They are not synced to friends' phones.
- Do not clear the browser's site data if you need to keep the current score.
- Test the app online once before relying on offline mode.
