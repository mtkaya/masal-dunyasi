// ==========================================
// AI STORY GENERATION SERVICE
// ==========================================

import { StoryConfig, ThemeType, ToneType, StorytellerType, THEMES, STORYTELLERS } from '../types';

// Story generation response
export interface GeneratedStory {
    title: string;
    content: string;
    estimatedDuration: number; // in seconds
}

// Get theme info
function getThemeInfo(themeId: ThemeType): { emoji: string; name: string } {
    const theme = THEMES.find(t => t.id === themeId);
    return theme ? { emoji: theme.emoji, name: theme.titleTr } : { emoji: '✨', name: 'Masal' };
}

// Get storyteller info
function getStorytellerInfo(tellerId: StorytellerType): { emoji: string; name: string } {
    const teller = STORYTELLERS.find(t => t.id === tellerId);
    return teller ? { emoji: teller.emoji, name: teller.name } : { emoji: '👵', name: 'Nine' };
}

// Generate prompt for AI
function generatePrompt(childName: string, config: StoryConfig): string {
    const themeInfo = getThemeInfo(config.theme);
    const tellerInfo = getStorytellerInfo(config.storyteller);

    const toneDescriptions: Record<ToneType, string> = {
        calm: 'sakin, rahatlatıcı ve huzur verici',
        funny: 'eğlenceli, komik ve neşeli',
        adventurous: 'heyecanlı, macera dolu ama korkutucu olmayan',
        educational: 'eğitici ve öğretici',
        dreamy: 'hayalperest ve rüya gibi'
    };

    const wordCount = config.duration * 150; // ~150 words per minute for reading

    return `
Sen bir çocuk masalı yazarısın. ${tellerInfo.name} gibi konuşan, sıcak ve sevecen bir anlatıcısın.

${childName} adında (2-8 yaş arası) bir çocuk için ${themeInfo.name} (${themeInfo.emoji}) temalı bir uyku masalı yaz.

KURALLAR:
- Masal Türkçe olmalı
- Yaklaşık ${wordCount} kelime olmalı (${config.duration} dakikalık)
- Ton: ${toneDescriptions[config.tone]}
- ${childName}'in adı masalda mutlaka geçmeli
- Masal "Bir varmış bir yokmuş" ile başlamalı
- Mutlu ve huzurlu bir sonla bitmeli
- Uyku saatine uygun, rahatlatıcı bir atmosfer yaratmalı

${config.includeWords.length > 0 ? `ŞU KELİMELER MASALDA GEÇMELİ: ${config.includeWords.join(', ')}` : ''}
${config.excludeWords.length > 0 ? `ŞU KELİMELER MASALDA GEÇMEMELİ: ${config.excludeWords.join(', ')}` : ''}

Masalın başlığını da ver. Format:
BAŞLIK: [masal başlığı]
---
[masal içeriği]
`.trim();
}

// Parse AI response
function parseStoryResponse(response: string): GeneratedStory {
    const lines = response.trim().split('\n');
    let title = 'Masal';
    let content = response;

    // Try to extract title
    if (lines[0].startsWith('BAŞLIK:')) {
        title = lines[0].replace('BAŞLIK:', '').trim();
        const separatorIndex = response.indexOf('---');
        if (separatorIndex !== -1) {
            content = response.substring(separatorIndex + 3).trim();
        } else {
            content = lines.slice(1).join('\n').trim();
        }
    }

    // Estimate duration (150 words per minute)
    const wordCount = content.split(/\s+/).length;
    const estimatedDuration = Math.ceil((wordCount / 150) * 60);

    return { title, content, estimatedDuration };
}

// ==========================================
// MOCK STORY GENERATOR (No API Required)
// ==========================================

const MOCK_STORIES: Record<ThemeType, (childName: string, config: StoryConfig) => GeneratedStory> = {
    castle: (childName, config) => ({
        title: `${childName} ve Büyülü Şato`,
        content: `Bir varmış bir yokmuş, çok uzun zaman önce, mor dağların ardında parlayan bir şato varmış.

Bu şatoda çok özel bir sır saklıymış. ${childName}, bir gün bu şatoyu rüyasında görmüş ve merak etmiş.

Uyurken gözlerini kapadığında, kendini şatonun bahçesinde bulmuş! Etrafta rengarenk çiçekler açmış, kelebekler dans ediyormuş.

"Hoş geldin ${childName}!" demiş şatonun prensesi. "Seni bekliyorduk!"

Prenses, ${childName}'i şatonun içine götürmüş. Her odada farklı sürprizler varmış - dans eden oyuncaklar, şarkı söyleyen kuşlar ve parlayan yıldızlar.

"Bu şato," demiş prenses, "${config.includeWords.length > 0 ? config.includeWords[0] : 'mutluluk'} ile dolu. Ve sen de artık bu büyülü dünyanın bir parçasısın!"

${childName} şatoda arkadaşlarıyla oyun oynamış, gülmüş, eğlenmiş. Ama gece olunca, minik yıldızlar ${childName}'i yatağına taşımış.

"Tatlı rüyalar ${childName}," demiş prenses. "Yarın yine görüşürüz..."

Ve ${childName}, o gece en güzel rüyaları görmüş, huzur içinde uyumuş.

⭐ İyi geceler, tatlı rüyalar... ⭐`,
        estimatedDuration: config.duration * 60
    }),

    space: (childName, config) => ({
        title: `${childName}'in Uzay Macerası`,
        content: `Bir varmış bir yokmuş, yıldızların dans ettiği bir gece, ${childName} pencereden gökyüzüne bakmış.

O sırada küçük, parlak bir ışık ${childName}'in odasına girmiş. Bu ışık, uzaydan gelen minik bir yıldız dostmuş!

"Merhaba ${childName}! Ben Stella! Seninle uzayı gezmek istiyorum!" demiş yıldız.

${childName}, Stella'nın ışığına tutunmuş ve birlikte gökyüzüne yükselmişler. Ayın yanından geçmişler, gezegenler arasında süzülmüşler.

Mars'ta oynayan astronot çocuklarla tanışmışlar. Jüpiter'in yanında renkli bulutları izlemişler. Satürn'ün halkalarında kaymışlar!

"Uzay ne kadar güzel!" demiş ${childName}. "${config.includeWords.length > 0 ? config.includeWords[0] : 'Yıldızlar'} çok parlak!"

Stella gülümsemiş: "Çünkü her yıldız, dünya üzerindeki bir çocuğun hayali. Sen de çok parlak bir yıldızsın ${childName}!"

Sonra yavaşça dünyaya dönmüşler. ${childName} yatağına uzanırken, Stella pencereden göz kırpmış.

"Her gece seni buradan izleyeceğim. Tatlı rüyalar ${childName}!"

Ve ${childName}, yıldızların korumasında huzurla uykuya dalmış.

🚀 İyi geceler, uzay kaşifi... 🌟`,
        estimatedDuration: config.duration * 60
    }),

    forest: (childName, config) => ({
        title: `${childName} ve Orman Arkadaşları`,
        content: `Bir varmış bir yokmuş, yeşil yaprakların fısıldaştığı büyülü bir orman varmış.

Bu ormanda ${childName} adında çok sevimli bir çocuk yaşarmış. Her akşam uyumadan önce, orman arkadaşlarıyla vedalaşırmış.

Bir gece, küçük bir sincap ${childName}'in penceresine gelmiş. "Gel!" demiş. "Orman seni bekliyor!"

${childName}, sincabın peşinden ormana girmiş. Ay ışığı ağaçların arasından süzülüyormuş.

Bir açıklıkta, tüm orman hayvanları toplanmış! Tavşanlar, sincaplar, kelebekler, hatta baykuş bile oradaymış.

"Bu gece ${childName}'i onurlandırıyoruz!" demiş yaşlı baykuş. "Çünkü o, ormanı ve doğayı çok seviyor!"

Hayvanlar ${childName} için şarkı söylemişler, dans etmişler. ${config.includeWords.length > 0 ? config.includeWords[0].charAt(0).toUpperCase() + config.includeWords[0].slice(1) : 'Kelebek'}ler etrafında uçuşmuş.

Sonra ateş böcekleri ${childName}'i evine kadar eşlik etmişler.

"Ormanda her zaman arkadaşların var," demiş sincap. "İyi geceler ${childName}!"

${childName} yatağına uzandığında, ateş böceklerinin ışığı pencereden parlamaya devam etmiş.

🌳 İyi uykular, ormanın dostuna... 🦋`,
        estimatedDuration: config.duration * 60
    }),

    ocean: (childName, config) => ({
        title: `${childName} ve Denizin Sırları`,
        content: `Bir varmış bir yokmuş, masmavi dalgaların şarkı söylediği bir deniz varmış.

${childName}, deniz kıyısında yaşayan meraklı bir çocukmuş. Her gece dalgaların sesini dinleyerek uyurmuş.

Bir gece, ay ışığında parlayan bir yunus ${childName}'e yaklaşmış. "Gel, sana denizin altını göstereyim!" demiş.

${childName} yunusun sırtına binmiş ve birlikte dalgaların altına dalmışlar. Ama korkmamış, çünkü büyülü bir kabarcık onu sarmalamış!

Denizin altında ne harikalar varmış! Renkli mercanlar, dans eden denizatları, parlayan balıklar...

Bir ${config.includeWords.length > 0 ? config.includeWords[0] : 'deniz kızı'} ${childName}'e yaklaşmış. "Hoş geldin ${childName}! Seni çok bekliyorduk!"

Birlikte deniz altı sarayını gezmişler. İnci koleksiyonlarını görmüşler, deniz yıldızlarıyla oynamışlar.

"Artık eve dönme vakti," demiş yunus nazikçe.

${childName} yatağına döndüğünde, kulağında hâlâ dalgaların melodisi çalıyormuş.

"Tatlı rüyalar," demiş deniz. "Yarın yine gel oyuna!"

🐬 İyi geceler, denizin prensesi/prensine... 🌊`,
        estimatedDuration: config.duration * 60
    }),

    clouds: (childName, config) => ({
        title: `${childName}'in Bulut Yolculuğu`,
        content: `Bir varmış bir yokmuş, gökyüzünde pamuk gibi yumuşak bulutlar yüzüyormuş.

${childName}, her gece bulutları izlemeyi çok severmiş. "Keşke bulutların üstünde atlaya atlaya gezebilsem!" demiş.

O gece, en büyük bulut ${childName}'in penceresine inmiş! "Merhaba küçük dost, gel benimle!" demiş.

${childName} bulutun üstüne zıplamış - yumuşacık ve rahatmış! Birlikte gökyüzüne yükselmişler.

Bulut ülkesinde her şey ${config.includeWords.length > 0 ? config.includeWords[0] : 'pamuk'} gibiymiş. Buluttan evler, buluttan yastıklar, buluttan kaydıraklar!

Diğer bulut arkadaşları ${childName}'i karşılamış. Birlikte buluttan buluta atlamışlar, gökkuşağı köprüsünden geçmişler.

"Yoruldun mu?" diye sormuş anne bulut. "Gel, seni yatağına götüreyim."

En yumuşak bulut, ${childName}'i kucaklamış ve yavaşça evine taşımış.

"Her gece seninleyiz," demiş bulutlar. "Rüyalarını taşıyoruz!"

${childName}, bulutların yumuşaklığını hissederek uykuya dalmış.

☁️ İyi geceler, bulutların sevgilisi... 🌈`,
        estimatedDuration: config.duration * 60
    }),

    stars: (childName, config) => ({
        title: `${childName} ve Yıldız Arkadaşı`,
        content: `Bir varmış bir yokmuş, pırıl pırıl yıldızların gökyüzünde dans ettiği bir gece varmış.

Küçük ${childName}, her gece penceresinden yıldızları izlermiş. En parlak yıldıza hep el sallarmış.

Bir gece, o yıldız ${childName}'e göz kırpmış! "Merhaba ${childName}!" demiş parlak bir sesle. "Ben Luna, senin yıldız arkadaşınım!"

Luna, ${childName}'i gökyüzüne davet etmiş. Ay ışığından yapılmış bir merdiven belirmiş ve ${childName} yavaşça yükselmiş.

Gökyüzünde inanılmaz bir dünya varmış! Yıldızlar dans ediyormuş, ay ninni söylüyormuş, gezegenler renkli ışıklar saçıyormuş.

"Bu gece senin şerefine bir parti yapıyoruz!" demiş Luna. "Çünkü sen ${config.includeWords.length > 0 ? config.includeWords[0] : 'çok özel'} bir çocuksun!"

Yıldızlar ${childName} için parlamış, kayan yıldızlar havai fişek gibi patlamış!

Ama gece ilerledikçe ${childName}'in gözleri ağırlaşmış. Luna, onu yavaşça yatağına götürmüş.

"Her gece yukarıdan seni izleyeceğim," demiş Luna. "Tatlı rüyalar ${childName}. Seni çok seviyoruz!"

Ve ${childName}, yıldızların koruyucu ışığında huzurla uyumuş.

⭐ İyi geceler, yıldızların en parlağı... 🌙`,
        estimatedDuration: config.duration * 60
    }),
};

// ==========================================
// MAIN GENERATION FUNCTION
// ==========================================

export interface GenerateStoryOptions {
    childName: string;
    config: StoryConfig;
    useAI?: boolean;
    apiKey?: string;
}

export async function generateStory(options: GenerateStoryOptions): Promise<GeneratedStory> {
    const { childName, config, useAI = false, apiKey } = options;

    // If AI is enabled and API key is provided, use OpenAI
    if (useAI && apiKey) {
        return generateWithOpenAI(childName, config, apiKey);
    }

    // Otherwise, use mock stories
    return generateMockStory(childName, config);
}

// Mock story generator
function generateMockStory(childName: string, config: StoryConfig): GeneratedStory {
    const generator = MOCK_STORIES[config.theme];

    // Add delay to simulate generation
    return generator(childName, config);
}

// OpenAI story generator
async function generateWithOpenAI(childName: string, config: StoryConfig, apiKey: string): Promise<GeneratedStory> {
    const prompt = generatePrompt(childName, config);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Sen çocuklar için Türkçe uyku masalları yazan yaratıcı bir yazarsın. Masalların sıcak, sevecen ve rahatlatıcı olmalı.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.8,
            }),
        });

        if (!response.ok) {
            throw new Error('OpenAI API error');
        }

        const data = await response.json();
        const storyText = data.choices[0].message.content;

        return parseStoryResponse(storyText);
    } catch (error) {
        console.error('AI generation failed, falling back to mock:', error);
        return generateMockStory(childName, config);
    }
}

// Export prompt generator for testing
export { generatePrompt };
