# cpatb.github.io

One static page, no build step. Edit `index.html` and push.

## Guestbook

Notes are submitted through Formspree and only appear after you add them by hand.

1. Make a form at https://formspree.io (free tier is fine), then replace `YOUR_FORM_ID` in `index.html` with the id it gives you.
2. New notes arrive by email. To approve one, add an entry to `messages.json`:

   ```json
   {"name": "Their name", "date": "2026-09-12", "message": "What they said."}
   ```

   Newest entries go at the end of the list; the page shows them newest-first. Ignore or delete anything you don't want up.
3. Push. Done.
