export type Foundation = "care" | "fairness" | "loyalty" | "authority" | "sanctity" | "liberty";
export const stateKeys = [
  "pickupLate",
  "lauraSick",
  "money",
  "lauraCloseness",
  "lauraSelfReliance",
  "lauraTrust",
  "melanieFatigue",
  "melanieNormalization",
  "businessman",
  "student",
  "nurse",
  "oldman",
  "cop",
  "rivalRelation",
] as const;
export type StateKey = (typeof stateKeys)[number];
export type Hidden = Record<StateKey, number>;
export type Condition =
  | { key: StateKey; min?: number; max?: number }
  | { prior: string; absent?: boolean };
export type Option = {
  id: string;
  text: string;
  effects: Partial<Hidden>;
  ledger: string;
  journal: string;
  callback?: { id: string; delay: number };
  compromise?: boolean;
  euphemism?: string;
  minutes?: number;
};
export type Dilemma = {
  id: string;
  title: string;
  moment: "morning" | "shift" | "evening";
  conditions: Condition[];
  situation: string;
  options: Option[];
  chain?: string;
  chainStep?: number;
  evidence: "design";
  foundations: Foundation[];
  drift?: string;
};
export const callbacks: Record<string, string> = {
  "missed-call": "Laura sees your phone light up and turns back to her homework. ?I asked my friend instead,? she says.",
  "student-coins": "The student counts her coins twice. “I have to keep bus fare today.” She leaves without ordering.",
  "rival-warning": "Across the street, Ivo watches the corner for an inspector who never comes. His brother waits beside a cooling cart.",
  "rival-help": "Ivo leaves a sleeve of cups by your wheel. “For when your delivery is late.”",
  "recital": "Laura folds a school program into the recycling. Your seat number is circled in pencil.",
  "milk": "The nurse brings her own flask now. She still nods when she passes.",
  "worker": "The social worker asks Laura how she spends the hour before you get home. Laura looks at you first.",
  "gift": "Laura has kept the wrapping paper under her pillow.",
  "cups": "Ivo checks the pavement beneath his truck before he unloads anything.",
  "favor": "Martin waits until the other customers leave before asking whether you can hold an envelope.",
  "cop": "Officer Bell lingers at Ivo’s permit, then looks across the road at you.",
  "lunch": "There are two sandwiches in the fridge. Laura has written your name on the smaller bag.",
  "rent": "Your landlord has stopped knocking. Envelopes slide beneath the door instead.",
  "echo-shortchange": "Weeks later, Melanie rounds her own tip jar up without noticing.",
  "echo-laura-form": "A teacher’s carefully phrased note comes home. Laura asks why separated is not on her form.",
  "echo-permit": "Melanie says “he’d do it to me” before anyone asks.",
  "echo-cash-only": "The social worker asks for income documents. There is a gap where the receipts should be.",
  "echo-earned-it": "He returns to thank you. Melanie looks down at the cups.",
  "echo-tunnel": "Laura draws the family without Melanie.",
  "echo-late-delivery": "In the morning the same supplier leaves a few extra units. The boxes look different in daylight.",
  "echo-everyone-saw": "A bystander refuses a favor: “Somebody else will.”",
  "echo-favor": "The clerk appears at the custody hearing, friendly. Nothing is said.",
  "echo-by-book": "His visits grow casual. Others start expecting the same.",
  "echo-good-coffee": "After a rejection he says, “You told me it was fine.”",
  "echo-landlord": "The unwritten extension returns in the next dispute. Laura asks why they whisper in the hallway.",
  "echo-cash-float": "The apartment smells of prep. Laura stops inviting classmates.",
  "echo-early": "Laura sets her own alarm. “I’m fine,” she says.",
  "echo-his-weekend": "Laura packs her own bag with a drawing for each parent.",
  "echo-recital": "Laura stops handing over school notices.",
  "echo-cart-corner": "Next week Laura counts the till without being asked.",
  "echo-inspector": "Ivo undercuts your price the next week. You watch each other from opposite corners.",
  "echo-worker": "Laura asks whether “the lady” is checking if she is good.",
  "echo-reporting-tips": "A letter changes Laura’s school-lunch status. She brings it home folded inside her lunch bag.",
  "echo-yesterday": "Laura learns to say “the cart food is dinner.”",
  "echo-pantry-fib": "Laura asks what “borrowing” means.",
  "echo-fever": "Laura’s fever eases. Melanie writes: I sat beside her and watched her breathe.",
  "echo-delivery-morning": "At evening delivery the same extra units arrive. The counter is crowded and your feet hurt.",
  "resume-revised": "A week later he returns with a revised resume. He has circled the new opening paragraph.",
  "rival-cover": "Ivo covers your cart while you fetch Laura. He leaves the cups stacked beside the boiler.",
  "medicine-wait": "Laura recovers under the blanket. In her journal Melanie writes: the rent envelope is thinner.",
  "medicine-home": "Laura sleeps fitfully; by morning the fever has eased. Melanie writes: I kept counting her breaths.",
  "echo-water": "The bottom of the jug comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-water-again": "The temperature log comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-stock-pastry": "Yesterday?s pastries comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-stock-label": "She had stopped checking. The labels came off cleanly.",
  "echo-till-exact": "Exact change comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-shortchange-again": "The tip jar comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-tip-again": "A slow day comes to mind while Melanie closes the drawer. Her hands pause over it.",
  "echo-lunch": "The last apple returns to Melanie while she washes the cups. She asked what I had eaten. I named something.",
  "echo-rent-note": "A note for school returns to Melanie while she washes the cups. Her bag sounded different with coins in it.",
  "echo-sleep": "The second alarm returns to Melanie while she washes the cups. For an hour the apartment was quiet with both of us in it.",
  "echo-forgotten": "Under the saucer returns to Melanie while she washes the cups. The saucer was empty when he returned.",
  "echo-cash": "The collection round returns to Melanie while she washes the cups. I wrote a smaller figure on the form.",
  "echo-bills": "The phone bill returns to Melanie while she washes the cups. I checked for a dial tone before going to bed."
};

export const dilemmas: Dilemma[] = [
  {
    "id": "early",
    "title": "The Early Pickup",
    "moment": "morning",
    "situation": "The supplier offers a better price for a five a.m. pickup. School drop-off is at 8:15.",
    "options": [
      {
        "id": "leave",
        "text": "Take it; leave Laura asleep alone.",
        "effects": {
          "money": 7,
          "lauraSelfReliance": 8,
          "lauraCloseness": -4,
          "melanieFatigue": 4
        },
        "ledger": "early-leave",
        "journal": "I heard her turn the lock from the stairs.",
        "callback": {
          "id": "echo-early",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "walk",
        "text": "Pay the higher price and walk her to school.",
        "effects": {
          "money": -3,
          "lauraCloseness": 5,
          "melanieFatigue": 2
        },
        "ledger": "early-walk",
        "journal": "We took the long way past the bakery.",
        "callback": {
          "id": "echo-early",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "loyalty"
    ],
    "evidence": "design"
  },
  {
    "id": "lunch",
    "title": "The last apple",
    "moment": "morning",
    "situation": "One apple, two lunches. Laura has started checking your bag to see whether you ate.",
    "options": [
      {
        "id": "hers",
        "text": "Put it in her lunch and say you ate already.",
        "effects": {
          "lauraCloseness": 3,
          "lauraTrust": -2,
          "melanieFatigue": 5
        },
        "ledger": "apple-lie",
        "journal": "She asked what I had eaten. I named something.",
        "compromise": false,
        "callback": {
          "id": "echo-lunch",
          "delay": 2
        }
      },
      {
        "id": "split",
        "text": "Split it. Let her see how little is left.",
        "effects": {
          "lauraTrust": 4,
          "lauraSelfReliance": 3,
          "melanieFatigue": 2
        },
        "ledger": "split-apple",
        "journal": "We each kept half of the core.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "recital",
    "title": "Parent Night",
    "moment": "evening",
    "situation": "Parent night is the best sales evening of the week. Laura says it is only one song.",
    "options": [
      {
        "id": "close",
        "text": "Go.",
        "effects": {
          "money": -7,
          "lauraCloseness": 7,
          "melanieFatigue": 3
        },
        "ledger": "recital-close",
        "journal": "I stood at the back in my apron.",
        "callback": {
          "id": "echo-recital",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "honest",
        "text": "Stay open.",
        "effects": {
          "money": 6,
          "lauraCloseness": -5,
          "lauraTrust": -3
        },
        "ledger": "recital-honest",
        "journal": "I watched the time between orders.",
        "callback": {
          "id": "echo-recital",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "neighbor",
        "text": "Ask a neighbor to cover.",
        "effects": {
          "money": -3,
          "lauraCloseness": 3,
          "lauraSelfReliance": 2
        },
        "ledger": "recital-neighbor",
        "journal": "I left the spare apron on the hook for our neighbor.",
        "callback": {
          "id": "echo-recital",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "loyalty"
    ],
    "evidence": "design"
  },
  {
    "id": "fever",
    "title": "Medicine",
    "moment": "evening",
    "situation": "Laura has a fever. Cash is short; the pharmacy line is long and the register unattended.",
    "options": [
      {
        "id": "pay",
        "text": "Wait and pay with rent money.",
        "effects": {
          "money": -4,
          "lauraCloseness": 3
        },
        "ledger": "fever-pay",
        "journal": "The rent envelope lay open beside the medicine.",
        "callback": {
          "id": "medicine-wait",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "pocket",
        "text": "Take it.",
        "effects": {
          "lauraCloseness": 3,
          "lauraTrust": -3,
          "melanieNormalization": 5
        },
        "ledger": "fever-pocket",
        "journal": "The box made a square against my coat.",
        "callback": {
          "id": "echo-fever",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "home",
        "text": "Go home and hope.",
        "effects": {
          "lauraTrust": -4,
          "melanieFatigue": 6
        },
        "ledger": "fever-home",
        "journal": "I sat awake beside her bed.",
        "callback": {
          "id": "medicine-home",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [
      {
        "key": "money",
        "max": 5
      },
      {
        "key": "lauraSick",
        "min": 1
      }
    ],
    "foundations": [
      "care",
      "sanctity"
    ],
    "evidence": "design"
  },
  {
    "id": "rent-note",
    "title": "A note for school",
    "moment": "morning",
    "situation": "Laura asks you to sign a field-trip form. The fee is small, but the envelope for electricity is already thin.",
    "options": [
      {
        "id": "sign",
        "text": "Sign and put the fee in her bag.",
        "effects": {
          "money": -5,
          "lauraCloseness": 4
        },
        "ledger": "trip-paid",
        "journal": "Her bag sounded different with coins in it.",
        "compromise": false,
        "callback": {
          "id": "echo-rent-note",
          "delay": 2
        }
      },
      {
        "id": "later",
        "text": "Say you will sign it tomorrow.",
        "effects": {
          "lauraTrust": -3,
          "lauraSelfReliance": 4
        },
        "ledger": "trip-later",
        "journal": "The form stayed on the table beneath my cup.",
        "compromise": true
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "sleep",
    "title": "The second alarm",
    "moment": "morning",
    "situation": "You were awake doing accounts. Laura is ready, but you could both sleep another hour if she misses the first lesson.",
    "options": [
      {
        "id": "rest",
        "text": "Turn off the alarm and keep her home an hour.",
        "effects": {
          "melanieFatigue": -12,
          "lauraCloseness": 3,
          "lauraSelfReliance": 2
        },
        "ledger": "late-school",
        "journal": "For an hour the apartment was quiet with both of us in it.",
        "compromise": false,
        "callback": {
          "id": "echo-sleep",
          "delay": 2
        }
      },
      {
        "id": "up",
        "text": "Get up; let her carry breakfast on the way.",
        "effects": {
          "melanieFatigue": 6,
          "lauraSelfReliance": 4,
          "lauraTrust": 2
        },
        "ledger": "tired-school",
        "journal": "She held my toast while I found my shoes.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "shortchange",
    "title": "Short Change",
    "moment": "shift",
    "chain": "till",
    "chainStep": 1,
    "situation": "A distracted customer thinks they paid with a ten but handed you a twenty. You could miscount by a dollar.",
    "drift": "Give the usual change. There is enough to get through today.",
    "foundations": [
      "fairness",
      "loyalty"
    ],
    "conditions": [
      {
        "prior": "till-accepted-0"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "count",
        "text": "Give full change, counting the twenty aloud.",
        "effects": {
          "money": -2
        },
        "ledger": "shortchange-refused",
        "journal": "I give full change, counting the twenty aloud.",
        "compromise": false,
        "callback": {
          "id": "echo-shortchange",
          "delay": 14
        }
      },
      {
        "id": "expected",
        "text": "Give what they expect.",
        "effects": {
          "money": 10
        },
        "ledger": "shortchange",
        "journal": "Short Change: Give what they expect.",
        "callback": {
          "id": "echo-shortchange",
          "delay": 14
        },
        "compromise": true,
        "euphemism": "Give the expected change."
      },
      {
        "id": "keep",
        "text": "Miscount by a dollar.",
        "effects": {
          "money": 2,
          "melanieNormalization": 3
        },
        "ledger": "shortchange",
        "journal": "Short Change: Miscount by a dollar.",
        "callback": {
          "id": "echo-shortchange",
          "delay": 14
        },
        "compromise": true,
        "euphemism": "Give the usual change."
      }
    ]
  },
  {
    "id": "shortchange-again",
    "title": "The tip jar",
    "moment": "shift",
    "chain": "till",
    "chainStep": 2,
    "situation": "The shared tip jar has loose coins. You could round your share up.",
    "drift": "Settle your share. There is enough to get through today.",
    "foundations": [
      "fairness",
      "loyalty"
    ],
    "conditions": [
      {
        "prior": "shortchange"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Count the shared tips exactly.",
        "effects": {
          "money": -2
        },
        "ledger": "shortchange-again-refused",
        "journal": "I count the shared tips exactly.",
        "compromise": false,
        "callback": {
          "id": "echo-shortchange-again",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Round the tip jar up into your share.",
        "effects": {
          "money": 3,
          "melanieNormalization": 3
        },
        "ledger": "till-accepted-2",
        "journal": "The tip jar: Round the tip jar up into your share.",
        "callback": {
          "id": "echo-shortchange-again",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Settle your share."
      }
    ]
  },
  {
    "id": "forgotten",
    "title": "Under the saucer",
    "moment": "shift",
    "situation": "Martin leaves extra change under his cup. It might be a tip. He has been checking job listings between calls.",
    "options": [
      {
        "id": "jar",
        "text": "Put it in the jar before he comes back.",
        "effects": {
          "money": 4,
          "businessman": -3,
          "melanieNormalization": 3
        },
        "ledger": "forgotten-kept",
        "journal": "The saucer was empty when he returned.",
        "compromise": true,
        "callback": {
          "id": "echo-forgotten",
          "delay": 2
        }
      },
      {
        "id": "call",
        "text": "Call him back, in front of the waiting queue.",
        "effects": {
          "businessman": 4,
          "melanieFatigue": 3
        },
        "ledger": "forgotten-returned",
        "journal": "He thanked me too loudly.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "water",
    "title": "The bottom of the jug",
    "moment": "shift",
    "chain": "stock",
    "chainStep": 0,
    "situation": "The milk is running low. Adding water would get you through the next orders.",
    "drift": "Stretch the milk. There is enough to get through today.",
    "foundations": [
      "sanctity",
      "fairness"
    ],
    "conditions": [],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Offer black coffee and explain that the milk ran out.",
        "effects": {
          "money": -2
        },
        "ledger": "water-refused",
        "journal": "I offer black coffee and explain that the milk ran out.",
        "compromise": false,
        "callback": {
          "id": "echo-water",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Add water to the milk.",
        "effects": {
          "money": 1,
          "melanieNormalization": 3
        },
        "ledger": "stock-accepted-0",
        "journal": "The bottom of the jug: Add water to the milk.",
        "callback": {
          "id": "echo-water",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Stretch the milk."
      }
    ]
  },
  {
    "id": "water-again",
    "title": "The temperature log",
    "moment": "shift",
    "chain": "stock",
    "chainStep": 1,
    "situation": "The cooler log is due. You could skip the temperature check today.",
    "drift": "Save the paperwork for later. There is enough to get through today.",
    "foundations": [
      "sanctity",
      "fairness"
    ],
    "conditions": [
      {
        "prior": "stock-accepted-0"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Check the temperature and record it.",
        "effects": {
          "money": -2
        },
        "ledger": "water-again-refused",
        "journal": "I check the temperature and record it.",
        "compromise": false,
        "callback": {
          "id": "echo-water-again",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Skip the temperature log today.",
        "effects": {
          "money": 2,
          "melanieNormalization": 3
        },
        "ledger": "stock-accepted-1",
        "journal": "The temperature log: Skip the temperature log today.",
        "callback": {
          "id": "echo-water-again",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Save the paperwork for later."
      }
    ]
  },
  {
    "id": "call",
    "title": "A buzzing pocket",
    "moment": "shift",
    "situation": "Laura calls while three coffees are half-made. Last time she only wanted to tell you a joke. These customers have buses to catch.",
    "options": [
      {
        "id": "voicemail",
        "text": "Let it go to voicemail and finish the drinks.",
        "effects": {
          "money": 3,
          "lauraCloseness": -5,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "missed-call",
        "journal": "I listened to the message after the street went quiet.",
        "callback": {
          "id": "missed-call",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "answer",
        "text": "Answer with the steam wand still hissing.",
        "effects": {
          "money": -3,
          "lauraCloseness": 4,
          "melanieFatigue": 4
        },
        "ledger": "call-answered",
        "journal": "I had to ask her to say it again.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "inspector",
    "title": "Rival’s Spot",
    "moment": "shift",
    "situation": "Ivo’s cart is unattended while a permit inspector walks the block.",
    "options": [
      {
        "id": "warn",
        "text": "Warn him.",
        "effects": {
          "money": -3,
          "rivalRelation": 7,
          "melanieFatigue": 6
        },
        "ledger": "inspector-warn",
        "journal": "I called across the street until he turned.",
        "callback": {
          "id": "rival-cover",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "quiet",
        "text": "Say nothing.",
        "effects": {
          "rivalRelation": -2
        },
        "ledger": "inspector-quiet",
        "journal": "I watched the inspector reach his cart.",
        "callback": {
          "id": "echo-inspector",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "report",
        "text": "Point the inspector his way.",
        "effects": {
          "money": 5,
          "rivalRelation": -10,
          "cop": 3,
          "melanieNormalization": 5
        },
        "ledger": "inspector-report",
        "journal": "My finger stayed raised a moment too long.",
        "callback": {
          "id": "echo-inspector",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "loyalty",
      "fairness"
    ],
    "evidence": "design"
  },
  {
    "id": "cups",
    "title": "A box in the gutter",
    "moment": "shift",
    "situation": "A sleeve of Ivo’s cups falls from his truck. Yours will run out soon. He is arguing with a supplier and has not seen it.",
    "options": [
      {
        "id": "take",
        "text": "Carry the box behind your cart.",
        "effects": {
          "money": 5,
          "rivalRelation": -5,
          "melanieNormalization": 5
        },
        "ledger": "cups-taken",
        "journal": "They fit our lids exactly.",
        "callback": {
          "id": "cups",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "return",
        "text": "Return it and ask to borrow a sleeve.",
        "effects": {
          "rivalRelation": 6,
          "melanieFatigue": 3,
          "money": -2
        },
        "ledger": "cups-returned",
        "journal": "He gave me half, then counted his own.",
        "callback": {
          "id": "rival-help",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "yesterday",
    "title": "Dinner at the Cart",
    "moment": "evening",
    "situation": "Day-old pastries are free at closing, but the cooler broke.",
    "options": [
      {
        "id": "eat",
        "text": "Eat them.",
        "effects": {
          "melanieFatigue": 3,
          "lauraCloseness": 2
        },
        "ledger": "yesterday-eat",
        "journal": "We ate from the paper bags beside the cart.",
        "callback": {
          "id": "echo-yesterday",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "discard",
        "text": "Throw them out.",
        "effects": {
          "money": -3
        },
        "ledger": "yesterday-discard",
        "journal": "The tray was empty when I washed it.",
        "callback": {
          "id": "echo-yesterday",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "use",
        "text": "Serve them tomorrow.",
        "effects": {
          "money": 4,
          "nurse": -5,
          "melanieNormalization": 5
        },
        "ledger": "yesterday-use",
        "journal": "I covered the tray for tomorrow.",
        "callback": {
          "id": "echo-yesterday",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "sanctity",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "cash",
    "title": "The collection round",
    "moment": "shift",
    "situation": "The permit officer collects a fee on recorded takings. A cash-only morning could leave enough for groceries, but Bell is watching from the corner.",
    "options": [
      {
        "id": "cash",
        "text": "Turn the card sign over; leave the cash unrecorded.",
        "effects": {
          "money": 6,
          "cop": -4,
          "melanieNormalization": 5
        },
        "ledger": "cash-unrecorded",
        "journal": "I wrote a smaller figure on the form.",
        "compromise": true,
        "callback": {
          "id": "echo-cash",
          "delay": 2
        }
      },
      {
        "id": "record",
        "text": "Record the whole morning and pay from the grocery envelope.",
        "effects": {
          "money": -6,
          "cop": 2,
          "melanieFatigue": 3
        },
        "ledger": "fee-paid",
        "journal": "The receipt was almost the size of a shopping list.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "favor",
    "title": "Free Pastry",
    "moment": "morning",
    "situation": "A friendly court clerk brings pastries and asks you to hold a sealed envelope “for a friend.”",
    "options": [
      {
        "id": "accept",
        "text": "Take it.",
        "effects": {
          "businessman": 4,
          "melanieNormalization": 6
        },
        "ledger": "favor-accept",
        "journal": "I put it beneath the clean towels.",
        "callback": {
          "id": "echo-favor",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "decline",
        "text": "Refuse politely.",
        "effects": {
          "businessman": -2,
          "melanieFatigue": 4
        },
        "ledger": "favor-decline",
        "journal": "The clerk put the envelope back in a pocket.",
        "callback": {
          "id": "echo-favor",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "tell",
        "text": "Take it and tell the social worker.",
        "effects": {
          "businessman": -4,
          "lauraTrust": 3
        },
        "ledger": "favor-tell",
        "journal": "I wrote down the social worker?s number before I forgot.",
        "callback": {
          "id": "echo-favor",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "loyalty",
      "authority"
    ],
    "evidence": "design"
  },
  {
    "id": "permit",
    "title": "Their Fault",
    "moment": "shift",
    "situation": "Ivo’s permit is a week late. The inspector is on the block.",
    "options": [
      {
        "id": "quiet",
        "text": "Say nothing.",
        "effects": {
          "rivalRelation": 1
        },
        "ledger": "permit-quiet",
        "journal": "I kept my eyes on my own queue.",
        "callback": {
          "id": "echo-permit",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "report",
        "text": "Tip the inspector casually.",
        "effects": {
          "money": 5,
          "rivalRelation": -10,
          "cop": 3,
          "melanieNormalization": 5
        },
        "ledger": "permit-report",
        "journal": "Bell walked across before finishing his cup.",
        "callback": {
          "id": "echo-permit",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "gossip",
        "text": "Mention it to a gossipy regular.",
        "effects": {
          "rivalRelation": -5,
          "melanieNormalization": 3
        },
        "ledger": "permit-gossip",
        "journal": "The story traveled down the line without me.",
        "callback": {
          "id": "echo-permit",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "loyalty",
      "fairness"
    ],
    "evidence": "design"
  },
  {
    "id": "tip-again",
    "title": "A slow day",
    "moment": "shift",
    "chain": "till",
    "chainStep": 3,
    "situation": "It is a slow day. You could skim from the shared till before closing.",
    "drift": "Smooth out the slow days. There is enough to get through today.",
    "foundations": [
      "fairness",
      "loyalty"
    ],
    "conditions": [
      {
        "prior": "till-accepted-2"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Leave the till intact and record the slow day.",
        "effects": {
          "money": -2
        },
        "ledger": "tip-again-refused",
        "journal": "I leave the till intact and record the slow day.",
        "compromise": false,
        "callback": {
          "id": "echo-tip-again",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Skim from the till on slow days.",
        "effects": {
          "money": 4,
          "melanieNormalization": 3
        },
        "ledger": "till-accepted-3",
        "journal": "A slow day: Skim from the till on slow days.",
        "callback": {
          "id": "echo-tip-again",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Smooth out the slow days."
      }
    ]
  },
  {
    "id": "birthday",
    "title": "Two envelopes",
    "moment": "evening",
    "situation": "Laura’s birthday is tomorrow. The permit renewal is due, too. You can cover one without asking anyone for help.",
    "options": [
      {
        "id": "gift",
        "text": "Buy the small drawing set she keeps looking at.",
        "effects": {
          "money": -8,
          "lauraCloseness": 7,
          "cop": -3
        },
        "ledger": "birthday-gift",
        "journal": "She sharpened every pencil before bed.",
        "callback": {
          "id": "gift",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "permit",
        "text": "Renew the permit; make a card from receipt paper.",
        "effects": {
          "money": -6,
          "lauraCloseness": -3,
          "lauraTrust": 2
        },
        "ledger": "birthday-card",
        "journal": "The card curled at the edges.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "worker",
    "title": "Social Worker Visit",
    "moment": "evening",
    "situation": "The visit is tomorrow. Laura’s room is messy and the fridge half empty.",
    "options": [
      {
        "id": "never",
        "text": "Stage the apartment.",
        "effects": {
          "lauraTrust": -7,
          "melanieNormalization": 5,
          "melanieFatigue": -2
        },
        "ledger": "worker-never",
        "journal": "I arranged the fruit where it could be seen.",
        "callback": {
          "id": "echo-worker",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "explain",
        "text": "Show it honestly.",
        "effects": {
          "lauraTrust": 5,
          "melanieFatigue": 6
        },
        "ledger": "worker-explain",
        "journal": "I left the gaps in the story where they were.",
        "callback": {
          "id": "echo-worker",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "later",
        "text": "Reschedule.",
        "effects": {
          "lauraTrust": -2,
          "melanieFatigue": 2
        },
        "ledger": "worker-later",
        "journal": "I asked for another date and turned the calendar over.",
        "callback": {
          "id": "echo-worker",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "authority",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "landlord",
    "title": "Late Rent Grace",
    "moment": "evening",
    "situation": "Rent is due. The landlord will let it slide if his cousin’s crew gets a discount every week.",
    "options": [
      {
        "id": "clean",
        "text": "Take the deal.",
        "effects": {
          "money": 6,
          "melanieFatigue": 9,
          "lauraCloseness": -4
        },
        "ledger": "landlord-clean",
        "journal": "We agreed in the hallway without writing anything down.",
        "callback": {
          "id": "echo-landlord",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "pay",
        "text": "Pay and skip the restock.",
        "effects": {
          "money": -6,
          "melanieFatigue": 4
        },
        "ledger": "landlord-pay",
        "journal": "The rent envelope emptied the restock envelope.",
        "callback": {
          "id": "echo-landlord",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "stay",
        "text": "Ask for a written extension.",
        "effects": {
          "money": -2,
          "lauraTrust": 3
        },
        "ledger": "landlord-stay",
        "journal": "I waited with a pen in my hand.",
        "callback": {
          "id": "echo-landlord",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "liberty",
      "authority"
    ],
    "evidence": "design"
  },
  {
    "id": "bills",
    "title": "The phone bill",
    "moment": "evening",
    "situation": "The phone bill is due. Laura’s father calls on this number. You could delay it and pay for tomorrow’s stock instead.",
    "options": [
      {
        "id": "stock",
        "text": "Buy stock; hope the line stays connected.",
        "effects": {
          "money": 4,
          "lauraTrust": -3,
          "melanieNormalization": 3
        },
        "ledger": "phone-delayed",
        "journal": "I checked for a dial tone before going to bed.",
        "compromise": true,
        "callback": {
          "id": "echo-bills",
          "delay": 2
        }
      },
      {
        "id": "phone",
        "text": "Pay the bill and open tomorrow with less stock.",
        "effects": {
          "money": -5,
          "lauraTrust": 3,
          "melanieFatigue": 3
        },
        "ledger": "phone-paid",
        "journal": "She spoke with him while I washed the jug.",
        "compromise": false
      }
    ],
    "conditions": [],
    "evidence": "design",
    "foundations": [
      "care",
      "fairness"
    ]
  },
  {
    "id": "laura-form",
    "title": "Laura’s Form",
    "moment": "evening",
    "situation": "After a bad rush, the school form asks custody status. The truth needs a long explanation.",
    "options": [
      {
        "id": "a",
        "text": "Explain honestly.",
        "effects": {
          "lauraTrust": 4,
          "melanieFatigue": 4
        },
        "ledger": "laura-form-a",
        "journal": "The explanation ran into the margins.",
        "callback": {
          "id": "echo-laura-form",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Tick the easier box.",
        "effects": {
          "lauraTrust": -4,
          "melanieNormalization": 3
        },
        "ledger": "laura-form-b",
        "journal": "The tick took less space than the truth.",
        "callback": {
          "id": "echo-laura-form",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "c",
        "text": "Leave it blank.",
        "effects": {
          "lauraTrust": -2,
          "melanieFatigue": 2
        },
        "ledger": "laura-form-c",
        "journal": "I put the form under my cup.",
        "callback": {
          "id": "echo-laura-form",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "authority",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "cash-only",
    "title": "Cash Only",
    "moment": "morning",
    "situation": "The landlord offers lower rent for cash without a receipt: “Saves us both paperwork.”",
    "options": [
      {
        "id": "a",
        "text": "Take it.",
        "effects": {
          "money": 3,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "cash-only-a",
        "journal": "No receipt came with the new amount.",
        "callback": {
          "id": "echo-cash-only",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Insist on a receipt.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "cash-only-b",
        "journal": "I waited until he found the receipt book.",
        "callback": {
          "id": "echo-cash-only",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Ask for a written lease.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "cash-only-c",
        "journal": "I asked him to put the terms on paper.",
        "callback": {
          "id": "echo-cash-only",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "authority",
      "liberty"
    ],
    "evidence": "design"
  },
  {
    "id": "earned-it",
    "title": "Earned It",
    "moment": "evening",
    "situation": "At closing, you gave a free coffee to a man who could not pay. The till is six dollars short.",
    "options": [
      {
        "id": "a",
        "text": "Cover it from your wallet.",
        "effects": {
          "money": -6
        },
        "ledger": "earned-it-a",
        "journal": "Six dollars moved from my coat into the drawer.",
        "callback": {
          "id": "echo-earned-it",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Call it even.",
        "effects": {
          "money": 0,
          "melanieNormalization": 2
        },
        "ledger": "earned-it-b",
        "journal": "I closed the drawer without adding anything.",
        "callback": {
          "id": "echo-earned-it",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "c",
        "text": "Skim a little more; the day was generous.",
        "effects": {
          "money": 3,
          "melanieNormalization": 5
        },
        "ledger": "earned-it-c",
        "journal": "I took a little more before putting the lid on the jar.",
        "callback": {
          "id": "echo-earned-it",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "fairness"
    ],
    "evidence": "design"
  },
  {
    "id": "tunnel",
    "title": "Tunnel",
    "moment": "morning",
    "situation": "It is rent week. A cheap pallet of beans has a short deadline, during Laura’s school event.",
    "options": [
      {
        "id": "a",
        "text": "Take the deal.",
        "effects": {
          "money": 3,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "tunnel-a",
        "journal": "I followed the supplier?s clock all afternoon.",
        "callback": {
          "id": "echo-tunnel",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Ask the supplier to hold it.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "tunnel-b",
        "journal": "I asked whether the pallet could wait until after the song.",
        "callback": {
          "id": "echo-tunnel",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Send a neighbor to the event.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "tunnel-c",
        "journal": "I wrote the school address for our neighbor.",
        "callback": {
          "id": "echo-tunnel",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "loyalty"
    ],
    "evidence": "design"
  },
  {
    "id": "late-delivery",
    "title": "Late Delivery",
    "moment": "evening",
    "situation": "The tired supplier over-delivered a few units and has not noticed. You have been standing all day; recounting means unpacking everything again.",
    "options": [
      {
        "id": "a",
        "text": "Point it out.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "late-delivery-a",
        "journal": "We counted the extra boxes under the streetlight.",
        "callback": {
          "id": "echo-late-delivery",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Accept silently.",
        "effects": {
          "money": 3,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "late-delivery-b",
        "journal": "I wheeled the extra boxes behind the cart.",
        "callback": {
          "id": "echo-late-delivery",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "c",
        "text": "Ask for a credit slip.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "late-delivery-c",
        "journal": "I kept the slip flat beneath the cash box.",
        "callback": {
          "id": "echo-late-delivery",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "fairness",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "everyone-saw",
    "title": "Everyone Saw",
    "moment": "shift",
    "situation": "You are late for Laura’s pickup. A regular drops a folded eviction notice in the crowded line.",
    "options": [
      {
        "id": "return",
        "text": "Return it now.",
        "effects": {
          "oldman": 4,
          "melanieFatigue": 2
        },
        "ledger": "everyone-saw-return",
        "journal": "I caught up with him, paper folded inward.",
        "callback": {
          "id": "echo-everyone-saw",
          "delay": 2
        },
        "compromise": false,
        "minutes": 4
      },
      {
        "id": "wait",
        "text": "Wait until the line thins.",
        "effects": {
          "oldman": 2,
          "melanieFatigue": 1
        },
        "ledger": "everyone-saw-wait",
        "journal": "I kept the folded paper beneath a saucer until the line thinned.",
        "callback": {
          "id": "echo-everyone-saw",
          "delay": 2
        },
        "compromise": false,
        "minutes": 8
      },
      {
        "id": "leave",
        "text": "Let it lie.",
        "effects": {
          "oldman": -4
        },
        "ledger": "everyone-saw-leave",
        "journal": "The folded paper stayed on the pavement.",
        "callback": {
          "id": "echo-everyone-saw",
          "delay": 2
        },
        "compromise": true,
        "minutes": 0
      }
    ],
    "conditions": [
      {
        "key": "pickupLate",
        "min": 1
      }
    ],
    "foundations": [
      "care",
      "liberty"
    ],
    "evidence": "design"
  },
  {
    "id": "by-book",
    "title": "By the Book",
    "moment": "shift",
    "situation": "An inspector hints he will overlook a missing sticker if he can skip the line every morning.",
    "options": [
      {
        "id": "a",
        "text": "Comply.",
        "effects": {
          "cop": 5,
          "student": -3,
          "melanieNormalization": 3
        },
        "ledger": "by-book-a",
        "journal": "I made room for him at the front.",
        "callback": {
          "id": "echo-by-book",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Refuse.",
        "effects": {
          "cop": -4
        },
        "ledger": "by-book-b",
        "journal": "I pointed to the end of the line.",
        "callback": {
          "id": "echo-by-book",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Ask for the rule in writing.",
        "effects": {
          "cop": -2,
          "melanieFatigue": 3
        },
        "ledger": "by-book-c",
        "journal": "I held out a blank sheet for the rule.",
        "callback": {
          "id": "echo-by-book",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "authority",
      "fairness"
    ],
    "evidence": "design"
  },
  {
    "id": "good-coffee",
    "title": "Good Coffee",
    "moment": "shift",
    "situation": "A regular who just lost his job asks whether his resume is good. It is not.",
    "options": [
      {
        "id": "a",
        "text": "Say it is great.",
        "effects": {
          "oldman": -4
        },
        "ledger": "good-coffee-a",
        "journal": "I said it looked ready without reading the last page.",
        "callback": {
          "id": "echo-good-coffee",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Offer gentle, honest feedback.",
        "effects": {
          "oldman": 5,
          "melanieFatigue": 2
        },
        "ledger": "good-coffee-b",
        "journal": "We rewrote the first paragraph on a napkin.",
        "callback": {
          "id": "resume-revised",
          "delay": 7
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Joke it off.",
        "effects": {
          "oldman": -2
        },
        "ledger": "good-coffee-c",
        "journal": "I made a joke and handed the pages back.",
        "callback": {
          "id": "echo-good-coffee",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "fairness"
    ],
    "evidence": "design"
  },
  {
    "id": "cash-float",
    "title": "Cash Float",
    "moment": "morning",
    "situation": "A weekend regular offers sixty dollars for a week of unlicensed home-kitchen catering.",
    "options": [
      {
        "id": "a",
        "text": "Do it.",
        "effects": {
          "money": 12,
          "melanieFatigue": 9,
          "lauraCloseness": -4
        },
        "ledger": "cash-float-a",
        "journal": "The counter at home filled with containers.",
        "callback": {
          "id": "echo-cash-float",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Decline.",
        "effects": {
          "melanieFatigue": -2,
          "lauraCloseness": 3
        },
        "ledger": "cash-float-b",
        "journal": "I left the kitchen clear tonight.",
        "callback": {
          "id": "echo-cash-float",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Do half.",
        "effects": {
          "money": 6,
          "melanieFatigue": 5,
          "lauraCloseness": -2
        },
        "ledger": "cash-float-c",
        "journal": "I counted out half the containers.",
        "callback": {
          "id": "echo-cash-float",
          "delay": 2
        },
        "compromise": true
      }
    ],
    "conditions": [],
    "foundations": [
      "authority",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "his-weekend",
    "title": "His Weekend",
    "moment": "evening",
    "situation": "Laura’s father offers to take her this weekend if you drop your claim on his debts.",
    "options": [
      {
        "id": "a",
        "text": "Accept.",
        "effects": {
          "money": -6,
          "melanieFatigue": -8,
          "lauraCloseness": -2
        },
        "ledger": "his-weekend-a",
        "journal": "I folded his message beneath the old debt letters.",
        "callback": {
          "id": "echo-his-weekend",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Refuse.",
        "effects": {
          "money": 2,
          "melanieFatigue": 5,
          "lauraCloseness": 2
        },
        "ledger": "his-weekend-b",
        "journal": "I left the weekend marked on our calendar.",
        "callback": {
          "id": "echo-his-weekend",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "loyalty",
      "liberty"
    ],
    "evidence": "design"
  },
  {
    "id": "cart-corner",
    "title": "Cart Corner",
    "moment": "shift",
    "situation": "On a rainy afternoon Laura reads at the cart. A customer says you should get a babysitter.",
    "options": [
      {
        "id": "a",
        "text": "Let her stay.",
        "effects": {
          "lauraCloseness": 3,
          "lauraSelfReliance": 4
        },
        "ledger": "cart-corner-a",
        "journal": "She turned another page beneath the awning.",
        "callback": {
          "id": "echo-cart-corner",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Send her to a neighbor.",
        "effects": {
          "money": -2,
          "lauraCloseness": -2
        },
        "ledger": "cart-corner-b",
        "journal": "I called the neighbor from behind the boiler.",
        "callback": {
          "id": "echo-cart-corner",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Close early.",
        "effects": {
          "money": -6,
          "lauraCloseness": 5
        },
        "ledger": "cart-corner-c",
        "journal": "We pulled down the shutter together.",
        "callback": {
          "id": "echo-cart-corner",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "care",
      "liberty"
    ],
    "evidence": "design"
  },
  {
    "id": "reporting-tips",
    "title": "Reporting Tips",
    "moment": "evening",
    "situation": "Tips were about two hundred dollars. The benefits form is due.",
    "options": [
      {
        "id": "a",
        "text": "Report all.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "reporting-tips-a",
        "journal": "I counted the notes twice before writing the total.",
        "callback": {
          "id": "echo-reporting-tips",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Report some.",
        "effects": {
          "money": 3,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "reporting-tips-b",
        "journal": "I wrote the smaller amount and put the pen away.",
        "callback": {
          "id": "echo-reporting-tips",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "c",
        "text": "Cut hours.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "reporting-tips-c",
        "journal": "I crossed an afternoon off the rota.",
        "callback": {
          "id": "echo-reporting-tips",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "fairness",
      "authority"
    ],
    "evidence": "design"
  },
  {
    "id": "pantry-fib",
    "title": "The Pantry Fib",
    "moment": "evening",
    "situation": "A shop’s unsold fruit sits outside at closing. You could take a handful.",
    "options": [
      {
        "id": "a",
        "text": "Take it.",
        "effects": {
          "money": 2,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "pantry-fib-a",
        "journal": "The fruit warmed in my coat pocket.",
        "callback": {
          "id": "echo-pantry-fib",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "b",
        "text": "Pay.",
        "effects": {
          "money": -2,
          "lauraTrust": 2
        },
        "ledger": "pantry-fib-b",
        "journal": "I left the coins by the shop door.",
        "callback": {
          "id": "echo-pantry-fib",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "c",
        "text": "Ask.",
        "effects": {
          "melanieFatigue": 2,
          "lauraTrust": 3
        },
        "ledger": "pantry-fib-c",
        "journal": "I knocked before picking anything up.",
        "callback": {
          "id": "echo-pantry-fib",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "fairness",
      "sanctity"
    ],
    "evidence": "design"
  },
  {
    "id": "delivery-morning",
    "title": "Late Delivery, in Daylight",
    "moment": "morning",
    "situation": "The supplier over-delivered a few units and has not noticed. The morning is quiet; there is room on the counter to count.",
    "options": [
      {
        "id": "a",
        "text": "Point it out.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "delivery-morning-a",
        "journal": "We counted the extra boxes in the morning light.",
        "callback": {
          "id": "echo-delivery-morning",
          "delay": 2
        },
        "compromise": false
      },
      {
        "id": "b",
        "text": "Accept silently.",
        "effects": {
          "money": 3,
          "lauraTrust": -2,
          "melanieNormalization": 3
        },
        "ledger": "delivery-morning-b",
        "journal": "I wheeled the extra boxes behind the cart.",
        "callback": {
          "id": "echo-delivery-morning",
          "delay": 2
        },
        "compromise": true
      },
      {
        "id": "c",
        "text": "Ask for a credit slip.",
        "effects": {
          "money": -2,
          "lauraTrust": 2,
          "melanieNormalization": 0
        },
        "ledger": "delivery-morning-c",
        "journal": "I kept the slip flat beneath the cash box.",
        "callback": {
          "id": "echo-delivery-morning",
          "delay": 2
        },
        "compromise": false
      }
    ],
    "conditions": [],
    "foundations": [
      "fairness",
      "care"
    ],
    "evidence": "design"
  },
  {
    "id": "stock-pastry",
    "title": "Yesterday?s pastries",
    "moment": "shift",
    "chain": "stock",
    "chainStep": 2,
    "situation": "Yesterday?s pastries are still on the tray. You could sell them as fresh.",
    "drift": "Rotate stock. There is enough to get through today.",
    "foundations": [
      "sanctity",
      "fairness"
    ],
    "conditions": [
      {
        "prior": "stock-accepted-1"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Label the pastries as yesterday?s and reduce the price.",
        "effects": {
          "money": -2
        },
        "ledger": "stock-pastry-refused",
        "journal": "I label the pastries as yesterday?s and reduce the price.",
        "compromise": false,
        "callback": {
          "id": "echo-stock-pastry",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Sell yesterday?s pastries as fresh.",
        "effects": {
          "money": 3,
          "melanieNormalization": 3
        },
        "ledger": "stock-accepted-2",
        "journal": "Yesterday?s pastries: Sell yesterday?s pastries as fresh.",
        "callback": {
          "id": "echo-stock-pastry",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Rotate stock."
      }
    ]
  },
  {
    "id": "stock-label",
    "title": "The date stickers",
    "moment": "shift",
    "chain": "stock",
    "chainStep": 3,
    "situation": "The date stickers show yesterday. You could replace them with today?s date.",
    "drift": "Refresh the labels. There is enough to get through today.",
    "foundations": [
      "sanctity",
      "fairness"
    ],
    "conditions": [
      {
        "prior": "stock-accepted-2"
      }
    ],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Keep the real dates on the stickers.",
        "effects": {
          "money": -2
        },
        "ledger": "stock-label-refused",
        "journal": "I keep the real dates on the stickers.",
        "compromise": false,
        "callback": {
          "id": "echo-stock-label",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Relabel the date stickers.",
        "effects": {
          "money": 4,
          "melanieNormalization": 3
        },
        "ledger": "stock-accepted-3",
        "journal": "The date stickers: Relabel the date stickers.",
        "callback": {
          "id": "echo-stock-label",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Refresh the labels."
      }
    ]
  },
  {
    "id": "till-exact",
    "title": "Exact change",
    "moment": "shift",
    "chain": "till",
    "chainStep": 0,
    "situation": "A customer waits while you count the exact change. The drawer will balance.",
    "drift": "Keep the drawer moving. There is enough to get through today.",
    "foundations": [
      "fairness",
      "loyalty"
    ],
    "conditions": [],
    "evidence": "design",
    "options": [
      {
        "id": "honest",
        "text": "Count it aloud and leave the drawer open for them to check.",
        "effects": {
          "money": -2
        },
        "ledger": "till-exact-refused",
        "journal": "I count it aloud and leave the drawer open for them to check.",
        "compromise": false,
        "callback": {
          "id": "echo-till-exact",
          "delay": 2
        }
      },
      {
        "id": "accept",
        "text": "Give exact change and keep the receipt.",
        "effects": {
          "money": 1,
          "melanieNormalization": 0
        },
        "ledger": "till-accepted-0",
        "journal": "Exact change: Give exact change and keep the receipt.",
        "callback": {
          "id": "echo-till-exact",
          "delay": 2
        },
        "compromise": true,
        "euphemism": "Keep the drawer moving."
      }
    ]
  }
];

export function validateData(data: Dilemma[] = dilemmas): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const d of data) {
    if (ids.has(d.id)) errors.push(`duplicate ${d.id}`);
    ids.add(d.id);
    if (
      !["morning", "shift", "evening"].includes(d.moment) ||
      d.options.length < 2 ||
      d.options.length > 3
    )
      errors.push(d.id);
    if (!d.foundations.length || d.foundations.length > 2 || d.foundations.some(f => !["care","fairness","loyalty","authority","sanctity","liberty"].includes(f))) errors.push(`${d.id} foundations`);
    if(!d.options.some(o=>o.callback)) errors.push(`${d.id} missing echo`);
    const opts = new Set<string>();
    for (const o of d.options) {
      if (opts.has(o.id) || !o.ledger || !o.journal || !o.text)
        errors.push(`${d.id} option`);
      opts.add(o.id);
      for (const [k, v] of Object.entries(o.effects))
        if (!stateKeys.includes(k as StateKey) || !Number.isFinite(v))
          errors.push(`${d.id} effect ${k}`);
      if (o.callback && (!callbacks[o.callback.id] || o.callback.delay < 1))
        errors.push(`${d.id} callback`);
    }
    for (const c of d.conditions) {
      if ("key" in c && !stateKeys.includes(c.key))
        errors.push(`${d.id} condition`);
      if (
        "prior" in c &&
        !data.some((x) => x.options.some((o) => o.ledger === c.prior))
      )
        errors.push(`${d.id} prior`);
    }
  }
  return errors;
}
