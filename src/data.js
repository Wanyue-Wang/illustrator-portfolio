// Replace this file's content and public/art images to make this portfolio yours.
// The artist identity and project descriptions below are fictional demo content.
// Optional project.gallery supports narrative series/comics/additional images:
// [{ src: '/art/page-01.png', alt: 'Describe the image', caption: 'Page 01',
//    size: 'wide' | 'medium' | 'small', align: 'left' | 'center' | 'right' }]
export const assetUrl = path => path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

export const artist = {
  name: 'Alma Ríos',
  email: 'hello@almarios.studio',
  instagram: 'https://www.instagram.com/',
  instagramLabel: 'Instagram',
  location: 'Based in Mexico. Creating everywhere.',
  introduction: 'An illustrator drawn to everyday poetry, bold colours, and the beautifully imperfect.',
};

export const projects = [
  {
    slug: 'slow-afternoons', title: 'Slow afternoons', year: '2025', category: 'Personal',
    image: '/art/slow-afternoons.png', width: 1448, height: 1086,
    alt: 'Two women share a quiet afternoon at a table with lemons and a cobalt blue vase.',
    medium: 'Gouache-inspired illustration', subtitle: 'An ode to doing a little less.',
    description: 'The afternoons that ask nothing of us. A bowl of lemons, a familiar friend, and the kind of conversation that drifts in and out of silence. This personal piece celebrates the small, unhurried rituals that make an ordinary day feel like home.',
    note: 'Warm terracotta, sun-washed yellow, and a little cobalt blue. A palette borrowed from the feeling of late summer.',
    colors: ['#c64123', '#e9aa42', '#22438c', '#eb9d7c', '#45613f'],
  },
  {
    slug: 'a-place-to-be', title: 'A place to be', year: '2025', category: 'Editorial',
    image: '/art/a-place-to-be.png', width: 1086, height: 1448,
    alt: 'A woman in a lavender dress sits on terracotta garden steps among oversized green leaves.',
    medium: 'Editorial illustration', subtitle: 'Finding a small space of our own.',
    description: 'A quiet exploration of belonging. Somewhere between the garden and a daydream, a small moment opens into a whole world. An editorial concept about making room for rest, solitude, and our own way of seeing.',
    note: 'Soft lilac against generous greens. Organic shapes follow the slow rhythm of a garden coming into its own.',
    colors: ['#8b8bae', '#b44933', '#dd9d69', '#254d3a', '#e6bb43'],
  },
  {
    slug: 'in-full-bloom', title: 'In full bloom', year: '2024', category: 'Collaborations',
    image: '/art/in-full-bloom.png', width: 1448, height: 1086,
    alt: 'Three women dance among vibrant red poppies and pink leaves against deep green.',
    medium: 'Campaign illustration concept', subtitle: 'A celebration of growing together.',
    description: 'A joyful gathering of colour, movement, and friendship. Created as a concept for a spring campaign, these intertwined figures explore the gentle strength we find in one another. Flowers become gestures; gestures become a shared language.',
    note: 'Poppy red and golden ochre dance against deep green. The shapes overlap like voices in a lively conversation.',
    colors: ['#194a39', '#de3e32', '#b59aba', '#e1ac38', '#d7828a'],
  },
  {
    slug: 'moonlit-garden', title: 'The moon knows', year: '2024', category: 'Personal',
    image: '/art/moonlit-garden.png', width: 1254, height: 1254,
    alt: 'A woman in a yellow dress sits in a cobalt blue garden beneath a crescent moon.',
    medium: 'Personal illustration series', subtitle: 'Little stories after the sun goes down.',
    description: 'In the quiet of the garden, the everyday becomes a little strange and a little magical. Part of an ongoing collection of visual poems about the things we only notice when we slow down. A conversation between a woman, the trees, and the moon.',
    note: 'Cobalt holds the night, yellow keeps a little sunlight, and a soft pink earth ties the whole world together.',
    colors: ['#1258a0', '#dec647', '#24503c', '#d37d83', '#f3eac4'],
  },
  {
    slug: 'the-shape-of-home', title: 'The shape of home', year: '2024', category: 'Editorial',
    image: '/art/the-shape-of-home.png', width: 1536, height: 1024,
    alt: 'A painted still life of a blue flower vase and fruit beside an open seaside window.',
    medium: 'Still life / Editorial', subtitle: 'A collection of familiar things.',
    description: 'What makes a place ours? Perhaps the vase we always fill, the light through an open window, or the fruit left on a kitchen table. A still-life study of how ordinary objects can hold an extraordinary amount of feeling.',
    note: 'The composition began with one blue vase. Everything else grew around it: the flowers, the window, and a generous amount of sunshine.',
    colors: ['#234c96', '#dc6652', '#e8c665', '#738268', '#e4a487'],
  },
  {
    slug: 'together-we-grow', title: 'Together, we grow', year: '2023', category: 'Personal',
    image: '/art/together-we-grow.png', width: 1122, height: 1402,
    alt: 'Two women face one another, their hair intertwining into a bouquet of pink and ochre flowers.',
    medium: 'Personal illustration', subtitle: 'A soft kind of strength.',
    description: 'A portrait of the connections that help us become ourselves. Two figures meet in a shared garden, their stories growing into something neither could make alone. A small tribute to the women who make the world feel more generous.',
    note: 'Contrasting red and blue find common ground in a bouquet of warm pinks. Each shape makes space for the next.',
    colors: ['#24569b', '#d95845', '#d5969f', '#d3a354', '#e9dba6'],
  },
].map(project => ({ ...project, image: assetUrl(project.image) }));
