# AI Diabetes Care App Blueprint (Mobile)

## 1) Information Architecture

### Primary navigation (bottom tab + contextual stacks)
1. **Home**
   - Daily summary card stack
   - Risk status ribbon (Stable / Warning / Urgent)
   - Quick actions (Log glucose, Meds, Foot scan, Alert center)
2. **Track**
   - Glucose logging and connected-device feed
   - Symptoms, hydration, meals, activity, medication adherence
3. **Alerts**
   - AI alert center with explainable summaries
   - Escalation actions (self-care, caregiver notify, nurse escalation)
4. **Coach**
   - Grounded multilingual diabetes coach/chatbot
   - Education microlearning and behavior nudges
5. **Profile**
   - Devices/sync, language/accessibility, caregiver permissions, emergency settings

### Supporting modules (inside tab stacks)
- Glucose forecast
- Medication & insulin support
- Prognosis & trend insights
- Foot scan
- Retinopathy reminder
- Family/caregiver panel
- Messaging with care team
- Emergency escalation flow

### Role-aware views
- **Patient:** simplified actionable tasks and reassurance-first language
- **Caregiver:** adherence visibility, alerts, communication shortcuts
- **Nurse/Care coordinator:** triage queue, trend snapshots, intervention logs
- **Clinician:** escalation summaries, explainable model output, treatment review support

---

## 2) End-to-End User Flow

1. **Splash → Onboarding**
   - Select role, language, accessibility preferences
   - Consent, emergency contact, clinician linkage
2. **Baseline setup**
   - Enter diabetes profile, meds/insulin regimen, comorbid risk factors
   - Connect wearables/CGM (optional)
3. **Daily loop (core)**
   - Morning check-in → risk refresh → adherence checklist
   - Midday reminders and forecast updates
   - Evening review with simple trend recap
4. **Alert handling loop**
   - AI detects risk shift → patient-friendly explanation
   - Suggested clinician-supervised action
   - If red-flag symptoms: emergency escalation path
5. **Learning loop**
   - Microlearning module based on current barriers and literacy level
   - Behavior nudge + next-day reinforcement
6. **Care-team loop**
   - Escalations routed to nurse/clinician queue
   - Care-team feedback synced back into patient plan

---

## 3) Screen-by-Screen UI Descriptions

## 1. Splash Screen
- Full-screen gradient (navy → teal), logo, soft pulse animation
- Copy: “Continuous diabetes care, anywhere.”
- Footer: privacy + medical disclaimer shortcut

## 2. Onboarding
- Step cards with progress dots and large buttons
- Steps:
  1) Role selection
  2) Language + voice mode
  3) Care team link + emergency contact
  4) Baseline health setup
  5) Device sync (skip allowed)
- “Wearable-enabled, not wearable-dependent” message emphasized

## 3. Home Dashboard
- Top risk banner (color-coded):
  - Green Stable
  - Amber Warning
  - Red Urgent
- Cards:
  - Today’s glucose snapshot
  - Adherence ring (meds/meals/hydration/exercise)
  - AI summary (“What changed today?”)
  - Quick actions row
- Bottom: red-flag symptom shortcut (always visible)

## 4. AI Alert Center
- Timeline list of alerts with severity chips
- Each alert has:
  - What was detected
  - Why AI thinks this matters (plain language)
  - Confidence + key drivers (explainability)
  - Action options:
    - “Follow AI-supported recommendation”
    - “Message care team”
    - “Emergency help now” (for urgent)

## 5. Glucose Forecast Page
- 24h/72h forecast graph with uncertainty band
- Hypo/hyper risk windows highlighted
- Meal/activity impact simulation toggles
- CTA: “Confirm plan with care team”

## 6. Medication / Insulin Support Page
- Dose schedule timeline with adherence tracking
- Insulin titration support as **clinician-supervised suggestions only**
- Missed-dose recovery guidance (non-prescriptive until clinician confirmation)
- “Taken / Snooze / Need help” large buttons

## 7. Education Coach/Chatbot Page
- Conversational UI with quick chips (“Explain my alert”, “What can I eat now?”)
- Grounded answers only from approved diabetes education library
- Literacy-friendly mode (short lines, icons, voice playback)
- Multilingual switching in-session

## 8. Prognosis Page
- Trend cards:
  - Time-in-range trend
  - Adherence trend
  - Symptom burden trend
  - Estimated complication trajectory
- Time-to-complication map with scenario sliders
- Clear caveat: “Projection supports care planning; not a diagnosis.”

## 9. Foot Scan Page
- Guided photo capture (silhouette overlays)
- AI lesion/ulcer suspicion heatmap + quality score
- If suspicious findings: one-tap escalation to nurse/clinician
- Historical comparison gallery

## 10. Profile/Settings Page
- Language, accessibility (font size, contrast, voice)
- Device sync + offline sync queue status
- Caregiver permissions and notification rules
- Safety settings and emergency contacts
- Data export/privacy controls

---

## 4) Core Feature Logic (including 10 AI Features)

1. **Complication Radar Engine**
   - Inputs: glucose variability, adherence, symptoms, comorbidities, foot image findings
   - Output: dynamic complication risk score + top modifiable drivers

2. **AI Glycemia Forecast**
   - Inputs: recent glucose, meal tags, activity, meds/insulin, sleep
   - Output: near-term glucose curve + hypo/hyper probability windows

3. **Deterioration & Readmission Sentinel**
   - Inputs: symptom trajectories, adherence decline, vital trends, recent hospitalization context
   - Output: 7–30 day deterioration/readmission risk and triage recommendation

4. **Insulin Titration Copilot**
   - Inputs: glucose trends, prescribed regimen, clinician guardrails
   - Output: AI-supported dose-adjustment suggestions requiring clinician confirmation

5. **Smart Foot Ulcer Vision**
   - Inputs: patient foot images + metadata
   - Output: risk classification, lesion localization, follow-up urgency band

6. **Retinopathy Referral Reminder**
   - Inputs: screening history, risk profile, guideline windows
   - Output: due/overdue reminders and scheduling nudges

7. **Personal Health Digital Twin**
   - Inputs: multimodal longitudinal patient data
   - Output: personalized scenario simulation (diet/adherence/activity “what-if”)

8. **Time-to-Complication Prognosis Mapper**
   - Inputs: risk factors + trends + interventions
   - Output: projected complication timelines under alternative adherence scenarios

9. **Grounded Multilingual Diabetes Coach**
   - Inputs: approved care content, patient context, language preference
   - Output: culturally adapted, low-literacy, explainable responses

10. **Adaptive Behavior-Change & Microlearning Engine**
   - Inputs: adherence patterns, engagement signals, barriers
   - Output: personalized nudges, lesson pacing, habit reinforcement plan

---

## 5) Safety + Escalation Logic

### Color logic
- **Stable (Green):** no immediate danger, routine follow-up
- **Warning (Amber):** rising risk, intensified self-management + care team notification option
- **Urgent (Red):** severe risk patterns or red-flag symptoms, immediate escalation flow

### Red-flag triggers (examples)
- Severe hypoglycemia symptoms, confusion, fainting
- Persistently extreme glucose despite correction attempts
- Signs of infection/rapid foot wound progression
- Chest pain, shortness of breath, altered mental status

### Escalation path
1. Urgent alert fired
2. In-app emergency card appears with one-tap call actions
3. Notify caregiver + care coordinator (if consented)
4. Send structured alert payload to clinician dashboard
5. Confirm follow-up outcome in-app

### Safety copy rules (global)
- Always include: **“AI-supported recommendation”**
- Always include: **“Please confirm with care team.”**
- No autonomous treatment directives without clinician sign-off

---

## 6) Key Copywriting (Patient-Friendly)

### Dashboard
- “You’re in the **Stable** zone today. Keep your routine going.”
- “Your evening glucose may rise. AI-supported recommendation: hydrate and check again at 8 PM. Please confirm with care team.”

### Alerts
- “We noticed a pattern that may increase your low-sugar risk tonight.”
- “Why this alert: lower food intake + higher activity + recent insulin timing.”

### Medication support
- “It looks like your 2 PM dose was missed.”
- “AI-supported recommendation: review your medication plan now. Please confirm with care team.”

### Foot scan
- “Image quality is good. One area needs review.”
- “AI-supported recommendation: send this scan to your care team today.”

### Prognosis
- “If current trends continue, risk may increase over the next few months.”
- “Improving adherence could meaningfully lower that risk.”

---

## 7) Onboarding Script (Low-Literacy + Multilingual-Ready)

1. **Welcome**
   - “Welcome. We help you manage diabetes one day at a time.”
2. **Safety framing**
   - “This app gives AI-supported recommendations. Your care team confirms treatment decisions.”
3. **Personalization**
   - “Pick your language, text size, and voice support.”
4. **Care connection**
   - “Add a caregiver and your clinic team so help is fast when needed.”
5. **Daily routine setup**
   - “Set reminders for medicine, meals, water, activity, and glucose checks.”
6. **Device choice**
   - “Connect devices if you want. You can still use the app without them.”
7. **Emergency readiness**
   - “Choose who to alert if urgent warning signs appear.”
8. **Start action**
   - “You’re ready. Let’s do today’s first quick check-in.”

---

## 8) Suggested Microinteractions

- **Risk banner pulse:** subtle pulse only when status changes (prevents alarm fatigue)
- **Adherence ring fill animation:** satisfying progress feedback after each logged task
- **Haptic severity cues:** light (stable), medium (warning), strong triple pulse (urgent)
- **Voice-read summaries:** one-tap readout for each alert and plan
- **Smart defaults in forms:** prefilled frequent values + single-thumb interaction
- **Offline sync feedback:** queued items badge and “Synced successfully” toast
- **Foot scan capture assist:** edge-detection glow + hold-steady countdown
- **Coach quick replies:** suggested chips reduce typing burden
- **Escalation confirmation sheet:** clear “what happens next” steps after urgent action

---

## 9) Data + Offline-lite Design Notes

- Local encrypted cache for critical daily functions (logging, reminders, prior alerts)
- Deferred sync queue with conflict-safe reconciliation
- Graceful degradation if wearable data unavailable
- Minimal daily input burden through progressive prompts

---

## 10) Visual Language Checklist

- **Style:** modern health-tech, clean, reassuring
- **Components:** large rounded cards, high-contrast typography, spacious layout
- **Palette:** navy, teal, white, soft gray; amber/red only for risk emphasis
- **Content density:** icon-first, concise text, avoid dense paragraphs
- **Accessibility:** large tap targets, dynamic type, voice-friendly interactions

