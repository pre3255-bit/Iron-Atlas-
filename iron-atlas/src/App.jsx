import { useState, useEffect } from "react";

const PHASES = [
  { name: "Phase 1", subtitle: "Re-Baseline", months: "Months 1–2.5", desc: "Reintegrate lower body. Sharpen movement quality. 60-min sessions — efficient, no wasted reps. At 6'3\", grooving proper patterns takes longer — 10 weeks here is intentional.", color: "#00E5FF" },
  { name: "Phase 2", subtitle: "Peak Load", months: "Months 3–4.5", desc: "Max volume. Supersets, drop sets, giant sets. Push every muscle group to its ceiling. Sport conditioning ramps up.", color: "#FF6B35" },
  { name: "Phase 3", subtitle: "Game Shape", months: "Months 5–6", desc: "Heavy compounds, explosive work, athletic output. Look it, move it, perform it — across every sport.", color: "#A8FF3E" },
];

const WEEKLY_SPLIT = [
  { day: "Monday",    focus: "Push",          muscles: "Chest · Shoulders · Triceps",          tag: "push" },
  { day: "Tuesday",   focus: "Pull",          muscles: "Back · Biceps · Forearms",             tag: "pull" },
  { day: "Wednesday", focus: "Legs + Sport",  muscles: "Quads · Hams · Glutes · Sport Power",  tag: "legs" },
  { day: "Thursday",  focus: "Rest / Recover",muscles: "Steam · Pool · Classes",              tag: "rest" },
  { day: "Friday",    focus: "Push",          muscles: "Chest · Shoulders · Triceps",          tag: "push" },
  { day: "Saturday",  focus: "Pull + Arms",   muscles: "Back · Biceps · Triceps",             tag: "pull" },
  { day: "Sunday",    focus: "Full Body",     muscles: "Compound + Athletic Conditioning",     tag: "full" },
];

const WORKOUTS = {
  sunday: {
    title: "Full Body Power",
    subtitle: "Sunday — Compound + Athletic Conditioning",
    duration: "~65 min", bonusDuration: "+15–20 min",
    tag: "FULL BODY", tagColor: "#A8FF3E",
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "10-8-8-6", note: "Loaded. Athletic base — knees, hips, posterior chain.", frameNote: "6'3\" setup: wider stance (just outside shoulder-width), toes 30–35° out. Sit INTO the squat — your torso will lean more than shorter athletes. That's normal. Box squat to parallel first 2 weeks to groove depth.", rest: "2 min", muscle: "Legs" },
      { name: "Romanian Deadlift", sets: "4", reps: "10-10-10-8", note: "Own the eccentric. Your athletic engine.", frameNote: "Long hamstrings = massive ROM advantage. Let the bar travel close to your legs, hinge until you feel a deep stretch (likely past knee). Don't rush the bottom — own it.", rest: "90 sec", muscle: "Hamstrings" },
      { name: "Flat DB Bench Press (6:0:1:0)", sets: "4", reps: "8-8-8-6", note: "HEAVY — max DB load. Track weight every week.", frameNote: "Long arms = longer ROM = more work per rep. Keep elbows at 60° not flared. Touch lower chest, not mid. This is actually an advantage — your press is harder and builds more.", rest: "90 sec", muscle: "Chest" },
      { name: "Weighted Pull-Up (5:0:1:0)", sets: "4", reps: "8-8-8-6", note: "Load it. Slow eccentric.", frameNote: "Full dead hang between every rep — at your height this is a major lat stretch most people never get. Don't shortchange the bottom. That's your edge.", rest: "2 min", muscle: "Back" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10-10-10", note: "Athletic overhead strength.", frameNote: "Seated or standing — watch elbow flare overhead. Stop just before full lockout to keep tension on the shoulder, not the joint.", rest: "75 sec", muscle: "Shoulders" },
      { name: "Farmer's Walk", sets: "3", reps: "40 steps", note: "Heavy. Grip, traps, everything. Extended to 40 steps for your stride length.", rest: "90 sec", muscle: "Traps" },
      { name: "Precision Run — Steady State", sets: "1", reps: "2.0 miles", note: "Cardio last. Precision Run — 6:30–7:30/mi pace.", rest: "—", muscle: "Cardio" },
    ],
    bonus: [
      { category: "⚡ SPORT POWER", items: [
        { name: "Cable Woodchop (high to low)", sets: "3", reps: "12 each side", note: "Rotational power — tennis, golf, lacrosse. Drive from hips, not arms." },
        { name: "Medicine Ball Rotational Slam", sets: "3", reps: "10 each side", note: "Explosive rotation. Massive sport carryover." },
        { name: "Lateral Bound (single-leg)", sets: "3", reps: "8 each side", note: "Basketball / lacrosse / tennis court movement. Stick the landing." },
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
        { name: "Precision Run — Incline Walk", sets: "1", reps: "20–30 min", note: "10–12% incline, 3.0–3.5 mph. Fat burn zone." },
        { name: "Precision Run — HIIT", sets: "1", reps: "8 rounds", note: "30 sec sprint / 90 sec walk. Auto-HIIT mode." },
        { name: "Rooftop Pool Laps", sets: "1", reps: "20 min", note: "Low impact, full body — active recovery cardio." },
      ]},
    ],
  },
  monday: {
    title: "Push Day A",
    subtitle: "Monday — Chest / Shoulders / Triceps",
    duration: "~60 min", bonusDuration: "+15–20 min",
    tag: "PUSH", tagColor: "#00E5FF",
    exercises: [
      { name: "Slight Incline DB Press (6:0:1:0)", sets: "4", reps: "8-8-8-6", note: "6-sec eccentric — time under tension over ego weight.", frameNote: "Slight incline (15–20°) is ideal for your frame — takes anterior shoulder stress off flat. Keep DBs at chest level, elbows at 60°. Your long arms make the eccentric brutal — that's the whole point.", rest: "90 sec", muscle: "Chest" },
      { name: "Flat DB Press (6:0:1:0)", sets: "3", reps: "8-8-8", note: "Full stretch, max contraction.", frameNote: "Touch lower chest. Full stretch at bottom. Long arms give you a better stretch than anyone in the gym — use it.", rest: "90 sec", muscle: "Chest" },
      { name: "Weighted Chest Dips", sets: "3", reps: "10-8-8", note: "Add weight every session.", frameNote: "Cap depth at 90° elbow bend. Going deeper with your arm length puts excessive torque on the shoulder. Quality over ROM here.", rest: "75 sec", muscle: "Chest" },
      { name: "Wide Cable Shoulder Press", sets: "3", reps: "12-10-8", note: "", rest: "60 sec", muscle: "Shoulders" },
      { name: "Lateral Raise", sets: "3", reps: "15-15-15", note: "Strict — builds the athletic shoulder cap.", frameNote: "Thumbs slightly down, lead with elbows. At your height, controlling the top range matters — don't let it become a shrug.", rest: "60 sec", muscle: "Shoulders" },
      { name: "Cable Triceps Extension", sets: "3", reps: "12-12-12", note: "", rest: "60 sec", muscle: "Triceps" },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", note: "Cardio last. 10–12% incline, 3.0–3.5 mph.", rest: "—", muscle: "Cardio" },
    ],
    bonus: [
      { category: "💪 EXTRA CHEST", items: [
        { name: "Heavy DB Bench — Paused Reps", sets: "3", reps: "6-6-6", note: "1-sec pause at chest. Controlled power." },
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
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "25–30 min", note: "10–15% incline, 3.0–3.5 mph." },
        { name: "Cycling Studio — Open Ride", sets: "1", reps: "20 min", note: "Low intensity — HR up, legs fresh." },
        { name: "Power Plate — Cool Down", sets: "1", reps: "10 min", note: "Vibration recovery post-push." },
      ]},
    ],
  },
  tuesday: {
    title: "Pull Day A",
    subtitle: "Tuesday — Back / Biceps / Forearms",
    duration: "~65 min", bonusDuration: "+15–20 min",
    tag: "PULL", tagColor: "#FF6B35",
    exercises: [
      { name: "Weighted Pull-Up (5:0:1:0)", sets: "4", reps: "8-8-8-6", note: "Load it. Slow eccentric.", frameNote: "FULL dead hang. At 6'3\" you have more range than anyone. Let the lats fully stretch — this is where your size becomes an advantage. Don't half-rep these.", rest: "2 min", muscle: "Back" },
      { name: "Kneeling Straight Arm Lat Pulldown", sets: "3", reps: "10-10-10", note: "Pure lat isolation.", rest: "60 sec", muscle: "Back" },
      { name: "Bent Over Barbell Row (reverse grip)", sets: "4", reps: "10-10-10-8", note: "Controlled. Own every rep.", frameNote: "Hip hinge deep — you'll be more horizontal than shorter lifters and that's correct. Pull to lower abdomen, not chest. Long torso means longer moment arm on your lower back — brace hard.", rest: "90 sec", muscle: "Back" },
      { name: "Barbell Seal Row", sets: "3", reps: "12-10-10", note: "Chest on bench — zero momentum.", frameNote: "Best row for tall athletes. Eliminates lower back stress completely. Full stretch at bottom — let the shoulder blades spread before each pull.", rest: "75 sec", muscle: "Back" },
      { name: "Preacher Curl + Barbell Curl SS", sets: "3", reps: "12 / 10", note: "Classic. No rest between.", rest: "75 sec", muscle: "Biceps" },
      { name: "Hammer Curls", sets: "3", reps: "10-10-10", note: "", rest: "60 sec", muscle: "Biceps" },
      { name: "Precision Run — Steady State", sets: "1", reps: "20 min", note: "Cardio last. Easy pace — active flush after pull volume.", rest: "—", muscle: "Cardio" },
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
        { name: "Precision Run — HIIT Sprints", sets: "1", reps: "10 rounds", note: "30 sec max effort / 60 sec walk. Auto-HIIT mode." },
        { name: "Precision Run — Incline Walk", sets: "1", reps: "25 min", note: "12% incline, 3.2 mph. Extended burn." },
        { name: "Rooftop Pool — Laps", sets: "1", reps: "20 min", note: "Back decompression + full body conditioning." },
      ]},
    ],
  },
  wednesday: {
    title: "Legs + Sport Power",
    subtitle: "Wednesday — Quads / Hams / Glutes / Athletic",
    duration: "~65 min", bonusDuration: "+15 min",
    tag: "LEGS", tagColor: "#A8FF3E",
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "10-8-8-6", note: "Progressive load. Foundation of all court and field movement.", frameNote: "Same setup every time: wider stance, toes out 30–35°, chest up, squat INTO it. Depth to parallel minimum — your mobility allows more over time. Film yourself from the side every few weeks.", rest: "2 min", muscle: "Quads / Glutes" },
      { name: "Romanian Deadlift", sets: "4", reps: "10-10-10-8", note: "Posterior chain — own the eccentric.", frameNote: "Long hamstrings = elite stretch. Bar close to legs the whole way. Stop when you feel max tension in hamstrings, not when the weight hits the floor.", rest: "90 sec", muscle: "Hamstrings" },
      { name: "Leg Press", sets: "3", reps: "15-12-10", note: "Vary foot position week to week.", frameNote: "Higher foot placement on the sled — protects knees and hits glutes more at your limb length. Don't collapse the platform all the way down.", rest: "75 sec", muscle: "Quads" },
      { name: "Leg Curl (machine)", sets: "4", reps: "12-12-10-10", note: "Isolated hamstring — balance the quad work.", rest: "60 sec", muscle: "Hamstrings" },
      { name: "Calf Raises", sets: "4", reps: "20-20-20-20", note: "Full ROM. Critical for court sports and running. Added set for your frame — tall athletes need more calf volume.", rest: "45 sec", muscle: "Calves" },
      { name: "The Core Cut", sets: "2", reps: "15 each", note: "Hanging Leg Raises · Cable Crunches · GHD Sit Ups", rest: "60 sec", muscle: "Core" },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", note: "Cardio last. 8–10% incline — lactic flush after legs.", rest: "—", muscle: "Cardio" },
    ],
    bonus: [
      { category: "⚡ SPORT POWER", items: [
        { name: "Box Jump", sets: "4", reps: "6-6-6-6", note: "Explosive. Basketball / lacrosse first-step power. Full reset between reps." },
        { name: "Cable Woodchop (high to low)", sets: "3", reps: "12 each side", note: "Golf / tennis / lacrosse rotational power." },
        { name: "Pallof Press", sets: "3", reps: "12 each side", note: "Anti-rotation core. Golf-specific — your swing stabilizer." },
        { name: "Lateral Band Walk", sets: "3", reps: "15 each direction", note: "Hip abductor strength. Court change-of-direction." },
      ]},
      { category: "🦵 EXTRA LEGS", items: [
        { name: "Walking Lunges", sets: "3", reps: "12 each leg", note: "Unilateral — sport-specific stability." },
        { name: "Hip Thrust (barbell)", sets: "3", reps: "12-12-12", note: "Strongest muscle in your body — train it." },
        { name: "Leg Extension (machine)", sets: "3", reps: "15-15-15", note: "Quad finisher." },
      ]},
      { category: "🔥 EXTRA CORE", items: [
        { name: "Ab Wheel Rollout", sets: "3", reps: "10-10-10", note: "" },
        { name: "GHD Decline Sit Ups", sets: "3", reps: "15-15-15", note: "" },
        { name: "Plank", sets: "3", reps: "45 sec", note: "Brace everything — glutes too." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Hill Intervals", sets: "1", reps: "8 rounds", note: "60 sec at 8% incline / 8 mph → 90 sec flat walk." },
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "25–30 min", note: "8% incline after legs — lactic flush + fat burn." },
        { name: "Rooftop Pool — Recovery Swim", sets: "1", reps: "15–20 min", note: "Legs will thank you. Ice bath alternative." },
      ]},
    ],
  },
  thursday: { rest: true },
  friday: {
    title: "Push Day B",
    subtitle: "Friday — Chest / Shoulders / Triceps",
    duration: "~60 min", bonusDuration: "+15–20 min",
    tag: "PUSH", tagColor: "#00E5FF",
    exercises: [
      { name: "Flat DB Bench Press (6:0:1:0)", sets: "4", reps: "8-6-6-5", note: "HEAVY — primary strength lift. Track every week.", frameNote: "This is your barbell. Long arms = massive ROM = more muscle recruited per rep than any shorter lifter doing the same weight. Elbows at 60°, touch lower chest, press straight up.", rest: "2 min", muscle: "Chest" },
      { name: "Incline DB Chest Press", sets: "3", reps: "10-10-10", note: "Upper chest — athletic pressing angle.", rest: "75 sec", muscle: "Chest" },
      { name: "Straight Arm Pullover", sets: "3", reps: "12-10-10", note: "Rib cage expansion. Chest-to-lat transition.", frameNote: "Long arms make this elite. Full overhead stretch, keep a slight elbow bend. Your ROM here is exceptional.", rest: "60 sec", muscle: "Chest / Lats" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10-8-8", note: "Athletic overhead strength.", frameNote: "Stop just before full lockout — keeps tension on the delt, not the joint. At your height, full lockout overhead can dump into shoulder impingement over time.", rest: "75 sec", muscle: "Shoulders" },
      { name: "Upright Row (close grip)", sets: "3", reps: "12-10-10", note: "", rest: "60 sec", muscle: "Shoulders" },
      { name: "Dips + DB Tricep Superset", sets: "3", reps: "10 dips / 10 DB ext", note: "Cap dips at 90°. No rest between.", rest: "75 sec", muscle: "Triceps" },
      { name: "Precision Run — Incline Walk", sets: "1", reps: "15 min", note: "Cardio last. 10–12% incline.", rest: "—", muscle: "Cardio" },
    ],
    bonus: [
      { category: "💪 EXTRA CHEST", items: [
        { name: "Weighted Chest Dips", sets: "3", reps: "10-8-8", note: "Cap at 90°. Add weight each set." },
        { name: "Cable Fly (3 position)", sets: "2", reps: "15-15", note: "High → mid → low, stay on the cable." },
      ]},
      { category: "🏋️ EXTRA SHOULDERS", items: [
        { name: "Lateral Raise Drop Set", sets: "3", reps: "15 → 12 → 10", note: "Elbows above wrists." },
        { name: "Wide DB Upright Row", sets: "2", reps: "12-12", note: "" },
        { name: "Rear Delt Fly", sets: "3", reps: "15-15-15", note: "Posture and shoulder health — never skip." },
      ]},
      { category: "🦾 EXTRA ARMS", items: [
        { name: "Cable Triceps Extension", sets: "3", reps: "12-12-12", note: "" },
        { name: "Push Ups", sets: "1", reps: "50 reps", note: "Absolute finisher." },
      ]},
      { category: "🏃 CARDIO UPGRADE", items: [
        { name: "Precision Run — Extended Incline Walk", sets: "1", reps: "20–30 min", note: "10–15% incline. Friday fat burn." },
        { name: "Precision Run — Tempo Run", sets: "1", reps: "20 min", note: "~85% effort. Athletic conditioning." },
        { name: "Cycling Studio — Open Ride", sets: "1", reps: "20–30 min", note: "Low cadence, high resistance." },
      ]},
    ],
  },
  saturday: {
    title: "Pull Day B + Arms",
    subtitle: "Saturday — Back / Biceps / Triceps",
    duration: "~65 min", bonusDuration: "+20 min",
    tag: "PULL + ARMS", tagColor: "#FF6B35",
    exercises: [
      { name: "Pull-Up Superset", sets: "3", reps: "10 overhand + F neutral", note: "No rest between grips. Full dead hang every rep.", rest: "2 min", muscle: "Back" },
      { name: "Lat Pull Down", sets: "3", reps: "10-10-10", note: "", frameNote: "Pull to upper chest, lean back slightly. At your wingspan, full extension at top = elite stretch. Don't shortcut it.", rest: "60 sec", muscle: "Back" },
      { name: "Barbell Row", sets: "4", reps: "10-10-10-8", note: "Pull to belly button, stay flat.", frameNote: "Hip hinge to ~45°. Brace your core hard — long torso = more lower back stress. Pull deliberately, no jerking. This is one of your best mass builders.", rest: "90 sec", muscle: "Back" },
      { name: "DB Row + Low Cable Row SS", sets: "3", reps: "10 DB / 12 cable", note: "No rest between.", rest: "75 sec", muscle: "Back" },
      { name: "Bicep Cable Curl (3 grip change)", sets: "3", reps: "10 each grip", note: "Supinated / Neutral / Pronated.", rest: "60 sec", muscle: "Biceps" },
      { name: "Tricep Cable Press Down (3 grip change)", sets: "3", reps: "10 each grip", note: "Same cable stack — pair with curls.", rest: "60 sec", muscle: "Triceps" },
      { name: "Precision Run — Steady State or HIIT", sets: "1", reps: "20 min", note: "Cardio last. Steady OR 8 × 30 sec sprint / 90 sec walk.", rest: "—", muscle: "Cardio" },
    ],
    bonus: [
      { category: "💪 GUN SHOP MODE", items: [
        { name: "Barbell Curls + Hammer Curls SS", sets: "3", reps: "12 / 10", note: "No rest — classic pairing." },
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
        { name: "Precision Run — HIIT", sets: "1", reps: "10 rounds", note: "30 sec sprint / 90 sec walk. Saturday sprint work." },
        { name: "Precision Run — Incline Walk", sets: "1", reps: "25 min", note: "12–15% incline, 3.2 mph. Weekend conditioning." },
        { name: "Rooftop Pool — Laps", sets: "1", reps: "20 min", note: "Weekend pool session." },
      ]},
    ],
  },
};

const MUSCLE_COLORS = {
  "Chest":"#FF6B35","Back":"#00E5FF","Legs":"#A8FF3E","Quads / Glutes":"#A8FF3E",
  "Hamstrings":"#A8FF3E","Quads":"#A8FF3E","Calves":"#A8FF3E","Shoulders":"#FFD700",
  "Rear Delts":"#FFD700","Biceps":"#FF69B4","Triceps":"#DA70D6","Core":"#00FF9F",
  "Traps":"#00E5FF","Back / Traps":"#00E5FF","Forearms":"#FF8C69",
  "Cardio":"#00CFFF","Chest / Lats":"#FF6B35",
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

export default function WorkoutApp() {
  const [view, setView]               = useState("today");
  const [activeDay, setActiveDay]     = useState("sunday");
  const [checked, setChecked]         = useState({});
  const [checkedBonus, setCheckedBonus] = useState({});
  const [bonusOpen, setBonusOpen]     = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [weights, setWeights]         = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [overrides, setOverrides]     = useState({});
  const [overrideModal, setOverrideModal] = useState(false);
  const [overrideType, setOverrideType]   = useState(null);
  const [overrideNote, setOverrideNote]   = useState("");
  const [showFrameNote, setShowFrameNote] = useState(null);
  const [loaded, setLoaded]           = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const get = (k) => { try { const v = localStorage.getItem(k); return v ? { value: v } : null; } catch(e) { return null; } };
        const [c, b, w, d, ov] = ["ironatlas-checked","ironatlas-bonus","ironatlas-weights","ironatlas-completed","ironatlas-overrides"].map(get);
        if (c?.value) setChecked(JSON.parse(c.value));
        if (b?.value) setCheckedBonus(JSON.parse(b.value));
        if (w?.value) setWeights(JSON.parse(w.value));
        if (d?.value) setCompletedDays(JSON.parse(d.value));
        if (ov?.value) setOverrides(JSON.parse(ov.value));
      } catch(e) {}
      setLoaded(true);
    })();
  }, []);

  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
  };

  const toggleCheck = (key) => {
    const n = { ...checked, [key]: !checked[key] };
    setChecked(n); save("ironatlas-checked", n);
  };
  const toggleBonus = (key) => {
    const n = { ...checkedBonus, [key]: !checkedBonus[key] };
    setCheckedBonus(n); save("ironatlas-bonus", n);
  };
  const setWeight = (key, val) => {
    const n = { ...weights, [key]: val };
    setWeights(n); save("ironatlas-weights", n);
  };
  const markComplete = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!completedDays.includes(today)) {
      const n = [today, ...completedDays].slice(0, 90);
      setCompletedDays(n); save("ironatlas-completed", n);
    }
  };
  const logOverride = () => {
    if (!overrideType) return;
    const today = new Date().toISOString().split("T")[0];
    const newOv = { ...overrides, [today]: { type: overrideType, note: overrideNote.trim() } };
    setOverrides(newOv); save("ironatlas-overrides", newOv);
    if (!completedDays.includes(today)) {
      const n = [today, ...completedDays].slice(0, 90);
      setCompletedDays(n); save("ironatlas-completed", n);
    }
    setOverrideModal(false); setOverrideType(null); setOverrideNote("");
  };
  const resetDay = () => {
    const nc = { ...checked };
    const nb = { ...checkedBonus };
    exercises.forEach((_, i) => delete nc[`${activeDay}-${i}`]);
    workout?.bonus?.forEach((s,si) => s.items.forEach((_,ii) => delete nb[`${activeDay}-b${si}-${ii}`]));
    setChecked(nc); save("ironatlas-checked", nc);
    setCheckedBonus(nb); save("ironatlas-bonus", nb);
  };

  const workout    = WORKOUTS[activeDay];
  const isRest     = workout?.rest;
  const exercises  = workout?.exercises || [];
  const coreDone   = exercises.filter((_, i) => checked[`${activeDay}-${i}`]).length;
  const corePct    = exercises.length ? (coreDone / exercises.length) * 100 : 0;
  const today      = new Date().toISOString().split("T")[0];
  const todayDone  = completedDays.includes(today);

  const streak = (() => {
    let s = 0, d = new Date();
    if (!completedDays.includes(d.toISOString().split("T")[0])) d.setDate(d.getDate() - 1);
    while (true) {
      const key = d.toISOString().split("T")[0];
      if (!completedDays.includes(key)) break;
      s++; d.setDate(d.getDate() - 1);
    }
    return s;
  })();

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const thisWeekCount = completedDays.filter(d => new Date(d) >= weekStart).length;

  if (!loaded) return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:"#333", fontSize:11, letterSpacing:3 }}>LOADING...</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", color:"#F0F0F0", fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif", maxWidth:480, margin:"0 auto" }}>
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
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; }
        input[type=number] { -moz-appearance:textfield; }
        .wt-input { background:#1A1A1A; border:1px solid #2A2A2A; color:#F0F0F0;
          border-radius:5px; padding:4px 6px; font-family:'Barlow Condensed',sans-serif;
          font-size:12px; width:72px; text-align:center; outline:none; }
        .wt-input:focus { border-color:#555; }
        .wt-input::placeholder { color:#333; }
      `}</style>

      {/* HEADER */}
      <div style={{ background:"#111", borderBottom:"1px solid #1C1C1C", padding:"12px 18px 9px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:3, color:"#3A3A3A" }}>PEAK CONDITION</div>
            <div style={{ fontSize:21, fontWeight:800, letterSpacing:1, textTransform:"uppercase" }}>IRON ATLAS</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:900, color: streak > 0 ? "#FF6B35" : "#2A2A2A", lineHeight:1 }}>{streak}</div>
              <div style={{ fontSize:7, color:"#3A3A3A", letterSpacing:1, marginTop:1 }}>STREAK</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:900, color: thisWeekCount > 0 ? "#A8FF3E" : "#2A2A2A", lineHeight:1 }}>{thisWeekCount}</div>
              <div style={{ fontSize:7, color:"#3A3A3A", letterSpacing:1, marginTop:1 }}>THIS WEEK</div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:3 }}>
          {[["today","TODAY"],["week","SPLIT"],["phases","6-MONTH"],["recover","RECOVER"],["design","DESIGN"]].map(([v,l]) => (
            <button key={v} className="tap" onClick={() => setView(v)} style={{ flex:1, padding:"6px 1px", borderRadius:5, fontSize:7, fontWeight:700, letterSpacing:0.5, background:view===v?"#A8FF3E":"#1A1A1A", color:view===v?"#000":"#555", fontFamily:"Barlow Condensed" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* TODAY */}
      {view === "today" && (
        <div className="up">
          <div style={{ padding:"9px 18px 0", overflowX:"auto" }}>
            <div style={{ display:"flex", gap:5, paddingBottom:3 }}>
              {DAY_KEYS.map((key,i) => {
                const w = WORKOUTS[key];
                const active = activeDay === key;
                const c = w?.tagColor || "#333";
                const dayDone = completedDays.some(d => {
                  const dt = new Date(d + "T12:00:00");
                  return dt.getDay() === i && (Date.now() - dt.getTime()) < 7*24*3600*1000;
                });
                return (
                  <button key={key} className="tap" onClick={() => { setActiveDay(key); setBonusOpen(null); setShowFrameNote(null); }}
                    style={{ minWidth:50, padding:"7px 2px", borderRadius:6, background:active?c:"#181818", color:active?"#000":"#484848", fontFamily:"Barlow Condensed", fontWeight:700, fontSize:8, letterSpacing:1, textTransform:"uppercase", flexShrink:0, position:"relative" }}>
                    <div style={{ fontSize:9 }}>{DAY_LABELS[i]}</div>
                    <div style={{ fontSize:6, marginTop:1, opacity:0.8 }}>{key==="thursday"?"REST":(w?.tag?.split(" ")[0]||"")}</div>
                    {dayDone && <div style={{ position:"absolute", top:3, right:5, width:5, height:5, borderRadius:"50%", background:"#A8FF3E" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {isRest ? (
            <div style={{ padding:24, textAlign:"center", marginTop:20 }}>
              <div style={{ fontSize:42 }}>🛌</div>
              <div style={{ fontSize:22, fontWeight:800, marginTop:10, letterSpacing:2 }}>REST DAY</div>
              <div style={{ color:"#555", marginTop:6, fontSize:13 }}>Active recovery — how you stay ahead</div>
              <div style={{ marginTop:16, background:"#181818", borderRadius:10, padding:14, textAlign:"left" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:"#444", marginBottom:10 }}>PRINTING HOUSE PROTOCOLS</div>
                {["Precision Run — easy incline walk, 20 min","Rooftop pool laps — active recovery, low impact","Power Plate — 10 min vibration session","Steam room — post-session decompression","Yoga or Pilates class — see Equinox schedule","8+ hours sleep — non-negotiable"].map((item,i,arr) => (
                  <div key={i} style={{ padding:"6px 0", borderBottom:i<arr.length-1?"1px solid #222":"none", fontSize:12, color:"#666", display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:"#A8FF3E", fontSize:9 }}>✦</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ) : workout && (
            <>
              <div style={{ padding:"12px 18px 10px", borderBottom:"1px solid #181818" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ display:"inline-block", background:workout.tagColor, color:"#000", fontSize:7, fontWeight:800, letterSpacing:2, padding:"2px 6px", borderRadius:3, marginBottom:4 }}>{workout.tag}</div>
                    <div style={{ fontSize:21, fontWeight:800, letterSpacing:0.5, lineHeight:1 }}>{workout.title}</div>
                    <div style={{ fontSize:10, color:"#484848", marginTop:2 }}>{workout.subtitle}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0, marginLeft:10 }}>
                    <div style={{ fontSize:9, color:"#484848", letterSpacing:1 }}>CORE</div>
                    <div style={{ fontSize:14, fontWeight:700, color:workout.tagColor }}>{workout.duration}</div>
                    <div style={{ fontSize:9, color:"#FFD700", marginTop:2 }}>+bonus {workout.bonusDuration}</div>
                  </div>
                </div>
                <div style={{ marginTop:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:9, color:"#444", letterSpacing:1 }}>CORE WORKOUT</span>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:9, color:workout.tagColor, fontWeight:700 }}>{coreDone}/{exercises.length}</span>
                      {coreDone > 0 && (
                        <button className="tap" onClick={resetDay} style={{ fontSize:7, color:"#3A3A3A", padding:"1px 5px", border:"1px solid #2A2A2A", borderRadius:3, letterSpacing:1 }}>RESET</button>
                      )}
                    </div>
                  </div>
                  <div style={{ background:"#1A1A1A", borderRadius:3, height:3 }}>
                    <div className="bar" style={{ height:"100%", width:`${corePct}%`, background:workout.tagColor, borderRadius:3 }} />
                  </div>
                </div>
              </div>

              <div style={{ padding:"0 18px" }}>
                <div style={{ fontSize:7, letterSpacing:2, color:"#2E2E2E", padding:"8px 0 2px", fontWeight:700 }}>CORE WORKOUT · {workout.duration}</div>

                {exercises.map((ex, i) => {
                  const ck = `${activeDay}-${i}`;
                  const done = checked[ck];
                  const mc = MUSCLE_COLORS[ex.muscle] || "#555";
                  const isCardio = ex.muscle === "Cardio";
                  const numSets = isCardio ? 0 : Math.max(1, parseInt(ex.sets) || 1);
                  const frameOpen = showFrameNote === `${activeDay}-${i}`;
                  return (
                    <div key={i} style={{ borderBottom:"1px solid #161616" }}>
                      <div style={{ padding:"11px 0", opacity:done?0.32:1, display:"flex", gap:9, alignItems:"flex-start" }}>
                        <button className="tap" onClick={() => toggleCheck(ck)} style={{ width:24, height:24, borderRadius:"50%", border:`2px solid ${done?mc:"#2A2A2A"}`, background:done?mc:"transparent", flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {done && <span style={{ color:"#000", fontSize:10, fontWeight:900 }}>✓</span>}
                        </button>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"flex-start", gap:5 }}>
                            <div style={{ fontSize:13, fontWeight:700, textDecoration:done?"line-through":"none", lineHeight:1.2, flex:1 }}>{ex.name}</div>
                            {ex.frameNote && (
                              <button className="tap" onClick={() => setShowFrameNote(frameOpen ? null : `${activeDay}-${i}`)}
                                style={{ background:frameOpen?"#FFD700":"#1A1A00", border:`1px solid ${frameOpen?"#FFD700":"#3A3A00"}`, borderRadius:4, padding:"2px 5px", fontSize:7, fontWeight:800, color:frameOpen?"#000":"#FFD700", letterSpacing:1, flexShrink:0, marginTop:1 }}>
                                6'3"
                              </button>
                            )}
                          </div>
                          <div style={{ display:"flex", gap:8, marginTop:3, flexWrap:"wrap", alignItems:"center" }}>
                            <span style={{ fontSize:10, color:"#505050" }}>{ex.sets} sets · {ex.reps}</span>
                            <span style={{ fontSize:8, color:mc, fontWeight:700, letterSpacing:1 }}>{ex.muscle?.toUpperCase()}</span>
                            {ex.rest && ex.rest !== "—" && (
                              <span style={{ fontSize:7, color:"#3A3A3A", letterSpacing:1 }}>REST {ex.rest}</span>
                            )}
                          </div>
                          {ex.note && <div style={{ fontSize:9, color:"#2E2E2E", marginTop:2 }}>{ex.note}</div>}
                          {frameOpen && ex.frameNote && (
                            <div className="frame-modal" style={{ background:"#1A1500", border:"1px solid #3A3000", borderRadius:7, padding:"9px 11px", marginTop:8 }}>
                              <div style={{ fontSize:7, color:"#FFD700", fontWeight:800, letterSpacing:2, marginBottom:4 }}>📏 6'3" FRAME NOTE</div>
                              <div style={{ fontSize:10, color:"#AAA", lineHeight:1.5 }}>{ex.frameNote}</div>
                            </div>
                          )}
                        </div>
                        {!isCardio && (
                          <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end" }}>
                            {Array.from({ length: numSets }, (_, s) => {
                              const wk = `${activeDay}-${i}-s${s}`;
                              return (
                                <div key={s} style={{ display:"flex", alignItems:"center", gap:4 }}>
                                  <span style={{ fontSize:7, color:"#2E2E2E", fontWeight:700, letterSpacing:1 }}>S{s+1}</span>
                                  <input
                                    type="number"
                                    className="wt-input"
                                    placeholder="lbs"
                                    value={weights[wk] || ""}
                                    onChange={e => setWeight(wk, e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div style={{ padding:"14px 0" }}>
                  {todayDone ? (
                    <div style={{ background: overrides[today] ? "#1A1200" : "#0D1A0D", border: `1px solid ${overrides[today] ? "#FFD700" : "#A8FF3E"}`, borderRadius:9, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:800, color: overrides[today] ? "#FFD700" : "#A8FF3E", letterSpacing:1 }}>
                          {overrides[today] ? `✦ ${overrides[today].type}` : "✓ WORKOUT LOGGED"}
                        </div>
                        {overrides[today]?.note && <div style={{ fontSize:9, color:"#555", marginTop:3 }}>{overrides[today].note}</div>}
                      </div>
                      <button className="tap" onClick={() => setOverrideModal(true)} style={{ fontSize:8, color:"#333", padding:"3px 7px", border:"1px solid #2A2A2A", borderRadius:4, letterSpacing:1 }}>EDIT</button>
                    </div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {corePct === 100 ? (
                        <button className="tap" onClick={markComplete} style={{ width:"100%", padding:"14px", borderRadius:9, background:"#A8FF3E", color:"#000", fontSize:13, fontWeight:800, letterSpacing:2, cursor:"pointer", border:"none" }}>
                          LOG WORKOUT COMPLETE
                        </button>
                      ) : (
                        <div style={{ textAlign:"center", padding:"8px 0" }}>
                          <div style={{ fontSize:9, color:"#2E2E2E", letterSpacing:2 }}>COMPLETE ALL EXERCISES TO LOG</div>
                          <div style={{ fontSize:10, color:"#3A3A3A", marginTop:4 }}>{exercises.length - coreDone} remaining</div>
                        </div>
                      )}
                      <button className="tap" onClick={() => setOverrideModal(true)} style={{ width:"100%", padding:"10px", borderRadius:9, background:"transparent", border:"1px solid #222", color:"#444", fontSize:11, fontWeight:700, letterSpacing:1, cursor:"pointer" }}>
                        OVERRIDE — REST / DIFFERENT SESSION
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {workout.bonus && (
                <div style={{ padding:"0 18px 90px" }}>
                  <div style={{ margin:"4px 0 10px", display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ height:1, flex:1, background:"#1E1E1E" }} />
                    <div style={{ fontSize:8, letterSpacing:2, color:"#FFD700", fontWeight:700, whiteSpace:"nowrap" }}>⚡ BONUS ROUND</div>
                    <div style={{ height:1, flex:1, background:"#1E1E1E" }} />
                  </div>
                  {workout.bonus.map((section, si) => {
                    const open = bonusOpen === si;
                    const secDone = section.items.filter((_,ii) => checkedBonus[`${activeDay}-b${si}-${ii}`]).length;
                    return (
                      <div key={si} style={{ marginBottom:8, background:"#0E0E0E", borderRadius:9, border:"1px solid #1E1E1E", overflow:"hidden" }}>
                        <button className="tap" onClick={() => setBonusOpen(open?null:si)} style={{ width:"100%", padding:"11px 13px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                            <span style={{ fontSize:17 }}>{section.category.split(" ")[0]}</span>
                            <div style={{ textAlign:"left" }}>
                              <div style={{ fontSize:12, fontWeight:700 }}>{section.category.replace(/^[^ ]+ /,"")}</div>
                              <div style={{ fontSize:8, color:"#3A3A3A", letterSpacing:1 }}>{section.items.length} exercises · optional</div>
                            </div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                            {secDone > 0 && <span style={{ background:"#FFD700", color:"#000", fontSize:7, fontWeight:800, padding:"2px 5px", borderRadius:8 }}>{secDone}/{section.items.length}</span>}
                            <span style={{ color:"#444", fontSize:18, display:"inline-block", transform:open?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s" }}>›</span>
                          </div>
                        </button>
                        {open && (
                          <div style={{ borderTop:"1px solid #181818" }}>
                            {section.items.map((ex,ii) => {
                              const bk = `${activeDay}-b${si}-${ii}`;
                              const done = checkedBonus[bk];
                              const isCardio = (ex.note||"").toLowerCase().includes("precision") || (ex.note||"").toLowerCase().includes("pool") || (ex.name||"").toLowerCase().includes("cardio") || (ex.name||"").toLowerCase().includes("run") || (ex.name||"").toLowerCase().includes("cycling") || (ex.name||"").toLowerCase().includes("pool");
                              const numSets = isCardio ? 0 : Math.max(1, parseInt(ex.sets) || 1);
                              return (
                                <div key={ii} style={{ padding:"10px 13px", borderBottom:ii<section.items.length-1?"1px solid #141414":"none", opacity:done?0.3:1, display:"flex", gap:9, alignItems:"flex-start" }}>
                                  <button className="tap" onClick={() => toggleBonus(bk)} style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${done?"#FFD700":"#2A2A2A"}`, background:done?"#FFD700":"transparent", flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                    {done && <span style={{ color:"#000", fontSize:8, fontWeight:900 }}>✓</span>}
                                  </button>
                                  <div style={{ flex:1, minWidth:0 }}>
                                    <div style={{ fontSize:12, fontWeight:700, textDecoration:done?"line-through":"none", lineHeight:1.2 }}>{ex.name}</div>
                                    <div style={{ fontSize:10, color:"#484848", marginTop:1 }}>{ex.sets} · {ex.reps}</div>
                                    {ex.note && <div style={{ fontSize:9, color:"#2E2E2E", marginTop:1 }}>{ex.note}</div>}
                                  </div>
                                  {!isCardio && (
                                    <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end" }}>
                                      {Array.from({ length: numSets }, (_, s) => {
                                        const wk = `b-${activeDay}-${si}-${ii}-s${s}`;
                                        return (
                                          <div key={s} style={{ display:"flex", alignItems:"center", gap:4 }}>
                                            <span style={{ fontSize:7, color:"#2E2E2E", fontWeight:700, letterSpacing:1 }}>S{s+1}</span>
                                            <input type="number" className="wt-input" placeholder="lbs" style={{ width:60 }}
                                              value={weights[wk] || ""} onChange={e => setWeight(wk, e.target.value)} onClick={e => e.stopPropagation()} />
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
            <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setOverrideModal(false)}>
              <div style={{ background:"#111", borderRadius:"16px 16px 0 0", padding:24, width:"100%", maxWidth:480, border:"1px solid #222", borderBottom:"none" }} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize:14, fontWeight:800, letterSpacing:1, marginBottom:4 }}>LOG OVERRIDE</div>
                <div style={{ fontSize:10, color:"#484848", marginBottom:18 }}>You still showed up — log what actually happened.</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
                  {[
                    { label:"🛌  Rest Day",            sub:"Planned or needed it",      color:"#00E5FF" },
                    { label:"👂  Listened to My Body", sub:"Felt off — smart call",     color:"#A8FF3E" },
                    { label:"🏃  Different Workout",   sub:"Ran, swam, court, bike…",   color:"#FFD700" },
                    { label:"✈️  Travel / No Gym",     sub:"Out of town or no access",  color:"#FF6B35" },
                    { label:"🤕  Managing Injury",     sub:"Protecting something",      color:"#FF3B3B" },
                  ].map(({ label, sub, color }) => {
                    const sel = overrideType === label;
                    return (
                      <button key={label} className="tap" onClick={() => setOverrideType(label)}
                        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:9, background: sel ? "#1A1A1A" : "#0E0E0E", border: `1px solid ${sel ? color : "#1E1E1E"}`, cursor:"pointer", textAlign:"left" }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color: sel ? color : "#888" }}>{label}</div>
                          <div style={{ fontSize:9, color:"#3A3A3A", marginTop:2 }}>{sub}</div>
                        </div>
                        {sel && <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0 }} />}
                      </button>
                    );
                  })}
                </div>
                <input type="text" placeholder="Add a note (optional)…" value={overrideNote} onChange={e => setOverrideNote(e.target.value)}
                  style={{ width:"100%", background:"#0E0E0E", border:"1px solid #1E1E1E", borderRadius:8, padding:"10px 12px", color:"#F0F0F0", fontFamily:"Barlow Condensed, sans-serif", fontSize:12, outline:"none", marginBottom:16 }} />
                <div style={{ display:"flex", gap:9 }}>
                  <button className="tap" onClick={() => { setOverrideModal(false); setOverrideType(null); setOverrideNote(""); }}
                    style={{ flex:1, padding:"12px", borderRadius:9, background:"transparent", border:"1px solid #222", color:"#555", fontSize:11, fontWeight:700, letterSpacing:1, cursor:"pointer" }}>CANCEL</button>
                  <button className="tap" onClick={logOverride} disabled={!overrideType}
                    style={{ flex:2, padding:"12px", borderRadius:9, background: overrideType ? "#FFD700" : "#1A1A1A", border:"none", color: overrideType ? "#000" : "#333", fontSize:12, fontWeight:800, letterSpacing:1, cursor: overrideType ? "pointer" : "default" }}>LOG IT</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* WEEKLY SPLIT */}
      {view === "week" && (
        <div className="up" style={{ padding:18, paddingBottom:80 }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:1 }}>WEEKLY SPLIT</div>
            <div style={{ fontSize:11, color:"#555", marginTop:2 }}>5–6 days · Push / Pull / Legs / Full Body</div>
          </div>
          {WEEKLY_SPLIT.map((day,i) => {
            const tc = { push:"#00E5FF", pull:"#FF6B35", legs:"#A8FF3E", rest:"#333", full:"#FFD700" };
            const c = tc[day.tag] || "#555";
            const w = WORKOUTS[DAY_KEYS[i]];
            return (
              <div key={i} style={{ background:"#111", borderRadius:9, padding:13, marginBottom:7, borderLeft:`3px solid ${c}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:9, color:c, fontWeight:700, letterSpacing:2 }}>{day.day}</div>
                    <div style={{ fontSize:16, fontWeight:800, marginTop:1 }}>{day.focus}</div>
                    <div style={{ fontSize:10, color:"#484848", marginTop:1 }}>{day.muscles}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    {w?.duration && <div style={{ fontSize:11, color:c, fontWeight:700 }}>{w.duration}</div>}
                    {w?.bonusDuration && <div style={{ fontSize:9, color:"#FFD700" }}>+{w.bonusDuration} bonus</div>}
                    {w?.rest && <div style={{ fontSize:11, color:"#444" }}>REST</div>}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Rest Intervals */}
          <div style={{ background:"#111", borderRadius:9, padding:13, marginTop:13, border:"1px solid #1C1C1C" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#FFD700", marginBottom:10, fontWeight:700 }}>⏱ REST INTERVALS — 6'3" PROTOCOL</div>
            <div style={{ fontSize:9, color:"#3A3A3A", marginBottom:10 }}>Larger athletes need more CNS recovery between heavy sets. These are minimums.</div>
            {REST_INTERVALS.map((r,i) => (
              <div key={i} style={{ padding:"8px 0", borderBottom:i<REST_INTERVALS.length-1?"1px solid #1A1A1A":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:800, color:r.color }}>{r.type}</div>
                    <div style={{ fontSize:9, color:"#3A3A3A", marginTop:2 }}>{r.exs}</div>
                  </div>
                  <div style={{ fontSize:13, fontWeight:900, color:r.color, flexShrink:0, marginLeft:10 }}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:9, padding:13, marginTop:10, border:"1px solid #1C1C1C" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:9 }}>SESSION TIME GUIDE</div>
            {[["Core workout only","~65 min","#A8FF3E"],["+ 1 bonus section","+15 min","#FFD700"],["+ All bonus sections","+30–40 min","#FF6B35"]].map(([l,t,c]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #1A1A1A" }}>
                <span style={{ fontSize:12, color:"#666" }}>{l}</span>
                <span style={{ fontSize:12, fontWeight:700, color:c }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:9, padding:13, marginTop:10, border:"1px solid #1C1C1C" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:10 }}>RECENT WORKOUTS</div>
            {completedDays.length === 0 ? (
              <div style={{ fontSize:11, color:"#333" }}>No workouts logged yet. Complete your first session.</div>
            ) : completedDays.slice(0,10).map((d,i) => {
              const ov = overrides[d];
              return (
                <div key={i} style={{ padding:"6px 0", borderBottom:i<Math.min(completedDays.length,10)-1?"1px solid #1A1A1A":"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <span style={{ fontSize:11, color:"#666" }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span>
                    <span style={{ fontSize:10, color: ov ? "#FFD700" : "#A8FF3E", fontWeight:700 }}>{ov ? ov.label || ov.type.replace(/^[^ ]+ /,"") : "✓ Full Session"}</span>
                  </div>
                  {ov?.note && <div style={{ fontSize:9, color:"#3A3A3A", marginTop:2, textAlign:"right" }}>{ov.note}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6-MONTH PHASES */}
      {view === "phases" && (
        <div className="up" style={{ padding:18, paddingBottom:80 }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:1 }}>6-MONTH PLAN</div>
            <div style={{ fontSize:11, color:"#555", marginTop:2 }}>Progressive overload across 3 phases · Calibrated for 6'3" frame</div>
          </div>
          <div style={{ display:"flex", gap:7, marginBottom:14 }}>
            {PHASES.map((p,i) => (
              <button key={i} className="tap" onClick={() => setActivePhase(i)} style={{ flex:1, padding:"10px 3px", borderRadius:7, background:activePhase===i?p.color:"#1A1A1A", color:activePhase===i?"#000":"#484848", fontFamily:"Barlow Condensed", fontWeight:700, fontSize:9, letterSpacing:1, border:"none", cursor:"pointer" }}>
                <div>{p.name}</div>
                <div style={{ fontSize:7, marginTop:2 }}>{p.months}</div>
              </button>
            ))}
          </div>
          {(() => {
            const p = PHASES[activePhase];
            const d = [
              {
                weeks:[
                  { w:"Weeks 1–2", title:"Pattern establishment", detail:"Movement quality first. Squat, RDL, row — film yourself. At 6'3\" grooving patterns correctly takes longer. Weight is secondary to mechanics." },
                  { w:"Weeks 3–4", title:"Load introduction", detail:"Start progressive overload. Add weight weekly on every compound. Log everything from day 1. Your log is your compass for the next 6 months." },
                  { w:"Weeks 5–6", title:"Volume ramp + bonus", detail:"2 bonus sections per workout. Sport power every Wednesday. Cardio every session, last. You should be feeling the program now." },
                  { w:"Weeks 7–8", title:"Peak load week + first deload", detail:"Week 7: max loads, all bonus sections. Week 8: drop to 60% volume. Larger athletes need longer deloads — take the full week." },
                  { w:"Weeks 9–10", title:"Phase 1 consolidation", detail:"Return to full volume. Your mechanics are grooved now — start attacking weight. This extra 2 weeks is where your frame pays off." },
                ],
                focus:["Movement patterns grooved correctly for tall frame","Progressive overload logged from day 1","Lower body fully back in rotation","10 weeks — not 8 — because your frame demands it"],
                deload: "Week 8: full deload at 60% volume · 90 sec rest on all sets · no bonus sections"
              },
              {
                weeks:[
                  { w:"Weeks 11–12", title:"Full volume block", detail:"5–6 sets on key compounds. All bonus sections. 75–90 min sessions. This is where size happens — your frame can handle extreme volume." },
                  { w:"Weeks 13–14", title:"Supersets everything", detail:"Pair every lift. 60–90 sec rest between pairs. Constant pump. Conditioning meets hypertrophy." },
                  { w:"Weeks 15–16", title:"Gun Shop protocols", detail:"Drop sets, giant sets on arms. Peak arm volume. Sport power intensity goes up significantly." },
                  { w:"Weeks 17–18", title:"Load then structured deload", detail:"Week 17: heaviest week in the program. Week 18: structured deload — 50% volume, full rest intervals, mobility focus. Measure, photograph, assess." },
                ],
                focus:["Visible size across all muscle groups","Arms at absolute peak volume","Legs match upper body athleticism","Sport-specific power measurably improved"],
                deload: "Week 18: structured deload · 50% volume · full rest intervals · 20 min mobility each session"
              },
              {
                weeks:[
                  { w:"Weeks 19–20", title:"Heavy compound peak", detail:"Test 1RMs week 20: squat, DB bench, barbell row. Max strength expression — you've been building to this." },
                  { w:"Weeks 21–22", title:"Athletic output", detail:"Box jumps, explosive work elevated. Sport conditioning at peak. Train like a professional again." },
                  { w:"Weeks 23–24", title:"Game shape — full peak", detail:"Higher rep density, peak conditioning. Retest maxes vs week 1. You'll know exactly how far you've come. This is what 6 months of compounding looks like." },
                ],
                focus:["New strength PRs on all lifts — squat, bench, row","Athletic explosiveness restored","Peak physique — size, shape, leanness","Ready for any court or course"],
                deload: "Final week: active recovery only — pool, walks, mobility. Let it all settle."
              },
            ][activePhase];
            return (
              <div>
                <div style={{ background:"#111", borderRadius:11, padding:14, marginBottom:13, borderLeft:`3px solid ${p.color}` }}>
                  <div style={{ fontSize:18, fontWeight:800, color:p.color }}>{p.name}: {p.subtitle}</div>
                  <div style={{ fontSize:9, color:"#484848", letterSpacing:1, marginTop:2 }}>{p.months}</div>
                  <div style={{ fontSize:12, color:"#555", marginTop:7 }}>{p.desc}</div>
                </div>

                <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:7 }}>WEEK BY WEEK</div>
                {d.weeks.map((w,i) => (
                  <div key={i} style={{ background:"#111", borderRadius:7, padding:12, marginBottom:6 }}>
                    <div style={{ fontSize:8, color:p.color, fontWeight:700, letterSpacing:2 }}>{w.w}</div>
                    <div style={{ fontSize:13, fontWeight:700, marginTop:3 }}>{w.title}</div>
                    <div style={{ fontSize:10, color:"#484848", marginTop:2 }}>{w.detail}</div>
                  </div>
                ))}

                <div style={{ background:"#1A0E00", border:"1px solid #3A2200", borderRadius:9, padding:12, marginTop:10 }}>
                  <div style={{ fontSize:8, color:"#FF6B35", fontWeight:700, letterSpacing:2, marginBottom:4 }}>⚡ DELOAD PROTOCOL</div>
                  <div style={{ fontSize:10, color:"#666" }}>{d.deload}</div>
                </div>

                <div style={{ background:"#111", borderRadius:9, padding:13, marginTop:10 }}>
                  <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:9 }}>PHASE {activePhase+1} GOALS</div>
                  {d.focus.map((f,i) => (
                    <div key={i} style={{ display:"flex", gap:9, padding:"6px 0", borderBottom:i<d.focus.length-1?"1px solid #1A1A1A":"none" }}>
                      <span style={{ color:p.color, fontSize:10, marginTop:1 }}>▶</span>
                      <span style={{ fontSize:11, color:"#666" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* RECOVER */}
      {view === "recover" && (
        <div className="up" style={{ padding:18, paddingBottom:80 }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:1 }}>RECOVERY</div>
            <div style={{ fontSize:11, color:"#555", marginTop:2 }}>Printing House protocols + sport-specific + frame care</div>
          </div>

          {/* Frame-specific recovery */}
          <div style={{ background:"#1A1500", border:"1px solid #3A3000", borderRadius:11, padding:14, marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#FFD700", marginBottom:8 }}>📏 6'3" FRAME PRIORITY</div>
            {[
              ["Hip flexors daily","Long femurs = tight hip flexors. 5 min daily: couch stretch + kneeling lunge. Non-negotiable."],
              ["Thoracic spine mobility","Tall athletes compress the t-spine. Foam roller thoracic extension 5 min before every push session."],
              ["Ankle mobility","Long limbs = more ankle demand in squats and court movement. Ankle CARs daily, wall calf stretch post-leg day."],
              ["Shoulder capsule","More shoulder ROM = more impingement risk at extreme ranges. Shoulder 90/90 stretches post every push session."],
            ].map(([l,v],i) => (
              <div key={i} style={{ padding:"8px 0", borderBottom:i<3?"1px solid #2A2000":"none" }}>
                <div style={{ fontSize:11, fontWeight:800, color:"#FFD700", marginBottom:3 }}>{l}</div>
                <div style={{ fontSize:10, color:"#666" }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:11, padding:14, marginBottom:10, borderLeft:"3px solid #00E5FF" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#00E5FF", marginBottom:8 }}>💨 STEAM ROOM — PRINTING HOUSE</div>
            {[
              ["After Push days","15–20 min. Shoulder and chest tissue recovery."],
              ["After Leg days","20 min. Lactic flush. Quad and hamstring release. At your size, legs need it."],
              ["After Pull days","15 min. Upper back decompression."],
              ["Rest day visits","Use steam to maintain without training. 20–25 min."],
            ].map(([l,v],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:i<3?"1px solid #1A1A1A":"none", gap:10 }}>
                <span style={{ fontSize:10, color:"#555", fontWeight:700, flexShrink:0 }}>{l}</span>
                <span style={{ fontSize:10, color:"#888", textAlign:"right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:11, padding:14, marginBottom:10, borderLeft:"3px solid #DA70D6" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#DA70D6", marginBottom:8 }}>⚡ POWER PLATE</div>
            {[
              ["Post-workout","10 min — accelerates recovery, reduces DOMS."],
              ["Calves","30 sec each position — critical for tall athletes post leg day."],
              ["Quads + hamstrings","60 sec each — dramatically reduces stiffness."],
              ["Rest days","15 min full body activation session."],
            ].map(([l,v],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:i<3?"1px solid #1A1A1A":"none", gap:10 }}>
                <span style={{ fontSize:10, color:"#555", fontWeight:700, flexShrink:0 }}>{l}</span>
                <span style={{ fontSize:10, color:"#888", textAlign:"right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:11, padding:14, marginBottom:10, borderLeft:"3px solid #FF6B35" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#FF6B35", marginBottom:8 }}>🗓 EQUINOX CLASSES</div>
            {[
              { name:"Yoga", icon:"🧘", when:"Thursday rest day — or Sunday before weights", why:"Rotational mobility for tennis, golf, lacrosse. Hip flexor and thoracic work. At 6'3\" this class is not optional — it's maintenance." },
              { name:"Cycling Studio", icon:"🚴", when:"Bonus cardio or rest day — open ride", why:"Zero joint impact. Aerobic base building. Incidentally good marathon prep without leg pounding." },
              { name:"Pilates", icon:"⚡", when:"Once/week — rest day ideally", why:"Core stabilization for all sports. Anterior pelvic tilt correction (common in tall athletes). Posture and shoulder balance." },
            ].map((cls,i) => (
              <div key={i} style={{ padding:"9px 0", borderBottom:i<2?"1px solid #1A1A1A":"none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                  <span style={{ fontSize:14 }}>{cls.icon}</span>
                  <span style={{ fontSize:13, fontWeight:800 }}>{cls.name}</span>
                </div>
                <div style={{ fontSize:9, color:"#FF6B35", marginBottom:2 }}>{cls.when}</div>
                <div style={{ fontSize:10, color:"#484848" }}>{cls.why}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", borderRadius:11, padding:14, borderLeft:"3px solid #FFD700" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#FFD700", marginBottom:8 }}>🎾⛳🏀🥍 SPORT RECOVERY</div>
            {[
              ["Tennis / Lacrosse","Shoulder internal/external rotation stretches post-push. Wrist flexor/extensor work. Steam room after arm sessions."],
              ["Golf","Hip flexor and thoracic mobility are non-negotiable. Yoga class handles both. Pallof press in training builds anti-rotation control your swing needs."],
              ["Basketball / Lacrosse","Ankle mobility + calf stretching after every leg day. Pool or ice after explosive work. Lateral band walks on rest days."],
              ["Marathon (background build)","Incline walk and steady-state runs build aerobic base. Don't add run mileage while training volume is high — let Phase 3 open that up."],
            ].map(([sport,note],i) => (
              <div key={i} style={{ padding:"8px 0", borderBottom:i<3?"1px solid #1A1A1A":"none" }}>
                <div style={{ fontSize:10, fontWeight:800, color:"#FFD700", marginBottom:3 }}>{sport}</div>
                <div style={{ fontSize:10, color:"#484848" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESIGN */}
      {view === "design" && (
        <div className="up" style={{ padding:18, paddingBottom:80 }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:1 }}>PROGRAM DESIGN</div>
            <div style={{ fontSize:11, color:"#555", marginTop:2 }}>Built and calibrated for 6'3" · 200+ lbs</div>
          </div>

          {/* Frame calibration summary */}
          <div style={{ background:"#1A1500", border:"1px solid #FFD700", borderRadius:11, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#FFD700", marginBottom:10 }}>📏 FRAME CALIBRATIONS APPLIED</div>
            {[
              ["Compound sets bumped to 4", "Squat, RDL, Bench, Pull-Up, Row — all 4 sets minimum. Larger muscle bellies need more total volume."],
              ["Phase 1 extended to 10 weeks", "Taller athletes need longer to groove movement patterns correctly. The extra 2 weeks compounds everything after."],
              ["6'3\" notes on every key lift", "Tap the gold badge on any exercise to see frame-specific setup, ROM, and coaching cues."],
              ["Rest intervals formalized", "90 sec–2 min on heavy compounds. Bigger CNS load = more recovery needed between sets."],
              ["Dips capped at 90°", "Deep dips at your arm length create excessive shoulder torque over time. Capped on all days."],
              ["Farmer's Walk extended", "40 steps vs 30 — your stride length makes 30 steps trivially short for your frame."],
            ].map(([title, desc], i) => (
              <div key={i} style={{ padding:"8px 0", borderBottom:i<5?"1px solid #2A2000":"none" }}>
                <div style={{ fontSize:11, fontWeight:800, color:"#FFD700", marginBottom:2 }}>✦ {title}</div>
                <div style={{ fontSize:10, color:"#666" }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize:9, letterSpacing:2, color:"#444", marginBottom:10 }}>MUSCLE GROUPS — STATUS</div>
          {[
            { name:"Legs",        icon:"🦵", desc:"Squats, RDLs, Leg Press, Lunges — reintegrated. Wider stance, 30–35° toe out dialed for your femur length.", severity:"critical" },
            { name:"Hamstrings",  icon:"🏃", desc:"Posterior chain is your athletic engine across every sport. Your long hamstrings make RDL and Leg Curl elite movements.", severity:"critical" },
            { name:"Glutes",      icon:"💪", desc:"Hip thrust in Wednesday bonus. Strongest muscle in the body — train it like it.", severity:"high" },
            { name:"Calves",      icon:"📐", desc:"Added 4th set on calf raises. Tall athletes have longer lever = more demand. Critical for court sports and running.", severity:"high" },
            { name:"Sport Power", icon:"⚡", desc:"Rotational, lateral, and explosive movements in Sunday and Wednesday bonus. Tennis, golf, basketball, lacrosse all covered.", severity:"high" },
            { name:"Rear Delts",  icon:"🎯", desc:"Athletic shoulder balance. In every push day bonus and Saturday pull day.", severity:"medium" },
            { name:"Forearms",    icon:"🤜", desc:"Wrist curls formalized in Tuesday bonus. Direct lacrosse and tennis carryover.", severity:"low" },
          ].map((g,i) => {
            const sc = { critical:"#FF3B3B", high:"#FF6B35", medium:"#FFD700", low:"#A8FF3E" };
            const c = sc[g.severity];
            return (
              <div key={i} style={{ background:"#111", borderRadius:9, padding:13, marginBottom:8, borderLeft:`3px solid ${c}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <span style={{ fontSize:17 }}>{g.icon}</span>
                  <span style={{ fontSize:14, fontWeight:800 }}>{g.name}</span>
                  <span style={{ background:c, color:"#000", fontSize:7, fontWeight:900, padding:"1px 5px", borderRadius:3, letterSpacing:1 }}>{g.severity.toUpperCase()}</span>
                </div>
                <div style={{ fontSize:10, color:"#484848", marginTop:4 }}>{g.desc}</div>
                <div style={{ fontSize:9, color:"#A8FF3E", marginTop:3 }}>✓ Calibrated</div>
              </div>
            );
          })}

          <div style={{ background:"#0F1A0F", border:"1px solid #A8FF3E", borderRadius:11, padding:13, marginTop:13 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#A8FF3E", marginBottom:9 }}>WHAT YOU ALREADY OWN ✦</div>
            {[
              ["Back / Pulling","Elite. Rows, pulldowns, pull-ups, seal rows, rack pulls — your long arms make every pulling movement exceptional ROM."],
              ["Chest","Multiple angles, tempos, grip variations. Your long ROM on DB press is a genuine advantage."],
              ["Biceps & Triceps","The Gun Shop pedigree is real. Volume, variety, intensity."],
              ["Shoulders","Presses, lateral raises, upright rows — consistent and complete."],
              ["Cardio","Running base built in. Precision Run and pool extend it further. Your stride length makes incline walking elite cardio."],
            ].map(([name,note]) => (
              <div key={name} style={{ padding:"7px 0", borderBottom:"1px solid #1A2A1A", display:"flex", gap:9 }}>
                <span style={{ color:"#A8FF3E", fontSize:10, marginTop:1 }}>✓</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700 }}>{name}</div>
                  <div style={{ fontSize:9, color:"#484848", marginTop:2 }}>{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
