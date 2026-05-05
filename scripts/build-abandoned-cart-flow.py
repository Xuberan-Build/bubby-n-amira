#!/usr/bin/env python3
"""
Builds the Abandoned Checkout flow in Klaviyo.

Uses existing flow WaScp6 (Essential Flow Recommendation placeholder)
which already has the correct shape:
  TIME_DELAY → SEND_EMAIL → TIME_DELAY → SEND_EMAIL

Steps:
  1. Create two email templates (POST /api/templates/ at 2024-07-15)
  2. PATCH delay 1 → 1 hour
  3. PATCH delay 2 → 23 hours (24 hr total)
  4. PATCH send-email 1 → new subject + new template_id
  5. PATCH send-email 2 → new subject + new template_id

Manual steps after (cannot be set via API):
  - Open flow editor, set Trigger → Metric → "Checkout Started" (Shopify)
  - Add Flow Filter: Placed Order zero times since flow trigger start
  - Set flow to Live

IDs:
  Flow:      WaScp6
  Delay 1:   102695816  (4 hr → 1 hr)
  Email 1:   102695817  message VxR9Lt  template XTvzzt
  Delay 2:   102695825  (20 hr → 23 hr)
  Email 2:   102695826  message SMTcfM  template RgbPNL
"""

import json
import time
import urllib.request
import urllib.error

KEY = "pk_VgZ8R6_ef8da52459d2816e56662e2ff48c14c9c1"
BASE = "https://a.klaviyo.com/api"

HEADERS_OLD = {
    "Authorization": f"Klaviyo-API-Key {KEY}",
    "revision": "2024-07-15",
    "Content-Type": "application/json",
    "Accept": "application/json",
}
HEADERS_NEW = {
    "Authorization": f"Klaviyo-API-Key {KEY}",
    "revision": "2026-01-15",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

WEEKDAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

# ── helpers ──────────────────────────────────────────────────────────────────

def req(method, path, body=None, headers=None, retry=3):
    if headers is None:
        headers = HEADERS_NEW
    url = f"{BASE}/{path}"
    data = json.dumps(body).encode() if body else None
    for attempt in range(retry):
        r = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(r) as resp:
                raw = resp.read()
                time.sleep(0.5)
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retry - 1:
                time.sleep(2)
                continue
            raw = e.read().decode()
            print(f"    HTTP {e.code}: {raw[:500]}")
            return None
    return None

def step(label):
    print(f"\n{'─'*50}")
    print(f"  {label}")
    print(f"{'─'*50}")

def ok(label, result):
    if result is None:
        print(f"  ✗  {label}")
        return False
    print(f"  ✓  {label}")
    return True

# ── email 1 HTML ──────────────────────────────────────────────────────────────

EMAIL1_HTML = """\
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>hey, you left something behind</title>
</head>
<body style="margin:0;padding:0;background:#fefefe;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fefefe">
<tr><td align="center" style="padding:48px 20px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">

  <tr><td align="center" style="padding-bottom:36px;">
    <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#9e9e9e;font-weight:600;">Bubby&rsquo;s Faves</p>
  </td></tr>

  <tr><td style="background-color:#fff4cc;border-radius:24px;padding:40px 36px;">
    <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#9e9e9e;">{% if person.first_name %}hey {{ person.first_name }}{% else %}hey{% endif %}</p>
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#333333;line-height:1.25;">you left something behind.</h1>
    <p style="margin:0;font-size:15px;color:#9e9e9e;line-height:1.65;">bubby noticed. your cart is just sitting there, waiting for you to come back.</p>
  </td></tr>

  <tr><td style="padding:28px 0 8px;">
    {% for item in event.Items %}
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
    <tr>
      <td style="background:#f5f5f7;border-radius:16px;padding:16px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          {% if item.ImageURL %}
          <td width="68" valign="top" style="padding-right:14px;">
            <img src="{{ item.ImageURL }}" width="68" height="68" style="display:block;border-radius:10px;" alt="{{ item.Title }}">
          </td>
          {% endif %}
          <td valign="middle">
            <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#333333;">{{ item.Title }}</p>
            {% if item.VariantTitle and item.VariantTitle != 'Default Title' %}
            <p style="margin:0 0 3px;font-size:12px;color:#9e9e9e;">{{ item.VariantTitle }}</p>
            {% endif %}
            <p style="margin:0;font-size:13px;color:#9e9e9e;">${{ item.ItemPrice }} &times; {{ item.Quantity }}</p>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    </table>
    {% endfor %}
  </td></tr>

  <tr><td style="padding:16px 0 40px;">
    <a href="{{ event.CheckoutURL }}" style="display:inline-block;background-color:#333333;color:#fefefe;font-size:13px;font-weight:600;letter-spacing:0.06em;text-decoration:none;padding:15px 30px;border-radius:100px;text-transform:uppercase;">get back to it</a>
  </td></tr>

  <tr><td style="border-top:1px solid #f5f5f7;padding-top:28px;">
    <p style="margin:0;font-size:12px;color:#9e9e9e;line-height:1.7;">
      you&rsquo;re getting this because you added something to your cart at <a href="https://bubbynamira.com" style="color:#9e9e9e;">bubbynamira.com</a>.<br>
      <a href="{{ unsubscribe_url }}" style="color:#9e9e9e;text-decoration:underline;">unsubscribe</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>"""

EMAIL1_TEXT = """\
{% if person.first_name %}hey {{ person.first_name }},{% else %}hey,{% endif %}

you left something behind.

bubby noticed. your cart is just sitting there.

{% for item in event.Items %}• {{ item.Title }}{% if item.VariantTitle and item.VariantTitle != 'Default Title' %} ({{ item.VariantTitle }}){% endif %} x{{ item.Quantity }} — ${{ item.ItemPrice }}
{% endfor %}

get back to it: {{ event.CheckoutURL }}

—
Bubby's Faves  |  bubbynamira.com
unsubscribe: {{ unsubscribe_url }}"""

# ── email 2 HTML ──────────────────────────────────────────────────────────────

EMAIL2_HTML = """\
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>still thinking it over?</title>
</head>
<body style="margin:0;padding:0;background:#fefefe;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fefefe">
<tr><td align="center" style="padding:48px 20px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">

  <tr><td align="center" style="padding-bottom:36px;">
    <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#9e9e9e;font-weight:600;">Bubby&rsquo;s Faves</p>
  </td></tr>

  <tr><td style="background-color:#ffe5ec;border-radius:24px;padding:40px 36px;">
    <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#9e9e9e;">{% if person.first_name %}{{ person.first_name }},{% endif %} still here</p>
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#333333;line-height:1.25;">still thinking it over?</h1>
    <p style="margin:0;font-size:15px;color:#9e9e9e;line-height:1.65;">no pressure. (a little pressure.) your cart is still here and so is bubby.</p>
  </td></tr>

  <tr><td style="padding:28px 0 8px;">
    {% for item in event.Items %}
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
    <tr>
      <td style="background:#f5f5f7;border-radius:16px;padding:16px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          {% if item.ImageURL %}
          <td width="68" valign="top" style="padding-right:14px;">
            <img src="{{ item.ImageURL }}" width="68" height="68" style="display:block;border-radius:10px;" alt="{{ item.Title }}">
          </td>
          {% endif %}
          <td valign="middle">
            <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#333333;">{{ item.Title }}</p>
            {% if item.VariantTitle and item.VariantTitle != 'Default Title' %}
            <p style="margin:0 0 3px;font-size:12px;color:#9e9e9e;">{{ item.VariantTitle }}</p>
            {% endif %}
            <p style="margin:0;font-size:13px;color:#9e9e9e;">${{ item.ItemPrice }} &times; {{ item.Quantity }}</p>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    </table>
    {% endfor %}
  </td></tr>

  <tr><td style="padding:16px 0 40px;">
    <a href="{{ event.CheckoutURL }}" style="display:inline-block;background-color:#333333;color:#fefefe;font-size:13px;font-weight:600;letter-spacing:0.06em;text-decoration:none;padding:15px 30px;border-radius:100px;text-transform:uppercase;">okay fine, let&rsquo;s do this</a>
  </td></tr>

  <tr><td style="border-top:1px solid #f5f5f7;padding-top:28px;">
    <p style="margin:0;font-size:12px;color:#9e9e9e;line-height:1.7;">
      you&rsquo;re getting this because you added something to your cart at <a href="https://bubbynamira.com" style="color:#9e9e9e;">bubbynamira.com</a>.<br>
      <a href="{{ unsubscribe_url }}" style="color:#9e9e9e;text-decoration:underline;">unsubscribe</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>"""

EMAIL2_TEXT = """\
{% if person.first_name %}{{ person.first_name }},{% endif %} still here —

still thinking it over?

no pressure. (a little pressure.) your cart is still here and so is bubby.

{% for item in event.Items %}• {{ item.Title }}{% if item.VariantTitle and item.VariantTitle != 'Default Title' %} ({{ item.VariantTitle }}){% endif %} x{{ item.Quantity }} — ${{ item.ItemPrice }}
{% endfor %}

okay fine, let's do this: {{ event.CheckoutURL }}

—
Bubby's Faves  |  bubbynamira.com
unsubscribe: {{ unsubscribe_url }}"""

# ── main ──────────────────────────────────────────────────────────────────────

def main():
    print("\n" + "═"*52)
    print("  Bubby's Faves — Abandoned Checkout Flow Builder")
    print("═"*52)

    # ── 1. Create email templates ─────────────────────────────────────────────
    step("1/5  Create Email 1 template")
    r = req("POST", "templates/", {
        "data": {
            "type": "template",
            "attributes": {
                "name": "Abandoned Checkout — Email 1",
                "editor_type": "CODE",
                "html": EMAIL1_HTML,
                "text": EMAIL1_TEXT,
            },
        }
    }, headers=HEADERS_OLD)
    if not ok("template created", r):
        print("  Aborting — cannot proceed without template IDs.")
        return
    t1_id = r["data"]["id"]
    print(f"  Template 1 ID: {t1_id}")

    step("2/5  Create Email 2 template")
    r = req("POST", "templates/", {
        "data": {
            "type": "template",
            "attributes": {
                "name": "Abandoned Checkout — Email 2",
                "editor_type": "CODE",
                "html": EMAIL2_HTML,
                "text": EMAIL2_TEXT,
            },
        }
    }, headers=HEADERS_OLD)
    if not ok("template created", r):
        print("  Aborting.")
        return
    t2_id = r["data"]["id"]
    print(f"  Template 2 ID: {t2_id}")

    # ── 2. PATCH delays ────────────────────────────────────────────────────────
    step("3/5  Patch delays (1 hr → 23 hr) + send-email definitions")

    r = req("PATCH", "flow-actions/102695816/", {
        "data": {
            "type": "flow-action",
            "id": "102695816",
            "attributes": {
                "definition": {
                    "id": "102695816",
                    "type": "time-delay",
                    "data": {"unit": "hours", "value": 1, "timezone": "profile"},
                    "links": {"next": "102695817"},
                }
            },
        }
    })
    ok("delay 1 → 1 hour", r)

    r = req("PATCH", "flow-actions/102695825/", {
        "data": {
            "type": "flow-action",
            "id": "102695825",
            "attributes": {
                "definition": {
                    "id": "102695825",
                    "type": "time-delay",
                    "data": {"unit": "hours", "value": 23, "timezone": "profile"},
                    "links": {"next": "102695826"},
                }
            },
        }
    })
    ok("delay 2 → 23 hours", r)

    # ── 3. PATCH send-email actions with new templates + copy ─────────────────
    r = req("PATCH", "flow-actions/102695817/", {
        "data": {
            "type": "flow-action",
            "id": "102695817",
            "attributes": {
                "definition": {
                    "id": "102695817",
                    "type": "send-email",
                    "links": {"next": "102695825"},
                    "data": {
                        "message": {
                            "from_email": "bubbynamiramedia@gmail.com",
                            "from_label": "Bubby's Faves",
                            "reply_to_email": "bubbynamiramedia@gmail.com",
                            "cc_email": None,
                            "bcc_email": None,
                            "subject_line": "hey, you left something behind",
                            "preview_text": "bubby noticed.",
                            "template_id": t1_id,
                            "smart_sending_enabled": True,
                            "transactional": False,
                            "add_tracking_params": True,
                            "custom_tracking_params": None,
                            "additional_filters": None,
                            "name": "Abandoned Checkout — Email 1",
                            "id": "VxR9Lt",
                        },
                        "status": "draft",
                    },
                }
            },
        }
    })
    ok("send-email 1 → new subject + template", r)

    r = req("PATCH", "flow-actions/102695826/", {
        "data": {
            "type": "flow-action",
            "id": "102695826",
            "attributes": {
                "definition": {
                    "id": "102695826",
                    "type": "send-email",
                    "links": {},
                    "data": {
                        "message": {
                            "from_email": "bubbynamiramedia@gmail.com",
                            "from_label": "Bubby's Faves",
                            "reply_to_email": "bubbynamiramedia@gmail.com",
                            "cc_email": None,
                            "bcc_email": None,
                            "subject_line": "still thinking it over?",
                            "preview_text": "no pressure. (a little pressure.)",
                            "template_id": t2_id,
                            "smart_sending_enabled": True,
                            "transactional": False,
                            "add_tracking_params": True,
                            "custom_tracking_params": None,
                            "additional_filters": None,
                            "name": "Abandoned Checkout — Email 2",
                            "id": "SMTcfM",
                        },
                        "status": "draft",
                    },
                }
            },
        }
    })
    ok("send-email 2 → new subject + template", r)

    # ── summary ───────────────────────────────────────────────────────────────
    print("\n" + "═"*52)
    print("  ✓  Flow configured")
    print()
    print("  Flow editor:")
    print("  https://www.klaviyo.com/flow/WaScp6/edit")
    print()
    print("  Templates created:")
    print(f"    Email 1: {t1_id}")
    print(f"    Email 2: {t2_id}")
    print()
    print("  Two manual steps left in the flow editor:")
    print()
    print("  1. Trigger → Metric → 'Checkout Started' (Shopify)")
    print("     Metric ID if needed: Rs9QCq")
    print()
    print("  2. Flow Filter → 'What someone has done'")
    print("     → Placed Order → zero times")
    print("     → since flow trigger start")
    print()
    print("  3. Set flow status to Live when ready.")
    print("═"*52 + "\n")

if __name__ == "__main__":
    main()
