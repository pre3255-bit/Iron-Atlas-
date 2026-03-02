import { useState, useEffect } from "react";

// ─── PHASE DEFINITIONS ───────────────────────────────────────────────────────
const PHASES = [
  { name: "Phase 1", subtitle: "Re-Baseline", weeks: "Weeks 1–10", color: "#00E5FF",
    desc: "Reintegrate lower body. Sharpen movement quality. 60-min sessions — efficient, no wasted reps. At 6'3\", grooving proper patterns takes longer — 10 weeks here is intentional." },
  { name: "Phase 2", subtitle: "Peak Load", weeks: "Weeks 11–18", color: "#FF6B35",
    desc: "Max volume. Supersets, drop sets, giant sets. Push every muscle group to its ceiling. Sport conditioning ramps up." },
  { name: "Phase 3", subtitle: "Game Shape", weeks: "Weeks 19–24", color: "#A8FF3E",
    desc: "Heavy compounds, explosive work, athletic output. Look it, move it, perform it — across every sport." },
];

// Phase by week number
const getPhaseForWeek = (week) => {
  if (week <= 10) return 0;
  if (week <= 18) return 1;
  return 2;
};

// Intensity multipliers by week within phase
const getWeekCues = (week) => {
  if (week <= 2)  return { intensity: "Pattern focus", sets: "3–4", note: "Mechanics > weight. Film yourself." };
  if (week <= 4)  return { intensity: "Loading begins", sets: "4", note: "Add weight every session. Log everything." };
  if (week <= 6)  return { intensity: "Volume ramp", sets: "4", note: "2 bonus sections per session." };
  if (week === 8) return { intensity: "DELOAD", sets: "3 @ 60%", note: "Full deload. Drop weight 40%. No bonus." };
  if (week <= 10) return { intensity: "Consolidation", sets: "4", note: "Mechanics grooved. Attack the weight now." };
  if (week <= 12) return { intensity: "Full volume", sets: "5–6", note: "All bonus sections. 75–90 min sessions." };
  if (week <= 14) return { intensity: "Supersets", sets: "4–5 SS", note: "Pair every lift. Constant pump." };
  if (week <= 16) return { intensity: "Gun Shop", sets: "4–5", note: "Drop sets, giant sets on arms." };
  if (week === 18) return { intensity: "DELOAD", sets: "3 @ 50%", note: "Structured deload. Mobility focus." };
  if (week <= 20) return { intensity: "Strength peak", sets: "4–5", note: "Test 1RMs week 20." };
  if (week <= 22) return { intensity: "Athletic output", sets: "4", note: "Explosive work elevated." };
  return { intensity: "Game shape", sets: "4", note: "Peak conditioning. Retest maxes vs week 1." };
};

// ─── WEEKLY SPLIT ─────────────────────────────────────────────────────────────
const WEEKLY_SPLIT = [
  { day: "Monday",    focus: "Push",          muscles: "Chest · Shoulders · Triceps",         tag: "push" },
  { day: "Tuesday",   focus: "Pull",          muscles: "Back · Biceps · Forearms",            tag: "pull" },
  { day: "Wednesday", focus: "Legs + Sport",  muscles: "Quads · Hams · Glutes · Sport Power", tag: "legs" },
  { day: "Thursday",  focus: "Rest / Recover",muscles: "Steam · Pool · Classes",             tag: "rest" },
  { day: "Friday",    focus: "Push",          muscles: "Chest · Shoulders · Triceps",         tag: "push" },
  { day: "Saturday",  focus: "Pull + Arms",   muscles: "Back · Biceps · Triceps",            tag: "pull" },
  { day: "Sunday",    focus: "Full Body",     muscles: "Compound + Athletic Conditioning",    tag: "full" },
];

// ─── WORKOUTS ────────────────────────────────────────────────────────────────
const WORKOUTS = {
  sunday: {
    title: "Full Body Power", subtitle: "Sunday — Compound + Athletic Conditioning",
    duration: "~65 min", bonusDuration: "+15–20 min", tag: "FULL BODY", tagColor: "#A8FF3E",
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "10-8-8-6", muscle: "Legs", rest: "2 min",
        note: "Loaded. Athletic base — knees, hips, posterior chain.",
        frameNote: "6'3\" setup: wider stance (just outside shoulder-width), toes 30–35° out. Sit INTO the squat — your torso will lean more than shorter athletes. Box squat to parallel first 2 weeks." },
      { name: "Romanian Deadlift", sets: "4", reps: "10-10-10-8", muscle: "Hamstrings", rest: "90 sec",
        note: "Own the eccentric. Your athletic engine.",
        frameNote: "Long hamstrings = massive ROM advantage. Bar close to legs, hinge until deep stretch (likely past knee). Own the bottom." },
      { name: "Flat DB Bench Press (6:0:1:0)", sets: "4", reps: "8-8-8-6", muscle: "Chest", rest: "90 sec",
        note: "HEAVY — max DB load. Track weight every week.",
        frameNote: "Long arms = longer ROM = more work per rep. Keep elbows at 60° not flared. Touch lower chest." },
      { name: "Weighted Pull-Up (5:0:1:0)", sets: "4", reps: "8-8-8-6", muscle: "Back", rest: "2 min",
        note: "Load it. Slow eccentric.",
        frameNote: "Full dead hang between every rep. At your height this is a major lat stretch most people never get." },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10-10-10", muscle: "Shoulders", rest: "75 sec",
        note: "Athletic overhead strength.",
        frameNote: "Stop just before full lockout — keeps tension on the delt, not the joint." },
      { name: "Farmer's Walk", sets: "3", reps: "40 steps", muscle: "Traps", rest: "90 sec",
        note: "Heavy. Grip, traps, everything. 40 steps for your stride length." },
      { name: "Precision Run — Steady State", sets: "1", reps: "2.0 miles", muscle: "Cardio", rest: "—",
        note: "Cardio last. 6:30–7:30/mi pace." },
    ],
    bonus: [
      { category: "⚡ SPORT POWER", items: [
        { name: "Cable Woodchop (high to low)", sets: "3", reps: "12 each side", note: "Rotational power — tennis, golf, lacrosse." },
        { name: "Medicine Ball Rotational Slam", sets: "3", reps: "10 each side", note: "Explosive rotation. Massive sport carryover." },
        { name: "Lateral Bound (single-leg)", sets: "3", reps: "8 each side", note: "Basketball / lacrosse / tennis court movement." },
      ]},
      { category: "💪 ARMS", items: [
        { name: "Preacher Curl + Tricep Pushdown SS", sets: "3", reps: "12 / 12", note: "No rest between" },
        { name: "Hammer Curls", sets: "2", reps: "10-10", note: "" },
      ]},
      { category: "🔥 CORE", items: [
        { name: "The Core Cut", sets: "2", reps: "15 each", note: "Hanging Leg Raises · Cable Crunches · GHD Sit Ups" },
        { name: "Ab Wheel Rollout", sets: "2", reps: "10-10", note: "" },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Incline Walk", sets: "1", reps: "20–30 min", note: "10–12% incline, 3.0–3.5 mph." },
        { name: "Precision Run — HIIT", sets: "1", reps: "8 rounds", note: "30 sec sprint / 90 sec walk." },
        { name: "Rooftop Pool Laps", sets: "1", reps: "20 min", note: "Low impact, full body." },
      ]},
    ],
  },
  monday: {
    title: "Push Day A", subtitle: "Monday — Chest / Shoulders / Triceps",
    duration: "~60 min", bonusDuration: "+15–20 min", tag: "PUSH", tagColor: "#00E5FF",
    exercises: [
      { name: "Slight Incline DB Press (6:0:1:0)", sets: "4", reps: "8-8-8-6", muscle: "Chest", rest: "90 sec",
        note: "6-sec eccentric — time under tension over ego weight.",
        frameNote: "15–20° incline ideal for your frame. Keep DBs at chest level, elbows at 60°. Long arms make the eccentric brutal — that's the point." },
      { name: "Flat DB Press (6:0:1:0)", sets: "3", reps: "8-8-8", muscle: "Chest", rest: "90 sec",
        note: "Full stretch, max contraction.",
        frameNote: "Touch lower chest. Full stretch at bottom. Long arms give you better stretch than anyone in the gym." },
      { name: "Weighted Chest Dips", sets: "3", reps: "10-8-8", muscle: "Chest", rest: "75 sec",
        note: "Add weight every session.",
        frameNote: "Cap depth at 90° elbow bend. Going deeper with your arm length puts excessive torque on the shoulder." },
      { name: "Wide Cable Shoulder Press", sets: "3", reps: "12-10-8", muscle: "Shoulders", rest: "60 sec", note: "" },
      { name: "Lateral Raise", sets: "3", reps: "15-15-15", muscle: "Shoulders", rest: "60 sec",
        note: "Strict — builds the athletic shoulder cap.",
        frameNote: "Thumbs slightly down, lead with elbows. Don't let it become a shrug at the top." },
      { name: "Cable Triceps Extension", sets: "3", reps: "12-12-12", muscle: "Triceps", rest: "60 sec", note: "" },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", muscle: "Cardio", rest: "—",
        note: "Cardio last. 10–12% incline, 3.0–3.5 mph." },
    ],
    bonus: [
      { category: "💪 EXTRA CHEST", items: [
        { name: "Heavy DB Bench — Paused Reps", sets: "3", reps: "6-6-6", note: "1-sec pause at chest." },
        { name: "Decline Machine Press", sets: "3", reps: "12-10-8", note: "Lower chest." },
      ]},
      { category: "🏋️ EXTRA SHOULDERS", items: [
        { name: "Seated BB Shoulder Press (behind to front)", sets: "3", reps: "10-10-10", note: "" },
        { name: "Front Plate Raise", sets: "3", reps: "12-12-12", note: "Slow at top." },
        { name: "Rear Delt Fly", sets: "3", reps: "12-12-12", note: "Shoulder balance — never skip." },
      ]},
      { category: "🦾 EXTRA TRICEPS", items: [
        { name: "Dips + DB Tricep Extension SS", sets: "3", reps: "10 dips / 10 DB ext", note: "Cap dips at 90°. No rest." },
        { name: "Push Ups", sets: "1", reps: "50 reps", note: "Finisher." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "25–30 min", note: "10–15% incline." },
        { name: "Cycling Studio — Open Ride", sets: "1", reps: "20 min", note: "Low intensity." },
        { name: "Power Plate — Cool Down", sets: "1", reps: "10 min", note: "Vibration recovery." },
      ]},
    ],
  },
  tuesday: {
    title: "Pull Day A", subtitle: "Tuesday — Back / Biceps / Forearms",
    duration: "~65 min", bonusDuration: "+15–20 min", tag: "PULL", tagColor: "#FF6B35",
    exercises: [
      { name: "Weighted Pull-Up (5:0:1:0)", sets: "4", reps: "8-8-8-6", muscle: "Back", rest: "2 min",
        note: "Load it. Slow eccentric.",
        frameNote: "FULL dead hang. At 6'3\" you have more range than anyone. Don't half-rep these." },
      { name: "Kneeling Straight Arm Lat Pulldown", sets: "3", reps: "10-10-10", muscle: "Back", rest: "60 sec",
        note: "Pure lat isolation." },
      { name: "Bent Over Barbell Row (reverse grip)", sets: "4", reps: "10-10-10-8", muscle: "Back", rest: "90 sec",
        note: "Controlled. Own every rep.",
        frameNote: "Hip hinge deep — you'll be more horizontal than shorter lifters and that's correct. Pull to lower abdomen. Brace hard." },
      { name: "Barbell Seal Row", sets: "3", reps: "12-10-10", muscle: "Back", rest: "75 sec",
        note: "Chest on bench — zero momentum.",
        frameNote: "Best row for tall athletes. Full stretch at bottom — let shoulder blades spread before each pull." },
      { name: "Preacher Curl + Barbell Curl SS", sets: "3", reps: "12 / 10", muscle: "Biceps", rest: "75 sec",
        note: "Classic. No rest between." },
      { name: "Hammer Curls", sets: "3", reps: "10-10-10", muscle: "Biceps", rest: "60 sec", note: "" },
      { name: "Precision Run — Steady State", sets: "1", reps: "20 min", muscle: "Cardio", rest: "—",
        note: "Cardio last. Easy pace — active flush." },
    ],
    bonus: [
      { category: "💪 EXTRA BACK", items: [
        { name: "T-Bar Row + DB Shrug Compound Set", sets: "3", reps: "15 each", note: "No rest between." },
        { name: "Barbell Rack Pull Into Shrug (1:0:1:2)", sets: "3", reps: "8-8-8", note: "Bar above knee." },
        { name: "Hammer Grip Pull-Up", sets: "2", reps: "F-F", note: "To failure. Full hang." },
      ]},
      { category: "🤜 ARMS + FOREARMS", items: [
        { name: "Barbell Curl Drop Sets", sets: "3", reps: "12 → 10 → 8", note: "Gun Shop — no mercy." },
        { name: "Palms Up Wrist Curls", sets: "2", reps: "10-10", note: "" },
        { name: "Palms Down Wrist Curls", sets: "2", reps: "10-10", note: "Tennis / lacrosse forearm balance." },
      ]},
      { category: "🔥 CORE", items: [
        { name: "Hanging Leg Raises", sets: "3", reps: "15-15-15", note: "" },
        { name: "Cable Crunches", sets: "3", reps: "15-15-15", note: "Heavy — treat like a strength exercise." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — HIIT Sprints", sets: "1", reps: "10 rounds", note: "30 sec max effort / 60 sec walk." },
        { name: "Precision Run — Incline Walk", sets: "1", reps: "25 min", note: "12% incline, 3.2 mph." },
        { name: "Rooftop Pool — Laps", sets: "1", reps: "20 min", note: "Back decompression." },
      ]},
    ],
  },
  wednesday: {
    title: "Legs + Sport Power", subtitle: "Wednesday — Quads / Hams / Glutes / Athletic",
    duration: "~65 min", bonusDuration: "+15 min", tag: "LEGS", tagColor: "#A8FF3E",
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "10-8-8-6", muscle: "Quads / Glutes", rest: "2 min",
        note: "Progressive load. Foundation of all court and field movement.",
        frameNote: "Same setup every time: wider stance, toes out 30–35°, chest up. Depth to parallel minimum." },
      { name: "Romanian Deadlift", sets: "4", reps: "10-10-10-8", muscle: "Hamstrings", rest: "90 sec",
        note: "Posterior chain — own the eccentric.",
        frameNote: "Long hamstrings = elite stretch. Bar close to legs the whole way." },
      { name: "Leg Press", sets: "3", reps: "15-12-10", muscle: "Quads", rest: "75 sec",
        note: "Vary foot position week to week.",
        frameNote: "Higher foot placement on the sled — protects knees and hits glutes more at your limb length." },
      { name: "Leg Curl (machine)", sets: "4", reps: "12-12-10-10", muscle: "Hamstrings", rest: "60 sec",
        note: "Isolated hamstring — balance the quad work." },
      { name: "Calf Raises", sets: "4", reps: "20-20-20-20", muscle: "Calves", rest: "45 sec",
        note: "Full ROM. 4 sets — tall athletes need more calf volume." },
      { name: "The Core Cut", sets: "2", reps: "15 each", muscle: "Core", rest: "60 sec",
        note: "Hanging Leg Raises · Cable Crunches · GHD Sit Ups" },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", muscle: "Cardio", rest: "—",
        note: "Cardio last. 8–10% incline — lactic flush." },
    ],
    bonus: [
      { category: "⚡ SPORT POWER", items: [
        { name: "Box Jump", sets: "4", reps: "6-6-6-6", note: "Explosive. Full reset between reps." },
        { name: "Cable Woodchop (high to low)", sets: "3", reps: "12 each side", note: "Golf / tennis / lacrosse rotational power." },
        { name: "Pallof Press", sets: "3", reps: "12 each side", note: "Anti-rotation core. Golf swing stabilizer." },
        { name: "Lateral Band Walk", sets: "3", reps: "15 each direction", note: "Hip abductor strength." },
      ]},
      { category: "🦵 EXTRA LEGS", items: [
        { name: "Walking Lunges", sets: "3", reps: "12 each leg", note: "Unilateral — sport-specific stability." },
        { name: "Hip Thrust (barbell)", sets: "3", reps: "12-12-12", note: "Strongest muscle in your body." },
        { name: "Leg Extension (machine)", sets: "3", reps: "15-15-15", note: "Quad finisher." },
      ]},
      { category: "🔥 EXTRA CORE", items: [
        { name: "Ab Wheel Rollout", sets: "3", reps: "10-10-10", note: "" },
        { name: "GHD Decline Sit Ups", sets: "3", reps: "15-15-15", note: "" },
        { name: "Plank", sets: "3", reps: "45 sec", note: "Brace everything." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Hill Intervals", sets: "1", reps: "8 rounds", note: "60 sec at 8% incline / 8 mph." },
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "25–30 min", note: "8% incline." },
        { name: "Rooftop Pool — Recovery Swim", sets: "1", reps: "15–20 min", note: "Ice bath alternative." },
      ]},
    ],
  },
  thursday: { rest: true },
  friday: {
    title: "Push Day B", subtitle: "Friday — Chest / Shoulders / Triceps",
    duration: "~60 min", bonusDuration: "+15–20 min", tag: "PUSH", tagColor: "#00E5FF",
    exercises: [
      { name: "Flat DB Bench Press (6:0:1:0)", sets: "4", reps: "8-6-6-5", muscle: "Chest", rest: "2 min",
        note: "HEAVY — primary strength lift. Track every week.",
        frameNote: "This is your barbell. Long arms = massive ROM = more muscle per rep. Elbows at 60°, touch lower chest." },
      { name: "Incline DB Chest Press", sets: "3", reps: "10-10-10", muscle: "Chest", rest: "75 sec",
        note: "Upper chest — athletic pressing angle." },
      { name: "Straight Arm Pullover", sets: "3", reps: "12-10-10", muscle: "Chest / Lats", rest: "60 sec",
        note: "Rib cage expansion.",
        frameNote: "Long arms make this elite. Full overhead stretch, slight elbow bend." },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10-8-8", muscle: "Shoulders", rest: "75 sec",
        note: "Athletic overhead strength.",
        frameNote: "Stop just before full lockout to keep tension on the delt, not the joint." },
      { name: "Upright Row (close grip)", sets: "3", reps: "12-10-10", muscle: "Shoulders", rest: "60 sec", note: "" },
      { name: "Dips + DB Tricep Superset", sets: "3", reps: "10 dips / 10 DB ext", muscle: "Triceps", rest: "75 sec",
        note: "Cap dips at 90°. No rest between." },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", muscle: "Cardio", rest: "—",
        note: "Cardio last. 10–12% incline." },
    ],
    bonus: [
      { category: "💪 EXTRA CHEST", items: [
        { name: "Weighted Chest Dips", sets: "3", reps: "10-8-8", note: "Cap at 90°. Add weight each set." },
        { name: "Cable Fly (3 position)", sets: "2", reps: "15-15", note: "High → mid → low." },
      ]},
      { category: "🏋️ EXTRA SHOULDERS", items: [
        { name: "Lateral Raise Drop Set", sets: "3", reps: "15 → 12 → 10", note: "Elbows above wrists." },
        { name: "Wide DB Upright Row", sets: "2", reps: "12-12", note: "" },
        { name: "Rear Delt Fly", sets: "3", reps: "15-15-15", note: "Never skip." },
      ]},
      { category: "🦾 EXTRA ARMS", items: [
        { name: "Cable Triceps Extension", sets: "3", reps: "12-12-12", note: "" },
        { name: "Push Ups", sets: "1", reps: "50 reps", note: "Absolute finisher." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "20–30 min", note: "10–15% incline." },
        { name: "Precision Run — Tempo Run", sets: "1", reps: "20 min", note: "~85% effort." },
        { name: "Cycling Studio — Open Ride", sets: "1", reps: "20–30 min", note: "Low cadence, high resistance." },
      ]},
    ],
  },
  saturday: {
    title: "Pull Day B + Arms", subtitle: "Saturday — Back / Biceps / Triceps",
    duration: "~65 min", bonusDuration: "+20 min", tag: "PULL + ARMS", tagColor: "#FF6B35",
    exercises: [
      { name: "Pull-Up Superset", sets: "3", reps: "10 overhand + F neutral", muscle: "Back", rest: "2 min",
        note: "No rest between grips. Full dead hang every rep." },
      { name: "Lat Pull Down", sets: "3", reps: "10-10-10", muscle: "Back", rest: "60 sec",
        note: "",
        frameNote: "Pull to upper chest, lean back slightly. Full extension at top = elite stretch." },
      { name: "Barbell Row", sets: "4", reps: "10-10-10-8", muscle: "Back", rest: "90 sec",
        note: "Pull to belly button, stay flat.",
        frameNote: "Hip hinge to ~45°. Brace hard — long torso = more lower back stress. No jerking." },
      { name: "DB Row + Low Cable Row SS", sets: "3", reps: "10 DB / 12 cable", muscle: "Back", rest: "75 sec",
        note: "No rest between." },
      { name: "Bicep Cable Curl (3 grip change)", sets: "3", reps: "10 each grip", muscle: "Biceps", rest: "60 sec",
        note: "Supinated / Neutral / Pronated." },
      { name: "Tricep Cable Press Down (3 grip change)", sets: "3", reps: "10 each grip", muscle: "Triceps", rest: "60 sec",
        note: "Same cable stack — pair with curls." },
      { name: "Precision Run — Steady State or HIIT", sets: "1", reps: "20 min", muscle: "Cardio", rest: "—",
        note: "Cardio last. Steady OR 8 × 30 sec sprint / 90 sec walk." },
    ],
    bonus: [
      { category: "💪 GUN SHOP MODE", items: [
        { name: "Barbell Curls + Hammer Curls SS", sets: "3", reps: "12 / 10", note: "No rest." },
        { name: "Seated DB Overhead Ext + Hammer Curl SS", sets: "3", reps: "15 / 15", note: "Arms fully fried." },
        { name: "Preacher Curl Drop Sets", sets: "2", reps: "12 → 10 → 8", note: "Gun Shop DNA." },
      ]},
      { category: "🔥 CORE FINISHER", items: [
        { name: "The Core Cut", sets: "2", reps: "15 each", note: "Hanging Leg Raises · Cable Crunches · GHD Sit Ups" },
        { name: "Ab Wheel Rollout", sets: "2", reps: "10-10", note: "" },
      ]},
      { category: "🏋️ REAR DELTS + TRAPS", items: [
        { name: "Rear Delt Fly", sets: "3", reps: "15-15-15", note: "" },
        { name: "DB Shrugs", sets: "3", reps: "15-15-15", note: "Hold at top for 1 sec." },
        { name: "Push Ups", sets: "1", reps: "50 reps", note: "Always the finisher." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — HIIT", sets: "1", reps: "10 rounds", note: "30 sec sprint / 90 sec walk." },
        { name: "Precision Run — Incline Walk", sets: "1", reps: "25 min", note: "12–15% incline." },
        { name: "Rooftop Pool — Laps", sets: "1", reps: "20 min", note: "Weekend pool session." },
      ]},
    ],
  },
};

const MUSCLE_COLORS = {
  "Chest":"#FF6B35","Back":"#00E5FF","Legs":"#A8FF3E","Quads / Glutes":"#A8FF3E",
  "Hamstrings":"#A8FF3E","Quads":"#A8FF3E","Calves":"#A8FF3E","Shoulders":"#FFD700",
  "Biceps":"#FF69B4","Triceps":"#DA70D6","Core":"#00FF9F","Traps":"#00E5FF",
  "Forearms":"#FF8C69","Cardio":"#00CFFF","Chest / Lats":"#FF6B35",
};

const DAY_KEYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const DAY_LABELS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const REST_INTERVALS = [
  { type: "Heavy Compounds", exs: "Squat · Deadlift · Row · Pull-Up · Bench", time: "90 sec – 2 min", color: "#FF3B3B" },
  { type: "Accessory Compounds", exs: "Shoulder Press · Dips · Leg Press", time: "75 sec", color: "#FF6B35" },
  { type: "Isolation Work", exs: "Curls · Lateral Raise · Extensions", time: "60 sec", color: "#FFD700" },
  { type: "Supersets", exs: "Paired exercises back-to-back", time: "60–75 sec after pair", color: "#A8FF3E" },
  { type: "Calf Raises", exs: "High rep, lower intensity", time: "45 sec", color: "#00E5FF" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const ls = { get: (k) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
             set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };

const todayStr = () => new Date().toISOString().split("T")[0];
const dateStr = (d) => d.toISOString().split("T")[0];

const weekFromStart = (startDate) => {
  if (!startDate) return 1;
  const start = new Date(startDate + "T00:00:00");
  const now = new Date();
  const diff = Math.floor((now - start) / (7 * 24 * 3600 * 1000));
  return Math.min(Math.max(diff + 1, 1), 24);
};

const formatDate = (str) => new Date(str + "T12:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });

// ─── ONBOARDING SCREEN ────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [date, setDate] = useState(todayStr());
  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", color:"#F0F0F0", fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, maxWidth:480, margin:"0 auto" }}>
      <div style={{ fontSize:9, letterSpacing:4, color:"#3A3A3A", marginBottom:6 }}>PEAK CONDITION</div>
      <div style={{ fontSize:36, fontWeight:900, letterSpacing:2, marginBottom:4 }}>IRON ATLAS</div>
      <div style={{ fontSize:11, color:"#444", marginBottom:48, letterSpacing:1 }}>6'3" · 24-WEEK PROGRAM</div>

      <div style={{ width:"100%", background:"#111", borderRadius:14, padding:24, border:"1px solid #1C1C1C" }}>
        <div style={{ fontSize:16, fontWeight:800, letterSpacing:1, marginBottom:6 }}>SET YOUR START DATE</div>
        <div style={{ fontSize:11, color:"#555", marginBottom:20, lineHeight:1.5 }}>
          The program auto-advances through 3 phases over 24 weeks. Your start date determines which week and phase you're in every day you open the app.
        </div>

        <div style={{ marginBottom:20 }}>
          {PHASES.map((p, i) => (
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:i<2?"1px solid #1A1A1A":"none", alignItems:"center" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:p.color, flexShrink:0 }} />
              <div>
                <span style={{ fontSize:11, fontWeight:700, color:p.color }}>{p.name}</span>
                <span style={{ fontSize:10, color:"#444", marginLeft:8 }}>{p.weeks}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:8 }}>PROGRAM START DATE</div>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ width:"100%", background:"#0E0E0E", border:"1px solid #2A2A2A", borderRadius:8, padding:"12px 14px", color:"#F0F0F0", fontFamily:"Barlow Condensed, sans-serif", fontSize:14, outline:"none" }} />
          <div style={{ fontSize:9, color:"#333", marginTop:6 }}>
            {date === todayStr() ? "Starting today — Week 1, Phase 1" : (() => {
              const w = weekFromStart(date);
              const ph = getPhaseForWeek(w);
              return `Week ${w} of 24 · ${PHASES[ph].name}: ${PHASES[ph].subtitle}`;
            })()}
          </div>
        </div>

        <button onClick={() => { ls.set("ironatlas-startdate", date); onComplete(date); }}
          style={{ width:"100%", padding:"16px", borderRadius:10, background:"#A8FF3E", color:"#000", fontSize:14, fontWeight:900, letterSpacing:2, border:"none", cursor:"pointer" }}>
          START THE PROGRAM
        </button>
      </div>
    </div>
  );
}

// ─── CALENDAR VIEW ────────────────────────────────────────────────────────────
function CalendarView({ completedDays, overrides, weights, checked, startDate }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const today = todayStr();
  const { year, month } = calMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", { month:"long", year:"numeric" });

  const getDayInfo = (str) => {
    const isDone = completedDays.includes(str);
    const ov = overrides[str];
    const isToday = str === today;
    const isFuture = str > today;
    const w = weekFromStart(startDate);
    const dayW = weekFromStart(startDate) - Math.floor((new Date(today) - new Date(str + "T12:00:00")) / (7*24*3600*1000));
    return { isDone, ov, isToday, isFuture };
  };

  const getExercisesForDay = (dateStr) => {
    const dt = new Date(dateStr + "T12:00:00");
    const dayKey = DAY_KEYS[dt.getDay()];
    const workout = WORKOUTS[dayKey];
    if (!workout || workout.rest) return null;
    return { dayKey, workout };
  };

  const selectedInfo = selectedDay ? getDayInfo(selectedDay) : null;
  const selectedWorkout = selectedDay ? getExercisesForDay(selectedDay) : null;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const str = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    cells.push(str);
  }

  return (
    <div className="up" style={{ padding:18, paddingBottom:80 }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:1 }}>CALENDAR</div>
        <div style={{ fontSize:11, color:"#555", marginTop:2 }}>Your training history</div>
      </div>

      {/* Month nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <button className="tap" onClick={() => setCalMonth(p => {
          const d = new Date(p.year, p.month - 1, 1);
          return { year: d.getFullYear(), month: d.getMonth() };
        })} style={{ fontSize:20, color:"#555", padding:"4px 10px" }}>‹</button>
        <div style={{ fontSize:13, fontWeight:800, letterSpacing:1 }}>{monthName}</div>
        <button className="tap" onClick={() => setCalMonth(p => {
          const d = new Date(p.year, p.month + 1, 1);
          return { year: d.getFullYear(), month: d.getMonth() };
        })} style={{ fontSize:20, color:"#555", padding:"4px 10px" }}>›</button>
      </div>

      {/* Day labels */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
        {["S","M","T","W","T","F","S"].map((d,i) => (
          <div key={i} style={{ textAlign:"center", fontSize:8, color:"#333", fontWeight:700, padding:"4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:16 }}>
        {cells.map((str, i) => {
          if (!str) return <div key={i} />;
          const { isDone, ov, isToday, isFuture } = getDayInfo(str);
          const dt = new Date(str + "T12:00:00");
          const dayKey = DAY_KEYS[dt.getDay()];
          const isRestDay = WORKOUTS[dayKey]?.rest;
          const d = parseInt(str.split("-")[2]);
          const bg = isDone ? (ov ? "#2A2000" : "#0D1A0D") : isToday ? "#1A1A1A" : "transparent";
          const border = isToday ? "1px solid #444" : isDone ? `1px solid ${ov ? "#FFD700" : "#A8FF3E"}` : "1px solid #1A1A1A";
          const dot = ov ? "#FFD700" : "#A8FF3E";
          return (
            <button key={i} className="tap" onClick={() => setSelectedDay(str === selectedDay ? null : str)}
              style={{ background:bg, border, borderRadius:6, padding:"8px 2px", display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer" }}>
              <div style={{ fontSize:11, fontWeight:isToday?900:600, color:isToday?"#F0F0F0":isFuture?"#2A2A2A":"#666" }}>{d}</div>
              {isDone && <div style={{ width:4, height:4, borderRadius:"50%", background:dot }} />}
              {!isDone && isRestDay && !isFuture && <div style={{ width:4, height:4, borderRadius:"50%", background:"#2A2A2A" }} />}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:14, marginBottom:16, flexWrap:"wrap" }}>
        {[["#A8FF3E","Completed"],["#FFD700","Override / Alt"],["#444","Today"],["#2A2A2A","Rest day"]].map(([c,l]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:c }} />
            <span style={{ fontSize:9, color:"#444" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Selected day detail */}
      {selectedDay && (
        <div style={{ background:"#111", borderRadius:12, border:"1px solid #1C1C1C", overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"12px 14px", borderBottom:"1px solid #1A1A1A" }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:1 }}>{formatDate(selectedDay)}</div>
            {(() => {
              const { isDone, ov } = getDayInfo(selectedDay);
              const wInfo = selectedWorkout;
              if (!isDone && !wInfo) return <div style={{ fontSize:10, color:"#333", marginTop:3 }}>No data</div>;
              if (ov) return <div style={{ fontSize:10, color:"#FFD700", marginTop:3 }}>✦ {ov.type}{ov.note ? ` — ${ov.note}` : ""}</div>;
              if (isDone) return <div style={{ fontSize:10, color:"#A8FF3E", marginTop:3 }}>✓ Full session logged</div>;
              return <div style={{ fontSize:10, color:"#333", marginTop:3 }}>{wInfo?.workout?.title || "Rest day"}</div>;
            })()}
          </div>

          {selectedWorkout && (() => {
            const { dayKey, workout } = selectedWorkout;
            const exercises = workout.exercises || [];
            const hasData = exercises.some((_,i) => {
              const ck = `${dayKey}-${i}`;
              if (checked[ck]) return true;
              const numSets = Math.max(1, parseInt(exercises[i].sets) || 1);
              for (let s = 0; s < numSets; s++) {
                if (weights[`${dayKey}-${i}-s${s}`]) return true;
              }
              return false;
            });

            if (!hasData) return (
              <div style={{ padding:"12px 14px" }}>
                <div style={{ fontSize:10, color:"#333" }}>No weight data logged for this day.</div>
              </div>
            );

            return (
              <div style={{ padding:"8px 0" }}>
                {exercises.map((ex, i) => {
                  const ck = `${dayKey}-${i}`;
                  const done = checked[ck];
                  const isCardio = ex.muscle === "Cardio";
                  const numSets = isCardio ? 0 : Math.max(1, parseInt(ex.sets) || 1);
                  const setWeights = Array.from({ length: numSets }, (_, s) => weights[`${dayKey}-${i}-s${s}`]).filter(Boolean);
                  if (!done && setWeights.length === 0) return null;
                  const mc = MUSCLE_COLORS[ex.muscle] || "#555";
                  return (
                    <div key={i} style={{ padding:"8px 14px", borderBottom:"1px solid #161616", opacity:done?1:0.5 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, textDecoration:done?"none":"line-through" }}>{ex.name}</div>
                          <div style={{ fontSize:9, color:mc, fontWeight:700, marginTop:2 }}>{ex.muscle?.toUpperCase()}</div>
                        </div>
                        {done && <div style={{ fontSize:9, color:"#A8FF3E" }}>✓</div>}
                      </div>
                      {setWeights.length > 0 && (
                        <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                          {setWeights.map((w, s) => (
                            <div key={s} style={{ background:"#1A1A1A", borderRadius:4, padding:"3px 7px", fontSize:9, color:"#888" }}>
                              S{s+1}: {w}lbs
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* Monthly summary */}
      <div style={{ background:"#111", borderRadius:9, padding:13, border:"1px solid #1C1C1C" }}>
        <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:10 }}>THIS MONTH</div>
        {(() => {
          const monthStr = `${year}-${String(month+1).padStart(2,"0")}`;
          const monthDays = completedDays.filter(d => d.startsWith(monthStr));
          const overrideDays = monthDays.filter(d => overrides[d]);
          const fullDays = monthDays.length - overrideDays.length;
          return (
            <div style={{ display:"flex", gap:0 }}>
              {[["Full sessions", fullDays, "#A8FF3E"], ["Overrides", overrideDays.length, "#FFD700"], ["Total active", monthDays.length, "#00E5FF"]].map(([l,v,c]) => (
                <div key={l} style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:24, fontWeight:900, color:v>0?c:"#2A2A2A" }}>{v}</div>
                  <div style={{ fontSize:8, color:"#3A3A3A", letterSpacing:1, marginTop:2 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function WorkoutApp() {
  const [startDate, setStartDate]   = useState(null);
  const [view, setView]             = useState("today");
  const [activeDay, setActiveDay]   = useState(DAY_KEYS[new Date().getDay()]);
  const [checked, setChecked]       = useState({});
  const [checkedBonus, setCheckedBonus] = useState({});
  const [bonusOpen, setBonusOpen]   = useState(null);
  const [weights, setWeights]       = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [overrides, setOverrides]   = useState({});
  const [overrideModal, setOverrideModal] = useState(false);
  const [overrideType, setOverrideType]   = useState(null);
  const [overrideNote, setOverrideNote]   = useState("");
  const [showFrameNote, setShowFrameNote] = useState(null);
  const [loaded, setLoaded]         = useState(false);

  useEffect(() => {
    setStartDate(ls.get("ironatlas-startdate"));
    setChecked(ls.get("ironatlas-checked") || {});
    setCheckedBonus(ls.get("ironatlas-bonus") || {});
    setWeights(ls.get("ironatlas-weights") || {});
    setCompletedDays(ls.get("ironatlas-completed") || []);
    setOverrides(ls.get("ironatlas-overrides") || {});
    setLoaded(true);
  }, []);

  const save = (key, value) => ls.set(key, value);

  const toggleCheck = (key) => { const n = {...checked,[key]:!checked[key]}; setChecked(n); save("ironatlas-checked",n); };
  const toggleBonus = (key) => { const n = {...checkedBonus,[key]:!checkedBonus[key]}; setCheckedBonus(n); save("ironatlas-bonus",n); };
  const setWeight = (key, val) => { const n = {...weights,[key]:val}; setWeights(n); save("ironatlas-weights",n); };

  const markComplete = () => {
    const t = todayStr();
    if (!completedDays.includes(t)) {
      const n = [t, ...completedDays].slice(0, 180);
      setCompletedDays(n); save("ironatlas-completed", n);
    }
  };

  const logOverride = () => {
    if (!overrideType) return;
    const t = todayStr();
    const newOv = {...overrides,[t]:{type:overrideType,note:overrideNote.trim()}};
    setOverrides(newOv); save("ironatlas-overrides",newOv);
    if (!completedDays.includes(t)) {
      const n = [t,...completedDays].slice(0,180);
      setCompletedDays(n); save("ironatlas-completed",n);
    }
    setOverrideModal(false); setOverrideType(null); setOverrideNote("");
  };

  const resetDay = () => {
    const nc = {...checked}; const nb = {...checkedBonus};
    exercises.forEach((_,i) => delete nc[`${activeDay}-${i}`]);
    workout?.bonus?.forEach((s,si) => s.items.forEach((_,ii) => delete nb[`${activeDay}-b${si}-${ii}`]));
    setChecked(nc); save("ironatlas-checked",nc);
    setCheckedBonus(nb); save("ironatlas-bonus",nb);
  };

  // Derived
  const currentWeek = weekFromStart(startDate);
  const currentPhaseIdx = getPhaseForWeek(currentWeek);
  const currentPhase = PHASES[currentPhaseIdx];
  const weekCues = getWeekCues(currentWeek);
  const isDeload = weekCues.intensity === "DELOAD";

  const workout = WORKOUTS[activeDay];
  const isRest = workout?.rest;
  const exercises = workout?.exercises || [];
  const coreDone = exercises.filter((_,i) => checked[`${activeDay}-${i}`]).length;
  const corePct = exercises.length ? (coreDone/exercises.length)*100 : 0;
  const today = todayStr();
  const todayDone = completedDays.includes(today);

  const streak = (() => {
    let s = 0, d = new Date();
    if (!completedDays.includes(dateStr(d))) d.setDate(d.getDate()-1);
    while (true) { const k = dateStr(d); if (!completedDays.includes(k)) break; s++; d.setDate(d.getDate()-1); }
    return s;
  })();

  const weekStart = new Date(); weekStart.setDate(weekStart.getDate()-weekStart.getDay());
  const thisWeekCount = completedDays.filter(d => new Date(d+"T12:00:00") >= weekStart).length;

  if (!loaded) return <div style={{minHeight:"100vh",background:"#0A0A0A",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{color:"#333",fontSize:11,letterSpacing:3}}>LOADING...</div></div>;
  if (!startDate) return <Onboarding onComplete={(d) => setStartDate(d)} />;

  return (
    <div style={{minHeight:"100vh",background:"#0A0A0A",color:"#F0F0F0",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",maxWidth:480,margin:"0 auto"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#2A2A2A; border-radius:2px; }
        .tap { cursor:pointer; transition:all 0.15s; border:none; background:none; }
        .tap:active { transform:scale(0.93); }
        @keyframes up { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
        .up { animation:up 0.22s ease forwards; }
        .bar { transition:width 0.45s ease; }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .frame-modal { animation:slideUp 0.2s ease forwards; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; }
        input[type=number] { -moz-appearance:textfield; }
        .wt-input { background:#1A1A1A; border:1px solid #2A2A2A; color:#F0F0F0; border-radius:5px; padding:4px 6px; font-family:'Barlow Condensed',sans-serif; font-size:12px; width:72px; text-align:center; outline:none; }
        .wt-input:focus { border-color:#555; }
        .wt-input::placeholder { color:#333; }
      `}</style>

      {/* HEADER */}
      <div style={{background:"#111",borderBottom:"1px solid #1C1C1C",padding:"12px 18px 9px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div>
            <div style={{fontSize:9,letterSpacing:3,color:"#3A3A3A"}}>PEAK CONDITION</div>
            <div style={{fontSize:21,fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>IRON ATLAS</div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:streak>0?"#FF6B35":"#2A2A2A",lineHeight:1}}>{streak}</div>
              <div style={{fontSize:7,color:"#3A3A3A",letterSpacing:1,marginTop:1}}>STREAK</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:thisWeekCount>0?"#A8FF3E":"#2A2A2A",lineHeight:1}}>{thisWeekCount}</div>
              <div style={{fontSize:7,color:"#3A3A3A",letterSpacing:1,marginTop:1}}>THIS WEEK</div>
            </div>
          </div>
        </div>

        {/* Week / Phase banner */}
        <div style={{background:isDeload?"#1A0A00":"#0E0E0E",borderRadius:7,padding:"6px 10px",marginBottom:8,border:`1px solid ${isDeload?"#FF6B35":currentPhase.color}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <span style={{fontSize:9,fontWeight:800,color:isDeload?"#FF6B35":currentPhase.color,letterSpacing:1}}>
                WEEK {currentWeek} · {isDeload?"⚡ DELOAD":currentPhase.name.toUpperCase()}
              </span>
              <div style={{fontSize:8,color:"#3A3A3A",marginTop:1}}>{weekCues.intensity} · {weekCues.sets} sets</div>
            </div>
            <div style={{fontSize:8,color:"#3A3A3A",textAlign:"right",maxWidth:120}}>{weekCues.note}</div>
          </div>
        </div>

        <div style={{display:"flex",gap:3}}>
          {[["today","TODAY"],["calendar","CAL"],["week","SPLIT"],["phases","6-MO"],["recover","RECOVER"],["design","DESIGN"]].map(([v,l]) => (
            <button key={v} className="tap" onClick={() => setView(v)} style={{flex:1,padding:"6px 1px",borderRadius:5,fontSize:7,fontWeight:700,letterSpacing:0.5,background:view===v?"#A8FF3E":"#1A1A1A",color:view===v?"#000":"#555",fontFamily:"Barlow Condensed"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* CALENDAR */}
      {view === "calendar" && (
        <CalendarView completedDays={completedDays} overrides={overrides} weights={weights} checked={checked} startDate={startDate} />
      )}

      {/* TODAY */}
      {view === "today" && (
        <div className="up">
          <div style={{padding:"9px 18px 0",overflowX:"auto"}}>
            <div style={{display:"flex",gap:5,paddingBottom:3}}>
              {DAY_KEYS.map((key,i) => {
                const w = WORKOUTS[key];
                const active = activeDay === key;
                const c = w?.tagColor || "#333";
                const dayDone = completedDays.some(d => {
                  const dt = new Date(d+"T12:00:00");
                  return dt.getDay()===i && (Date.now()-dt.getTime())<7*24*3600*1000;
                });
                return (
                  <button key={key} className="tap" onClick={() => {setActiveDay(key);setBonusOpen(null);setShowFrameNote(null);}}
                    style={{minWidth:50,padding:"7px 2px",borderRadius:6,background:active?c:"#181818",color:active?"#000":"#484848",fontFamily:"Barlow Condensed",fontWeight:700,fontSize:8,letterSpacing:1,textTransform:"uppercase",flexShrink:0,position:"relative"}}>
                    <div style={{fontSize:9}}>{DAY_LABELS[i]}</div>
                    <div style={{fontSize:6,marginTop:1,opacity:0.8}}>{key==="thursday"?"REST":(w?.tag?.split(" ")[0]||"")}</div>
                    {dayDone && <div style={{position:"absolute",top:3,right:5,width:5,height:5,borderRadius:"50%",background:"#A8FF3E"}} />}
                  </button>
                );
              })}
            </div>
          </div>

          {isRest ? (
            <div style={{padding:24,textAlign:"center",marginTop:20}}>
              <div style={{fontSize:42}}>🛌</div>
              <div style={{fontSize:22,fontWeight:800,marginTop:10,letterSpacing:2}}>REST DAY</div>
              <div style={{color:"#555",marginTop:6,fontSize:13}}>Active recovery — how you stay ahead</div>
              <div style={{marginTop:16,background:"#181818",borderRadius:10,padding:14,textAlign:"left"}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:"#444",marginBottom:10}}>PRINTING HOUSE PROTOCOLS</div>
                {["Precision Run — easy incline walk, 20 min","Rooftop pool laps — active recovery, low impact","Power Plate — 10 min vibration session","Steam room — post-session decompression","Yoga or Pilates class — see Equinox schedule","8+ hours sleep — non-negotiable"].map((item,i,arr) => (
                  <div key={i} style={{padding:"6px 0",borderBottom:i<arr.length-1?"1px solid #222":"none",fontSize:12,color:"#666",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#A8FF3E",fontSize:9}}>✦</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ) : workout && (
            <>
              <div style={{padding:"12px 18px 10px",borderBottom:"1px solid #181818"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"inline-block",background:workout.tagColor,color:"#000",fontSize:7,fontWeight:800,letterSpacing:2,padding:"2px 6px",borderRadius:3,marginBottom:4}}>{workout.tag}</div>
                    <div style={{fontSize:21,fontWeight:800,letterSpacing:0.5,lineHeight:1}}>{workout.title}</div>
                    <div style={{fontSize:10,color:"#484848",marginTop:2}}>{workout.subtitle}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                    <div style={{fontSize:9,color:"#484848",letterSpacing:1}}>CORE</div>
                    <div style={{fontSize:14,fontWeight:700,color:workout.tagColor}}>{workout.duration}</div>
                    <div style={{fontSize:9,color:"#FFD700",marginTop:2}}>+bonus {workout.bonusDuration}</div>
                  </div>
                </div>
                <div style={{marginTop:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:9,color:"#444",letterSpacing:1}}>CORE WORKOUT</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:9,color:workout.tagColor,fontWeight:700}}>{coreDone}/{exercises.length}</span>
                      {coreDone>0 && <button className="tap" onClick={resetDay} style={{fontSize:7,color:"#3A3A3A",padding:"1px 5px",border:"1px solid #2A2A2A",borderRadius:3,letterSpacing:1}}>RESET</button>}
                    </div>
                  </div>
                  <div style={{background:"#1A1A1A",borderRadius:3,height:3}}>
                    <div className="bar" style={{height:"100%",width:`${corePct}%`,background:workout.tagColor,borderRadius:3}} />
                  </div>
                </div>
              </div>

              <div style={{padding:"0 18px"}}>
                <div style={{fontSize:7,letterSpacing:2,color:"#2E2E2E",padding:"8px 0 2px",fontWeight:700}}>CORE WORKOUT · {workout.duration}</div>
                {exercises.map((ex,i) => {
                  const ck = `${activeDay}-${i}`;
                  const done = checked[ck];
                  const mc = MUSCLE_COLORS[ex.muscle]||"#555";
                  const isCardio = ex.muscle==="Cardio";
                  const numSets = isCardio?0:Math.max(1,parseInt(ex.sets)||1);
                  const frameOpen = showFrameNote===`${activeDay}-${i}`;
                  return (
                    <div key={i} style={{borderBottom:"1px solid #161616"}}>
                      <div style={{padding:"11px 0",opacity:done?0.32:1,display:"flex",gap:9,alignItems:"flex-start"}}>
                        <button className="tap" onClick={() => toggleCheck(ck)} style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${done?mc:"#2A2A2A"}`,background:done?mc:"transparent",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {done && <span style={{color:"#000",fontSize:10,fontWeight:900}}>✓</span>}
                        </button>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"flex-start",gap:5}}>
                            <div style={{fontSize:13,fontWeight:700,textDecoration:done?"line-through":"none",lineHeight:1.2,flex:1}}>{ex.name}</div>
                            {ex.frameNote && (
                              <button className="tap" onClick={() => setShowFrameNote(frameOpen?null:`${activeDay}-${i}`)}
                                style={{background:frameOpen?"#FFD700":"#1A1A00",border:`1px solid ${frameOpen?"#FFD700":"#3A3A00"}`,borderRadius:4,padding:"2px 5px",fontSize:7,fontWeight:800,color:frameOpen?"#000":"#FFD700",letterSpacing:1,flexShrink:0,marginTop:1}}>
                                6'3"
                              </button>
                            )}
                          </div>
                          <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap",alignItems:"center"}}>
                            <span style={{fontSize:10,color:"#505050"}}>{ex.sets} sets · {ex.reps}</span>
                            <span style={{fontSize:8,color:mc,fontWeight:700,letterSpacing:1}}>{ex.muscle?.toUpperCase()}</span>
                            {ex.rest && ex.rest!=="—" && <span style={{fontSize:7,color:"#3A3A3A",letterSpacing:1}}>REST {ex.rest}</span>}
                          </div>
                          {ex.note && <div style={{fontSize:9,color:"#2E2E2E",marginTop:2}}>{ex.note}</div>}
                          {frameOpen && ex.frameNote && (
                            <div className="frame-modal" style={{background:"#1A1500",border:"1px solid #3A3000",borderRadius:7,padding:"9px 11px",marginTop:8}}>
                              <div style={{fontSize:7,color:"#FFD700",fontWeight:800,letterSpacing:2,marginBottom:4}}>📏 6'3" FRAME NOTE</div>
                              <div style={{fontSize:10,color:"#AAA",lineHeight:1.5}}>{ex.frameNote}</div>
                            </div>
                          )}
                        </div>
                        {!isCardio && (
                          <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                            {Array.from({length:numSets},(_,s) => {
                              const wk=`${activeDay}-${i}-s${s}`;
                              return (
                                <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                                  <span style={{fontSize:7,color:"#2E2E2E",fontWeight:700,letterSpacing:1}}>S{s+1}</span>
                                  <input type="number" className="wt-input" placeholder="lbs" value={weights[wk]||""} onChange={e=>setWeight(wk,e.target.value)} onClick={e=>e.stopPropagation()} />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div style={{padding:"14px 0"}}>
                  {todayDone ? (
                    <div style={{background:overrides[today]?"#1A1200":"#0D1A0D",border:`1px solid ${overrides[today]?"#FFD700":"#A8FF3E"}`,borderRadius:9,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:800,color:overrides[today]?"#FFD700":"#A8FF3E",letterSpacing:1}}>
                          {overrides[today]?`✦ ${overrides[today].type}`:"✓ WORKOUT LOGGED"}
                        </div>
                        {overrides[today]?.note && <div style={{fontSize:9,color:"#555",marginTop:3}}>{overrides[today].note}</div>}
                      </div>
                      <button className="tap" onClick={() => setOverrideModal(true)} style={{fontSize:8,color:"#333",padding:"3px 7px",border:"1px solid #2A2A2A",borderRadius:4,letterSpacing:1}}>EDIT</button>
                    </div>
                  ) : (
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {corePct===100 ? (
                        <button className="tap" onClick={markComplete} style={{width:"100%",padding:"14px",borderRadius:9,background:"#A8FF3E",color:"#000",fontSize:13,fontWeight:800,letterSpacing:2,cursor:"pointer",border:"none"}}>
                          LOG WORKOUT COMPLETE
                        </button>
                      ) : (
                        <div style={{textAlign:"center",padding:"8px 0"}}>
                          <div style={{fontSize:9,color:"#2E2E2E",letterSpacing:2}}>COMPLETE ALL EXERCISES TO LOG</div>
                          <div style={{fontSize:10,color:"#3A3A3A",marginTop:4}}>{exercises.length-coreDone} remaining</div>
                        </div>
                      )}
                      <button className="tap" onClick={() => setOverrideModal(true)} style={{width:"100%",padding:"10px",borderRadius:9,background:"transparent",border:"1px solid #222",color:"#444",fontSize:11,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>
                        OVERRIDE — REST / DIFFERENT SESSION
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {workout.bonus && (
                <div style={{padding:"0 18px 90px"}}>
                  <div style={{margin:"4px 0 10px",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{height:1,flex:1,background:"#1E1E1E"}} />
                    <div style={{fontSize:8,letterSpacing:2,color:"#FFD700",fontWeight:700,whiteSpace:"nowrap"}}>⚡ BONUS ROUND</div>
                    <div style={{height:1,flex:1,background:"#1E1E1E"}} />
                  </div>
                  {workout.bonus.map((section,si) => {
                    const open = bonusOpen===si;
                    const secDone = section.items.filter((_,ii) => checkedBonus[`${activeDay}-b${si}-${ii}`]).length;
                    return (
                      <div key={si} style={{marginBottom:8,background:"#0E0E0E",borderRadius:9,border:"1px solid #1E1E1E",overflow:"hidden"}}>
                        <button className="tap" onClick={() => setBonusOpen(open?null:si)} style={{width:"100%",padding:"11px 13px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
                          <div style={{display:"flex",alignItems:"center",gap:9}}>
                            <span style={{fontSize:17}}>{section.category.split(" ")[0]}</span>
                            <div style={{textAlign:"left"}}>
                              <div style={{fontSize:12,fontWeight:700}}>{section.category.replace(/^[^ ]+ /,"")}</div>
                              <div style={{fontSize:8,color:"#3A3A3A",letterSpacing:1}}>{section.items.length} exercises · optional</div>
                            </div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            {secDone>0 && <span style={{background:"#FFD700",color:"#000",fontSize:7,fontWeight:800,padding:"2px 5px",borderRadius:8}}>{secDone}/{section.items.length}</span>}
                            <span style={{color:"#444",fontSize:18,display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s"}}>›</span>
                          </div>
                        </button>
                        {open && (
                          <div style={{borderTop:"1px solid #181818"}}>
                            {section.items.map((ex,ii) => {
                              const bk=`${activeDay}-b${si}-${ii}`;
                              const done=checkedBonus[bk];
                              const isCardio=(ex.note||"").toLowerCase().includes("run")||(ex.name||"").toLowerCase().includes("run")||(ex.name||"").toLowerCase().includes("cycling")||(ex.name||"").toLowerCase().includes("pool");
                              const numSets=isCardio?0:Math.max(1,parseInt(ex.sets)||1);
                              return (
                                <div key={ii} style={{padding:"10px 13px",borderBottom:ii<section.items.length-1?"1px solid #141414":"none",opacity:done?0.3:1,display:"flex",gap:9,alignItems:"flex-start"}}>
                                  <button className="tap" onClick={() => toggleBonus(bk)} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${done?"#FFD700":"#2A2A2A"}`,background:done?"#FFD700":"transparent",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    {done && <span style={{color:"#000",fontSize:8,fontWeight:900}}>✓</span>}
                                  </button>
                                  <div style={{flex:1,minWidth:0}}>
                                    <div style={{fontSize:12,fontWeight:700,textDecoration:done?"line-through":"none",lineHeight:1.2}}>{ex.name}</div>
                                    <div style={{fontSize:10,color:"#484848",marginTop:1}}>{ex.sets} · {ex.reps}</div>
                                    {ex.note && <div style={{fontSize:9,color:"#2E2E2E",marginTop:1}}>{ex.note}</div>}
                                  </div>
                                  {!isCardio && (
                                    <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                                      {Array.from({length:numSets},(_,s) => {
                                        const wk=`b-${activeDay}-${si}-${ii}-s${s}`;
                                        return (
                                          <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                                            <span style={{fontSize:7,color:"#2E2E2E",fontWeight:700,letterSpacing:1}}>S{s+1}</span>
                                            <input type="number" className="wt-input" placeholder="lbs" style={{width:60}} value={weights[wk]||""} onChange={e=>setWeight(wk,e.target.value)} onClick={e=>e.stopPropagation()} />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {overrideModal && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={() => setOverrideModal(false)}>
              <div style={{background:"#111",borderRadius:"16px 16px 0 0",padding:24,width:"100%",maxWidth:480,border:"1px solid #222",borderBottom:"none"}} onClick={e=>e.stopPropagation()}>
                <div style={{fontSize:14,fontWeight:800,letterSpacing:1,marginBottom:4}}>LOG OVERRIDE</div>
                <div style={{fontSize:10,color:"#484848",marginBottom:18}}>You still showed up — log what actually happened.</div>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:16}}>
                  {[
                    {label:"🛌  Rest Day",sub:"Planned or needed it",color:"#00E5FF"},
                    {label:"👂  Listened to My Body",sub:"Felt off — smart call",color:"#A8FF3E"},
                    {label:"🏃  Different Workout",sub:"Ran, swam, court, bike…",color:"#FFD700"},
                    {label:"✈️  Travel / No Gym",sub:"Out of town or no access",color:"#FF6B35"},
                    {label:"🤕  Managing Injury",sub:"Protecting something",color:"#FF3B3B"},
                  ].map(({label,sub,color}) => {
                    const sel=overrideType===label;
                    return (
                      <button key={label} className="tap" onClick={() => setOverrideType(label)}
                        style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderRadius:9,background:sel?"#1A1A1A":"#0E0E0E",border:`1px solid ${sel?color:"#1E1E1E"}`,cursor:"pointer",textAlign:"left"}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:700,color:sel?color:"#888"}}>{label}</div>
                          <div style={{fontSize:9,color:"#3A3A3A",marginTop:2}}>{sub}</div>
                        </div>
                        {sel && <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}} />}
                      </button>
                    );
                  })}
                </div>
                <input type="text" placeholder="Add a note (optional)…" value={overrideNote} onChange={e=>setOverrideNote(e.target.value)}
                  style={{width:"100%",background:"#0E0E0E",border:"1px solid #1E1E1E",borderRadius:8,padding:"10px 12px",color:"#F0F0F0",fontFamily:"Barlow Condensed, sans-serif",fontSize:12,outline:"none",marginBottom:16}} />
                <div style={{display:"flex",gap:9}}>
                  <button className="tap" onClick={() => {setOverrideModal(false);setOverrideType(null);setOverrideNote("");}}
                    style={{flex:1,padding:"12px",borderRadius:9,background:"transparent",border:"1px solid #222",color:"#555",fontSize:11,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>CANCEL</button>
                  <button className="tap" onClick={logOverride} disabled={!overrideType}
                    style={{flex:2,padding:"12px",borderRadius:9,background:overrideType?"#FFD700":"#1A1A1A",border:"none",color:overrideType?"#000":"#333",fontSize:12,fontWeight:800,letterSpacing:1,cursor:overrideType?"pointer":"default"}}>LOG IT</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SPLIT */}
      {view === "week" && (
        <div className="up" style={{padding:18,paddingBottom:80}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:1}}>WEEKLY SPLIT</div>
            <div style={{fontSize:11,color:"#555",marginTop:2}}>5–6 days · Push / Pull / Legs / Full Body</div>
          </div>
          {WEEKLY_SPLIT.map((day,i) => {
            const tc={push:"#00E5FF",pull:"#FF6B35",legs:"#A8FF3E",rest:"#333",full:"#FFD700"};
            const c=tc[day.tag]||"#555";
            const w=WORKOUTS[DAY_KEYS[i]];
            return (
              <div key={i} style={{background:"#111",borderRadius:9,padding:13,marginBottom:7,borderLeft:`3px solid ${c}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:9,color:c,fontWeight:700,letterSpacing:2}}>{day.day}</div>
                    <div style={{fontSize:16,fontWeight:800,marginTop:1}}>{day.focus}</div>
                    <div style={{fontSize:10,color:"#484848",marginTop:1}}>{day.muscles}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    {w?.duration && <div style={{fontSize:11,color:c,fontWeight:700}}>{w.duration}</div>}
                    {w?.bonusDuration && <div style={{fontSize:9,color:"#FFD700"}}>+{w.bonusDuration} bonus</div>}
                    {w?.rest && <div style={{fontSize:11,color:"#444"}}>REST</div>}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{background:"#111",borderRadius:9,padding:13,marginTop:13,border:"1px solid #1C1C1C"}}>
            <div style={{fontSize:9,letterSpacing:2,color:"#FFD700",marginBottom:10,fontWeight:700}}>⏱ REST INTERVALS — 6'3" PROTOCOL</div>
            {REST_INTERVALS.map((r,i) => (
              <div key={i} style={{padding:"8px 0",borderBottom:i<REST_INTERVALS.length-1?"1px solid #1A1A1A":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:800,color:r.color}}>{r.type}</div>
                    <div style={{fontSize:9,color:"#3A3A3A",marginTop:2}}>{r.exs}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:900,color:r.color,flexShrink:0,marginLeft:10}}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHASES */}
      {view === "phases" && (
        <div className="up" style={{padding:18,paddingBottom:80}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:1}}>6-MONTH PLAN</div>
            <div style={{fontSize:11,color:"#555",marginTop:2}}>Auto-advancing · Currently Week {currentWeek}</div>
          </div>

          {PHASES.map((p,pi) => {
            const isActive = pi===currentPhaseIdx;
            const phaseData = [
              { weeks:[
                  {w:"Weeks 1–2",title:"Pattern establishment",detail:"Movement quality first. Film yourself. Weight is secondary to mechanics."},
                  {w:"Weeks 3–4",title:"Load introduction",detail:"Add weight weekly on every compound. Log everything from day 1."},
                  {w:"Weeks 5–6",title:"Volume ramp + bonus",detail:"2 bonus sections per workout. Sport power every Wednesday."},
                  {w:"Week 8",title:"⚡ DELOAD",detail:"Drop to 60% volume. Full week. Larger athletes need longer deloads."},
                  {w:"Weeks 9–10",title:"Phase 1 consolidation",detail:"Mechanics grooved. Start attacking weight. Your frame pays off here."},
                ], deload:"Week 8: full deload at 60% · no bonus sections · 90 sec rest all sets" },
              { weeks:[
                  {w:"Weeks 11–12",title:"Full volume block",detail:"5–6 sets on key compounds. All bonus sections. 75–90 min sessions."},
                  {w:"Weeks 13–14",title:"Supersets everything",detail:"Pair every lift. 60–90 sec rest between pairs. Constant pump."},
                  {w:"Weeks 15–16",title:"Gun Shop protocols",detail:"Drop sets, giant sets on arms. Peak arm volume."},
                  {w:"Week 18",title:"⚡ DELOAD",detail:"Structured deload — 50% volume, full rest intervals, mobility focus."},
                ], deload:"Week 18: 50% volume · full rest intervals · 20 min mobility each session" },
              { weeks:[
                  {w:"Weeks 19–20",title:"Heavy compound peak",detail:"Test 1RMs week 20: squat, DB bench, barbell row."},
                  {w:"Weeks 21–22",title:"Athletic output",detail:"Explosive work elevated. Train like a professional again."},
                  {w:"Weeks 23–24",title:"Game shape — full peak",detail:"Retest maxes vs week 1. 6 months of compounding on display."},
                ], deload:"Final week: active recovery only — pool, walks, mobility." },
            ][pi];

            return (
              <div key={pi} style={{background:"#111",borderRadius:11,padding:14,marginBottom:12,borderLeft:`3px solid ${isActive?p.color:"#2A2A2A"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:16,fontWeight:800,color:isActive?p.color:"#555"}}>{p.name}: {p.subtitle}</div>
                    <div style={{fontSize:9,color:"#484848",marginTop:2}}>{p.weeks}</div>
                  </div>
                  {isActive && <div style={{background:p.color,color:"#000",fontSize:7,fontWeight:900,padding:"3px 7px",borderRadius:4,letterSpacing:1}}>CURRENT</div>}
                </div>
                {isActive && (
                  <>
                    {phaseData.weeks.map((w,i) => (
                      <div key={i} style={{padding:"8px 0",borderBottom:i<phaseData.weeks.length-1?"1px solid #1A1A1A":"none"}}>
                        <div style={{fontSize:8,color:p.color,fontWeight:700,letterSpacing:2}}>{w.w}</div>
                        <div style={{fontSize:12,fontWeight:700,marginTop:2}}>{w.title}</div>
                        <div style={{fontSize:10,color:"#484848",marginTop:1}}>{w.detail}</div>
                      </div>
                    ))}
                    <div style={{background:"#1A0E00",border:"1px solid #3A2200",borderRadius:7,padding:10,marginTop:10}}>
                      <div style={{fontSize:8,color:"#FF6B35",fontWeight:700,letterSpacing:2,marginBottom:3}}>⚡ DELOAD PROTOCOL</div>
                      <div style={{fontSize:10,color:"#666"}}>{phaseData.deload}</div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div style={{background:"#111",borderRadius:9,padding:13,marginTop:6,border:"1px solid #1C1C1C"}}>
            <div style={{fontSize:9,letterSpacing:2,color:"#444",marginBottom:8}}>PROGRAM TIMELINE</div>
            <div style={{display:"flex",gap:2,height:8,borderRadius:4,overflow:"hidden",marginBottom:6}}>
              <div style={{flex:10,background:"#00E5FF",opacity:currentPhaseIdx===0?1:0.3}} />
              <div style={{flex:8,background:"#FF6B35",opacity:currentPhaseIdx===1?1:0.3}} />
              <div style={{flex:6,background:"#A8FF3E",opacity:currentPhaseIdx===2?1:0.3}} />
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{fontSize:8,color:"#00E5FF"}}>Phase 1 · 10wk</div>
              <div style={{fontSize:8,color:"#FF6B35"}}>Phase 2 · 8wk</div>
              <div style={{fontSize:8,color:"#A8FF3E"}}>Phase 3 · 6wk</div>
            </div>
            <div style={{marginTop:8,fontSize:9,color:"#333"}}>Week {currentWeek} of 24 · {Math.round((currentWeek/24)*100)}% complete</div>
            <div style={{background:"#1A1A1A",borderRadius:3,height:3,marginTop:4}}>
              <div className="bar" style={{height:"100%",width:`${(currentWeek/24)*100}%`,background:currentPhase.color,borderRadius:3}} />
            </div>
          </div>
        </div>
      )}

      {/* RECOVER */}
      {view === "recover" && (
        <div className="up" style={{padding:18,paddingBottom:80}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:1}}>RECOVERY</div>
            <div style={{fontSize:11,color:"#555",marginTop:2}}>Printing House protocols + frame care</div>
          </div>
          <div style={{background:"#1A1500",border:"1px solid #3A3000",borderRadius:11,padding:14,marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:800,color:"#FFD700",marginBottom:8}}>📏 6'3" FRAME PRIORITY</div>
            {[["Hip flexors daily","Long femurs = tight hip flexors. 5 min daily: couch stretch + kneeling lunge. Non-negotiable."],["Thoracic spine mobility","Tall athletes compress the t-spine. Foam roller thoracic extension 5 min before every push session."],["Ankle mobility","Long limbs = more ankle demand. Ankle CARs daily, wall calf stretch post-leg day."],["Shoulder capsule","More shoulder ROM = more impingement risk. Shoulder 90/90 stretches post every push session."]].map(([l,v],i) => (
              <div key={i} style={{padding:"8px 0",borderBottom:i<3?"1px solid #2A2000":"none"}}>
                <div style={{fontSize:11,fontWeight:800,color:"#FFD700",marginBottom:3}}>{l}</div>
                <div style={{fontSize:10,color:"#666"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#111",borderRadius:11,padding:14,marginBottom:10,borderLeft:"3px solid #00E5FF"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#00E5FF",marginBottom:8}}>💨 STEAM ROOM — PRINTING HOUSE</div>
            {[["After Push days","15–20 min. Shoulder and chest tissue recovery."],["After Leg days","20 min. Lactic flush. Quad and hamstring release."],["After Pull days","15 min. Upper back decompression."],["Rest day visits","20–25 min. Maintain without training."]].map(([l,v],i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<3?"1px solid #1A1A1A":"none",gap:10}}>
                <span style={{fontSize:10,color:"#555",fontWeight:700,flexShrink:0}}>{l}</span>
                <span style={{fontSize:10,color:"#888",textAlign:"right"}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{background:"#111",borderRadius:11,padding:14,marginBottom:10,borderLeft:"3px solid #FF6B35"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#FF6B35",marginBottom:8}}>🗓 EQUINOX CLASSES</div>
            {[{name:"Yoga",icon:"🧘",when:"Thursday rest day — or Sunday before weights",why:"Rotational mobility for tennis, golf, lacrosse. At 6'3\" this class is maintenance, not optional."},{name:"Cycling Studio",icon:"🚴",when:"Bonus cardio or rest day",why:"Zero joint impact. Aerobic base. Good marathon prep without leg pounding."},{name:"Pilates",icon:"⚡",when:"Once/week — rest day ideally",why:"Core stabilization. Anterior pelvic tilt correction (common in tall athletes). Posture balance."}].map((cls,i) => (
              <div key={i} style={{padding:"9px 0",borderBottom:i<2?"1px solid #1A1A1A":"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                  <span style={{fontSize:14}}>{cls.icon}</span>
                  <span style={{fontSize:13,fontWeight:800}}>{cls.name}</span>
                </div>
                <div style={{fontSize:9,color:"#FF6B35",marginBottom:2}}>{cls.when}</div>
                <div style={{fontSize:10,color:"#484848"}}>{cls.why}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#111",borderRadius:11,padding:14,borderLeft:"3px solid #FFD700"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#FFD700",marginBottom:8}}>🎾⛳🏀🥍 SPORT RECOVERY</div>
            {[["Tennis / Lacrosse","Shoulder internal/external rotation stretches post-push. Wrist flexor/extensor work. Steam room after arm sessions."],["Golf","Hip flexor and thoracic mobility are non-negotiable. Yoga handles both. Pallof press builds anti-rotation control."],["Basketball / Lacrosse","Ankle mobility + calf stretching after every leg day. Pool or ice after explosive work."],["Marathon (background build)","Incline walk and steady-state runs build aerobic base. Don't add run mileage while training volume is high."]].map(([sport,note],i) => (
              <div key={i} style={{padding:"8px 0",borderBottom:i<3?"1px solid #1A1A1A":"none"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#FFD700",marginBottom:3}}>{sport}</div>
                <div style={{fontSize:10,color:"#484848"}}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESIGN */}
      {view === "design" && (
        <div className="up" style={{padding:18,paddingBottom:80}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:1}}>PROGRAM DESIGN</div>
            <div style={{fontSize:11,color:"#555",marginTop:2}}>Built and calibrated for 6'3" · 200+ lbs</div>
          </div>
          <div style={{background:"#1A1500",border:"1px solid #FFD700",borderRadius:11,padding:14,marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:800,color:"#FFD700",marginBottom:10}}>📏 FRAME CALIBRATIONS APPLIED</div>
            {[["Compound sets bumped to 4","Squat, RDL, Bench, Pull-Up, Row — all 4 sets minimum."],["Phase 1 extended to 10 weeks","Taller athletes need longer to groove movement patterns. The extra 2 weeks compounds everything after."],["6'3\" notes on every key lift","Tap the gold badge on any exercise for frame-specific cues."],["Rest intervals formalized","90 sec–2 min on heavy compounds. Bigger CNS load = more recovery needed."],["Dips capped at 90°","Deep dips at your arm length create excessive shoulder torque over time."],["Auto phase progression","App advances week and phase automatically based on your start date."],["Calendar history","Full training log with weight data, accessible by day."]].map(([title,desc],i,arr) => (
              <div key={i} style={{padding:"8px 0",borderBottom:i<arr.length-1?"1px solid #2A2000":"none"}}>
                <div style={{fontSize:11,fontWeight:800,color:"#FFD700",marginBottom:2}}>✦ {title}</div>
                <div style={{fontSize:10,color:"#666"}}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#0F1A0F",border:"1px solid #A8FF3E",borderRadius:11,padding:13}}>
            <div style={{fontSize:11,fontWeight:800,color:"#A8FF3E",marginBottom:9}}>WHAT YOU ALREADY OWN ✦</div>
            {[["Back / Pulling","Elite. Rows, pulldowns, pull-ups, seal rows, rack pulls — your long arms make every pulling movement exceptional ROM."],["Chest","Multiple angles, tempos, grip variations. Your long ROM on DB press is a genuine advantage."],["Biceps & Triceps","The Gun Shop pedigree is real. Volume, variety, intensity."],["Shoulders","Presses, lateral raises, upright rows — consistent and complete."],["Cardio","Running base built in. Your stride length makes incline walking elite cardio."]].map(([name,note]) => (
              <div key={name} style={{padding:"7px 0",borderBottom:"1px solid #1A2A1A",display:"flex",gap:9}}>
                <span style={{color:"#A8FF3E",fontSize:10,marginTop:1}}>✓</span>
                <div>
                  <div style={{fontSize:11,fontWeight:700}}>{name}</div>
                  <div style={{fontSize:9,color:"#484848",marginTop:2}}>{note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Reset start date */}
          <div style={{marginTop:20,padding:13,background:"#111",borderRadius:9,border:"1px solid #1C1C1C"}}>
            <div style={{fontSize:9,letterSpacing:2,color:"#444",marginBottom:8}}>PROGRAM START DATE</div>
            <div style={{fontSize:12,color:"#666",marginBottom:10}}>Started: {formatDate(startDate)} · Week {currentWeek} of 24</div>
            <button className="tap" onClick={() => { ls.set("ironatlas-startdate",null); setStartDate(null); }}
              style={{fontSize:10,color:"#FF3B3B",padding:"6px 12px",border:"1px solid #2A1A1A",borderRadius:6,background:"transparent",letterSpacing:1,cursor:"pointer"}}>
              RESET START DATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
