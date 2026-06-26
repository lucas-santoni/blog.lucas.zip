---
title: "What actually makes an engineer senior"
slug: what-makes-an-engineer-senior
date: 2026-06-26
description: "Tenure isn't seniority, and seniority isn't management. After six
years building an engineering team from one person to thirty at a fintech,
here's what I think seniority actually is: the ability to reduce uncertainty for
the people around you."
---

Is a developer with ten years of experience senior?

Most people answer yes without thinking about it. Ten years is a long time. They
must have seen a lot, learned a lot, earned the title. That instinct is exactly
the problem. We treat seniority as something that accumulates on its own, like
interest in a savings account, and it doesn't.

This post is roughly a written version of a talk I gave in French a while back,
which you can [watch here](https://www.youtube.com/watch?v=5I6Ozt30jI4&t=920s) if
that's your language.

I joined a fintech startup six years ago as a very early employee, and over the
next stretch I built the engineering team from scratch, from one engineer to more
than thirty. I hired seniors, I mislabeled people as seniors, I watched some
"juniors" run circles around people with twice their tenure, and I made most of
the classic mistakes myself. Along the way I changed my mind about what the word
even means. Here's where I landed.

## Time in the chair is not the same as growth

Someone who has been around longer does have more. More context, more scar
tissue, more history with the codebase and the people and the decisions nobody
remembers making. That's real, and it's valuable. But it is not the same thing
as having gotten better at the craft.

It helps to split what a person carries into two buckets. The first is
contextual value: knowing why the billing service has that weird carve-out,
remembering which client the retry logic was added for, knowing who to ask when
the legacy import breaks. This is precious. It keeps the lights on. But it is
bound to one environment. It evaporates the day they leave.

The second is transferable competence: the part they take with them out the
door. The judgment, the patterns, the ability to walk into a new system and a
new team and be useful within weeks. When we say someone is senior, we usually
mean we're impressed by their contextual value and we quietly assume the
transferable competence is there too. Often it isn't.

Picture two developers. One has eight years at a large company, working on a
narrow slice of a big system, with well-defined specs handed down and a clear
lane to stay in. The other has three years at an early-stage startup, making
structural architecture decisions with incomplete information, getting paged at
2am when production falls over, and scaling systems that were very much not built
to be scaled. Who has more transferable competence?

I'm not saying the answer is always the second one. The point is that the first
one's eight years tell you almost nothing on their own. It's not about duration.
It's about density of experience. Eight years of the same well-specified ticket
is eight years of one thing. Three years of being thrown into the deep end
repeatedly is something else entirely.

## Skill doesn't grow in a straight line

Company career ladders are roughly linear. Junior, mid, senior, lead, and so on,
each rung a tidy step above the last. Actual competence does not grow that way.
It moves in jumps and long flat stretches, and the ladder has no idea.

There's a saying that gets repeated because it keeps being true. Some people
don't have ten years of experience. They have one year of experience, repeated
ten times. The first year they learned the stack, shipped features, stopped
breaking things. Years two through ten they did that same year again, a little
faster, a little smoother, but not fundamentally harder.

This is the plateau, and most developers reach some version of it. They ship,
they don't break prod, they know their tools. Life is fine up there. And here's
the part people don't like to say out loud: usually there's no reason to leave.
The work gets done, the paycheck arrives, nobody is demanding more. Not everyone
is in love with this craft, and that is completely fine. Not every job has to be
a calling. But comfort and growth are bad roommates. They don't share a space
for long.

What actually moves you off the plateau is the stuff that feels bad in the
moment. Reading code you didn't write and wouldn't have written that way.
Stepping into a problem domain you don't master and feeling like a beginner
again. Taking the project where you're clearly the least qualified person in the
room. Growth lives in that discomfort. The day everything at work feels easy is
the day you've stopped getting better.

## Seniority is not management

Here is one of the most expensive mistakes a growing company makes, and I've
both committed it and cleaned up after it. "She's been here five years, she's
senior, let's give her a team." It's a great way to lose a strong engineer and
manufacture a struggling manager in a single move.

Management is not a promotion you earn by being good at engineering. It's a
career change. It runs on a different set of skills that nobody acquires by
writing good code: giving feedback that lands, sitting in conflict without
flinching, prioritizing other people's work, recruiting, and absorbing pressure
from above so your team can keep their heads down. Some excellent engineers want
none of that, and forcing it on them punishes everyone.

The healthier model has two tracks. There's the management track: tech lead,
engineering manager, VP of Engineering. And there's the individual contributor
track: senior engineer, staff engineer, principal engineer. Both are legitimate.
Both go far, in title and in compensation. And both require leadership, which is
the part people miss when they assume IC means "just codes, quietly."

The difference is the kind of leadership. A manager has positional leadership.
They have a team, they're responsible for people, the authority comes with the
box on the org chart. A staff engineer has leadership of influence. They have
authority over no one, and they still shape the technical direction, align teams
that are drifting apart, and unblock situations that would otherwise stall for
weeks. They lead because people choose to follow their judgment, not because
they have to.

So seniority does not mean management. But, and this is the nuance that matters,
seniority does mean leadership in some form. If your influence ends at the edge
of your own keyboard, you're not senior yet, whatever the title says.

## So what is it? Reducing uncertainty.

If I have to compress it into one idea, here it is. A senior engineer reduces
uncertainty for the people around them. Everything else is a symptom of that.
Four things make it concrete.

The first is technical culture. Knowing what not to do is usually worth more
than knowing what to do. A senior has accumulated enough scars to recognize, on
sight, the paths that end in tears. The clever abstraction that will rot. The
"quick" migration that will eat a quarter. The architecture that looks fine on
the whiteboard and becomes a hostage situation in production. It isn't theory.
It's pattern matching, forged by having been burned, and it saves teams from
running into walls that the senior already has the bruises from.

The second is communication. A senior can take a technical tradeoff and
translate it into business impact a product manager can act on. They can explain
an infrastructure risk in terms a CEO actually feels. They calibrate the level
of detail to who's in the room, instead of either drowning people in jargon or
talking down to them. This sounds obvious written down. It is genuinely rare and
genuinely hard, and the people who can do it are worth their weight.

The third is vision beyond engineering, and in a startup or scale-up it's
decisive. An engineer who understands churn, ARR, the acquisition funnel, and
how much runway the burn rate leaves makes fundamentally different technical
decisions than one who only sees code. They know when "good enough, shipped this
week" beats "perfect, shipped next quarter," because they understand what the
business is actually racing against. They prioritize differently. They anticipate
the thing that's about to matter instead of polishing the thing that doesn't.

The fourth is the multiplier effect, and it's the one that separates a genuinely
good developer from a senior. A developer who only solves their own problems,
even brilliantly and fast, is a good developer. Full stop. What makes someone
senior is making the people around them better. Code review that teaches instead
of just gatekeeping. Documentation that means the next person doesn't have to
ask. Spending ten minutes to unblock a junior who's been stuck for two hours,
instead of letting them grind so they "learn." Your individual output has a hard
ceiling, set by the number of hours in your day. Your impact as a multiplier
doesn't.

## Back to the question

So, is a developer with ten years of experience senior? You can't know from the
sentence. Ten years tells you how long they've been employed, nothing more.

Being senior was never about time, titles, or lines of code. It's about what you
did with the time. It's whether the people around you face less uncertainty
because you're there, and whether they leave each interaction a little more
capable than they came in. That's the whole thing. The years are just the
container. What you poured into them is what counts.
