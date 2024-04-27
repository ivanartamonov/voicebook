import {Book, Tag} from '../types/types.ts';

export const findBooks = (): Array<Book> => {
  return [
    {
      id: '418757',
      title: 'Заборонена для мажора',
      cover: 'https://st.booknet.ua/uploads/covers/220/1695712337_4.png',
      author: {
        id: '1',
        name: 'Альма Лібрем',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1538814464_1165962.jpg',
      },
      abstract:
        'Я втиснулась в стіну. Мирослав нависнув наді мною і недобре осміхнувся. Він впер руки по обидві сторони від мене, тоді нахилився, аби поцілувати, та не встиг.\n' +
        '– Не смій, – видихнула я. – Зачепиш мене хоч пальцем – пожалкуєш! Я для тебе заборонена зона.\n' +
        '– Чому? – вигнув брови він.\n' +
        '– Мій батько зітре тебе на порох.\n' +
        'Сині очі хлопця небезпечно спалахнули.\n' +
        '– Мені плювати, – заявив він. – Все одно моєю будеш. Заборонена...\n' +
        '\n' +
        '___\n' +
        '\n' +
        'Я – слухняна татова дочка, ніколи й слова поперек не скажу. Мирослав – небезпечний, шалений, безкарний. Робить все, що йому заманеться.\n' +
        'Наші батьки – вороги, а ми тепер навчаємось разом в закритому університеті. Мир вирішив, що я стану його дівчиною…\n' +
        'І йому плювати на заборони мого тата.',
      genre: 'Романтика',
      tags: generateFakeTags(4),
      likes: 165,
    },
    {
      id: '423061',
      title: 'За власним бажанням',
      cover: 'https://st.booknet.ua/uploads/covers/220/1708788896_26.jpg',
      author: {
        id: '2',
        name: 'Соломія Даймонд',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1707299259_4843192.jpg',
      },
      abstract:
        '— Ти вчинила нерозсудливо, — колючий погляд відгукується в грудях щемом.\n' +
        '— Знаю. Я не могла інакше.\n' +
        '— Мала дочекатися мене, — підвищує голос. — Болить? — простягає руку, але я відвертаю обличчя.\n' +
        '— Нормально, — кажу розгублено.\n' +
        '— Лізо, — дратується, — все це неправильно. Нам потрібно серйозно поговорити. Протистояння зайшло не туди, ми…\n' +
        '— Немає сенсу, — перебиваю нервово. — Ми обоє програли. Я хочу звільнитися, — кусаю вуста, щоб не розплакатися.\n' +
        '— З ним краще? Ну, скажи, — нависає наді мною. Гнівається. — Поясни, чому?\n' +
        '— Бо… Я погодилася вийти за нього.',
      genre: 'Фентезі',
      tags: generateFakeTags(4),
      likes: 12,
    },
    {
      id: '419309',
      title: 'Час пробачати',
      cover: 'https://st.booknet.ua/uploads/covers/220/1697796419_56.jpg',
      author: {
        id: '3',
        name: 'Анні Кос',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1675773765_8955513.jpeg',
      },
      abstract:
        '— Іншого місця для роботи не знайшла? — ріже кожну клітинку моєї зраненої душі.\n' +
        '— Я не знала, що це твоя фірма, — відповідаю тихо.\n' +
        '— Не знала, що я співвласник? — дивується. — Це відкрита інформація.\n' +
        '— Я можу піти, — тримаюся, щоб не опустити погляд. — Це не проблема.\n' +
        '— Достатньо того, що ти знову з’явилася, — хмикає. Переді мною абсолютно чужий чоловік. Байдужий. Холодний. Тільки зовнішність нагадує мені того, ким він колись був.\n' +
        '— Якщо не згадувати минуле, воно не набридатиме.\n' +
        '— А ти можеш не згадувати, Са-ш-шо? — шипить крізь зуби.\n' +
        '— Так, — у голосі тремтіння, але киваю впевнено.\n' +
        '— Гаразд, — підводиться. — Працюй, — виходить, залишивши мене варитися у спогадах…\n' +
        'Мабуть, вони ніколи не забудуться. Ніколи я не зможу дихати вільно. Ніколи не злечу на крилах, які він зламав…',
      genre: 'Детектив',
      tags: generateFakeTags(4),
      likes: 1267,
    },
    {
      id: '411831',
      title: "П'янкий смак кохання",
      cover: 'https://st.booknet.ua/uploads/covers/220/1673221872_64.jpg',
      author: {
        id: '4',
        name: 'Кіра Шарм',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1647879995_3431092.png',
      },
      abstract:
        '— Яка причина твого звільнення?\n' +
        '— Ви зі мною на «ти» чи на «ви», Ярославе Андрійовичу? — його тон підіймає в мені хвилю обурення. — Особиста.\n' +
        '— Цікаво, — він збирається ще щось сказати, але я перебиваю.\n' +
        '— Відпусти мене, — дивлюся йому у вічі. — Ти ж сам знаєш, що так буде краще.\n' +
        '— Відпрацюй обговорений період і йди, — вимовляє роздратовано, розвертається і підходить до столу, — ніхто не тримає. Це все? Ти для цього приходила?\n' +
        '— Так.\n' +
        '— Повертайся на робоче місце, — швидко долає відстань до дверей і, не дивлячись на мене, виходить.',
      genre: 'Романтика',
      tags: generateFakeTags(4),
      likes: 765,
    },
    {
      id: '5',
      title: 'Залишся єдиним',
      cover: 'https://st.booknet.ua/uploads/covers/220/1658075318_26.jpeg',
      author: {
        id: '5',
        name: 'Олена Сашина',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1700567182_10876149.jpg',
      },
      abstract:
        'Двері в мою спальню з гуркотом відчиняються. На порозі з’являється батько. Злий, як і постійно останнім часом.\n' +
        '— Готуйся, Кіро, весілля за два тижні, — повідомляє сухо.\n' +
        '— Я вже казала, що не вийду заміж за Тагаєва.\n' +
        '— Не за нього ти заміж виходиш, Кіро. За батька дитини.\n' +
        'Я ковтаю. Усередині щось ніби обривається й одразу злітає вгору. За секунду це відбувається. Я від хвилювання ледве ворушу язиком і згадую слова.\n' +
        '— За кого, тату?\n' +
        'Мені потрібно це запитати, почути. Бути впевненою, що тато не намагається витягнути з мене ім’я батька моєї дитини, яке я тримаю в таємниці.\n' +
        '— За Кирила Багрова, звісно. Чи ти забула, від кого вагітна?',
      genre: 'Фентезі',
      tags: generateFakeTags(4),
      likes: 576,
    },
  ];
};

function generateFakeTags(num: number): Array<Tag> {
  const tags = [
    'Владний герой',
    'Любовний трикутник',
    'Службовий роман',
    'Заборонене кохання',
    'Родинні таємниці',
    'Таємниці',
    'Академія магії',
    'Пригоди',
    'Обертні',
    'Бос та підлегла',
    'Кохання',
    'Сильна героїня',
    'Дракони',
    'Протистояння характерів',
  ];

  // shuffle tags and return first num elements
  return tags
    .sort(() => Math.random() - 0.5)
    .slice(0, num)
    .map((tag, index) => ({
      id: index.toString(),
      name: tag,
    }));
}