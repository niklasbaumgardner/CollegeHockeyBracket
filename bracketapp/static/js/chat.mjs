if (CHAT_USER) {
  const client = StreamChat.getInstance("w22wdxnm8jwk");

  console.log(CHAT_USER);
  await client.connectUser(
    {
      id: `${CHAT_USER.id}`,
      name: CHAT_USER.name,
    },
    CHAT_USER.token
  );

  const channel = client.channel("messaging", "BracketApp");
  await channel.create();

  console.log(channel);
}
