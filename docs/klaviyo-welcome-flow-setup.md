# Klaviyo Welcome Flow Setup

This is a one-time, ~10 minute setup in the Klaviyo dashboard. Everything else
(the email template, the waitlist form, and the subscriber pipeline) is already
done.

---

## What's already done for you

- **Waitlist list** `TNfLEn` — active, 15 subscribers, collecting signups from
  the site
- **Contact Inquiries list** `Wcrjbd` — active, collects contact form submissions
- **Email template** `bubby-waitlist-welcome` — branded, live in your Klaviyo
  account, ready to assign
- **Flow** `SA2rn8` — exists with an email step pre-built, just needs its
  trigger configured and the template swapped

---

## Step 1 — Open the flow

1. Log in to [klaviyo.com](https://www.klaviyo.com)
2. In the left sidebar, click **Flows**
3. Find the flow named **"Essential Flow Recommendation_"** — there are three
   with this name; open the one with ID `SA2rn8` (it shows in the URL when you
   click it: `.../flows/SA2rn8/...`)
4. Click **Edit** to open the flow builder

---

## Step 2 — Set the trigger

1. At the very top of the flow canvas you will see a grey block labelled
   **"Unconfigured"** — click it
2. A panel opens on the right. Under **Trigger**, select **"List"**
3. In the list dropdown that appears, choose **Email List** (this is the
   waitlist — ID `TNfLEn`)
4. Click **Save**

The trigger block should now read: _When someone subscribes to Email List._

---

## Step 3 — Assign the branded template

The flow has a pre-built email step with a generic Klaviyo placeholder template.
Swap it out:

1. In the flow canvas, click the **Email** step (the first coloured block after
   the trigger)
2. Click **Edit** (or the pencil icon)
3. In the email editor, look for a **"Change template"** or **"Templates"**
   option — it may appear as a dropdown or a button in the top bar
4. Search for **`bubby-waitlist-welcome`** and select it
5. The editor will load the branded template. Verify the preview looks correct —
   you should see:
   - Header: `bubby & amira` (small caps, grey)
   - Headline: `you're on bubby's list.`
   - Body copy referencing Bubby reviewing their application
   - Dark rounded CTA button: `visit the practice`
   - Clean unsubscribe footer
6. Click **Save** (or **Done**)

---

## Step 4 — Update the subject line

Still inside the email editor (or click the email step and choose **Settings**):

1. Find the **Subject** field — it currently says `Welcome to our store!`
2. Replace it with:
   ```
   you're on the list.
   ```
3. Find the **Preview text** field — it currently says `Thank you for joining us.`
4. Replace it with:
   ```
   bubby reviewed your application. you passed.
   ```
5. Confirm **From name** is `bubbynamira` and **From email** is
   `bubbynamiramedia@gmail.com` — these should already be set
6. Save

---

## Step 5 — Turn the flow on

1. Return to the flow canvas (click the back arrow or breadcrumb)
2. In the top-right corner, click **"Review and Turn On"** (or the status
   dropdown showing "Draft")
3. Set the flow status to **Live**
4. Confirm

The flow is now live. Anyone who submits the waitlist form on the site will
receive this email within a few minutes of signing up.

---

## Verify it's working (optional but recommended)

1. Open the site in a private/incognito browser window
2. Submit the waitlist form with a real email address you can check
3. Within 5 minutes you should receive the welcome email
4. If it doesn't arrive: check your spam folder first, then in Klaviyo go to
   **Analytics > Flows** and look at the flow's send count — if it shows 0
   something went wrong with the trigger setup; revisit Step 2

---

## Flow and template reference

| Item | ID |
|---|---|
| Waitlist list | `TNfLEn` |
| Flow to configure | `SA2rn8` |
| Branded email template | `TJfBPv` (name: `bubby-waitlist-welcome`) |
| Flow email action | `102695815` |
| Flow message | `XXi5Tz` |
