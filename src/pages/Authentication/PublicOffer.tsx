import { Popover } from 'antd';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const PublicOffer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Popover title="Орқага қайтиш" overlayStyle={{ textAlign: 'center' }}>
        <MdKeyboardBackspace
          className={`text-3xl hover:cursor-pointer hover:text-primary duration-300 mb-5`}
          onClick={() => navigate(-1)}
        />
      </Popover>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Оммавий оферта шартлари
      </h1>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Ушбу ҳужжат (бундан кейин "Шартнома" деб аталади) сиз ва Бизнинг Компаниямиз ўртасида тузилган оммавий оферта
        ҳисобланади.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Шартнома шартлари қуйидагича:
      </p>
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-4">
        <li>1. Шартнома предмети</li>
        <li>2. Томонларнинг ҳуқуқ ва мажбуриятлари</li>
        <li>3. Шартнома шартлари ва тўловлар</li>
        <li>4. Низоларни ҳал этиш тартиби</li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Мазкур Шартнома сиз томонидан қабул қилиниши билан кучга киради.
      </p>
    </>
  );
};

export default PublicOffer;
