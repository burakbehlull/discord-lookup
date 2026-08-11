import axios from "axios";

const BADGE_ICONS: Record<number, { name: string; icon: string; color: string }> = {
  1: {
    name: "Discord Staff",
    icon: "https://cdn.discordapp.com/badge-icons/5e747f5723f201105e9a52a09431e759.png",
    color: "#5865F2",
  },
  2: {
    name: "Partner",
    icon: "https://cdn.discordapp.com/badge-icons/3fcd18f3a3bb93655a603aac6c1259cb.png",
    color: "#5865F2",
  },
  4: {
    name: "Hypesquad Events",
    icon: "https://cdn.discordapp.com/badge-icons/bf01d00716819c941a9101b004d65d96.png",
    color: "#F47FFF",
  },
  8: {
    name: "Bug Hunter Level 1",
    icon: "https://cdn.discordapp.com/badge-icons/2baa52e093b920b97c383d6dc943c5d7.png",
    color: "#FEE75C",
  },
  64: {
    name: "HypeSquad Bravery",
    icon: "https://cdn.discordapp.com/badge-icons/03256293315000382817ee64e574c0f6.png",
    color: "#F47B67",
  },
  128: {
    name: "HypeSquad Brilliance",
    icon: "https://cdn.discordapp.com/badge-icons/aa38fdfa5c1abdf673524e1922f3ba18.png",
    color: "#F47B67",
  },
  256: {
    name: "HypeSquad Balance",
    icon: "https://cdn.discordapp.com/badge-icons/1aa2a58d7eb0f35cc37c2de7c6e78b64.png",
    color: "#45DDC0",
  },
  512: {
    name: "Early Supporter",
    icon: "https://cdn.discordapp.com/badge-icons/706078676679a4ae3d90e4c0d1b3ec44.png",
    color: "#EB459E",
  },
  1024: {
    name: "Team User",
    icon: "https://cdn.discordapp.com/badge-icons/1a66de499daa2dba2c43e6b5c0a19f0a.png",
    color: "#5865F2",
  },
  16384: {
    name: "Bug Hunter Level 2",
    icon: "https://cdn.discordapp.com/badge-icons/98f7c1c85d8786d340357687c45cfe6c.png",
    color: "#FEE75C",
  },
  131072: {
    name: "Verified Bot Developer",
    icon: "https://cdn.discordapp.com/badge-icons/6f86b1593c6cf4694d66c91b33bf6ce1.png",
    color: "#3BA55D",
  },
  262144: {
    name: "Certified Moderator",
    icon: "https://cdn.discordapp.com/badge-icons/fee163552257cc58c7de6c30d23f314b.png",
    color: "#3BA55D",
  },
  4194304: {
    name: "Active Developer",
    icon: "https://cdn.discordapp.com/badge-icons/6bdc42827a3840813c854be932d75401.png",
    color: "#5865F2",
  },
};

const NITRO_TYPES = [
  { level: 0, name: "Yok", icon: null },
  { level: 1, name: "Nitro Basic", icon: "https://cdn.discordapp.com/emojis/833287463203618857.webp" },
  { level: 2, name: "Nitro Boost", icon: "https://cdn.discordapp.com/emojis/833287463203618857.webp" },
  { level: 3, name: "Nitro Basic", icon: "https://cdn.discordapp.com/emojis/833287463203618857.webp" },
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
    const badges: Array<{ id: number; name: string; icon: string; color: string }> = [];

    for (const [flag, badge] of Object.entries(BADGE_ICONS)) {
      if (flags & Number(flag)) {
        badges.push({ id: Number(flag), ...badge });
      }
    }

    const createdAt = new Date(Number((BigInt(user.id) >> 22n) + 1420070400000n));

    const premium_type = user.premium_type || 0;
    const nitro = NITRO_TYPES[premium_type] || NITRO_TYPES[0];

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
      nitro: {
        ...nitro,
        subscription: premium_type > 0,
      },
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
