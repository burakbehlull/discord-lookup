import axios from "axios";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const config = useRuntimeConfig();

  if (!id) return { error: "Kullanıcı ID gerekli." };

  try {
    const res = await axios.get(`https://discord.com/api/v10/users/${id}`, {
      headers: { Authorization: config.discordToken },
    });

    const user = res.data;
    const badges: string[] = [];
    const flags = user.public_flags ?? 0;

    const badgeMap: Record<number, string> = {
      1: "Discord Staff",
      2: "Partner",
      4: "Hypesquad Events",
      8: "Bug Hunter Level 1",
      64: "HypeSquad Bravery",
      128: "HypeSquad Brilliance",
      256: "HypeSquad Balance",
      512: "Early Supporter",
      16384: "Bug Hunter Level 2",
      131072: "Verified Bot Developer",
      4194304: "Active Developer",
    };

    for (const [flag, name] of Object.entries(badgeMap)) {
      if (flags & Number(flag)) badges.push(name);
    }

    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`,
      banner: user.banner
        ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`
        : null,
      accent_color: user.accent_color,
      badges,
      premium_type: user.premium_type || 0,
      createdAt: new Date(Number((BigInt(user.id) >> 22n) + 1420070400000n)),
    };
  } catch (err: any) {
    return { error: "Kullanıcı bulunamadı veya API hatası." };
  }
});
