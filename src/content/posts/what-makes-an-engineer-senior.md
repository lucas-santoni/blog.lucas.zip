---
title: "Is a developer with ten years of experience senior?"
slug: what-makes-an-engineer-senior
date: 2026-06-26
description: "Tenure isn't seniority, and seniority isn't management. After six
years building an engineering team from one person to thirty at a fintech, here's
what I've come to believe seniority is: the ability to reduce uncertainty for the
people around you."
---

Is a developer with ten years of experience senior?

I think most people would answer "yes" without really thinking about it. Ten
years is a long time after all. They must have seen a lot, learned a lot,
earned the title. That instinct is exactly the problem. We tend to treat
seniority as something that accumulates on its own, like interest in a savings
account... But I don't think it does!

This post is roughly a written version of a talk I gave in French a while back,
which you can [watch here](https://www.youtube.com/watch?v=5I6Ozt30jI4&t=920s) if
that's your language.

---

I joined a fintech startup as CTO six years ago, when the company was only four
people (including me!). I built the engineering team from scratch, from one
engineer to more than thirty. I hired seniors, I mislabeled people as seniors,
I watched some "juniors" run circles around people with twice their tenure, and
I made a lot of mistakes myself. Along the way I changed my mind about what the
word even means.

**None of what follows is a framework or a rule.** It's just what I learned the hard
way, written down for the version of me who was about to make his first hire and
had no idea what he was looking for. If you're building or scaling a team right
now, I hope some of it saves you a mistake or two. But it's one person's
experience, and your context will differ from mine in ways that matter. Take what
resonates and leave the rest.

## Time in the chair is not the same as growth

Someone who has been around longer does have more. More context, more scar
tissue, more history with the codebase or the people and the decisions nobody
remembers making. That's real, and it's valuable. But it is not the same thing
as having gotten better at the craft.

It helps to split what a person carries into two buckets. **The first is
contextual value**: knowing why some service has that weird carve-out,
remembering which client the retry logic was added for, knowing who to ask when
the legacy import breaks: this is precious. But it is bound to one environment
so it evaporates the day this person leaves.

**The second is transferable competence**: the part they take with them out the
door. The judgment, the patterns, the ability to walk into a new system and /
or a new team and be useful within days or weeks. When we say someone is
senior, we usually mean _we're impressed by their contextual value and we
quietly assume the transferable competence is there too_. But from my
experience, it's not always the case.

Picture two developers... One has eight years at a large company, working on a
narrow slice of a big system, with well-defined specs handed down and a clear
lane to stay in. The other has three years at an early-stage startup, making
structural architecture decisions with incomplete information, getting paged
at 2am when production falls over, and scaling systems that were very much not
built to be scaled. Who has more transferable competence?

I'm not saying the answer is always the second one. **The point is that the first
one's eight years tell you almost nothing on their own.** It's not about duration,
it's about **density of experience**. Eight years of the same well-specified ticket
is eight years of one thing. Three years of being thrown into the deep end
repeatedly is something else entirely.

## Skill doesn't grow in a straight line

Company career ladders are roughly linear: junior, mid, senior, lead, and so
on... each rung a tidy step above the last. But actual competence does not grow
that way. You don't magically become "mid"
after two years and "senior" after five.

There's a saying that **some people don't have ten years of experience; they
have one year of experience, repeated ten times**. The first year they learned
the stack, shipped features, stopped breaking things. Years two through ten
they did that same year again, a little faster, a little smoother, but not
fundamentally harder or different.

This is the plateau, and most developers reach some version of it. They ship,
they don't break prod, they know their tools. Life is fine up there and there's
no reason to challenge the _status quo_. The work gets done, the paycheck
arrives, nobody is demanding more. Not everyone is in love with this craft, and
that is completely fine. Not every job has to be a calling. But comfort and
growth are bad roommates.

What actually moves you off the plateau is the stuff that feels bad in the
moment: reading code you didn't write and wouldn't have written that way,
stepping into a problem domain you don't master and feeling like a beginner
again, taking the project where you're clearly the least qualified person in
the room, etc. Growth lives in that discomfort. The day everything at work
feels easy is the day you've stopped getting better.

## Seniority is not management

A very obvious and expensive mistake I've made myself is to promote great
engineers to a management position. "He's been here five years, he's senior,
let's give him a team." **It's a great way to lose a strong engineer and
manufacture a struggling manager in a single move...**

**Management is not a promotion you earn by being good at engineering. It's a
career change.** It runs on a different set of skills that nobody acquires by
writing good code: giving feedback that lands, sitting in conflict without
flinching, prioritizing other people's work, recruiting, absorbing pressure
from above so your team can keep their heads down and a ton of other things.
**Some excellent engineers want none of that and / or are bad at it, and
forcing it on them punishes everyone.**

The healthier model has two tracks. There's the management track: tech lead,
engineering manager, VP of Engineering. And there's the individual contributor
track: senior engineer, staff engineer, principal engineer. Both are
legitimate, both go far in title / compensation and both require leadership.
The difference is the kind of leadership:

* **A manager has positional leadership.** They have a team, they're responsible
  for people, the authority comes with the box on the org chart.
* **A staff engineer has leadership of influence.** They have authority over no
  one, and they still shape the technical direction, align teams that are
  drifting apart, and unblock situations that would otherwise stall for weeks.
  They lead because people choose to follow their judgment, not because they
  have to.

Fortunately, most well-structured companies operate on some version of this
dual-track framework. But when your startup is small and everyone does a bit of
everything, it's easy to confuse seniority and management.

So seniority does NOT mean management. But, and this is the nuance that
matters, **seniority does mean leadership in some form**. If your influence
ends at the edge of your own keyboard, you're not senior yet, whatever the
title says.

## So what is it? Reducing uncertainty

If I have to compress it into one idea, here it is. **Senior engineers reduce
uncertainty for the people around them.** Everything else is a symptom of that.
I've identified four main things that make it concrete. All four assume real
technical depth underneath, but they lean just as hard on personality and soft
skills: empathy, kindness, humility and the instinct to put the team before
your own ego.

**The first is technical culture.** Knowing what NOT to do is sometimes worth
more than knowing what to do. A senior has accumulated enough scars to
recognize, on sight, the paths that end in tears: clever abstractions that
cause more harm than good, "quick" migrations that end up eating up a quarter,
architectures which look fine on paper but suffer blatant scalability issues...
The senior recognizes patterns and reduces uncertainty by being able to say
"let's do this" or "let's not do this" with a good level of confidence.

**The second is communication.** A senior can take a technical tradeoff and
translate it into business impact a product manager or salesperson can act on. They
can explain an infrastructure risk in terms a CEO actually feels. They
calibrate the level of detail to who's in the room, instead of either drowning
people in jargon or talking down to them. This sounds obvious written down but
it's genuinely rare and hard.

**The third is vision beyond engineering**, which is especially relevant in a
startup or scaleup. An engineer who understands churn, ARR, the acquisition
funnel, and how much runway the burn rate leaves makes fundamentally different
technical decisions than one who only sees code. They know when "good enough,
shipped this week" beats "perfect, shipped next quarter," because they
understand what the business is actually racing against. They prioritize
differently and they anticipate the thing that's about to matter instead of
polishing the thing that doesn't.

**The fourth is the multiplier effect**. A developer who only solves their own
problems, even brilliantly and fast, is a great developer. What tips them into
senior is making the people around them better, whether directly or through the
systems they leave behind. Some examples: code review that teaches instead of
just gatekeeping, documentation that means the next person doesn't have to ask,
an architecture clean enough that nobody has to ask how it works, spending ten
minutes to unblock a junior who's been stuck for two hours instead of letting
them grind so they "learn". Your
individual output has a hard ceiling, set by the hours in your day. Your impact
as a multiplier doesn't.

## Back to the question

So, is a developer with ten years of experience senior? In my experience, you
can't know from the sentence. Ten years tells you how long they've been
employed, nothing more.

For me, being senior was never about time, titles, or lines of code. It's about
what you did with the time. It's whether the people around you face less
uncertainty because you're there, and whether they leave each interaction a
little more capable than they came in. That's where I've landed, at least. The
years are just the container and it's what you poured into them that counts.

If you're hiring or growing a team, that's the lens I'd offer: stop counting
years and start asking who reduces uncertainty for everyone else. It's served
me well, but it's only my experience. Test it against your own and keep what
holds! Good luck to you!
