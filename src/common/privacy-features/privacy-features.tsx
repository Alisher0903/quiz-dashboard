import toast from 'react-hot-toast';

// =================screenshot olishni ogohlantirish uchun======================
export const screenshotBlocked = () => {
  const handleKeyDown = (event: any) => {
    if (event.key === 'PrintScreen' || (event.shiftKey && (event.metaKey || event.key === 'Meta'))) {
      const notification = document.getElementById('screenshot-warning');
      if (notification) notification.classList.remove('hidden');

      setTimeout(() => {
        if (notification) notification.classList.add('hidden');
      }, 2500);
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
    if ((e.ctrlKey && (
      e.key === 'shift' ||
      e.key === 'u' ||
      e.key === 'U' ||
      e.key === 'c' ||
      e.key === 'C' ||
      e.key === 'i' ||
      e.key === 'I' ||
      e.key === 'j' ||
      e.key === 'J' ||
      e.keyCode === 74 ||
      e.keyCode === 85 ||
      e.keyCode === 73
    )) || e.key === 'F12') {
      toast.error('Бу сайтнинг маҳфийлик сиёсати қўшимча ҳаракатларни тақиқлайди');
      e.preventDefault();
    }
  });
};

// ================browser reload qilishni ogohlantirish uchun==================
export const unReload = () => {
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && (
      e.keyCode === 84 ||
      e.keyCode === 87
    ))) {
      alert('Саҳифани тарк этмоқчимисиз, узгаришлар сақланмаслиги мумкин');
      e.preventDefault();
    }
  });

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    const confirmationMessage = 'Сиз киритган ўзгаришлар сақланмаслиги мумкин';
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
};

export const viewportIsActive = (setIsCursorOutside: (val: boolean) => void) => {
  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    screenshotBlocked();

    if (
      clientX <= 0 ||
      clientY <= 0 ||
      clientX >= window.innerWidth ||
      clientY >= window.innerHeight
    ) setIsCursorOutside(true);
    else setIsCursorOutside(false);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (event.clientY <= 0 || event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight) {
      setIsCursorOutside(true);
    }
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
  };
};