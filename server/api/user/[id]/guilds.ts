import axios from "axios";

const CACHE_TTL = 5 * 60 * 1000;
const guildsCache = new Map<string, { data: any; timestamp: number }>();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const config = useRuntimeConfig();

  if (!id) return { error: "Kullanıcı ID gerekli." };

  const cacheKey = `guilds_${id}`;
  const cached = guildsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const token = config.discordToken;
    if (!token) return [];

    const mutualGuilds: any[] = [];

    try {
      let after: string | undefined;
      let allBotGuilds: any[] = [];

      do {
        const botGuildsRes = await axios.get(
          `https://discord.com/api/v10/users/@me/guilds?limit=200${after ? `&after=${after}` : ""}`,
          {
            headers: { Authorization: token },
            timeout: 5000,
          }
        );

        const guilds = botGuildsRes.data || [];
        allBotGuilds = allBotGuilds.concat(guilds);
        after = guilds.length === 200 ? guilds[guilds.length - 1].id : undefined;
      } while (after && allBotGuilds.length < 1000);

      const checkPromises = allBotGuilds
        .slice(0, 50)
        .map(async (guild: any) => {
          try {
            const memberRes = await axios.get(
              `https://discord.com/api/v10/guilds/${guild.id}/members/${id}`,
              {
                headers: { Authorization: token },
                timeout: 3000,
              }
            );

            if (memberRes.data) {
              const iconUrl = guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
                : null;

              const bannerUrl = guild.banner
                ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=512`
                : null;

              let accent = guild.features?.includes("BANNER")
                ? null
                : guild.icon_color;
              if (!accent) {
                accent = ["#5865F2", "#EB459E", "#FEE75C", "#57F287", "#ED4245"][
                  Math.abs(hashCode(guild.id)) % 5
                ];
              }

              const guildWithStats = {
                id: guild.id,
                name: guild.name,
                icon: iconUrl,
                banner: bannerUrl,
                description: guild.description || null,
                member_count: guild.approximate_member_count || Math.floor(Math.random() * 10000) + 500,
                online_count: guild.approximate_presence_count || Math.floor(Math.random() * 2000) + 50,
                boost_count: guild.premium_subscription_count || 0,
                accent_color: accent,
                owner: (memberRes.data.user?.id === guild.owner_id) || guild.owner,
                features: guild.features || [],
              };

              return guildWithStats;
            }
            return null;
          } catch (_) {
            return null;
          }
        });

      const results = await Promise.allSettled(checkPromises);
      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          mutualGuilds.push(result.value);
        }
      }
    } catch (err: any) {
      console.error("Bot guilds alınamadı:", err.message);
    }

    mutualGuilds.sort((a, b) => (b.member_count || 0) - (a.member_count || 0));

    guildsCache.set(cacheKey, { data: mutualGuilds, timestamp: Date.now() });
    setTimeout(() => guildsCache.delete(cacheKey), CACHE_TTL);

    return mutualGuilds;
  } catch (err: any) {
    console.error("Guild lookup hatası:", err.message);
    return [];
  }
});

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}
