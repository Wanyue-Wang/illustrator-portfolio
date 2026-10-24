import React, { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  en: {
    work: 'Work', about: 'About', contact: 'Contact', contactHeading: 'contact',
    mainNavigation: 'Main navigation', languageSelect: 'Language',
    categories: { all: 'all works', artistic: 'artistic', commercial: 'commercial' },
    workCategories: 'Work categories', viewProject: 'View', allWork: 'All works',
    skip: 'Skip to content', wechat: 'WeChat', email: 'Email', instagram: 'Instagram',
    aboutEyebrow: 'THE PERSON BEHIND THE PICTURES', aboutTitle: ['A curious heart.', 'A colourful mind.'],
    portraitAlt: 'An illustration of a quiet moment in a colourful garden.',
    portraitNote: 'A self-portrait, of sorts.', greeting: 'Hello, I’m Wanyue.',
    biography: [
      'I’m an independent illustrator with a soft spot for bold colours, imperfect shapes, and the stories hiding in everyday life.',
      'My work lives somewhere between the real and the imagined. It’s a world of familiar faces, unruly gardens, slow afternoons, and small moments that deserve a second look.',
      'I bring these stories to life through personal projects, editorial illustration, and thoughtful collaborations with people who care about what they make.',
    ],
    storyQuestion: 'Have a story in mind?', servicesTitle: 'A few things I can help with.',
    services: [
      ['Editorial illustration', 'Images that find the feeling behind the words.'],
      ['Brand collaborations', 'A little personality for things with a purpose.'],
      ['Personal commissions', 'One-of-a-kind stories, made just for you.'],
    ],
    theProject: 'THE PROJECT', medium: 'MEDIUM', studyLabel: '01 — Studies in line', studyAlt: 'Botanical line study',
    closer: 'A LOOK A LITTLE CLOSER', feelingTitle: 'It starts with a feeling.', paletteLabel: 'Project colour palette',
    colourLabel: '02 — A conversation in colour', detailsLabel: '03 — The little details',
    detailAlt: 'Close-up of the painted shapes and textures in', nextStory: 'NEXT PROJECT',
    notFoundEyebrow: '404', notFoundTitle: 'Nothing growing here. Yet.', backToGallery: 'Back to the gallery',
    title: 'Illustrator portfolio',
    metaDescription: 'Wanyue Wang — independent illustrator and visual storyteller. Explore artistic projects, commercial illustration and collaborations.',
  },
  zh: {
    work: '作品', about: '关于', contact: '联系', contactHeading: '联系',
    mainNavigation: '主导航', languageSelect: '语言',
    categories: { all: '全部作品', artistic: '艺术创作', commercial: '商业合作' },
    workCategories: '作品分类', viewProject: '查看', allWork: '全部作品',
    skip: '跳至正文', wechat: '微信', email: '邮箱', instagram: 'Instagram',
    aboutEyebrow: '作品背后的我', aboutTitle: ['始终好奇。', '以色彩表达。'],
    portraitAlt: '插画中的片刻宁静：一座充满色彩的花园。', portraitNote: '以插画描绘自己。', greeting: '你好，我是 Wanyue。',
    biography: [
      '我是一名独立插画师，偏爱大胆的色彩、不规则的形状，以及藏在日常生活中的故事。',
      '我的创作游走在现实与想象之间。熟悉的面孔、自由生长的花园、缓慢的午后，还有那些值得再看一眼的微小瞬间，构成了我的插画世界。',
      '我通过个人创作、出版插画和品牌合作，让这些故事成为可见的画面，也期待与认真创作的人一起带来新的作品。',
    ],
    storyQuestion: '有想一起讲述的故事吗？', servicesTitle: '我可以与你一起完成。',
    services: [
      ['出版与编辑插画', '以画面捕捉文字背后的情感。'],
      ['品牌合作', '为有想法的品牌带来鲜明的视觉表达。'],
      ['个人委托', '为你的故事创作独一无二的插画。'],
    ],
    theProject: '项目信息', medium: '创作形式', studyLabel: '01 — 线条习作', studyAlt: '植物线稿习作',
    closer: '走近作品', feelingTitle: '从一种感受开始。', paletteLabel: '作品配色', colourLabel: '02 — 色彩之间的对话',
    detailsLabel: '03 — 画面细节', detailAlt: '插画笔触与肌理的局部：', nextStory: '下一个项目',
    notFoundEyebrow: '404', notFoundTitle: '这里还没有作品。', backToGallery: '返回作品集', title: '插画作品集',
    metaDescription: 'Wanyue Wang — 独立插画师与视觉叙事创作者。浏览艺术创作、商业插画与品牌合作作品。',
  },
};

const LanguageContext = createContext(null);
const storageKey = 'wanyue-portfolio-language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem(storageKey) === 'zh' ? 'zh' : 'en'; }
    catch { return 'en'; }
  });
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem(storageKey, language); } catch { /* Storage is optional. */ }
  }, [language]);
  const value = {
    language,
    setLanguage: value => setLanguage(value === 'zh' ? 'zh' : 'en'),
    t: translations[language],
    localizeProject: project => ({ ...project, ...project.translations?.[language] }),
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
