require("dotenv").config();
const { App } = require("@slack/bolt");
const app = new App({ token: process.env.SLACK_BOT_TOKEN, appToken: process.env.SLACK_APP_TOKEN, socketMode: true });
app.command("/joseph-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  const jojoconfused = confused();
  if (jojoconfused) {
    await respond({ text: jojoconfused })
  } else
    await respond({ text: `OH MY GOD! I'm Still alive!\nLatency: ${latency}ms` });
});
function confused() {
  const chance = Math.random();
  if (chance < 0.05) {
    return `Huh?`;
  } else if (chance < 0.1) {
    return `He-llo? Could you say that again? More slowly? In a language I understand?`;
  }
}
app.command("/joseph-hermit", async ({ command, ack, respond, client }) => {
  const match = command.text.match(/<@([UW][A-Z0-9]+)(?:\|[^>]+)?>/)
  await ack();
  const jojoconfused = confused();
  if (jojoconfused) {
    await respond({ text: jojoconfused })
  } else {
    if (!match) {
      await respond("OH NO! Did you forget the name of the person?");
      return;
    }
    const UID = match[1];
    try {
      const result = await client.users.info({ user: UID });
      const user = result.user;
      const profile = user.profile;
      await respond({
        response_type: "ephemeral",
        text: `*HERMIT PURPLE!*\n` + `* Name:* ${profile.real_name || user.name}\n` +
          `*Display Name:* ${profile.display_name || user.name}\n` +
          `*Status:* ${profile.status_text || "No status"}\n` +
          `*Timezone:* ${user.tz || "Unknown"}\n` +
          `*User ID:* ${user.id}`
      });
    } catch (error) {
      console.error(error);
      await respond("OH NO! Hermit Purple failed");
    }
  }
}
);
app.command("/joseph-sp", async ({ command, ack, respond, client }) => {
  const match = command.text.match(/<@([UW][A-Z0-9]+)(?:\|[^>]+)?>/)
  await ack();
  const jojoconfused = confused();
  if (jojoconfused) {
    await respond({ text: jojoconfused })
  } else {
    if (!match) {
      await respond("OH NO! Did you forget the name of the person?");
      return;
    }
    const UID = match[1];
    try {
      const result = await client.users.profile.get({ user: UID })
      const profile = result.profile;
      const pfp = profile.image_512 || profile.image_192 || profile.image_72;
      if (!pfp) {
        await respond("OH MY GOD! I can't find a photograph of this person!");
        return;
      }
      await respond({
        response_type: "in_channel",
        text: `HERMIT PURPLE! Here's a Spirit photograph of <@${UID}>`,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "HERMIT PURPLE!"
            }
          },
          {
            type: "image",
            image_url: pfp,
            alt_text: `Spirit Photography of ${profile.display_name || "your intended Slack user"}`
          }
        ]
      })
    } catch (error) {
      console.error(error);
      await respond("OH NO! Hermit Purple failed");
    }
  }
});
app.command("/joseph-story", async ({ command, ack, respond }) => {
  await ack();
  const responses = [`When I was 19, I fought 3 Aztec gods!`,
    `Back in my day, we treated our elders respectfully`,
    `I was raised by my Grandma`,
    `My Adopted Granduncle is an evil vampire and killed my Grandpa`,
    `My Mom was my teacher and looked as young as me when I was 19`,
    `You know, I could've still been pretty young today if I kept practicing Hamon`,
    `I once defeated an Aztec God when I was 19, I sent him to space, somehow. I bet he thought it was all a part of my plan, even though I just cheesed it`,
    `The leader of the Aztecs God I fought, Kars, cut this left hand off, so a nice Nazi Cyborg Soldier gifted me this metal hand as a Thank You gift`,
    `You know I can find out stuff about people using my stand, right?`,
    `I once pulled out a Tommy gun and Grenades to fight a Vampire, all American style`,
    `I might have crashed a plane once, actually I think it might have been more`,
    `I crashed my own funeral once, everyone though I was a ghost`,
    `My stand is a bunch of purple vines, called "Hermit Purple", that can tell me about anyone, but I can also use them to feel like Spider-Man`,
    `My Grandson calls me "Old Man", the Disrespect!!!`,
    `I once travelled halfway throughout the world for 50 days with my Grandson to save my Daughter, now I can't even walk properly without my cane`,
    `I've been to Egypt. Fun trip, except for the fact that my Granduncle was somehow alive again and was sending his goons to try and kill us`,
    `I used to predict what people were about to say. Now I can't even hear what they're saying`,
    `Did I ever tell you about the time I dressed up as a woman to fool some Nazis? No?`,
    `Back in the good old days, I used some steel clackers as weapons. Another reason why old toys were the best!`,
    `I spent a fortune on just Cameras for spirit photography, Hermit Purple isn't exactly economical, you know`]
  const story = responses[Math.floor(Math.random() * responses.length)];
  const jojoconfused = confused();
  if (jojoconfused) {
    await respond({ text: jojoconfused })
  } else
    await respond({ text: story });
});
(async () => {
  await app.start();
  console.log("bot is running!");
})();