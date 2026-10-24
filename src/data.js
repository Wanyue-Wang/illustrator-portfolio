// Replace this file's content and public/art images to make this portfolio yours.
// Contact information belongs to Wanyue Wang. Project artwork/text remain editable examples.
// Optional project.gallery supports narrative series/comics/additional images:
// [{ src: '/art/page-01.png', alt: 'Describe the image', caption: 'Page 01',
//    size: 'wide' | 'medium' | 'small', align: 'left' | 'center' | 'right' }]
export const assetUrl = path => path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

export const artist = {
  name: 'Wanyue Wang',
  wechat: 'w2013729-',
  email: 'wwwwanyuew@gmail.com',
  instagram: 'https://www.instagram.com/wwwwanyue/',
  instagramHandle: 'wwwwanyue',
};

const chineseProjects = {
  'slow-afternoons': {
    title: '慢下来的午后',
    alt: '两位女性在桌边度过宁静的午后，桌上摆着柠檬和钴蓝色花瓶。',
    medium: '水粉质感插画', subtitle: '献给不必匆忙的日常。',
    description: '有些午后，不需要做什么。一碗柠檬，一位熟悉的朋友，还有在交谈与沉默间自然流动的时光。这幅个人创作记录了缓慢而微小的日常仪式，让平凡的一天拥有家的温度。',
    note: '温暖的陶土红、被阳光晒淡的黄色，再加上一点钴蓝。配色来自夏末午后的感受。',
  },
  'a-place-to-be': {
    title: '一隅栖所',
    alt: '一位身穿淡紫色连衣裙的女性坐在花园的陶土色台阶上，身旁是宽大的绿叶。',
    medium: '出版与编辑插画', subtitle: '为自己留下一小片空间。',
    description: '一次关于归属感的安静探索。在花园与白日梦之间，一个微小瞬间展开成完整的世界。这是一幅关于休息、独处，以及保留自己观看方式的编辑插画概念作品。',
    note: '柔和的淡紫色与舒展的绿色相互映衬，有机形状沿着花园缓慢生长的节奏展开。',
  },
  'in-full-bloom': {
    title: '盛放',
    alt: '三位女性在鲜红的罂粟花与粉色叶片之间起舞，背景是浓郁的深绿色。',
    medium: '品牌活动插画概念', subtitle: '庆祝一同生长的力量。',
    description: '色彩、动作与友谊在这里相遇。这幅春季品牌活动概念插画，以交织的人物姿态描绘彼此给予的温柔力量。花朵变成手势，手势成为一种共享的语言。',
    note: '罂粟红和金黄色在深绿色上起舞，形状相互交叠，像一场热烈而自然的交谈。',
  },
  'moonlit-garden': {
    title: '月亮知道',
    alt: '一位身着黄色长裙的女性坐在钴蓝色的夜间花园里，头顶是一弯新月。',
    medium: '个人插画系列', subtitle: '日落之后的小小故事。',
    description: '安静的花园让日常变得有一点陌生，也有一点神奇。这是持续创作的视觉短诗系列之一，记录只有放慢脚步才会发现的事物：一位女性、树木与月亮之间的对话。',
    note: '钴蓝承接夜色，黄色留住一点阳光，柔和的粉色土地把整个画面连在一起。',
  },
  'the-shape-of-home': {
    title: '家的形状',
    alt: '一扇朝向海边的敞开窗户旁，蓝色花瓶、鲜花与水果组成明亮的静物画面。',
    medium: '静物与编辑插画', subtitle: '收集那些熟悉的事物。',
    description: '是什么让一个地方成为自己的家？也许是经常插满花的花瓶、穿过窗户的光，或留在厨房桌上的水果。这幅静物习作探索了普通物件如何承载丰富的情感。',
    note: '构图从一个蓝色花瓶开始，随后是鲜花、窗户和满满的阳光，其他一切围绕着它慢慢生长。',
  },
  'together-we-grow': {
    title: '一同生长',
    alt: '两位女性相向而立，深色头发交织成粉色与金黄色的花束。',
    medium: '个人插画', subtitle: '一种柔软的力量。',
    description: '这是一幅关于联结的肖像。两个人在共享的花园中相遇，她们的故事一同生长，成为独自无法创造的画面。献给那些让世界更加慷慨的女性。',
    note: '对比鲜明的红色与蓝色，在温暖的粉色花束中找到共同的空间。每一种形状都为下一种留出位置。',
  },
};

export const projects = [
  {
    slug: 'slow-afternoons', title: 'Slow afternoons', year: '2025', category: 'artistic',
    image: '/art/slow-afternoons.png', width: 1448, height: 1086,
    alt: 'Two women share a quiet afternoon at a table with lemons and a cobalt blue vase.',
    medium: 'Gouache-inspired illustration', subtitle: 'An ode to doing a little less.',
    description: 'The afternoons that ask nothing of us. A bowl of lemons, a familiar friend, and the kind of conversation that drifts in and out of silence. This personal piece celebrates the small, unhurried rituals that make an ordinary day feel like home.',
    note: 'Warm terracotta, sun-washed yellow, and a little cobalt blue. A palette borrowed from the feeling of late summer.',
    colors: ['#c64123', '#e9aa42', '#22438c', '#eb9d7c', '#45613f'],
  },
  {
    slug: 'a-place-to-be', title: 'A place to be', year: '2025', category: 'commercial',
    image: '/art/a-place-to-be.png', width: 1086, height: 1448,
    alt: 'A woman in a lavender dress sits on terracotta garden steps among oversized green leaves.',
    medium: 'Editorial illustration', subtitle: 'Finding a small space of our own.',
    description: 'A quiet exploration of belonging. Somewhere between the garden and a daydream, a small moment opens into a whole world. An editorial concept about making room for rest, solitude, and our own way of seeing.',
    note: 'Soft lilac against generous greens. Organic shapes follow the slow rhythm of a garden coming into its own.',
    colors: ['#8b8bae', '#b44933', '#dd9d69', '#254d3a', '#e6bb43'],
  },
  {
    slug: 'in-full-bloom', title: 'In full bloom', year: '2024', category: 'commercial',
    image: '/art/in-full-bloom.png', width: 1448, height: 1086,
    alt: 'Three women dance among vibrant red poppies and pink leaves against deep green.',
    medium: 'Campaign illustration concept', subtitle: 'A celebration of growing together.',
    description: 'A joyful gathering of colour, movement, and friendship. Created as a concept for a spring campaign, these intertwined figures explore the gentle strength we find in one another. Flowers become gestures; gestures become a shared language.',
    note: 'Poppy red and golden ochre dance against deep green. The shapes overlap like voices in a lively conversation.',
    colors: ['#194a39', '#de3e32', '#b59aba', '#e1ac38', '#d7828a'],
  },
  {
    slug: 'moonlit-garden', title: 'The moon knows', year: '2024', category: 'artistic',
    image: '/art/moonlit-garden.png', width: 1254, height: 1254,
    alt: 'A woman in a yellow dress sits in a cobalt blue garden beneath a crescent moon.',
    medium: 'Personal illustration series', subtitle: 'Little stories after the sun goes down.',
    description: 'In the quiet of the garden, the everyday becomes a little strange and a little magical. Part of an ongoing collection of visual poems about the things we only notice when we slow down. A conversation between a woman, the trees, and the moon.',
    note: 'Cobalt holds the night, yellow keeps a little sunlight, and a soft pink earth ties the whole world together.',
    colors: ['#1258a0', '#dec647', '#24503c', '#d37d83', '#f3eac4'],
  },
  {
    slug: 'the-shape-of-home', title: 'The shape of home', year: '2024', category: 'commercial',
    image: '/art/the-shape-of-home.png', width: 1536, height: 1024,
    alt: 'A painted still life of a blue flower vase and fruit beside an open seaside window.',
    medium: 'Still life / Editorial', subtitle: 'A collection of familiar things.',
    description: 'What makes a place ours? Perhaps the vase we always fill, the light through an open window, or the fruit left on a kitchen table. A still-life study of how ordinary objects can hold an extraordinary amount of feeling.',
    note: 'The composition began with one blue vase. Everything else grew around it: the flowers, the window, and a generous amount of sunshine.',
    colors: ['#234c96', '#dc6652', '#e8c665', '#738268', '#e4a487'],
  },
  {
    slug: 'together-we-grow', title: 'Together, we grow', year: '2023', category: 'artistic',
    image: '/art/together-we-grow.png', width: 1122, height: 1402,
    alt: 'Two women face one another, their hair intertwining into a bouquet of pink and ochre flowers.',
    medium: 'Personal illustration', subtitle: 'A soft kind of strength.',
    description: 'A portrait of the connections that help us become ourselves. Two figures meet in a shared garden, their stories growing into something neither could make alone. A small tribute to the women who make the world feel more generous.',
    note: 'Contrasting red and blue find common ground in a bouquet of warm pinks. Each shape makes space for the next.',
    colors: ['#24569b', '#d95845', '#d5969f', '#d3a354', '#e9dba6'],
  },
].map(project => ({ ...project, image: assetUrl(project.image), translations: { zh: chineseProjects[project.slug] } }));
