// ==========================================
// ASSET PATHS & CONFIGURATION
// ==========================================

// Base path for assets
const ASSETS_BASE = '/assets';

// Logo and Branding
export const ASSETS = {
    // Main logo - Moon reading a book with stars
    logo: `${ASSETS_BASE}/unnamed-2.jpg`,

    // Luna Character - Sleepy moon with nightcap (transparent)
    lunaCharacter: `${ASSETS_BASE}/unnamed-3.jpg`,
    luna: `${ASSETS_BASE}/unnamed-10.jpg`,

    // Cloud Character - Reading with glasses
    cloudCharacter: `${ASSETS_BASE}/unnamed-5.jpg`,

    // Open Book Frame - For story reading background
    bookFrame: `${ASSETS_BASE}/unnamed-15.jpg`,
    bookFrameGold: `${ASSETS_BASE}/unnamed-30.jpg`,

    // Book Icons Set - 4 colored books
    bookIcons: `${ASSETS_BASE}/unnamed-18.jpg`,

    // Star Progress Bar - Gamification
    starProgress: `${ASSETS_BASE}/unnamed-20.jpg`,

    // Sleepy Moon - For sleep mode
    sleepyMoon: `${ASSETS_BASE}/unnamed-22.jpg`,

    // Character Set - Moon, stars, owl, fairy
    characterSet: `${ASSETS_BASE}/unnamed-27.jpg`,

    // Theme Backgrounds
    candyLand: `${ASSETS_BASE}/unnamed-25.jpg`,

    // Additional assets
    bedtimeLogo: `${ASSETS_BASE}/lucid-origin_Bedtime_logo_design_for_children_sleeping_moon_and_book_magic_stars_dark_purple_-0.jpg`,
} as const;

// Storyteller asset mapping
export const STORYTELLER_ASSETS: Record<string, string> = {
    grandmother: ASSETS.characterSet, // Use character from set
    grandfather: ASSETS.characterSet,
    fairy: ASSETS.characterSet,
    robot: ASSETS.characterSet,
    unicorn: ASSETS.characterSet,
    bear: ASSETS.characterSet,
    owl: ASSETS.characterSet,
    star: ASSETS.characterSet,
    cloud: ASSETS.cloudCharacter,
    moon: ASSETS.lunaCharacter,
};

// Theme background mapping
export const THEME_BACKGROUNDS: Record<string, string> = {
    castle: ASSETS.candyLand,
    space: ASSETS.bedtimeLogo,
    forest: ASSETS.candyLand,
    ocean: ASSETS.candyLand,
    clouds: ASSETS.cloudCharacter,
    stars: ASSETS.lunaCharacter,
};

// Export helper function
export function getAssetUrl(assetKey: keyof typeof ASSETS): string {
    return ASSETS[assetKey];
}
