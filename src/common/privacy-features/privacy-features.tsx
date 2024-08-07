import toast from 'react-hot-toast';

// =================screenshot olishni ogohlantirish uchun======================
export const ScreenshotBlocked = () => {
  const handleKeyDown = (event: any) => {
    if (event.key === 'PrintScreen' || (event.shiftKey && (event.metaKey || event.key === 'Meta'))) {
      toast.error('Скрееншот олиш тақиқланган❗❌');
      event.preventDefault();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
};

// =============saytdan maxfiylikka tegishli narsalarni blocklaydi==============
export const siteSecurity = () => {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (
      e.key === 'shift' ||
      e.key === 'u' ||
      e.key === 'U' ||
      e.key === 'c' ||
      e.key === 'C' ||
      e.key === 'i' ||
      e.key === 'I' ||
      e.key === 'j' ||
      e.key === 'J'
    )) {
      toast.error('Бу сайтнинг махфийлик сиёсати қушимча харакатларни тақиқлайди');
      e.preventDefault();
    }
  });
};

// ================browser reload qilishni ogohlantirish uchun==================
export const unReload = () => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    const confirmationMessage = 'Сиз киритган ўзгаришлар сақланмаслиги мумкин';
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};