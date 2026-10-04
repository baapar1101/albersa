export type Language = 'en' | 'fa';

export interface TranslationData {
  nav: {
    collection: string;
    interactive: string;
    lookbook: string;
    materials: string;
    manifesto: string;
    bag: string;
    soundOn: string;
    soundOff: string;
    switchLang: string;
    menu: string;
    close: string;
  };
  hero: {
    season: string;
    pweek: string;
    atelier: string;
    collectionTag: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    desc: string;
    exploreBtn: string;
    inspectBtn: string;
    dragCue: string;
    scrollCue: string;
  };
  manifesto: {
    title: string;
    tag: string;
    principle: string;
    headlinePart1: string;
    headlinePart2: string;
    headlinePart3: string;
    quote: string;
    body: string;
    specs: {
      construction: { label: string; val: string };
      geometry: { label: string; val: string };
      production: { label: string; val: string };
      discipline: { label: string; val: string };
    };
  };
  collection: {
    tag: string;
    title: string;
    subtitle: string;
    piecesCount: string;
    explorePiece: string;
  };
  interactive: {
    tag: string;
    title: string;
    badge: string;
    dragCue: string;
    explodeLayers: string;
    collapseLayers: string;
    finishLabel: string;
    finishes: {
      obsidian: string;
      chrome: string;
      titanium: string;
      chalk: string;
    };
    selectSize: string;
    sizeHint: string;
    addToBag: string;
    addedToBag: string;
    deliveryPerk1: string;
    deliveryPerk2: string;
  };
  lookbook: {
    tag: string;
    title: string;
    expand: string;
    garmentsLabel: string;
    specLabel: string;
  };
  materials: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    desc: string;
    indexTitle: string;
    analysisTitle: string;
    magnify: string;
    compLabel: string;
    originLabel: string;
  };
  statement: {
    sub1: string;
    sub2: string;
    headlinePart1: string;
    headlinePart2: string;
    headlinePart3: string;
    sideLabel: string;
    body: string;
  };
  newsletter: {
    tag: string;
    title: string;
    desc: string;
    placeholder: string;
    button: string;
    success: string;
    legal: string;
  };
  footer: {
    parisClock: string;
    parisAddress: string;
    milanClock: string;
    milanAddress: string;
    returnTop: string;
    colIndex: string;
    colRep: string;
    colDispatches: string;
    colEthics: string;
    ethicsText: string;
    rights: string;
    editionTag: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    discoverBtn: string;
    size: string;
    color: string;
    deliveryLabel: string;
    deliveryVal: string;
    total: string;
    acquireBtn: string;
    authBadge: string;
    step2: string;
    conciergeTitle: string;
    fullName: string;
    email: string;
    destination: string;
    subtotal: string;
    insurance: string;
    confirmOrder: string;
    backToBag: string;
    confirmedTitle: string;
    confirmedDesc: string;
    confirmedSub: string;
    returnAtelier: string;
  };
  modal: {
    structuralAttrs: string;
    material: string;
    silhouette: string;
    sizeSelection: string;
    addToBag: string;
    committed: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  en: {
    nav: {
      collection: 'COLLECTION',
      interactive: 'INTERACTIVE',
      lookbook: 'LOOKBOOK',
      materials: 'MATERIALS',
      manifesto: 'MANIFESTO',
      bag: 'BAG',
      soundOn: 'ATMOSPHERE ON',
      soundOff: 'SOUND',
      switchLang: 'فارسی',
      menu: 'MENU',
      close: 'CLOSE',
    },
    hero: {
      season: 'AUTUMN / WINTER 2026',
      pweek: 'PARIS FASHION WEEK',
      atelier: 'MONOLITHIC ATELIER',
      collectionTag: 'COLLECTION 026',
      titleLine1: 'NEW',
      titleLine2: 'DIMENSIONS',
      titleLine3: 'OF FORM',
      desc: 'An exploration of structure, movement and material. Architectural silhouettes engineered for human kinetics.',
      exploreBtn: 'EXPLORE COLLECTION',
      inspectBtn: 'INSPECT SCULPTURE 360°',
      dragCue: '[ DRAG TO ROTATE ]',
      scrollCue: 'SCROLL DOWN',
    },
    manifesto: {
      title: 'ALBERSA / MANIFESTO',
      tag: '01 — 04',
      principle: 'PRINCIPLE / 01',
      headlinePart1: 'FORM',
      headlinePart2: 'IS NOT',
      headlinePart3: 'DECORATION.',
      quote: '“ALBERSA explores the tension between structure and movement. Each piece is conceived as an object in space — shaped by body, material and light.”',
      body: 'We reject seasonal churn and ephemeral ornament. Our garments are engineered with the rigor of modernist architecture, employing self-supporting wools, cold-forged hardware, and geometric cuts that respond dynamically to human motion.',
      specs: {
        construction: { label: 'CONSTRUCTION', val: 'Full Canvas Architectural' },
        geometry: { label: 'GEOMETRY', val: 'Planar Asymmetry' },
        production: { label: 'PRODUCTION', val: 'Limited Run Numbered Editions' },
        discipline: { label: 'DISCIPLINE', val: 'Reductionist Luxury' },
      },
    },
    collection: {
      tag: 'CATALOGUE RAISONNÉ',
      title: 'COLLECTION / 026',
      subtitle: 'Architectural Tailoring & Objects',
      piecesCount: '06 KEY PIECES IN ARCHIVAL RELEASE',
      explorePiece: 'EXPLORE PIECE ↗',
    },
    interactive: {
      tag: 'INTERACTIVE ATELIER INSPECTION',
      title: 'TECTONIC PROTOTYPE',
      badge: '360° REALTIME RENDERER / THREE.JS',
      dragCue: '[ DRAG TO ORBIT 360° ]',
      explodeLayers: 'EXPLODE LAYERS',
      collapseLayers: 'COLLAPSE LAYERS',
      finishLabel: 'MATERIAL FINISH:',
      finishes: {
        obsidian: 'OBSIDIAN NOIR',
        chrome: 'LIQUID CHROME',
        titanium: 'RAW TITANIUM',
        chalk: 'CHALK LINEN',
      },
      selectSize: 'SELECT SIZE',
      sizeHint: 'FITS TRUE TO ARCHITECTURAL FORM',
      addToBag: 'ADD TO BAG',
      addedToBag: 'ADDED TO ARCHIVE BAG',
      deliveryPerk1: 'Complimentary white-glove delivery from Milan atelier',
      deliveryPerk2: 'Architectural bespoke dust bag & archival hanger included',
    },
    lookbook: {
      tag: 'EDITORIAL CAMPAIGN',
      title: 'CAMPAIGN / 026',
      expand: 'EXPAND SPREAD',
      garmentsLabel: 'FEATURED GARMENTS:',
      specLabel: 'SCENIC SPECIFICATION',
    },
    materials: {
      tag: 'ATELIER LABORATORY / MILANO & BIELLA',
      titleLine1: 'MATERIAL',
      titleLine2: 'BECOMES',
      titleLine3: 'STRUCTURE.',
      desc: 'Every garment begins with bespoke tactile physics. We collaborate exclusively with heritage Italian mills and advanced metallurgy laboratories to engineer custom weaves with autonomous structural memory.',
      indexTitle: 'INDEX OF DEVELOPED ARCHITECTURAL SUBSTRATES',
      analysisTitle: 'MICROSCOPIC FIBER ANALYSIS //',
      magnify: 'MAGNIFY:',
      compLabel: 'COMPOSITION',
      originLabel: 'ORIGIN',
    },
    statement: {
      sub1: 'ALBERSA DISCIPLINE',
      sub2: 'AUTONOMOUS DESIGN FORMULA',
      headlinePart1: 'ALBERSA',
      headlinePart2: 'IS AN EXERCISE',
      headlinePart3: 'IN REDUCTION.',
      sideLabel: 'RESTORING CLARITY TO MODERN LUXURY',
      body: 'We remove every seam, lining, and closure that does not directly serve structural equilibrium. What remains is monolithic purity: silhouettes that command space without demanding attention.',
    },
    newsletter: {
      tag: 'EXCLUSIVE COMMUNIQUÉ',
      title: 'PRIVATE ACCESS',
      desc: 'Be the first to discover new collections, objects and ALBERSA editions.',
      placeholder: 'YOUR EMAIL',
      button: 'JOIN',
      success: 'YOUR DOSSIER HAS BEEN REGISTERED. WELCOME TO THE ALBERSA GUILD.',
      legal: 'BY ENROLLING, YOU CONSENT TO CURATED DISPATCHES FROM OUR PARIS & MILAN ATELIERS. ZERO SPAM.',
    },
    footer: {
      parisClock: 'ATELIER PARIS // CET',
      parisAddress: '7 RUE DE VALOIS, 75001 PARIS',
      milanClock: 'ATELIER MILAN // CET',
      milanAddress: 'VIA MONTENAPOLEONE 8, 20121 MILANO',
      returnTop: 'RETURN TO VERTEX',
      colIndex: 'CURATED INDEX',
      colRep: 'REPRESENTATION',
      colDispatches: 'DISPATCHES',
      colEthics: 'ETHICAL STANDARDS',
      ethicsText: 'Mulesing-free virgin wool, solvent-free titanium finishes, certified European carbon-neutral ateliers.',
      rights: '© ALBERSA 2026. ALL RIGHTS RESERVED.',
      editionTag: 'NUMBERED ATELIER RELEASE',
    },
    cart: {
      title: 'ALBERSA BAG',
      emptyTitle: 'Your archive bag is empty.',
      emptyDesc: 'Exploration begins in the collection catalogue. Each piece is crafted in limited numbered editions.',
      discoverBtn: 'DISCOVER COLLECTION',
      size: 'SIZE',
      color: 'COLOR',
      deliveryLabel: 'WHITE GLOVE COURIER',
      deliveryVal: 'COMPLIMENTARY',
      total: 'TOTAL ESTIMATE',
      acquireBtn: 'ACQUIRE PIECES',
      authBadge: 'AUTHENTICATED ATELIER DISPATCH FROM MILANO',
      step2: 'STEP 02 // DOSSIER',
      conciergeTitle: 'CONCIERGE ACQUISITION',
      fullName: 'FULL NAME',
      email: 'CONFIDENTIAL EMAIL',
      destination: 'DELIVERY CITY / DESTINATION',
      subtotal: 'SUBTOTAL',
      insurance: 'ATELIER INSURANCE',
      confirmOrder: 'CONFIRM ACQUISITION ORDER',
      backToBag: '← BACK TO BAG',
      confirmedTitle: 'ACQUISITION CONFIRMED',
      confirmedDesc: 'Dossier has been allocated to your name.',
      confirmedSub: 'Our Milanese atelier is now preparing your garments in hand-numbered archival cases.',
      returnAtelier: 'RETURN TO ATELIER',
    },
    modal: {
      structuralAttrs: 'STRUCTURAL ATTRIBUTES',
      material: 'MATERIAL',
      silhouette: 'SILHOUETTE',
      sizeSelection: 'SIZE SELECTION',
      addToBag: 'ADD TO ARCHIVE BAG',
      committed: 'COMMITTED TO BAG',
    },
  },
  fa: {
    nav: {
      collection: 'مجموعه',
      interactive: 'بررسی سه‌بعدی',
      lookbook: 'لوک‌بوک',
      materials: 'متریال‌ها',
      manifesto: 'بیانیه',
      bag: 'سبد خرید',
      soundOn: 'اتمسفر فعال',
      soundOff: 'صدا',
      switchLang: 'EN',
      menu: 'منو',
      close: 'بستن',
    },
    hero: {
      season: 'پاییز / زمستان ۲۰۲۶',
      pweek: 'هفته مد پاریس',
      atelier: 'آتلیه تکتونیک',
      collectionTag: 'مجموعه ۰۲۶',
      titleLine1: 'ابعاد',
      titleLine2: 'نوین',
      titleLine3: 'فرم و ساختار',
      desc: 'کاوشی در ساختار، پویایی و کالبد متریال. سیلوئت‌های معماری آوانگارد مهندسی‌شده برای حرکت طبیعی اندام انسانی.',
      exploreBtn: 'کشف مجموعه',
      inspectBtn: 'بررسی ۳۶۰ درجه تندیس',
      dragCue: '[ بکشید تا بچرخد ]',
      scrollCue: 'پیمایش به پایین',
    },
    manifesto: {
      title: 'آلبرسا / بیانیه',
      tag: '۰۱ — ۰۴',
      principle: 'اصل / ۰۱',
      headlinePart1: 'فرم،',
      headlinePart2: 'هرگز',
      headlinePart3: 'تزیین نیست.',
      quote: '«آلبرسا تنش میان ساختار و حرکت را می‌کاود. هر اثر به مثابه شیئی در فضا خلق می‌شود — شکل‌یافته با کالبد، متریال و نور.»',
      body: 'ما گذر سطحی فصول و تزیینات بیهوده را پس می‌زنیم. پوشاک ما با انضباط معماری مدرنیستی مهندسی شده‌اند؛ با پشم‌های خودایستا، اتصالات تیتانیومی و برش‌های هندسی که به زیبایی با پویایی بدن واکنش نشان می‌دهند.',
      specs: {
        construction: { label: 'ساختار', val: 'کنواس معماری تمام‌دست‌دوز' },
        geometry: { label: 'هندسه', val: 'تقارن‌گریزی صفحه‌ای' },
        production: { label: 'تولید', val: 'نسخه‌های شماره‌گذاری‌شده محدود' },
        discipline: { label: 'انضباط', val: 'لوکس پیراسته و مینیمال' },
      },
    },
    collection: {
      tag: 'کاتالوگ جامع',
      title: 'مجموعه / ۰۲۶',
      subtitle: 'دوخت معماری و اشیای ساختاری',
      piecesCount: '۰۶ اثر کلیدی در نسخه آرشیوی',
      explorePiece: 'بررسی اثر ↖',
    },
    interactive: {
      tag: 'وارسی تعاملی آتلیه',
      title: 'پیش‌نمونه تکتونیک',
      badge: 'موتور رندر سه‌بعدی بلادرنگ / THREE.JS',
      dragCue: '[ درگ کنید تا ۳۶۰ درجه بچرخد ]',
      explodeLayers: 'انفجار لایه‌ها',
      collapseLayers: 'ادغام لایه‌ها',
      finishLabel: 'پرداخت متریال:',
      finishes: {
        obsidian: 'آبسیدین سیاه',
        chrome: 'کروم مایع',
        titanium: 'تیتانیوم خام',
        chalk: 'کتان گچی',
      },
      selectSize: 'انتخاب سایز',
      sizeHint: 'مطابق با فرم استاندارد معماری',
      addToBag: 'افزودن به سبد خرید',
      addedToBag: 'به سبد آرشیو افزوده شد',
      deliveryPerk1: 'ارسال با تشریفات اختصاصی از آتلیه میلان',
      deliveryPerk2: 'شامل کاور محافظ و چوب‌لباسی آرشیوی اختصاصی',
    },
    lookbook: {
      tag: 'کمپین تصویری',
      title: 'کمپین / ۰۲۶',
      expand: 'نمای تمام‌صفحه',
      garmentsLabel: 'لباس‌های نمایش‌داده‌شده:',
      specLabel: 'مشخصات صحنه و فضا',
    },
    materials: {
      tag: 'آزمایشگاه بافت / میلان و بیلا',
      titleLine1: 'متریال،',
      titleLine2: 'تبدیل به',
      titleLine3: 'ساختار می‌شود.',
      desc: 'هر لباس با فیزیک لمسی منحصربه‌فرد آغاز می‌شود. ما به صورت اختصاصی با کارگاه‌های نساجی باستانی ایتالیا و متالورژی پیشرفته همکاری می‌کنیم تا تاروپودهایی با حافظه فرمی پایدار خلق کنیم.',
      indexTitle: 'فهرست بسترهای معماری توسعه‌یافته',
      analysisTitle: 'تحلیل میکروسکوپی الیاف //',
      magnify: 'بزرگ‌نمایی:',
      compLabel: 'ترکیب الیاف',
      originLabel: 'خاستگاه',
    },
    statement: {
      sub1: 'انضباط آلبرسا',
      sub2: 'فرمول طراحی مستقل',
      headlinePart1: 'آلبرسا',
      headlinePart2: 'تمرینی است در',
      headlinePart3: 'کاهش و پیراستگی.',
      sideLabel: 'بازآفرینی وضوح در لوکس مدرن',
      body: 'ما هر درز، آستر و اتصالی که در خدمت تعادل ساختاری نباشد را حذف می‌کنیم. آنچه بر جای می‌ماند خلوص یکپارچه است: سیلوئت‌هایی که بدون نیاز به جلب توجه، فضا را در تسخیر خود می‌گیرند.',
    },
    newsletter: {
      tag: 'مکاتبات اختصاصی',
      title: 'دسترسی اختصاصی',
      desc: 'نخستین کسی باشید که از رونمایی مجموعه‌ها، اشیا و نسخه‌های محدود آلبرسا آگاه می‌شود.',
      placeholder: 'ایمیل شما',
      button: 'عضویت',
      success: 'پرونده شما ثبت گردید. به جمع همراهان آلبرسا خوش آمدید.',
      legal: 'با عضویت، دریافت نامه‌های اختصاصی از آتلیه پاریس و میلان را تأیید می‌کنید. بدون پیام‌های اضافه.',
    },
    footer: {
      parisClock: 'آتلیه پاریس // CET',
      parisAddress: 'پاریس، خیابان دو والوا، پلاک ۷',
      milanClock: 'آتلیه میلان // CET',
      milanAddress: 'میلان، خیابان مونته‌ناپلئونه، پلاک ۸',
      returnTop: 'بازگشت به ابتدا',
      colIndex: 'فهرست منتخب',
      colRep: 'نمایندگی و آتلیه',
      colDispatches: 'گزارش‌ها',
      colEthics: 'استانداردهای اخلاقی',
      ethicsText: 'پشم خالص ارگانیک، پرداخت‌های بدون حلال شیمیایی، آتلیه‌های کربن-خنثی اروپایی.',
      rights: '© آلبرسا ۲۰۲۶. تمام حقوق محفوظ است.',
      editionTag: 'نسخه شناسنامه‌دار آتلیه',
    },
    cart: {
      title: 'سبد خرید آلبرسا',
      emptyTitle: 'سبد آرشیو شما خالی است.',
      emptyDesc: 'کشف زیبایی از کاتالوگ مجموعه آغاز می‌شود. هر قطعه در نسخه‌های شماره‌گذاری‌شده محدود عرضه می‌گردد.',
      discoverBtn: 'کشف مجموعه',
      size: 'سایز',
      color: 'رنگ',
      deliveryLabel: 'ارسال اختصاصی',
      deliveryVal: 'رایگان و با تشریفات',
      total: 'برآورد نهایی',
      acquireBtn: 'ثبت سفارش اختصاصی',
      authBadge: 'ارسال مستقیم و دارای اصالت از میلان',
      step2: 'مرحله ۰۲ // پرونده سفارش',
      conciergeTitle: 'ثبت سفارش از طریق تشریفات',
      fullName: 'نام و نام خانوادگی',
      email: 'ایمیل محرمانه',
      destination: 'شهر و مقصد تحویل',
      subtotal: 'مجموع',
      insurance: 'بیمه اختصاصی آتلیه',
      confirmOrder: 'تأیید سفارش خرید',
      backToBag: 'بازگشت به سبد خرید →',
      confirmedTitle: 'سفارش تأیید گردید',
      confirmedDesc: 'پرونده خرید به نام شما تخصیص یافت.',
      confirmedSub: 'آتلیه میلان در حال بسته‌بندی لباس‌های شما در جعبه‌های آرشیوی دست‌ساز است.',
      returnAtelier: 'بازگشت به آتلیه',
    },
    modal: {
      structuralAttrs: 'ویژگی‌های ساختاری',
      material: 'متریال',
      silhouette: 'سیلوئت',
      sizeSelection: 'انتخاب سایز',
      addToBag: 'افزودن به سبد آرشیو',
      committed: 'به سبد خرید افزوده شد',
    },
  },
};
