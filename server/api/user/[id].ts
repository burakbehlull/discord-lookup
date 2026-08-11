import axios from "axios";

const BADGE_ICONS: Record<number, { name: string; icon: string; iconType: "svg" | "emoji"; color: string }> = {
  1: {
    name: "Discord Staff",
    icon: "👑",
    iconType: "emoji",
    color: "#5865F2",
  },
  2: {
    name: "Partner",
    icon: "💎",
    iconType: "emoji",
    color: "#5865F2",
  },
  4: {
    name: "Hypesquad Events",
    icon: "/icons/hypesquadevents.svg",
    iconType: "svg",
    color: "#F47FFF",
  },
  8: {
    name: "Bug Hunter Level 1",
    icon: "🐛",
    iconType: "emoji",
    color: "#FEE75C",
  },
  64: {
    name: "HypeSquad Bravery",
    icon: "/icons/hypesquadbravery.svg",
    iconType: "svg",
    color: "#F47B67",
  },
  128: {
    name: "HypeSquad Brilliance",
    icon: "💡",
    iconType: "emoji",
    color: "#F47B67",
  },
  256: {
    name: "HypeSquad Balance",
    icon: "⚖️",
    iconType: "emoji",
    color: "#45DDC0",
  },
  512: {
    name: "Early Supporter",
    icon: "/icons/discordearlysupporter.svg",
    iconType: "svg",
    color: "#EB459E",
  },
  1024: {
    name: "Team User",
    icon: "👥",
    iconType: "emoji",
    color: "#5865F2",
  },
  16384: {
    name: "Bug Hunter Level 2",
    icon: "/icons/discordbughunter2.svg",
    iconType: "svg",
    color: "#FEE75C",
  },
  131072: {
    name: "Verified Bot Developer",
    icon: "/icons/discordbotdev.svg",
    iconType: "svg",
    color: "#3BA55D",
  },
  262144: {
    name: "Certified Moderator",
    icon: "/icons/discordmod.svg",
    iconType: "svg",
    color: "#3BA55D",
  },
  4194304: {
    name: "Active Developer",
    icon: "⚡",
    iconType: "emoji",
    color: "#5865F2",
  },
};

const NITRO_TYPES = [
  { level: 0, name: "Yok", icon: null, iconType: null as null | "svg" | "emoji" },
  {
    level: 1,
    name: "Nitro Basic",
    icon: "/icons/discordnitro.svg",
    iconType: "svg" as "svg" | "emoji",
  },
  {
    level: 2,
    name: "Nitro Boost",
    icon: "/icons/discordbooster.svg",
    iconType: "svg" as "svg" | "emoji",
  },
  {
    level: 3,
    name: "Nitro Basic",
    icon: "/icons/discordnitro.svg",
    iconType: "svg" as "svg" | "emoji",
  },
];

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const config = useRuntimeConfig();

  if (!id) return { error: "Kullanıcı ID gerekli." };

  try {
    const res = await axios.get(`https://discord.com/api/v10/users/${id}`, {
      headers: { Authorization: config.discordToken },
    });

    const user = res.data;
    const flags = user.public_flags ?? 0;
    const badges: Array<{ id: number; name: string; icon: string; iconType: "svg" | "emoji"; color: string }> = [];

    for (const [flag, badge] of Object.entries(BADGE_ICONS)) {
      if (flags & Number(flag)) {
        badges.push({ id: Number(flag), ...badge });
      }
    }

    const createdAt = new Date(Number((BigInt(user.id) >> 22n) + 1420070400000n));

    const premium_type = user.premium_type || 0;
    const nitroRaw = NITRO_TYPES[premium_type] || NITRO_TYPES[0];
    const nitro = {
      level: nitroRaw.level,
      name: nitroRaw.name,
      icon: nitroRaw.icon,
      iconType: nitroRaw.iconType,
      subscription: premium_type > 0,
    };

    let clan = null;
    if (user.clan) {
      clan = {
        tag: user.clan.tag,
        badge: user.clan.badge
          ? `https://cdn.discordapp.com/clan-badges/${user.id}/${user.clan.badge}.png?size=128`
          : null,
        guild_id: user.clan.guild_identity?.guild_id || null,
      };
    }

    return {
      id: user.id,
      username: user.username,
      global_name: user.global_name || user.username,
      display_name: user.global_name || user.username,
      discriminator: user.discriminator,
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`,
      avatar_gif: user.avatar?.startsWith("a_")
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=512`
        : null,
      banner: user.banner
        ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`
        : null,
      banner_gif: user.banner?.startsWith("a_")
        ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.gif?size=1024`
        : null,
      banner_color: user.banner_color || null,
      accent_color: user.accent_color ? `#${user.accent_color.toString(16).padStart(6, "0")}` : null,
      bio: user.bio || "",
      locale: user.locale || null,
      verified: user.verified || false,
      bot: user.bot || false,
      system: user.system || false,
      mfa_enabled: user.mfa_enabled || false,
      email: user.email || null,
      flags,
      public_flags: flags,
      badges,
      premium_type,
      nitro,
      clan,
      createdAt: createdAt.toISOString(),
      createdAtTimestamp: createdAt.getTime(),
    };
  } catch (err: any) {
    if (err.response?.status === 404) {
      return { error: "Kullanıcı bulunamadı." };
    }
    if (err.response?.status === 401) {
      return { error: "Discord API yetkilendirme hatası. Bot tokenini kontrol edin." };
    }
    return { error: "Kullanıcı bulunamadı veya API hatası." };
  }
});
